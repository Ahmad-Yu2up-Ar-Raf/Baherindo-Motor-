import { CreateTaskSheet } from "@/components/ui/core/sheet/create-siswa-sheet";
import { DataTable } from "@/components/ui/fragments/table/data-table";
import { columns } from "@/components/ui/fragments/table/siswa-columns";
import { Filters } from "@/lib/schema";
import { siswaSchemaType } from "@/lib/schema/siswa";
import { KelasSchema, SiswaSchema } from "@/lib/validations/siswa";



interface PaginatedData {
    data: siswaSchemaType[];
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}


type PageProps = {
    pagination: PaginatedData;
    siswa: siswaSchemaType[]
    kelas: KelasSchema[]
    filters: Filters ,
      flash?: {
        success?: string;
        error?: string;
      };
}

export default function Pages({ siswa, kelas, pagination, filters,  }: PageProps) {


    console.log(siswa)
    return (
        < >

 <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                
          
                        <div className="flex flex-col px-5 gap-4 py-4 md:gap-6 md:py-6">


                        <header className="flex flex-col gap-0.5">
    <h2 className="text-3xl font-bold tracking-tight font-sans">Siswa Management</h2>
    <p className="text-muted-foreground">Here is your Siswa list. Manage your Siswas here.</p>
  </header>

            <DataTable 
                            nas="Siswa"
                            createComponent={<CreateTaskSheet elections={kelas} />}
                            data={siswa}
                            columns={columns}
                            pagination={pagination}
                            filters={filters}  
            />

                </div>
                </div>
                </div>
        </>
    );
}
