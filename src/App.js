import { useEffect, useState } from "react";
import configureStore from "./store/store";
import {
  completeTask,
  getTasks,
  taskDeleted,
  titleChanged,
} from "./store/task";

const store = configureStore();
function App() {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
    store.dispatch(getTasks());
  }, []);

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>
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
