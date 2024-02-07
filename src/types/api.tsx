export type DefaultResponseObject<T = null> = {
  status: boolean;
  code: number;
  message: string;
  payload: T;
};

export type EntityStatus = "active" | "archived" | "deleted";

export type RegisterUserResponse = DefaultResponseObject<{
  id: string;
  emailAddress: string;
}>;

export type RegisterUserRequest = {
  emailAddress: string;
  password: string;
};

export type LoginUserResponse = DefaultResponseObject<{
  id: string;
  emailAddress: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}>;

export type LoginUserRequest = RegisterUserRequest;

export type Entity = {
  id: string | null;
  name: string | null;
  type: "file" | "folder" | null;
  url: string | null;
  status: EntityStatus | null;
  parentId: string | null;
  owner: Omit<LoginUserResponse["payload"], "token"> | null;
  cloudinaryPublicId: string | null;
  cloudinaryTag: string | null;
  cloudinaryFormat: string | null;
  cloudinaryFileName: string | null;
  fileType: "image" | "video" | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type GetRootFolderDetailsRequest = {
  ownerId: string;
};

export type GetRootFolderDetailsResponse = DefaultResponseObject<
  Entity & { content: Entity[] }
>;

export type CreateFolderRequest = {
  name: string;
  ownerId: string;
  parentId: string;
};

export type CreateFolderResponse = DefaultResponseObject<Entity>;

export type CreateFileRequest = FormData;

export type CreateFileResponse = DefaultResponseObject<Entity>;

export type GetFolderContentsRequest = {
  folderId: string;
};

export type GetFolderContentsResponse = DefaultResponseObject<Array<Entity>>;

export type GetEntityDetailsResponse = DefaultResponseObject<Entity>;

export type GetEntityDetailsRequest = {
  entityId: string;
};

export type EditEntityResponse = DefaultResponseObject<Entity>;

export type EditEntityRequest = {
  name: string;
  entityId: string;
  status: EntityStatus;
};

export type DeleteEntityResponse = DefaultResponseObject<null>;

export type DeleteEntityRequest = {
  entityId: string;
};
