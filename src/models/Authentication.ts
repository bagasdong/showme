export interface Authentication {
  meta?: Meta;
  data?: Data;
}

export interface ErrorData {
  meta?: Meta;
}

export interface Data {
  user?: User;
  access_token?: AccessToken;
}

export interface AccessToken {
  token?: string;
  type?: string;
}

export interface User {
  id?: number;
  id_paket?: number;
  paket_expired_at?: null;
  firstname?: string;
  lastname?: string;
  telepon?: string;
  alamat?: string;
  email?: string;
  email_verified_at?: Date;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Meta {
  code?: number;
  status?: string;
  message?: string;
}
