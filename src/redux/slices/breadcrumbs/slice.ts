import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types
import { IBreadcrumbsInitialState } from "./types";

const initialState: IBreadcrumbsInitialState = {
  type: "",
  name: "",
};

const breadcrumbsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeBreadcrumbs(state, action: PayloadAction<IBreadcrumbsInitialState>) {
      const { type, name } = action.payload;

      state.type = type;
      state.name = name;
    },
  },
});

export const { changeBreadcrumbs } = breadcrumbsSlice.actions;

export default breadcrumbsSlice.reducer;
