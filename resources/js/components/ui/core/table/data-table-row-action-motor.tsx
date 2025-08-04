"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/fragments/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuShortcut,

  DropdownMenuTrigger,
} from "@/components/ui/fragments/dropdown-menu"



import { DeleteTasksDialog } from "../../fragments/table/delete-task-dialog"

import React from "react"
import { router, usePage } from "@inertiajs/react"
import { toast } from "sonner"
import { UpdateTaskSheet } from "../sheet/update-motor-sheet"
import { MotorSchema } from "@/lib/validations"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>

}

export function DataTableRowActions<TData>({
  row,

}: DataTableRowActionsProps<TData>) {
  const task = row.original as MotorSchema;
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [processing, setProcessing] = React.useState(false);
const currentPath = usePage().url
          const pathNames = currentPath.split('/').filter(path => path)[1]
  const handleDelete = (taskId: number) => {
    try {
      setProcessing(true);
      

          toast.loading("Motor deleting...",  { id: "motor-delete" });
      router.delete(route(`dashboard.${pathNames}.destroy`, taskId), {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          setProcessing(true);
        },
        onSuccess: () => {
          toast.success("Motor deleted successfully",  { id: "motor-delete" });
          setOpenModal(false);
          router.reload(); // Memaksa refresh data dari server
        },
        onError: (errors: any) => {
          console.error("Delete error:", errors);
          toast.error(errors?.message || "Failed to delete the motor" , { id: "motor-delete" });
        },
        onFinish: () => {
          setProcessing(false);
        }
      });
    } catch (error) {
      console.error("Delete operation error:", error);
      toast.error("An unexpected error occurred",  { id: "motor-delete" });
      setProcessing(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted size-8"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setOpenUpdate(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setOpenModal(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
          <UpdateTaskSheet
         
                  task={task }
                  open={openUpdate} 
                  onOpenChange={setOpenUpdate}
                />
      <DeleteTasksDialog 
        handledeDelete={handleDelete}
        processing={processing}
        trigger={false} 
        students={task} 
        open={openModal} 
        onOpenChange={setOpenModal}
      />
    </>
  )
}