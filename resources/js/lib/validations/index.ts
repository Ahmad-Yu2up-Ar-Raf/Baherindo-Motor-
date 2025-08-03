import { KATEGORI_MOTOR, MEREK_MOTOR } from "@/config/motorcyle-type";
import * as z from "zod";

export const KategoriType : string[] = KATEGORI_MOTOR.map(function(item) {
  return item['value'];
});

export const MerekType : string[] =  MEREK_MOTOR.map(function(item) {
  return item['value'];
});

export const FileMetadata = z.object({
  name:  z.coerce.string().min(1, "File name is required"),
  size: z.coerce.number().min(1, "File size is required"),
  type: z.coerce.string().min(1, "File type is required"),
});

export const FileWithPreview = z.object({
  file: FileMetadata,
  id: z.coerce.string().min(1, "File ID is required"),
  preview: z.coerce.string().optional(),
  base64Data: z.coerce.string().min(1, "File data is required") // Tambahkan base64Data sebagai required
})

export const motorSchema = z.object({
    id: z.number().optional(),
  name: z.string().min(4, "Name is required"),
  deskripsi: z.string().optional(),
  plat_nomor: z.string().min(4, "Plat nomor is required"),
  warna: z.string().optional(),
  harga: z.coerce.number().min(0.001, "Harga is required"),
  dp_minimum: z.coerce.number().min(0.001, "DP minimum is required").optional(),
  odometer: z.coerce.number(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  masa_berlaku_pajak:  z.coerce.date().optional(),
 tahun:  z.string(),
   merek: z.enum(MerekType).optional(),
   kategori: z.enum(KategoriType).optional(),
  files: z
  .array(FileWithPreview)
  .min(1, { message: "At least one file is required" }),
});

export type MotorSchema = z.infer<typeof motorSchema>;