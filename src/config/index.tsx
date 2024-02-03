import { routeCreator } from "@/utils";

export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  routes: {
    user: {
      prefix: () => routeCreator("user/"),
      register: () => routeCreator("register", "post"),
      login: () => routeCreator("login", "post"),
    },
    entity: {
      prefix: () => routeCreator("entity/"),
      getRootFolderDetails: (ownerId: string) =>
        routeCreator(`root/${ownerId}`),
      createFolder: () => routeCreator("folder/create"),
      getFolderContents: (folderId: string) =>
        routeCreator(`folder/all/${folderId}`),
      getEntityDetails: (entityId: string) => routeCreator(`${entityId}`),
      editEntity: () => routeCreator("edit", "put"),
      createFile: () => routeCreator("file/create"),
      deleteEntity: (entityId: string) =>
        routeCreator(`delete/${entityId}`, "delete"),
    },
  },
};
