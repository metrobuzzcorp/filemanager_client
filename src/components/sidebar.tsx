import { ActiveTab } from "@/types";
import {
  IconCalendarTime,
  IconCloud,
  IconCloudCheck,
  IconHeart,
  IconHearts,
  IconHome2,
  IconSmartHome,
  IconTimeDuration0,
  IconTrash,
  IconTrashFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const Sidebar = () => {
  const urlSearchParams = useSearchParams();

  const activeTab = urlSearchParams.get("activeTab") as ActiveTab | null;

  const currentActiveTab = useMemo(() => {
    if (!activeTab) return "home";
    return activeTab;
  }, [activeTab]);

  const options = useMemo(
    () => [
      {
        label: "Home",
        value: "home",
        icon: currentActiveTab === "home" ? <IconHome2 /> : <IconSmartHome />,
      },
      {
        label: "Recent",
        value: "recent",
        icon:
          currentActiveTab === "recent" ? (
            <IconCalendarTime />
          ) : (
            <IconTimeDuration0 />
          ),
      },
      {
        label: "Starred",
        value: "starred",
        icon: currentActiveTab === "starred" ? <IconHearts /> : <IconHeart />,
      },
      {
        label: "Storage",
        value: "storage",
        icon:
          currentActiveTab === "storage" ? <IconCloudCheck /> : <IconCloud />,
      },
      {
        label: "Bin",
        value: "bin",
        icon: currentActiveTab === "bin" ? <IconTrashFilled /> : <IconTrash />,
      },
    ],
    [currentActiveTab]
  );

  return (
    <div className="px-10 pt-10 flex-col flex gap-5">
      {options.map((singleOption, index) => {
        return (
          <Link href={`?activeTab=${singleOption.value}`} passHref key={index}>
            <div
              className={`flex  gap-2 items-center w-fit  pr-10 py-1 rounded-full ${
                singleOption.value === currentActiveTab
                  ? "bg-green-600 text-white pl-2 hover:bg-green-900"
                  : "border-neutral-200 text-neutral-500 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              {singleOption.icon}
              <p>{singleOption.label}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
