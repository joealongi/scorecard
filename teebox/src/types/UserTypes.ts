export interface User {
  oid?: string;
  idtyp?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  unique_name?: string;
  userId?: string;
}

export interface UserState {
  access_token?: string;
  expires_in?: number;
  ext_expires_in?: number;
  id_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}
