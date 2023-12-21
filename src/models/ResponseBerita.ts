import { Meta } from "./Authentication";

export interface ResponseBerita {
  meta?: Meta;
  data?: Berita[];
}

export interface Berita {
  id?: number;
  id_alat?: string;
  judul?: string;
  gambar?: string;
  deskripsi?: string;
  created_at?: string;
  updated_at?: Date;
}
