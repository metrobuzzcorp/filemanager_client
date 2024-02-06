import { Button } from "@/components";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router = useRouter();
  return (
    <div className="flex-auto flex">
      <div className="w-6/12 flex-col flex-auto flex justify-center px-10">
        <h1 className="text-7xl font-light">
          <span className="font-bold">Organize, access</span> and{" "}
          <span className="font-bold">share your files</span> with <br />
          <span className="font-bold">fm</span>
        </h1>
        <div className="mt-5" />
        <p className="text-lg">
          A product that focuses on automating how you handle/access your files.
        </p>
        <div className="mt-5" />
        <Button fullWidth={false} onClick={() => router.push("/signup")}>
          Try now!
        </Button>
      </div>
      <div className="w-6/12"></div>
    </div>
  );
};
