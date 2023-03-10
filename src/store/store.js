import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import taskReducer from "./task";
import { logger } from "./middleware/logger";
import { thunk } from "./middleware/thunk";

const middlewareEnhancer = applyMiddleware(logger, thunk);

function configureStore() {
  return createStore(
    taskReducer,
    compose(
      middlewareEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default configureStore;
