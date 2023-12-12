import { Meta } from "./Authentication";

export interface ResponseEvent {
  meta?: Meta;
  data?: Event[];
}

export interface Event {
  id?: number;
  id_category?: number;
  nama_event?: string;
  lokasi?: string;
  latitude?: null;
  longitude?: null;
  tgl_event?: string;
  deskripsi?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface EventCategory {
  id?: number;
  nama_kategori?: string;
  created_at?: Date;
  updated_at?: Date;
}
