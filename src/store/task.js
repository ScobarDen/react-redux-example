import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "task1", completed: false },
  { id: 2, title: "task2", completed: false },
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elementIndex] = { ...state[elementIndex], ...action.payload };
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove } = actions;

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export const titleChanged = (id) => {
  return update({ id, title: `New title for ${id}` });
};

export const taskDeleted = (id) => {
  return remove({ id });
};

export default taskReducer;
