import { Sidebar } from "@/components";
import { Bin, Home, Recent, Starred, Storage } from "./components";
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
      <div className="w-2/12 bg-neutral-100">
        <Sidebar />
      </div>
      <div className="w-10/12 bg-neutral-200">{activeRenderedContent()}</div>
    </div>
  );
};
