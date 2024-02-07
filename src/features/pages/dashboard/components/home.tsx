import { Topbar } from "@/components";
import { useAppSelector, useLazyGetRootFolderDetailsQuery } from "@/store";
// import { useAppSelector } from "@/store/hooks";
import {
  GetRootFolderDetailsRequest,
  GetRootFolderDetailsResponse,
} from "@/types";
import { useFetcher } from "netwrap";
import { useEffect, useState } from "react";

export const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const {
    user: { id },
  } = useAppSelector((state) => state.userReducer);

  const [triggerFetch] = useLazyGetRootFolderDetailsQuery();

  const { trigger, isLoading } = useFetcher<
    GetRootFolderDetailsRequest,
    GetRootFolderDetailsResponse
  >({
    queryFn: (getRootData) =>
      triggerFetch({ ownerId: getRootData?.ownerId as string }).unwrap(),
    onSuccess: (data) => {},
    onError(error) {},
    onFinal() {},
  });

  useEffect(() => {
    trigger({
      ownerId: id,
    });
  }, []);

  return (
    <div className="bg-white rounded-lg flex-auto flex flex-col">
      <Topbar getSearchInput={(text) => setSearchInput(text)} />
      <div className="overflow-auto overscroll-contain flex-auto bg-green-600">
        Hi there
      </div>
    </div>
  );
};
