import { EntityCardItem, LoadingProgressBar, Topbar } from "@/components";
import {
  useAppSelector,
  useLazyGetFolderContentsQuery,
  useLazyGetRootFolderDetailsQuery,
} from "@/store";
import {
  CreateFileResponse,
  Entity,
  GetFolderContentsRequest,
  GetRootFolderDetailsRequest,
  GetRootFolderDetailsResponse,
} from "@/types";
import { useFetcher } from "netwrap";
import { DragEvent, useEffect, useState } from "react";
import axios from "axios";
import { endpointBuilder } from "@/utils";
import { config } from "@/config";
import { toast } from "react-toastify";
import { IconFile, IconPlus } from "@tabler/icons-react";
import { FileDetails, GridStyle } from "../components";
import { ListStyle } from "../components";

export const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const {
    user: { id, token },
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
    fileSize: "",
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

  const [content, setContent] = useState<Entity[]>([]);

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
      setContent(data.payload.content);
      setCurrentFolderId(data.payload.id as string);
    },
    onError(error) {
      // log({ error });
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
  const [uploadStarted, setUploadStarted] = useState(false);
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
      setUploadStarted(true);
      setIsUploading(true);

      const url = endpointBuilder([
        config.baseUrl as string,
        config.routes.entity.prefix().path,
        config.routes.entity.createFile().path,
      ]);

      const { data } = await axios.post<CreateFileResponse>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress(progressEvent) {
          const totalProgress = progressEvent.total as number;
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / totalProgress
          );

          setUploadProgress(progressPercentage);
        },

        signal: controller.signal,
      });

      if (!data.status) {
        throw new Error(data.message);
      }

      if (currentFolderId === entity.id) {
        setEntity({ ...entity, content: [...entity.content, data.payload] });
      }

      toast.success(`Successfully uploaded file - ${file.name}`);
    } catch (error) {
    } finally {
      setUploadStarted(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    if (files.length > 1) {
      return toast.error("You are only allowed to upload 1 file at a time");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/quicktime",
    ]; // Add more video types if necessary

    if (!allowedTypes.includes(files[0].type)) {
      return toast.error("Please upload only image or video files.");
    }

    uploadFile(files[0]);
  };

  const [getFolderContents] = useLazyGetFolderContentsQuery();

  const { isLoading: isFetchingFolderContents, trigger: fetchFolderContents } =
    useFetcher<GetFolderContentsRequest>({
      queryFn: (queryFolderContentsData) =>
        getFolderContents({
          folderId: queryFolderContentsData?.folderId as string,
        }).unwrap(),
      onSuccess(data) {
        if (!data.status) {
          throw new Error(data.message);
        }

        setContent(data.payload);
      },
      onError(error) {},
      onFinal() {},
    });

  useEffect(() => {
    if (currentFolderId) {
      fetchFolderContents({
        folderId: currentFolderId,
      });
    }
  }, [currentFolderId]);

  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<
    {
      folderName: string;
      folderId: string;
    }[]
  >([]);

  const updateBreadcrumbs = () => {};

  return (
    <div className="flex relative flex-auto gap-5">
      <div
        className={`relative rounded-lg flex-auto flex flex-col ${
          isDragging ? "bg-gray-200" : "bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Topbar
          getSearchInput={(text) => setSearchInput(text)}
          setFolderBreadcrumbs={setFolderBreadcrumbs}
          folderBreadcrumbs={folderBreadcrumbs}
          setCurrentFolderId={setCurrentFolderId}
          currentFolderId={currentFolderId}
        />
        <div className="overflow-y-auto h-4 scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 overscroll-contain flex-auto py-5 px-5">
          {content && content.length > 0 ? (
            <>
              {listType === "card" && (
                <GridStyle
                  entities={content.filter((_) =>
                    _.name?.toLowerCase().includes(searchInput.toLowerCase())
                  )}
                  setCurrentFolderId={(folderId) => {
                    setCurrentFolderId(folderId);
                  }}
                  setCurrentFileId={setCurrentFileId}
                />
              )}
              {listType === "list" && (
                <ListStyle
                  entities={content.filter((_) =>
                    _.name?.toLowerCase().includes(searchInput.toLowerCase())
                  )}
                  setCurrentFolderId={setCurrentFolderId}
                  setCurrentFileId={setCurrentFileId}
                />
              )}
            </>
          ) : (
            <p>
              There are no currently no files in your drive. Kindly add a file
              or folder to view them here
            </p>
          )}
        </div>
      </div>
      {currentFileId && (
        <FileDetails
          closeComponent={() => setCurrentFileId("")}
          fileId={currentFileId}
        />
      )}
      {isUploading && (
        <div className="absolute bottom-5 w-[300px] right-5 bg-white shadow-xl rounded-lg ">
          <div className="border-b flex justify-between border-neutral-100 px-4 py-1">
            <p className="text-sm">
              {uploadStarted ? "Uploading..." : "Uploaded"}
            </p>
            <IconPlus
              onClick={() => {
                if (!uploadStarted) {
                  controller.abort();
                  setIsUploading(false);
                  return setUploadStarted(false);
                }

                toast.error("Finalizing upload. Kindly be patient...", {
                  isLoading: uploadStarted,
                });
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
      )}
    </div>
  );
};
