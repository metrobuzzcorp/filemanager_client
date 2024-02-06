"use client";

import { Header } from "@/components";
import { Pages } from "@/features";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const { id } = useAppSelector((state) => state.userReducer.user);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Header />
      {id ? <Pages.Dashboard /> : <Pages.Home />}
    </div>
  );
}
