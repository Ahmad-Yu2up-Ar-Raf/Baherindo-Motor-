import * as React from "react"
import { Column } from "@tanstack/react-table"
import { Check, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/fragments/badge"
import { Button } from "@/components/ui/fragments/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/fragments/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/fragments/popover"
import { Separator } from "@/components/ui/fragments/separator"
import { router } from "@inertiajs/react"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  filters: {
    search: string;
    filter: string;
  };
  searchTerm: string
  setCompletionFilter: (value: string) => void
  statusCounts?: Record<string, number> // Counts dari server
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  filters,
  setCompletionFilter,
  searchTerm,
  statusCounts = {}
}: DataTableFacetedFilterProps<TData, TValue>) {
  const currentPath = window.location.pathname;
  const pathNames = currentPath.split('/' ).filter(path => path)[1]
  
 
  const selectedFilter = filters.filter;
  const hasActiveFilter = selectedFilter && selectedFilter !== 'all';

  const handleFilterChange = (value: string) => {
 
    const newFilter = selectedFilter === value ? 'all' : value;
    
    setCompletionFilter(newFilter);
    router.get(route(`dashboard.${pathNames}.index`), {
      search: searchTerm,
      filter: newFilter === 'all' ? '' : newFilter, 
      preserveScroll: true,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const clearAllFilters = () => {
    setCompletionFilter('all');
    router.get(route(`dashboard.${pathNames}.index`), {
      search: searchTerm,
      filter: '', // Clear filter
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          {title}
          {hasActiveFilter && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {options.find(opt => opt.value === selectedFilter)?.label || selectedFilter}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Filter ${title?.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {/* Option untuk "All" */}
              <CommandItem
                onSelect={() => clearAllFilters()}
                className={cn(
                  selectedFilter === 'all' || !selectedFilter ? "bg-accent" : ""
                )}
              >
                <div
                  className={cn(
                    "flex size-4 items-center justify-center rounded-[4px] border mr-2",
                    (!selectedFilter || selectedFilter === 'all')
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-input [&_svg]:invisible"
                  )}
                >
                  <Check className="text-primary-foreground size-3.5" />
                </div>
                <span>All</span>
              </CommandItem>
              
              {/* Options berdasarkan data dari server */}
              {options.map((option) => {
                const isSelected = selectedFilter === option.value
                const count = statusCounts[option.value] || 0
                
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleFilterChange(option.value)}
                    className={cn(
                      isSelected ? "bg-accent" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border mr-2",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible"
                      )}
                    >
                      <Check className="text-primary-foreground size-3.5" />
                    </div>
                    {option.icon && (
                      <option.icon className="text-muted-foreground size-4 mr-2" />
                    )}
                    <span className="flex-1">{option.label}</span>
                    {/* Show count from server */}
                    {count > 0 && (
                      <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {count}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            
            {/* Clear filter option */}
            {hasActiveFilter && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearAllFilters}
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
  )
}