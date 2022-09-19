const api = '/api/v1';

export default {
  channelsPath: () => [api, 'channels'].join('/'),
  channelPath: (id) => [api, 'channels', id].join('/'),
  channelMessagesPath: (id) => [api, 'channels', id, 'messages'].join('/'),
  loginPath: () => [api, 'login'].join('/'),
  signupPagePath: () => [api, 'signup'].join('/'),
  mainPagePath: () => [api, 'data'].join('/'),
};
