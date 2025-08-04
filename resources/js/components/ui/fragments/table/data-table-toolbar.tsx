"use client"

import { Column, Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/fragments/button"
import { Input } from "@/components/ui/fragments/input"
import { DataTableViewOptions } from "./data-table-view-options"


import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { router } from "@inertiajs/react"
import React from "react"
import { debounce } from "lodash"
import { Filters } from "@/types/index"
import { cn } from "@/lib/utils"

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>
    //  options: {
    //   label: string
    //   value: string
    //   icon?: React.ComponentType<{ className?: string }>
    // }[]
  createComponent: React.ReactNode,
  getColums?: string
     filters: Filters
}

export function DataTableToolbar<TData>({
  table,

  filters = { search: "" },
    // getColums = "name",
  createComponent
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
   
console.log(createComponent)
 const currentPath = window.location.pathname;
          const pathNames = currentPath.split('/').filter(path => path)[1]
    //  const [completionFilter, setCompletionFilter] = React.useState<string>(filters.merek as string);
const [searchTerm, setSearchTerm] = React.useState(filters.search);

 const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table],
  );

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

    const debouncedSearch = React.useMemo(
    () =>
      debounce((search: string) => {
        router.get(route(`dashboard.${pathNames}.index`), {
          search: search
        }, {
          preserveState: true,
          preserveScroll: true
        });
      }, 300),
    [pathNames] // Update dependencies
);
  return (
    <div  role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full flex-col sm:flex-row items-start justify-between gap-2 p-1",
    
      )}>
   <div className="flex sm:order-2 justify-end  items-center gap-2">
        <DataTableViewOptions table={table} />
      {createComponent}
      </div>
   <div className=" w-full grid grid-cols-2 sm:flex sm:flex-1 sm:flex-wrap items-center gap-2">
       <Input
          placeholder="Search Name..."
          value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                debouncedSearch(value);
              }}
       className="md:max-w-[20em]   col-span-2  h-8 w-full  "
        />
        {columns.map((column) => (
          <DataTableToolbarFilter 
     
          key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={onReset}
          >
            <X />
            Reset
          </Button>
        )}
      </div>
    
    </div>
  )
}


interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
//   searchTerm: string
//   setSearchTerm: (value: React.SetStateAction<string>) => void
//   debouncedSearch: 
// (search: string) => void | undefined
}

function DataTableToolbarFilter<TData>({
  column,
  // searchTerm,
  // setSearchTerm,
  // debouncedSearch,
}: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        // case "text":
        //   return (
        //     <Input
        //       value={
        //         // searchTerm,
        //         (column.getFilterValue() as string) ?? ""
        //       }
        //       onChange={(e) => {
        //         const value = e.target.value;
        //         setSearchTerm(value);
        //         debouncedSearch(value);
        //         // column.set
        //       }}
        //       placeholder={columnMeta.placeholder ?? columnMeta.label}
        //       // value={(column.getFilterValue() as string) ?? ""}
        //       // onChange={(event) => column.setFilterValue(event.target.value)}
           
        //     />
        //   );

        case "number":
          return (
            <div className="relative">
              <Input
                type="number"
                inputMode="numeric"
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn("h-8 w-[120px]  ", columnMeta.unit && "pr-8")}
              />
              {columnMeta.unit && (
                <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                  {columnMeta.unit}
                </span>
              )}
            </div>
          );

        // case "range":
        //   return (
        //     <DataTableSliderFilter
        //       column={column}
        //       title={columnMeta.label ?? column.id}
        //     />
        //   );

        // case "date":
        // case "dateRange":
        //   return (
        //     <DataTableDateFilter
        //       column={column}
        //       title={columnMeta.label ?? column.id}
        //       multiple={columnMeta.variant === "dateRange"}
        //     />
        //   );

        case "select":
        case "multiSelect":
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === "multiSelect"}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
