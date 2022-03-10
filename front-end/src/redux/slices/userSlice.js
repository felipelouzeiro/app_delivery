import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      const users = state.users
        .filter((user) => user.id !== action.payload);
      state.users = [...users];
    },
  },
});

export const { saveUsers, addUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
