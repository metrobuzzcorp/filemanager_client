import React, { LegacyRef } from "react";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = {
  label?: string;
  onTogglePassword?: () => void;
  showPassword?: boolean;
  isPasswordInput?: boolean;
  ref?: LegacyRef<HTMLInputElement> | undefined;
} & DefaultInputProps;

const baseStyles =
  "w-full outline-none hover:shadow-lg bg-transparent border border-neutral-300 rounded-full py-3 px-5";

export const Input = ({
  label,
  isPasswordInput,
  onTogglePassword,
  showPassword,
  ref,
  ...rest
}: InputProps) => {
  return (
    <>
      {label && <label htmlFor={rest.name}>{label}</label>}
      <div
        className={
          isPasswordInput
            ? `flex items-center py-3 px-5 hover:shadow-lg bg-transparent border border-neutral-300 rounded-full justify-between gap-4`
            : ""
        }
      >
        <BaseInput {...rest} isPasswordInput={isPasswordInput} ref={ref} />

        {isPasswordInput && (
          <>
            {!showPassword ? (
              <FaEye className="cursor-pointer" onClick={onTogglePassword} />
            ) : (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={onTogglePassword}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

const BaseInput = React.memo(
  React.forwardRef(
    ({
      type,
      className,
      isPasswordInput,
      ref,
      ...rest
    }: DefaultInputProps & { isPasswordInput?: boolean }) => {
      const classes: Record<HTMLInputTypeAttribute, string> = {
        text: isPasswordInput
          ? "w-full bg-transparent outline-none"
          : baseStyles,
        password: "w-full bg-transparent outline-none",
        "datetime-local": "",
        button: "",
        checkbox: "",
        color: "",
        date: "",
        email: "",
        file: "",
        hidden: "",
        image: "",
        month: "",
        number: "",
        radio: "",
        range: "",
        reset: "",
        search: "",
        submit: "",
        tel: "",
        time: "",
        url: "",
        week: "",
      };
      return (
        <input
          ref={ref}
          className={`${classes[type as HTMLInputTypeAttribute]} ${className}`}
          {...rest}
        />
      );
    }
  )
);

BaseInput.displayName = "BaseInput";
