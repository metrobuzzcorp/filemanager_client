import { EntityProps } from "@/types";
import { IconFile, IconFolder, IconFolderFilled } from "@tabler/icons-react";

export const EntityListItem = ({ entity }: EntityProps) => {
  return <div className="flex"></div>;
};

export const EntityCardItem = ({ entity }: EntityProps) => {
  return (
    <div className="flex items-center gap-2 px-5 bg-neutral-100 w-full py-2 rounded-lg cursor-pointer">
      {entity.type === "file" && <IconFile />}
      {entity.type === "folder" && (
        <IconFolderFilled className="text-emerald-600" />
      )}
      <p>{entity.name}</p>
    </div>
  );
};
