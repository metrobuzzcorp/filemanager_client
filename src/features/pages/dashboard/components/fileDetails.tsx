import { useLazyGetEntityDetailsQuery } from "@/store";
import {
  Entity,
  GetEntityDetailsRequest,
  GetEntityDetailsResponse,
} from "@/types";
import { IconLoader, IconPlus } from "@tabler/icons-react";
import { useFetcher } from "netwrap";
import Image from "next/image";
import { normalCaseGenerator } from "normal-case-generator";
import { useEffect, useState } from "react";

export const FileDetails = ({
  fileId,
  closeComponent,
}: {
  fileId: string;
  closeComponent: () => void;
}) => {
  const [triggerEntityDetailsFetch] = useLazyGetEntityDetailsQuery();

  const [entity, setEntity] = useState<Entity>({
    cloudinaryFileName: "",
    cloudinaryFormat: "",
    cloudinaryPublicId: "",
    cloudinaryTag: "",
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

  const { trigger, isLoading } = useFetcher<
    GetEntityDetailsRequest,
    GetEntityDetailsResponse
  >({
    queryFn(requestData) {
      const entityId = requestData?.entityId as string;

      return triggerEntityDetailsFetch({
        entityId,
      }).unwrap();
    },
    onSuccess(data) {
      if (!data.status) {
        throw new Error(data.message);
      }

      setEntity(data.payload);
    },
    onError(error) {},
    onFinal() {},
  });

  useEffect(() => {
    if (fileId) {
      trigger({
        entityId: fileId,
      });
    }
  }, [fileId]);

  return (
    <div className="w-3/12 bg-white relative rounded-lg">
      <div className="flex flex-wrap items-center justify-between border-neutral-100 border-b pb-0 pt-5 lg:py-5 px-5">
        <h1 className="text-xl text-neutral-500">
          {normalCaseGenerator("File Details")}
        </h1>
        <IconPlus
          className="rotate-45 cursor-pointer"
          onClick={closeComponent}
        />
      </div>
      {isLoading ? (
        <IconLoader className="animate-spin" />
      ) : (
        <div className="px-4 rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entity.url as string}
            className="rounded-lg shadow-lg h-[200px] w-full object-cover"
            alt={entity.name as string}
          />
        </div>
      )}
    </div>
  );
};
