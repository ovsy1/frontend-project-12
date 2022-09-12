/* eslint-disable no-undef */
import chatsReducer, {
  setActiveChannel, addMessage, addChannel, removeChannel, renameChannel,
} from '../store/features/chats-slice.js';

describe('chats-slice', () => {
  it('should return default values', () => {
    const action = { undefined, payload: { name: 'alexa' } };

    const result = chatsReducer({
      channels: [],
      messages: [],
      currentChannel: null,
      status: 'idle',
      error: null,
    }, action);

    expect(result.channels).toEqual([]);
    expect(result.messages).toEqual([]);
    expect(result.currentChannel).toBeNull();
    expect(result.status).toBe('idle');
    expect(result.error).toBeNull();
  });

  it('should add new message', () => {
    const action = { type: addMessage.type, payload: 'Hello' };

    const result = chatsReducer({
      channels: [],
      messages: [],
      currentChannel: null,
      status: 'idle',
      error: null,
    }, action);

    expect(result.messages[0]).toBe('Hello');
  });

  it('should add new channel', () => {
    const action = { type: addChannel.type, payload: { name: 'new channel', id: 3, removable: true } };

    const result = chatsReducer({
      channels: [],
      messages: [],
      currentChannel: null,
      status: 'idle',
      error: null,
    }, action);

    expect(result.currentChannel).toBe(3);
    expect(result.channels[0].name).toBe('new channel');
    expect(result.channels[0].removable).toBe(true);
  });

  it('should rename channel', () => {
    const action = { type: renameChannel.type, payload: { name: 'ops rename', id: 3 } };

    const result = chatsReducer({
      channels: [{ name: 'new channel', id: 3, removable: true }],
      messages: [],
      currentChannel: null,
      status: 'idle',
      error: null,
    }, action);

    expect(result.channels[0].name).toBe('ops rename');
  });

  it('should remove channel', () => {
    const action = { type: removeChannel.type, payload: { name: 'ops rename', id: 3 } };

    const result = chatsReducer({
      channels: [{ name: 'ops rename', id: 3, removable: true }],
      messages: [],
      currentChannel: null,
      status: 'idle',
      error: null,
    }, action);

    expect(result.channels).toEqual([]);
  });

  it('should set new active channel', () => {
    const action = { type: setActiveChannel.type, payload: 200 };

    const result = chatsReducer({
      channels: [{ name: 'ops rename', id: 3, removable: true }],
      messages: [],
      currentChannel: 3,
      status: 'idle',
      error: null,
    }, action);

    expect(result.currentChannel).toBe(200);
  });
});
