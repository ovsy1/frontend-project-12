import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './features/chats-slice.js';
import modalReducer from './features/modal-slice.js';

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    modal: modalReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
