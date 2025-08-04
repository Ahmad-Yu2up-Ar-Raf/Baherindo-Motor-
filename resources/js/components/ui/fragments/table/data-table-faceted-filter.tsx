"use client";

import type { Option } from "@/types/data-table";
import type { Column } from "@tanstack/react-table";
import { Check, PlusCircle, XCircle } from "lucide-react";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
import { Separator } from "../separator";
import { cn } from "@/lib/utils";
import * as React from "react";
import { router } from "@inertiajs/react";
import { debounce } from "lodash";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
  // Props baru untuk backend filtering
  currentFilters?: string[];
  onFilterChange?: (values: string[]) => void;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  multiple = true,
  currentFilters = [],
  onFilterChange,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);
  
  // Gunakan filter dari backend sebagai source of truth
  const selectedValues = new Set(currentFilters);
  
  // Debounced function untuk mengirim request ke backend
  const debouncedFilterChange = React.useMemo(
    () => debounce((values: string[]) => {
      const currentPath = window.location.pathname;
      const pathNames = currentPath.split('/').filter(path => path)[1];
      
      // Ambil query parameters yang sudah ada
      const currentParams = new URLSearchParams(window.location.search);
      const params: Record<string, any> = {};
      
      // Preserve existing parameters
      currentParams.forEach((value, key) => {
        if (key !== column?.id) { // Jangan ambil parameter filter yang sedang diubah
          params[key] = value;
        }
      });
      
      // Set parameter filter baru
      if (values.length > 0) {
        params[column?.id || title?.toLowerCase() || 'filter'] = multiple ? values : values[0];
      }
      
      // Kirim request ke backend
      router.get(
        route(`dashboard.${pathNames}.index`),
        params,
        {
          preserveState: true,
          preserveScroll: true,
          only: [pathNames, 'pagination', 'filters']
        }
      );
      
      // Callback untuk parent component
      onFilterChange?.(values);
    }, 300),
    [column?.id, title, multiple, onFilterChange]
  );

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      let newSelectedValues: string[];
      
      if (multiple) {
        const newSet = new Set(selectedValues);
        if (isSelected) {
          newSet.delete(option.value);
        } else {
          newSet.add(option.value);
        }
        newSelectedValues = Array.from(newSet);
      } else {
        newSelectedValues = isSelected ? [] : [option.value];
        setOpen(false);
      }
      
      // Update frontend table filter (untuk UI consistency)
      if (column) {
        column.setFilterValue(newSelectedValues.length ? newSelectedValues : undefined);
      }
      
      // Trigger backend update
      debouncedFilterChange(newSelectedValues);
    },
    [selectedValues, multiple, column, debouncedFilterChange]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      
      // Reset frontend filter
      column?.setFilterValue(undefined);
      
      // Reset backend filter
      debouncedFilterChange([]);
    },
    [column, debouncedFilterChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          {selectedValues?.size > 0 ? (
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <XCircle />
            </div>
          ) : (
            <PlusCircle />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 text-primary font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden items-center gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 text-primary font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm text-primary px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="max-h-full">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onItemSelect(option, isSelected)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="size-3 text-primary-foreground" />
                    </div>
                    {option.icon && <option.icon className="text-accent-foreground"/>}
                    <span className="truncate">{option.label}</span>
                    {option.count && option.count > 0 && (
                      <span className="ml-auto font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onReset()}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}