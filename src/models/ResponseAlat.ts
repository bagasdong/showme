import { Meta } from "./Authentication";

export interface ResponseAlat {
  meta?: Meta;
  data?: Alat[];
}

export interface Alat {
  id?: string;
  api_key?: null | string;
  lokasi?: string;
  latitude?: string;
  longitude?: string;
  tegangan?: number;
  status?: null;
  created_at?: string;
  updated_at?: string;
}
