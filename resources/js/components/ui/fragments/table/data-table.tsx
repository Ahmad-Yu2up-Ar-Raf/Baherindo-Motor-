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
import { router as inertiaRouter, router, usePage } from '@inertiajs/react'

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
import { Filters } from "@/types/index"
import { Bike, BriefcaseBusiness, Building, CarIcon, DoorOpen, HardHat } from "lucide-react"
import { CreateTaskSheet } from "../../core/sheet/create-motor-sheet"
import { TasksTableActionBar } from "../../core/table/data-table-action-bar"
import { toast } from "sonner"
import { CreateMobilSheet } from "../../core/sheet/create-mobil-sheet"

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
  nas?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination: serverPagination,
  filters,
  nas,
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
    manualPagination: true,
    manualFiltering: true, // Important: Let backend handle filtering
    manualSorting: true,   // Important: Let backend handle sorting
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      
      // Send sorting to backend
      const sortParam = newSorting.length > 0 
        ? `${newSorting[0].id}:${newSorting[0].desc ? 'desc' : 'asc'}`
        : undefined;
      
      // Preserve current filters
      const currentParams = new URLSearchParams(window.location.search);
      const params: Record<string, any> = {};
      currentParams.forEach((value, key) => {
        if (key !== 'sort') {
          params[key] = value;
        }
      });
      
      if (sortParam) {
        params.sort = sortParam;
      }
      
      inertiaRouter.get(
        route(`dashboard.${pathNames}.index`),
        params,
        { 
          preserveState: true,
          preserveScroll: true,
          only: [pathNames, 'pagination']
        }
      )
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newPagination)
    
      // Preserve current filters when paginating
      const currentParams = new URLSearchParams(window.location.search);
      const params: Record<string, any> = {
        page: newPagination.pageIndex + 1,
        perPage: newPagination.pageSize,
      };
      
      // Add existing filters
      currentParams.forEach((value, key) => {
        if (!['page', 'perPage'].includes(key)) {
          params[key] = value;
        }
      });
      
      inertiaRouter.get(
        route(`dashboard.${pathNames}.index`),
        params,
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
  const actions = [
    "update-status",
  "update-merek",
  "update-status",

  "update-kategori",
  "delete",
  ] as const;

  type Action = (typeof actions)[number];
  const [isPending, startTransition] = React.useTransition();
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null);
  const [lastAction, setLastAction] = React.useState<Action | null>(null);
  const getIsActionPending = React.useCallback(
    (action: Action) => isPending && currentAction === action,
    [isPending, currentAction],
  );






  const rows = table.getFilteredSelectedRowModel().rows;
const ids: number[] =  rows.map((row) => row.original.id);
  const onTaskDelete = React.useCallback(() => {
    setCurrentAction("delete");
    toast.loading("deleting data...",  { id: "motor-delete" });
console.log("Selected rows:", ids);
    startTransition(async () => {
      try {



    
        router.delete(route(`dashboard.${pathNames}.destroy`, ids) , {
            data: { ids: ids } ,
             preserveScroll: true,
             preserveState: true,
             onBefore: () => {
               setCurrentAction(null);
             },
             onSuccess: () => {
               toast.success("Motor deleted successfully",  { id: "motor-delete" });
               router.reload(); 
             },
             onError: (errors: any) => {
               console.error("Delete error:", errors);
               toast.error(errors?.message || "Failed to delete the motor" , { id: "motor-delete" });
             },
             onFinish: () => {
               setCurrentAction(null);
             }
           });
      
        table.toggleAllRowsSelected(false);


      } catch (error) {
        toast.error("Failed to delete items", { id: "delete" });
        setCurrentAction(null);
        setLastAction(null);
      }
    });
  }, [rows, table]);

  // Handle empty state
  if(data.length === 0) {
    return (
      <>
        <EmptyState
          icons={[HardHat, Bike, CarIcon]}
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
      <DataTableToolbar 
        filters={filters} 
        getColums={nas} 
        createComponent={
          <SheetComponents 
            trigger={true}
            pathCurent={pathNames}
          />
        }
        table={table} 
      />
      
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
                  {data.length === 0 ? "No results found with current filters." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
    
      <DataTablePagination table={table} serverPagination={serverPagination} />
   {
      table.getFilteredSelectedRowModel().rows.length > 0 &&
     <TasksTableActionBar
      onTaskDelete={onTaskDelete}
     table={table } // Cast untuk mengatasi masalah tipe
     getIsActionPending={getIsActionPending}
     />}
    </div>
  )
}

const SheetComponents = React.memo(({ 
  pathCurent, 
  open, 
  trigger,
  onOpenChange,
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
    
  return (
    <CreateMobilSheet
    trigger={trigger} 
    open={open} 
    onOpenChange={onOpenChange}
    />
  );
});

SheetComponents.displayName = 'SheetComponents';