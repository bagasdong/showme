import { Meta } from "./Authentication";
import { Voice } from "./ResponseVoices";

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
  latitude?: string;
  longitude?: string;
  voices?: Voice[];
  created_at?: string;
  updated_at?: Date;
}
