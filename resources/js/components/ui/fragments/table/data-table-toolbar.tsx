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
  createComponent: React.ReactNode,
  getColums?: string
  filters: Filters
}

export function DataTableToolbar<TData>({
  table,
  filters = { search: "" },
  createComponent
}: DataTableToolbarProps<TData>) {
  const isFiltered = React.useMemo(() => {
    // Check if any filter (except search) has values
    return Object.keys(filters).some(key => {
      if (key === 'search') return false; // Ignore search for reset button
      const value = filters[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value != null && value !== '' && value !== undefined;
    });
  }, [filters]);
   
  const currentPath = window.location.pathname;
  const pathNames = currentPath.split('/').filter(path => path)[1]
  const [searchTerm, setSearchTerm] = React.useState(filters.search || '');

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table],
  );

  // Reset semua filter (frontend + backend)
  const onReset = React.useCallback(() => {
    // Reset frontend table
    table.resetColumnFilters();
    
    // Reset backend dengan hanya mengirim search term (jika ada)
    const params: Record<string, any> = {};
    if (searchTerm && searchTerm.trim()) {
      params.search = searchTerm;
    }
    
    router.get(route(`dashboard.${pathNames}.index`), params, {
      preserveState: true,
      preserveScroll: true,
      only: [pathNames, 'pagination', 'filters'],
      onSuccess: () => {
        console.log('All filters reset successfully');
      }
    });
  }, [table, pathNames, searchTerm]);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((search: string) => {
        // Ambil filter yang sudah ada dari URL
        const currentParams = new URLSearchParams(window.location.search);
        const params: Record<string, any> = {};
        
        // Preserve existing filter parameters
        currentParams.forEach((value, key) => {
          if (key !== 'search') {
            params[key] = value;
          }
        });
        
        // Add search parameter
        if (search.trim()) {
          params.search = search;
        }
        
        router.get(route(`dashboard.${pathNames}.index`), params, {
          preserveState: true,
          preserveScroll: true,
          only: [pathNames, 'pagination', 'filters']
        });
      }, 300),
    [pathNames]
  );

  // Handle filter change dari faceted filter
  const handleFilterChange = React.useCallback((columnId: string, values: string[]) => {
    // Update akan dilakukan oleh masing-masing DataTableFacetedFilter
    console.log(`Filter changed for ${columnId}:`, values);
  }, []);

  return (
    <div  
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full flex-col sm:flex-row items-start justify-between gap-2 p-1",
      )}
    >
      <div className="flex sm:order-2 justify-end items-center gap-2">
        <DataTableViewOptions table={table} />
        {createComponent}
      </div>
      
      <div className="w-full grid grid-cols-2 sm:flex sm:flex-1 sm:flex-wrap items-center gap-2">
        <Input
          placeholder="Search Name..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            debouncedSearch(value);
          }}
          className="md:max-w-[20em] col-span-2 h-8 w-full"
        />
        
        {columns.map((column) => (
          <DataTableToolbarFilter 
            key={column.id} 
            column={column}
            filters={filters}
            onFilterChange={(values) => handleFilterChange(column.id, values)}
          />
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
  filters: Filters;
  onFilterChange?: (values: string[]) => void;
}

function DataTableToolbarFilter<TData>({
  column,
  filters,
  onFilterChange,
}: DataTableToolbarFilterProps<TData>) {
  const columnMeta = column.columnDef.meta;

  const onFilterRender = React.useCallback(() => {
    if (!columnMeta?.variant) return null;

    switch (columnMeta.variant) {
      case "number":
        return (
          <div className="relative">
            <Input
              type="number"
              inputMode="numeric"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className={cn("h-8 w-[120px]", columnMeta.unit && "pr-8")}
            />
            {columnMeta.unit && (
              <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                {columnMeta.unit}
              </span>
            )}
          </div>
        );

      case "select":
      case "multiSelect":
        // Ambil current filter value dari backend
        const currentFilterValues = filters[column.id] as string[] | string | undefined;
        const normalizedCurrentValues = Array.isArray(currentFilterValues) 
          ? currentFilterValues 
          : currentFilterValues 
            ? [currentFilterValues] 
            : [];

        return (
          <DataTableFacetedFilter
            column={column}
            title={columnMeta.label ?? column.id}
            options={columnMeta.options ?? []}
            multiple={columnMeta.variant === "multiSelect"}
            currentFilters={normalizedCurrentValues}
            onFilterChange={onFilterChange}
          />
        );

      default:
        return null;
    }
  }, [column, columnMeta, filters, onFilterChange]);

  return onFilterRender();
}