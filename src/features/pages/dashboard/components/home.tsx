import { EntityCardItem, EntityListItem, Topbar } from "@/components";
import { useAppSelector, useLazyGetRootFolderDetailsQuery } from "@/store";
import {
  Entity,
  GetRootFolderDetailsRequest,
  GetRootFolderDetailsResponse,
} from "@/types";
import { log, useFetcher } from "netwrap";
import { useEffect, useState } from "react";

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

  const [triggerFetch] = useLazyGetRootFolderDetailsQuery();

  const { trigger, isLoading } = useFetcher<
    GetRootFolderDetailsRequest,
    GetRootFolderDetailsResponse
  >({
    queryFn: (getRootData) =>
      triggerFetch({ ownerId: getRootData?.ownerId as string }).unwrap(),
    onSuccess: (data) => {
      setEntity(data.payload);
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

  return (
    <div className="bg-white rounded-lg flex-auto flex flex-col">
      <Topbar getSearchInput={(text) => setSearchInput(text)} />
      <div className="overflow-auto overscroll-contain flex-auto py-5 px-5">
        {entity.content && entity.content.length > 0 ? (
          <>
            {listType === "card" && <GridStyle entities={entity.content} />}
            {listType === "list" && <ListStyle entities={entity.content} />}
          </>
        ) : (
          <p>
            There are no currently no files in your drive. Kindly add a file or
            folder to view them here
          </p>
        )}
      </div>
    </div>
  );
};

const ListStyle = ({ entities }: { entities: Entity[] }) => {
  return <div className="w-full bg-red-600">Hello</div>;
};

const GridStyle = ({ entities }: { entities: Entity[] }) => {
  return (
    <div className="w-full flex flex-wrap justify-between">
      {entities.map((singleEntity, index) => {
        return (
          <div key={index} className={`lg:w-[24%] mb-5`}>
            <EntityCardItem entity={singleEntity} />
          </div>
        );
      })}
    </div>
  );
};
