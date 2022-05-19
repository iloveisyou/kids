import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer, rootEpic } from "./reducers";
import observableToPromise from "./middleware";

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();

  const enhancer = compose(
    composeWithDevTools(applyMiddleware(epicMiddleware, observableToPromise))
  );
  const store = createStore(reducer, enhancer);
  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
