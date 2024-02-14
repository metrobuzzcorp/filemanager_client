import { Controller, EntitySlice } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: EntitySlice = {
  listType: "card",
};

export const entitySlice = createSlice({
  name: "entityReducer",
  initialState,
  reducers: {
    updateListType: (state, action: PayloadAction<Controller>) => ({
      ...state,
      listType: action.payload,
    }),
    clearListType: (state) => ({
      ...state,
      listType: initialState.listType,
    }),
  },
});

export const { updateListType, clearListType } = entitySlice.actions;

export const entityReducer = entitySlice.reducer;
