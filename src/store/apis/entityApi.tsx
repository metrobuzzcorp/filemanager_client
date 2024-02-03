import { config } from "@/config";
import {
  CreateFileRequest,
  CreateFileResponse,
  CreateFolderRequest,
  CreateFolderResponse,
  DeleteEntityRequest,
  DeleteEntityResponse,
  EditEntityRequest,
  EditEntityResponse,
  GetEntityDetailsRequest,
  GetEntityDetailsResponse,
  GetFolderContentsRequest,
  GetFolderContentsResponse,
  GetRootFolderDetailsRequest,
  GetRootFolderDetailsResponse,
} from "@/types";
import { endpointBuilder } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const entityApi = createApi({
  reducerPath: "entityApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: (builder) => ({
    getRootFolderDetails: builder.query<
      GetRootFolderDetailsResponse,
      GetRootFolderDetailsRequest
    >({
      query: (rootFolderQueryData) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.getRootFolderDetails(rootFolderQueryData.ownerId)
            .path,
        ]),
        method: config.routes.entity.getRootFolderDetails(
          rootFolderQueryData.ownerId
        ).method,
      }),
    }),
    createFolder: builder.mutation<CreateFolderResponse, CreateFolderRequest>({
      query: (createFolderFormData) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.createFolder().path,
        ]),
        method: config.routes.entity.createFolder().method,
        body: createFolderFormData,
      }),
    }),
    createFile: builder.mutation<CreateFileResponse, CreateFileRequest>({
      query: (createFileFormData) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.createFile().path,
        ]),
        method: config.routes.entity.createFile().method,
        body: createFileFormData,
        headers: {
          "Content-type": "multipart/form-data",
        },
      }),
    }),
    getFolderContents: builder.query<
      GetFolderContentsResponse,
      GetFolderContentsRequest
    >({
      query: (getFolderContents) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.getFolderContents(getFolderContents.folderId)
            .path,
        ]),
        method: config.routes.entity.getFolderContents(
          getFolderContents.folderId
        ).method,
      }),
    }),
    getEntityDetails: builder.query<
      GetEntityDetailsResponse,
      GetEntityDetailsRequest
    >({
      query: (entityData) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.getEntityDetails(entityData.entityId).path,
        ]),
        method: config.routes.entity.getEntityDetails(entityData.entityId)
          .method,
      }),
    }),
    editEntity: builder.mutation<EditEntityResponse, EditEntityRequest>({
      query: (editEntityData) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.editEntity().path,
        ]),
        method: config.routes.entity.editEntity().method,
        body: editEntityData,
      }),
    }),
    deleteEntity: builder.query<DeleteEntityResponse, DeleteEntityRequest>({
      query: (deleteEntityData) => ({
        url: endpointBuilder([
          config.routes.entity.prefix().path,
          config.routes.entity.deleteEntity(deleteEntityData.entityId).path,
        ]),
        method: config.routes.entity.deleteEntity(deleteEntityData.entityId)
          .method,
      }),
    }),
  }),
});

export const {
  useCreateFileMutation,
  useCreateFolderMutation,
  useEditEntityMutation,
  useLazyDeleteEntityQuery,
  useLazyGetEntityDetailsQuery,
  useLazyGetFolderContentsQuery,
  useLazyGetRootFolderDetailsQuery,
  reducerPath: entityApiReducerPath,
  middleware: entityApiMiddleware,
  reducer: entityApiReducer,
} = entityApi;
