import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { LuLoader2 } from "react-icons/lu";

type BaseButtonProps = {
  isLoading?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {} & BaseButtonProps;

export const Button = ({ ...rest }: ButtonProps) => {
  return <BaseButton {...rest} />;
};

const BaseButton = ({ isLoading, ...rest }: BaseButtonProps) => {
  return (
    <button
      className={`flex justify-center gap-4 w-full hover:shadow-lg hover:bg-emerald-900 bg-emerald-600 text-white border border-neutral-200 rounded-full py-3 px-5 ${rest.className}`}
      {...rest}
    >
      {rest.children}
      {isLoading && <LuLoader2 />}
    </button>
  );
};
