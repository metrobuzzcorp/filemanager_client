import { EntityCardItem } from "@/components";
import { Entity } from "@/types";

export const GridStyle = ({
  entities,
  setCurrentFolderId,
  setCurrentFileId,
}: {
  entities: Entity[];
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentFileId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <p className="font-bold text-sm text-neutral-500">Folders</p>
      <div className="w-full mt-3 flex flex-wrap justify-between">
        {entities.filter((_) => _.type === "folder").length > 0 ? (
          <>
            {entities
              .filter((_) => _.type === "folder")
              .map((singleEntity, index) => {
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
          </>
        ) : (
          <p className="text-neutral-500 mb-5">Currently no folders to show!</p>
        )}
      </div>
      <p className="font-bold text-sm text-neutral-500">Files</p>
      <div className="w-full mt-3 flex flex-wrap justify-between">
        {entities.filter((_) => _.type === "file").length > 0 ? (
          <>
            {entities
              .filter((_) => _.type === "file")
              .map((singleEntity, index) => {
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
          </>
        ) : (
          <p className="text-neutral-500 mb-5">Currently no files to show!</p>
        )}
      </div>
    </div>
  );
};
