import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types
import { Status } from "@/@types/base";
import { IUserSliceInitialState, TUser } from "./types";
import { TEditProfileData } from "@/@types/user";

//asyncActions
import { editUser, fetchUser } from "./asyncActions";
import { UserRoles } from "@/@types/enums";

const initialState: IUserSliceInitialState = {
  userData: null,
  isAuthenticated: false,
  userFetched: false,
  status: Status.LOADING,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeBalance(state, action: PayloadAction<number>) {
      if (state.userData) {
        state.userData.balance = action.payload;
      }
    },
    changeRole(state, action: PayloadAction<UserRoles>) {
      if (state.userData) {
        state.userData.role = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.userFetched = true;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<TEditProfileData>) => {
        if (state.userData) {
          state.userData = {
            ...state.userData,
            ...action.payload,
          };
        }
      });
  },
});

export const { changeBalance, changeRole } = userSlice.actions;

export default userSlice.reducer;
