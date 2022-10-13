import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser(state, action) {
      const { name, email, mobile } = action.payload;
      state.push({
        id: state.length + 1,
        name,
        email,
        mobile,
      });
    },
    removeUser(state, action) {
      const { id } = action.payload;
      state.splice(id, 1);
    },
    loadUsersState(state, action) {
      const { users } = action.payload;
      state = users;
    },
  },
});

export const { addUser, removeUser, loadUsersState } = userSlice.actions;

export default userSlice.reducer;
