import { FileWithPreview } from "@/hooks/use-file-upload";




export type motorSchemaType = {
    id: number,
  name: string,
  deskripsi: string,
  plat_nomor: string,
  warna:string,
  harga:string,
  dp_minimum:string,
  created_at: string,
  updated_at: string,
  masa_berlaku_pajak: string,
   merek:string,
   kategori: string,
  files: FileWithPreview[],
}


