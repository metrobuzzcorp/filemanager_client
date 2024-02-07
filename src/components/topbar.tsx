import { Input } from "@/components";
import { ActiveTab, InputProps, TopbarProps } from "@/types";
import { IconGrid3x3, IconList } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { normalCaseGenerator } from "normal-case-generator";
import { useMemo, useState } from "react";

export const Topbar = ({ getSearchInput }: TopbarProps) => {
  const urlSearchParams = useSearchParams();

  const activeTab = urlSearchParams.get("activeTab") as ActiveTab | null;

  const currentActiveTab = useMemo(() => {
    if (!activeTab) return "home";
    return activeTab;
  }, [activeTab]);

  const SearchComponent = useMemo(() => {
    if (!currentActiveTab) return () => undefined;

    const allowedRenderTabs = ["home", "Trash", "Recent", "Starred"];

    if (allowedRenderTabs.includes(currentActiveTab))
      // eslint-disable-next-line react/display-name
      return (props: InputProps) => (
        // <Input placeholder="Search..." type="text" />
        <Input {...props} />
      );
  }, [currentActiveTab]);

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex flex-wrap items-center justify-between border-neutral-100 border-b pb-0 pt-5 lg:py-5 px-5">
      <div className="flex gap-12 items-center w-full lg:w-6/12">
        <h1 className="text-2xl">{normalCaseGenerator(currentActiveTab)}</h1>
        <div className="flex-auto">
          {SearchComponent?.({
            placeholder: "Search...",
            type: "text",
            onChange: (event) => {
              setSearchInput(event.target.value);
              getSearchInput(event.target.value);
            },
            value: searchInput,
          })}
        </div>
      </div>
      <div className="flex gap-4 items-center w-full lg:w-6/12 lg:justify-end justify-center py-5 lg:py-0">
        <IconGrid3x3 />
        <IconList />
      </div>
    </div>
  );
};
