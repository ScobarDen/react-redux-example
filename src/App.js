import { useEffect, useState } from "react";
import {
  completeTask,
  getTasksLoadingStatus,
  getTasks,
  loadTasks,
  taskDeleted,
  titleChanged,
  uploadTask,
} from "./store/task";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

function App() {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <button
        onClick={() =>
          dispatch(
            uploadTask({
              userId: 1,
              id: Date.now(),
              title: "Новая задача",
              completed: false,
            })
          )
        }
      >
        Add task
      </button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete Task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
