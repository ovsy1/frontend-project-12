const api = '/api/v1';

export default {
  loginPath: () => [api, 'login'].join('/'),
  signupPagePath: () => [api, 'signup'].join('/'),
  mainPagePath: () => [api, 'data'].join('/'),
};
