import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type DefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  label?: string;
  onTogglePassword?: () => void;
  showPassword?: boolean;
  isPasswordInput?: boolean;
  ref?: React.Ref<HTMLInputElement> | undefined;
} & DefaultInputProps;

export type TopbarProps = {
  getSearchInput: (text: string) => void;
};
