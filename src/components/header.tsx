import { useAppSelector } from "@/store/hooks";
import { Button } from "./button";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { log } from "netwrap";

export const Header = () => {
  const { id } = useAppSelector((state) => state.userReducer.user);

  const router = useRouter();

  const buttons: {
    text: string;
    action: () => void;
    variant: "outline" | "default";
  }[] = useMemo(() => {
    if (id) {
      return [
        {
          text: "Upload File",
          action: () => {},
          variant: "outline",
        },
        {
          text: "Create Folder",
          action: () => {},
          variant: "default",
        },
      ];
    }

    return [
      {
        text: "Get Started",
        action: () => router.push("/signup"),
        variant: "outline",
      },
      {
        text: "Login",
        action: () => router.push("/login"),
        variant: "default",
      },
    ];
  }, [id, router]);

  return (
    <div
      className={`${
        id ? undefined : "border-b"
      } w-full lg:px-10 px-5 h-[70px] flex justify-between items-center`}
    >
      <div className="flex-auto">
        <p className="text-4xl font-black">fm</p>
      </div>
      <div className="flex gap-4">
        {buttons.map((button, index) => {
          return (
            <Button
              key={index}
              fullWidth={false}
              onClick={button.action}
              variant={button.variant}
            >
              {button.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
