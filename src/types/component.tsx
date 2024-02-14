import { DetailedHTMLProps, InputHTMLAttributes } from "react";
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

type FolderBreadcrumbs = {
  folderName: string;
  folderId: string;
};

export type TopbarProps = {
  getSearchInput: (text: string) => void;
  setFolderBreadcrumbs: React.Dispatch<
    React.SetStateAction<FolderBreadcrumbs[]>
  >;
  folderBreadcrumbs: FolderBreadcrumbs[];
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  currentFolderId: string;
};

export type EntityProps = {
  entity: Entity;
};
