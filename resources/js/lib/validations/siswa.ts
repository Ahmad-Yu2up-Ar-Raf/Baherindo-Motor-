import * as z from "zod";

export const siswaSchema = z.object({
    id: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    name: z.string().min(4, "Name is required"),
  kelas_id: z.number().optional(),
   
});

export const kelasSchema = z.object({
    id: z.number().optional(),
  name: z.string().min(4, "Name is required"),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});






export type SiswaSchema = z.infer<typeof siswaSchema>;
export type KelasSchema = z.infer<typeof kelasSchema>;