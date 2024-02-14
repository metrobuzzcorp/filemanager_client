import { Sidebar } from "@/components";
import { Bin, Home, Recent, Starred, Storage } from "./sections";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ActiveTab } from "@/types";

const getTabs = (sharedProps?: any) => {
  const tabs: Record<ActiveTab, React.JSX.Element> = {
    home: <Home {...sharedProps} />,
    starred: <Starred {...sharedProps} />,
    bin: <Bin {...sharedProps} />,
    recent: <Recent {...sharedProps} />,
    storage: <Storage {...sharedProps} />,
  };

  return tabs;
};

export const Dashboard = () => {
  const urlSearchParams = useSearchParams();

  const activeRenderedContent = useMemo(() => {
    const currentActiveTab = urlSearchParams.get(
      "activeTab"
    ) as ActiveTab | null;

    if (!currentActiveTab) {
      return () => getTabs()["home"];
    }

    return () => getTabs()[currentActiveTab];
  }, [urlSearchParams]);

  return (
    <div className="flex-auto flex">
      <div className="lg:w-2/12 w-full lg:flex hidden bg-neutral-100">
        <Sidebar />
      </div>
      <div className="w-10/12 flex-auto flex rounded-lg p-5 ">
        {activeRenderedContent()}
      </div>
    </div>
  );
};
