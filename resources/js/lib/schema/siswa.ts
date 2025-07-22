
import { kelasSchema } from "../validations/siswa";

export type siswaSchemaType = {
    id:number,
  name: string
  created_at: string
  updated_at: string
   kelas : kelasSchema
};

export type kelasSchema =  {
    id:number,
  name: string
  created_at: string
  updated_at: string
}




