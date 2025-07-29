
import { kelasSchema } from "../validations";

export type siswaSchemaType = {
    id:number,
  name: string
  created_at: string
  updated_at: string
  kelas_id: number,
   kelas : kelasSchema
};

export type kelasSchema =  {
    id:number,
  name: string
  created_at: string
  updated_at: string
}




