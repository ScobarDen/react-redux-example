import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recieved(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    add(state, action) {
      state.entities.unshift(action.payload);
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recieved, taskRequested, taskRequestFailed, add } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recieved(data));
  } catch (e) {
    dispatch(taskRequestFailed());
    dispatch(setError(e.message));
  }
};

export const uploadTask = (payload) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.addTask(payload);
    dispatch(add(data));
  } catch (e) {
    dispatch(taskRequestFailed());
    dispatch(setError(e.message));
  }
};

export const completeTask = (taskId) => (dispatch, getState) => {
  dispatch(update({ id: taskId, completed: true }));
};

export const titleChanged = (id) => {
  return update({ id, title: `New title for ${id}` });
};

export const taskDeleted = (id) => {
  return remove({ id });
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
