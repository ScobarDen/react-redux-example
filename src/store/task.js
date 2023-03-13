import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "task1", completed: false },
  { id: 2, title: "task2", completed: false },
];

const update = createAction("task/updated");
const remove = createAction("task/removed");

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export const titleChanged = (id) => {
  return update({ id, title: `New title for ${id}` });
};

export const taskDeleted = (id) => {
  return remove({ id });
};

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elementIndex] = { ...state[elementIndex], ...action.payload };
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id);
    });
});

export default taskReducer;