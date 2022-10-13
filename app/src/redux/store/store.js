import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
// import undoable from "easy-redux-undo";
import userSlice from "Redux/components/user.js";
import queueSlice from "Redux/components/queue.js";

const { routerMiddleware, createReduxHistory, routerReducer } =
  createReduxHistoryContext({
    history: createHashHistory(),
  });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    user: userSlice,
    queue: queueSlice,
  }),
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    routerMiddleware,
  ],
});

export const history = createReduxHistory(store);
