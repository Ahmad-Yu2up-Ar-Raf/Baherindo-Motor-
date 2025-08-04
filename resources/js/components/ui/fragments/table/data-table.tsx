"use client"
import { EmptyState } from "../empty-state"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableMeta,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { router as inertiaRouter, usePage } from '@inertiajs/react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/fragments/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { Filters, Filters as filters } from "@/types/index"
import { Bike, BriefcaseBusiness, Building, DoorOpen, HardHat } from "lucide-react"
import { CreateTaskSheet } from "../../core/sheet/create-motor-sheet"


// import { KelasSchema } from "@/lib/validations"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  filters: Filters;
  // option?: any
  // kelas?: KelasSchema[]
    nas?: string
    

}

export function DataTable<TData, TValue>({
  columns,
  // option,
  data,
  pagination: serverPagination,
  filters,
nas,


// kelas
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: serverPagination.currentPage - 1, 
    pageSize: serverPagination.perPage,
  })
  const currentPath = usePage().url;
  const pathNames = currentPath.split('/').filter(path => path)[1]
  const table = useReactTable({
    data,
    columns,
    pageCount: serverPagination.lastPage,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
  //  meta: {
  //     kelas: kelas
  //   } as TableMeta,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newPagination)
    
      inertiaRouter.get(
        route(`dashboard.${pathNames}.index`),
        { 
          page: newPagination.pageIndex + 1,
          perPage: newPagination.pageSize,
          search: filters?.search,
          merek: filters?.merek,
          kategori: filters?.kategori,
        },
        { 
          preserveState: true,
          preserveScroll: true,
          only: [pathNames, 'pagination']
        }
      )
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })


  const [open, setOpen] = React.useState(false);



 if(data.length == 0){

   return (
    <>
    <EmptyState
    icons={[HardHat, Bike, BriefcaseBusiness]}
    title={`No ${pathNames} data yet`}
    description={`Start by adding your first ${pathNames}`}
    action={{
      label: `Add ${pathNames}`,
      onClick: () => {
        setOpen(!open)
      }
    }}
  />
  <SheetComponents 
   trigger={false}
    pathCurent={pathNames}
 
    open={open}
    onOpenChange={() => {
      setOpen(!open)
    }}
  />
    </>
   )
 }

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar filters={filters as filters} getColums={nas} createComponent={  <SheetComponents 
   trigger={true}
    pathCurent={pathNames}
 

  />}
   
       table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} serverPagination={serverPagination} />
    </div>
  )
}


const SheetComponents = React.memo(({ 
  pathCurent, 
 
  open, 
  trigger,
  onOpenChange ,

}: {
  pathCurent: string;
  trigger: boolean
  open?: boolean;
  
  onOpenChange?: (open: boolean) => void;
}) => {
  if (pathCurent === "motor") {
    return (
      <CreateTaskSheet
        trigger={trigger} 
        open={open} 
         
        onOpenChange={onOpenChange}
      />
    );
  }
  
 
});

SheetComponents.displayName = 'SheetComponents';