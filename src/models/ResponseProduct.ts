import { Meta } from "./Authentication";

export interface ResponseProduct {
  meta?: Meta;
  data?: Product[];
}

export interface Product {
  id?: number;
  judul?: string;
  deskripsi?: string;
  gambar?: null;
  harga?: string;
  created_at?: Date;
  updated_at?: Date;
}
