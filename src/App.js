import { useEffect, useState } from "react";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();
function App() {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  return (
    <>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
