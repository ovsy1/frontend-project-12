import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const loadChats = createAsyncThunk('@@chats/load-chats', (configAuthorization) => {
  const { mainPage } = routes;
  return axios.get(mainPage(), configAuthorization);
});

const chatsSlice = createSlice({
  name: '@@chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadChats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadChats.fulfilled, (state, action) => {
        const { channels, messages, currentChannelId } = action.payload.data;
        state.status = 'received';
        state.channels = channels;
        state.messages = messages;
        state.currentChanel = currentChannelId;
        state.error = null;
      })
      .addCase(loadChats.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

const chatsReducer = chatsSlice.reducer;
export default chatsReducer;
