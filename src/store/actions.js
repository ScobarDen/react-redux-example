import * as actions from "./actionTypes";

export function taskCompleted(id) {
  return {
    type: actions.taskUpdated,
    payload: { id, completed: true },
  };
}

export const titleChanged = (id) => {
  return {
    type: actions.taskUpdated,
    payload: { id, title: `New title for ${id}` },
  };
};
