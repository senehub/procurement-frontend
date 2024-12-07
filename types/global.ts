// export type QueryKey = (string | number | Record<string, string | number>)[];

export type UserStoreSession = CustomJwtSessionClaims;

type ServerActionError = {
  error: true;
  message: string;
};
type ServerActionSuccess<T> = {
  data: T;
  error?: false;
  message?: string;
};

export type ServerActionResponse<T> =
  | ServerActionError
  | ServerActionSuccess<T>;
