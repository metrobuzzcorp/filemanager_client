import { ActiveTab } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const options = [
  {
    label: "Home",
    value: "home",
    icon: <></>,
  },
  {
    label: "Recent",
    value: "recent",
    icon: <></>,
  },
  {
    label: "Starred",
    value: "starred",
    icon: <></>,
  },
  {
    label: "Storage",
    value: "storage",
    icon: <></>,
  },
  {
    label: "Bin",
    value: "bin",
    icon: <></>,
  },
];

export const Sidebar = () => {
  const urlSearchParams = useSearchParams();

  const activeTab = urlSearchParams.get("activeTab") as ActiveTab | null;

  const currentActiveTab = useMemo(() => {
    if (!activeTab) return "home";
    return activeTab;
  }, [activeTab]);

  return (
    <div className="px-10 pt-10 flex-col flex gap-5">
      {options.map((singleOption, index) => {
        return (
          <Link href={`?activeTab=${singleOption.value}`} passHref key={index}>
            <div
              className={`flex gap-2 w-fit px-10 py-1 rounded-full ${
                singleOption.value === currentActiveTab
                  ? "bg-green-600 text-white hover:bg-green-900"
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
