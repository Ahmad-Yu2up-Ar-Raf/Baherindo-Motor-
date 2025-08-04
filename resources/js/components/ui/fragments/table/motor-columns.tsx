"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Checkbox } from "@/components/ui/fragments/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { cn } from "@/lib/utils"

import { KategoriType, MerekType, MotorSchema, StatusType } from "@/lib/validations"
import { formatDate } from "date-fns"
import { Bike, CalendarIcon, Settings } from "lucide-react"
import { Badge } from "../badge"
import { getKategoriIcon, getMerekIcon, getStatusIcon } from "@/utils/motorcyle-utils"
import { formatIDR } from "@/hooks/use-money-format"
import { DataTableRowActions } from "../../core/table/data-table-row-action-motor"
import {  useKilometer } from "@/hooks/useKilometer"


// import { DataTableRowActions } from "./data-table-row-actions"



  
export const columns: ColumnDef<MotorSchema>[] = [
 {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center  w-14 justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center  w-14 justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return(
      <div className="flex gap-2">
        <span className=" truncate font-medium">
          {row.original.name}
        </span>
      </div>
    )},
        meta: {
        label: "Name",
        placeholder: "Search name...",
        variant: "text",

      },
      enableColumnFilter: true,
  },
  {
    accessorKey: "harga",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Harga" />
    ),
    cell: ({ row }) => {
   
      return(
             <div className=" 40 ">

       <Badge variant="outline" className="py-1 [&>svg]:size-3.5 font-mono">
        
          
            <span className="capitalize   font-mono">{formatIDR(row.original.harga)}</span>
     
          </Badge>
          </div>
    )
  }
  },
      {
      id: "tahun",
      accessorKey: "tahun",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="tahun" />
      ),
      cell: ({ row }) => <div  className={cn(" ", !row.getValue("tahun") ? 'text-muted-foreground ' : 'font-mono!' )}>{row.getValue("tahun") ? row.getValue("tahun") : 'N/A'}</div>,
          meta: {
        label: "tahun",
     
        variant: "text",
        // icon: Text,
      },
  enableSorting: false,
  enableHiding: true,
  enableColumnFilter: false,
    },
      {
      id: "odometer",
      accessorKey: "odometer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="odometer" />
      ),
      cell: ({ row }) => {
        const odometer = row.original.odometer;
      if (!odometer) {
          return (
            <div className="text-muted-foreground 32">
          N/A
            </div>
          );
        }
const { formatted, isValid } = useKilometer(odometer);
        return( <div  className={cn(" font-mono" )}>{formatted}</div>)
      },
          meta: {
        label: "odometer",
     
        variant: "text",
        // icon: Text,
      },
  enableSorting: false,
  enableHiding: true,
  enableColumnFilter: false,
    },
   {
      id: "dp_minimum",
      accessorKey: "dp_minimum",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DP Minimum" />
      ),
      cell: ({ row }) =>{
   const dp_minimum = row.original.dp_minimum;
        
        if (!dp_minimum) {
          return (
            <div className="text-muted-foreground 32">
          N/A
            </div>
          );
        }

        return (
          <div className=" 40 ">

       <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
      
          
            <span className="capitalize   font-mono">{formatIDR(row.original.dp_minimum)}</span>
     
          </Badge>
          </div>
        )
       } ,
          meta: {
        label: "dp_minimum",
     
        variant: "number",
        // icon: Text,
      },
        enableColumnFilter: false,
      enableSorting: false,
      enableHiding: true,
    },
  {
    accessorKey: "plat_nomor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plat Nomor" />
    ),
    cell: ({ row }) => (
        <div className={cn(" font-mono!  " )}>{row.original.plat_nomor}</div>
    ),
       meta: {
        label: "plat nomor",
     
        variant: "text",
        icon: Settings,
      },
        enableColumnFilter: false,
      // enableSorting: false,
      // enableHiding: true,
  },
  {

    id: "kategori",
    accessorKey: "kategori",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="kategori" />
    ),
    cell: ({ row }) => {
      const kategori = row.original.kategori;
      // const KategoriValue = typeof KATEGORI_MOTOR[number]['value'];
      if (!kategori) {
        return (
          <div className="text-muted-foreground 32">
        N/A
          </div>
        );
      }
       const Icon =  getKategoriIcon(kategori);
      return (
     <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
          <Icon/>
         
       
             <span className="capitalize underline-offset-4 ">{kategori}</span>
          
        </Badge>
      );
    },
    
         meta: {
      label: "kategori",
   
       variant: "multiSelect",
      options: KategoriType.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
        // count: statusCounts[status],
        icon: getKategoriIcon(status),
      })),

      icon: Settings,
    },
    // enableSorting: false,
    // enableHiding: true,
  },
   {

      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        // const KategoriValue = typeof KATEGORI_MOTOR[number]['value'];
        if (!status) {
          return (
            <div className="text-muted-foreground 32">
          N/A
            </div>
          );
        }
         const Icon =  getStatusIcon(status);
        return (
       <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
            <Icon/>
           
         
               <span className="capitalize underline-offset-4 ">{status}</span>
            
          </Badge>
        );
      },
      
           meta: {
        label: "status",
     
         variant: "multiSelect",
        options: StatusType.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          // count: statusCounts[status],
          icon: getStatusIcon(status),
        })),

        icon: Settings,
      },
      // enableSorting: false,
      // enableHiding: true,
    },
         {
      id: "merek",
      accessorKey: "merek",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Merek" />
      ),
      cell: ({ row }) => {
        const merek = row.original.merek;
              const Icon =  getMerekIcon(merek as string);
        if (!merek) {
          return (
            <div className="text-muted-foreground 36">
            N\A
            </div>
          );
        }
        
        return (
          <div className=" 40 ">

       <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
                <Icon/>
          
            <span className="capitalize  ">{merek}</span>
     
          </Badge>
          </div>
        );
      },
      meta: {
        label: "merek",
        variant: "multiSelect",
        icon: Bike,
          options:  MerekType.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          // count: statusCounts[status],
          icon: getMerekIcon(status),
        })),
      },
      // enableSorting: true,
      // enableHiding: true,
    },
 
   {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => formatDate(row.original.created_at as string | number | Date, "dd/MM/yyyy"),
      meta: {
        label: "Created At",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]