import { Meta } from "./Authentication";

export interface ResponseProduct {
  meta?: Meta;
  data?: Product[];
}

export interface Product {
  id?: number;
  judul?: string;
  deskripsi?: string;
  harga?: string;
  created_at?: Date;
  updated_at?: Date;
  images?: Image[];
}

export interface Image {
  id?: number;
  name?: string;
  filename?: string;
}
