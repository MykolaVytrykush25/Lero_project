import { createAsyncThunk } from "@reduxjs/toolkit";

//API
import { editProfile, getUser } from "@/API/userService";

//types
import { TEditProfileData } from "@/@types/user";

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const data = await getUser();
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const editUser = createAsyncThunk(
  "user/editUser",
  async (body: TEditProfileData, { rejectWithValue }) => {
    try {
      await editProfile(body);
      return body;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
