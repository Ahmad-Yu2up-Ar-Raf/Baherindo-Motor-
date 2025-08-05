"use client";

// import { type Employes, employes } from "@/db/schema";
// import { SelectTrigger } from "@radix-ui/react-select";
import type { Table } from "@tanstack/react-table";
// import { ArrowUp, CheckCircle2, Download, HardHat, Trash2, VenusAndMars } from "lucide-react";
// import * as React from "react";


import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "@/components/ui/fragments/table/data-table-action-bar";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
// } from "@/components/ui/fragments/select";
import { Separator } from "@/components/ui/fragments/separator";
import { Trash } from "lucide-react";
// import { EmployeeWithRelations } from "@/types";


const actions = [
  "update-status",
  "update-merek",
  "update-status",

  "update-kategori",
  "delete",
] as const;

type Action = (typeof actions)[number];



interface TasksTableActionBarProps<TData> {
  table: Table<TData> ;
  getIsActionPending: (action: Action) => boolean
  onTaskDelete: () => void;
//   onTaskExport: () => void;
//    onTaskUpdate: ({ field, value, }: {
//     field: "status" | "role" | "gender";
//     value: string;
// }) => void
}

export function TasksTableActionBar<TData>({ table, onTaskDelete , getIsActionPending}: TasksTableActionBarProps<TData>) {
  const rows = table.getFilteredSelectedRowModel().rows;



   
  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5 text-accent-foreground">
        {/* <Select
          onValueChange={(value: string) =>
            onTaskUpdate({ field: "status", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update status"
              isPending={getIsActionPending("update-status")}
            >
              <CheckCircle2 className=" " />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {employes.status.enumValues.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) =>
            onTaskUpdate({ field: "role", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update Role"
              isPending={getIsActionPending("update-role")}
            >
              <HardHat />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {employes.role.enumValues.map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className="capitalize"
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) =>
            onTaskUpdate({ field: "gender", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update Gender"
              isPending={getIsActionPending("update-gender")}
            >
              <VenusAndMars />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {employes.gender.enumValues.map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className="capitalize"
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DataTableActionBarAction
          size="icon"
          tooltip="Export tasks"
          isPending={getIsActionPending("export")}
          onClick={onTaskExport}
        >
          <Download />
        </DataTableActionBarAction> */}
        <DataTableActionBarAction
          size="icon"
          tooltip="Delete tasks"
          isPending={getIsActionPending("delete")}
          onClick={onTaskDelete}
        >
          <Trash />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  );
}