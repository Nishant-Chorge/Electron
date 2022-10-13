import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  },
  reducers: {
    getGroupMembersCount(state) {
      const counts = [0, 1, 2, 3, 4].map((id) => state[id].length);
      return counts;
    },

    addUser(state, action) {
      const { group, id } = action.payload;
      state[group].push(id);
    },

    emptyGroup(state, action) {
      const { group } = action.payload;
      state[group] = [];
    },

    changeRoom(state, action) {
      const { group, id, prev } = action.payload;
      state[group].push(id);
      state[prev] = state[prev].filter((item) => item !== id);
    },

    removeUser(state, action) {
      const { id } = action.payload;
      state.splice(id, 1);
    },
  },
});

// Export actions
export const {
  addUser,
  getGroupMembersCount,
  removeUser,
  changeRoom,
  emptyGroup,
} = queueSlice.actions;

// Export reducer
export default queueSlice.reducer;
