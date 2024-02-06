import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { LuLoader2 } from "react-icons/lu";

type BaseButtonProps = {
  isLoading?: boolean;
  variant?: "default" | "outline";
  fullWidth?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {} & BaseButtonProps;

export const Button = ({ ...rest }: ButtonProps) => {
  return <BaseButton {...rest} />;
};

const BaseButton = ({
  isLoading,
  variant = "default",
  fullWidth = true,
  ...rest
}: BaseButtonProps) => {
  const variantClasses = {
    default: "bg-emerald-600 text-white",
    outline: "hover:bg-emerald-900 border border-emerald-600 text-emerald-600",
  };

  const widthClasses = {
    full: "w-full",
    "fit-content": "w-fit",
  };

  return (
    <button
      className={`flex ${
        widthClasses[fullWidth ? "full" : "fit-content"]
      } justify-center gap-4 hover:shadow-lg ${
        variantClasses[variant]
      } border border-neutral-200 rounded-full py-3 px-5 ${rest.className}`}
      {...rest}
    >
      {rest.children}
      {isLoading && <LuLoader2 />}
    </button>
  );
};
