import { Pages } from "@/features";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

export default function Home() {
  const { id } = useAppSelector((state) => state.userReducer.user);

  if (id) {
    return <Pages.Dashboard />;
  }

  return <Pages.Home />;
}
