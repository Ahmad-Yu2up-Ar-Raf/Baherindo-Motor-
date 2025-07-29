
import { KATEGORI_MOTOR, MEREK_MOTOR } from "@/config/motorcyle-type";
import * as z from "zod";



const kategori : string[] = KATEGORI_MOTOR.map(function(item) {
  return item['value'];
});



const merek : string[] =  MEREK_MOTOR.map(function(item) {
  return item['value'];
});


export const FileMetadata = z.object({
  name:  z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
  preview: z.string().optional(),
  id: z.number().optional(),
});

export const FileWithPreview = z.object({
  file:  FileMetadata,
  id: z.string().min(1, "File ID is required"),
  preview: z.string().min(1, "Preview must be a valid URL")
})




export const motorSchema = z.object({
    id: z.number().optional(),
  name: z.string().min(4, "Name is required"),
  deskripsi: z.string().min(4, "Name is required").optional(),
  plat_nomor: z.string().min(4, "Name is required"),
  warna: z.string().min(4, "Name is required").optional(),
  harga: z.coerce.number().min(200.000 , "Required"),
  dp_minimum: z.coerce.number().min(0.01, "Required").optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  masa_berlaku_pajak:  z.coerce.date().optional(),
   merek: z.enum(merek).optional(),
   kategori: z.enum(kategori).optional(),
  files: z
  .array(FileWithPreview)
  .min(1, { message: "At least one file is required" })
  .optional(),
});







export type MotorSchema = z.infer<typeof motorSchema>;