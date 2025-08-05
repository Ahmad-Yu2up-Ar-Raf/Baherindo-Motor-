
import { DataTable } from "@/components/ui/fragments/table/data-table";
import { columns } from "@/components/ui/fragments/table/motor-columns";
import { Filters } from "@/types/index";
import { MotorSchema } from "@/lib/validations";
import { columnsMobils } from "@/components/ui/fragments/table/mobil-column";

interface PaginatedData {
    data: MotorSchema[];
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
 
    mobil:MotorSchema[]
    filters: Filters,
      flash?: {
        success?: string;
        error?: string;
      };
}

export default function Pages({  mobil, pagination, filters} : PageProps) {
    return (
        <>

<div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                
          
                        <div className="flex flex-col  gap-4 md:gap-6 ">


                        <header className="flex flex-col gap-0.5">
    <h2 className="text-3xl font-bold tracking-tight font-sans">Mobil Management</h2>
    <p className="text-muted-foreground">Here is your Mobil list. Manage your Mobil here.</p>
  </header>

            <DataTable 
                            nas="Mobil"
                        
                            data={mobil}
                            columns={columnsMobils}
                            pagination={pagination}
                            filters={filters}  
            />

                </div>
                </div>
                </div>
        </>
    );
}
