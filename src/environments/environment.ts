// Development environment.
// The API base URL is the only thing that changes between environments, so the
// services read it from here instead of hard-coding host and port in every call.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:9096',
};
