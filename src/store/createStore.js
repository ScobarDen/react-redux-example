export function createStore(initialState, reducer) {
  let state = initialState;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  };
  const subscribe = (listener) => {
    listeners.push(listener);
  };
  return { getState, dispatch, subscribe };
}
