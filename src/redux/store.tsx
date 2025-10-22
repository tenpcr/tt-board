/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
import { ComponentType } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
const createSagaMiddleware = require("redux-saga").default;
import rootReducer from "@/redux/reducers";

import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const ProviderStore = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export type RootState = ReturnType<typeof store.getState>;
export default ProviderStore;
