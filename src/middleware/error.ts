
export class AuthenticationError extends Error {
    name = 'AuthenticationError';
  
    constructor(
      message: string,
      public readonly error?: unknown
    ) {
      super(message);
    }
  }
  
  export class ServerError extends Error {
    name = 'ServerError';
  }