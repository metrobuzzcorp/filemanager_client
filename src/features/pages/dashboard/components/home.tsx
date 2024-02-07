import {
  EntityCardItem,
  EntityListItem,
  LoadingProgressBar,
  Topbar,
} from "@/components";
import {
  useAppSelector,
  useCreateFileMutation,
  useLazyGetRootFolderDetailsQuery,
} from "@/store";
import {
  CreateFileRequest,
  CreateFileResponse,
  Entity,
  GetRootFolderDetailsRequest,
  GetRootFolderDetailsResponse,
} from "@/types";
import { log, useFetcher } from "netwrap";
import { DragEvent, useEffect, useState } from "react";
import axios from "axios";
import { endpointBuilder } from "@/utils";
import { config } from "@/config";
import { toast } from "react-toastify";
import { IconFile, IconPlus, IconWorldCancel } from "@tabler/icons-react";

export const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const {
    user: { id },
  } = useAppSelector((state) => state.userReducer);

  const { listType } = useAppSelector((state) => state.entityReducer);

  const [entity, setEntity] = useState<Entity & { content: Entity[] }>({
    cloudinaryFileName: "",
    cloudinaryFormat: "",
    cloudinaryPublicId: "",
    cloudinaryTag: "",
    content: [],
    createdAt: "",
    fileType: "image",
    id: "",
    name: "",
    owner: {
      createdAt: "",
      emailAddress: "",
      id: "",
      updatedAt: "",
    },
    parentId: "",
    status: "active",
    type: "folder",
    updatedAt: "",
    url: "",
  });

  const [currentFolderId, setCurrentFolderId] = useState("");
  const [currentFileId, setCurrentFileId] = useState("");

  const [triggerFetch] = useLazyGetRootFolderDetailsQuery();

  const { trigger, isLoading } = useFetcher<
    GetRootFolderDetailsRequest,
    GetRootFolderDetailsResponse
  >({
    queryFn: (getRootData) =>
      triggerFetch({ ownerId: getRootData?.ownerId as string }).unwrap(),
    onSuccess: (data) => {
      setEntity(data.payload);
      setCurrentFolderId(data.payload.id as string);
    },
    onError(error) {
      log({ error });
    },
    onFinal() {},
  });

  useEffect(() => {
    if (id) {
      trigger({
        ownerId: id,
      });
    }
  }, [id]);

  const [createFileTrigger] = useCreateFileMutation();

  const { isLoading: isCreatingFile, trigger: createFile } = useFetcher<
    CreateFileRequest,
    CreateFileResponse
  >({
    queryFn: (formData) => createFileTrigger(formData as FormData).unwrap(),
    onSuccess(data) {},
    onError(error) {},
    onFinal() {},
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const [isUploading, setIsUploading] = useState(false);

  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const controller = new AbortController();

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", currentFolderId);
      formData.append("ownerId", id);

      setUploadFileName(file.name);

      setIsUploading(true);

      const url = endpointBuilder([
        config.baseUrl as string,
        config.routes.entity.prefix().path,
        config.routes.entity.createFile().path,
      ]);

      const { data } = await axios.post<CreateFileResponse>(url, formData, {
        onUploadProgress(progressEvent) {
          const totalProgress = progressEvent.total as number;
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / totalProgress
          );

          setUploadProgress(progressPercentage);
        },

        signal: controller.signal,
      });

      if (data.status) {
        throw new Error(data.message);
      }

      toast.success(`Successfully uploaded file - ${file.name}`);
    } catch (error) {
    } finally {
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    console.log(files);

    for (let index = 0; index < files.length; index++) {
      uploadFile(files[index]);
    }
  };

  return (
    <div
      className={`relative rounded-lg flex-auto flex flex-col ${
        isDragging ? "bg-gray-200" : "bg-white"
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Topbar getSearchInput={(text) => setSearchInput(text)} />
      <div className="overflow-auto overscroll-contain flex-auto py-5 px-5">
        {entity.content && entity.content.length > 0 ? (
          <>
            {listType === "card" && (
              <GridStyle
                entities={entity.content}
                setCurrentFolderId={setCurrentFolderId}
                setCurrentFileId={setCurrentFileId}
              />
            )}
            {listType === "list" && <ListStyle entities={entity.content} />}
          </>
        ) : (
          <p>
            There are no currently no files in your drive. Kindly add a file or
            folder to view them here
          </p>
        )}
      </div>

      <div className="absolute bottom-5 w-[300px] right-5 bg-white shadow-xl rounded-lg ">
        <div className="border-b flex justify-between border-neutral-100 px-4 py-1">
          <p className="text-sm">Uploading...</p>
          <IconPlus
            onClick={() => {
              controller.abort();
              setIsUploading(false);
            }}
            size={18}
            className="rotate-45 cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-1 mr-10">
            <IconFile />
            {uploadFileName}
          </div>
          <div className="w-[30px] h-[30px] relative">
            <LoadingProgressBar progressPercentage={uploadProgress} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListStyle = ({ entities }: { entities: Entity[] }) => {
  return <div className="w-full bg-red-600">Hello</div>;
};

const GridStyle = ({
  entities,
  setCurrentFolderId,
  setCurrentFileId,
}: {
  entities: Entity[];
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentFileId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex flex-wrap justify-between">
      {entities.map((singleEntity, index) => {
        return (
          <div
            key={index}
            className={`lg:w-[24%] mb-5`}
            onClick={() =>
              singleEntity.type === "folder"
                ? setCurrentFolderId(singleEntity.id as string)
                : setCurrentFileId(singleEntity.id as string)
            }
          >
            <EntityCardItem entity={singleEntity} />
          </div>
        );
      })}
    </div>
  );
};
