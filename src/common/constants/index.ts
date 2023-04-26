export const MESSAGES = {
  RECORD_NOT_FOUND: (record: string, recordId: string) => {
    return `${record} with id ${recordId} not found`;
  },
  LOGGED_OUT: 'Successfully logged out',
};

export const SALT_ROUNDS = 10;

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  HTTP_SERVER_ERROR: 500,
};
