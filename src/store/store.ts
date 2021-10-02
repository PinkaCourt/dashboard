import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import { dashboardReducer } from "store/reducer";
import fetchUser from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  dashboardReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(fetchUser);
