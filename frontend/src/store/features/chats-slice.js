import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../../routes.js';

export const loadChats = createAsyncThunk('@@chats/load-chats', (configAuthorization) => {
  const { mainPagePath } = routes;
  return axios.get(mainPagePath(), configAuthorization);
});

const initialState = {
  channels: [],
  messages: [],
  currentChannel: null,
  status: 'idle',
  error: null,
};

const chatsSlice = createSlice({
  name: '@@chats',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => ({
      ...state,
      currentChannel: action.payload,
    }),
    addMessage: (state, action) => {
      const filtered = state.messages.map((i) => i.id);
      if (!filtered.includes(action.payload.id)) {
        state.messages.push(action.payload);
      }
    },
  },
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
        state.currentChannel = currentChannelId;
        state.error = null;
      })
      .addCase(loadChats.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { setActiveChannel, addMessage } = chatsSlice.actions;
const chatsReducer = chatsSlice.reducer;
export default chatsReducer;
