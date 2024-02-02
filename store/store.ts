import { configureStore } from "@reduxjs/toolkit";
import clientstates from "./clientstates";
import submissionsSlice from "./submissions";
import statelistSlice from "./statelist";

export const store = configureStore({
  reducer: {
    clientState: clientstates,
    submission: submissionsSlice,
    stateList: statelistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
