function taskReducer(state, action) {
  switch (action.type) {
    case "task/completed": {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].completed = true;
      state = newArray;
      console.log(state);
      return state;
    }
    default:
      break;
  }
}

function createStore(initialState, reducer) {
  let state = initialState;
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
  };
  return { getState, dispatch };
}

function App() {
  const store = createStore(
    [
      { id: 1, description: "task1", completed: false },
      { id: 2, description: "task2", completed: false },
    ],
    taskReducer
  );

  return (
    <>
      <div>{JSON.stringify(store.getState())}</div>
      <button
        onClick={() =>
          store.dispatch({ type: "task/completed", payload: { id: 1 } })
        }
      >
        Изменить
      </button>
    </>
  );
}

export default App;
