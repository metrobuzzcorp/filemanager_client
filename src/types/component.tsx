import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Controller } from "./general";
import { Entity } from "./api";

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

export type EntityProps = {
  entity: Entity;
};
