import { GenerateNameAvatar } from "@/components";
import { Entity } from "@/types";
import { bytesToMB } from "@/utils";
import { IconDots, IconFile, IconFolderFilled } from "@tabler/icons-react";
import moment from "moment";
import { truncateText } from "text-shortener";

export const ListStyle = ({
  entities,
  setCurrentFolderId,
  setCurrentFileId,
}: {
  entities: Entity[];
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentFileId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full">
      <table className="border-collapse table-auto w-full text-sm">
        <thead className="items-center w-full justify-center text-neutral-500 font-bold text-left">
          <tr>
            <th className="border-b border-slate-100 w-6/12 pb-3">Name</th>
            <th className="border-b border-slate-100 w-1/12 pb-3">Owner</th>
            <th className="border-b border-slate-100 w-2/12 pb-3">
              Last Modified
            </th>
            <th className="border-b border-slate-100 w-2/12 pb-3">File Size</th>
            <th className="border-b border-slate-100 w-1/12 pb-3">
              <IconDots />
            </th>
          </tr>
        </thead>
        <tbody className="">
          {entities
            .filter((_) => _.type === "folder")
            .concat(...entities.filter((_) => _.type === "file"))
            .map((entity, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 items-center border-b border-neutral-100"
                  onClick={() =>
                    entity.type === "file"
                      ? setCurrentFileId(entity.id as string)
                      : setCurrentFolderId(entity.id as string)
                  }
                >
                  <td className="flex gap-2 py-3 items-center px-2 cursor-pointer">
                    {entity.type === "file" && <IconFile />}
                    {entity.type === "folder" && (
                      <IconFolderFilled className="text-emerald-600" />
                    )}
                    {truncateText(entity.name as string, 50)}
                  </td>
                  <td className="py-3">
                    <GenerateNameAvatar
                      email={entity.owner?.emailAddress as string}
                    />
                  </td>
                  <td>
                    {moment(entity.updatedAt as string, "").format(
                      "MMM Do, YYYY"
                    )}
                  </td>
                  <td>
                    {entity.type === "file"
                      ? `${bytesToMB(parseFloat(entity.fileSize as string))}mb`
                      : "----"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
