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
    setActiveChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    addMessage: (state, action) => {
      const filtered = state.messages.map((i) => i.id);
      if (!filtered.includes(action.payload.id)) {
        state.messages.push(action.payload);
      }
    },
    addChannel: (state, action) => {
      const filtered = state.channels.map((i) => i.id);
      if (!filtered.includes(action.payload.id)) {
        state.channels.push(action.payload);
        state.currentChannel = action.payload.id;
      }
    },
    removeChannel: (state, action) => {
      const channellList = state.channels.filter((channel) => channel.id !== action.payload.id);
      if (state.currentChannel === action.payload.id) {
        state.currentChannel = 1;
      }
      const messageList = state.messages.filter((m) => m.channelId !== action.payload.id);
      state.channels = channellList;
      state.messages = messageList;
    },
    renameChannel: (state, action) => {
      const channellList = state.channels.map((channel) => {
        if (channel.id === action.payload.id) {
          channel.name = action.payload.name;
          return channel;
        }
        return channel;
      });
      state.channels = channellList;
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

export const {
  setActiveChannel, addMessage, addChannel, removeChannel, renameChannel,
} = chatsSlice.actions;

const chatsReducer = chatsSlice.reducer;
export default chatsReducer;