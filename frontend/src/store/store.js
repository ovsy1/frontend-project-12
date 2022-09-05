import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chat-slice';

const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
