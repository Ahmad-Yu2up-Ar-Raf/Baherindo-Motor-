"use client";


import * as React from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/form";
import { Input } from "@/components/ui/fragments/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/select";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/fragments/popover";
import { Button } from "../../fragments/button";
import { Check, Loader2, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/fragments/command";
import { Link, router } from "@inertiajs/react";
import { toast } from "sonner";
import { KelasSchema, SiswaSchema } from "@/lib/validations/siswa";


interface TaskFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  currentEmployee?: SiswaSchema;
  kelas?: KelasSchema[];
}

export function TaskForm<T extends FieldValues>({
  form,
  onSubmit,
  kelas,
  children,
  currentEmployee,
  isPending,
}: TaskFormProps<T>) {






  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex overflow-y-scroll pt-6 md:pt-0 md:overflow-y-visible flex-col gap-4 px-0"
      >
        <main className="space-y-6 mb-6">
          <section className="space-y-10 border-b pb-8 pt-2 px-4 sm:px-6">


            
            <FormField
              control={form.control}
              name={"name" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Student name"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your student full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            
       
 





          </section>
          
          <section className="space-y-10 px-4 sm:px-6">
            <header>
              <h1 className="text-lg font-semibold">Optional Fields</h1>
              <p className="text-sm text-muted-foreground">These are columns that do not need any value</p>
            </header>
            
            <section className="space-y-10">
        

      


         

     

       

            {kelas && kelas.length > 0 ? (
                <FormField
                   disabled={isPending }
                   control={form.control}
                  defaultValue={currentEmployee?.kelas_id as any}
                   name={"kelas_id" as FieldPath<T>} // atau "bedId" sesuai dengan field di database
                   render={({ field }) => (
                     <FormItem className="flex flex-col">
                       <FormLabel className={cn(isPending && "text-muted-foreground")}>kelas</FormLabel>
                       <Popover>
                         <PopoverTrigger asChild >
                           <FormControl>
                             <Button
                               variant="outline"
                               role="combobox"
                               disabled={isPending}
                               className={cn(
                                 "w-full justify-between",
                                 !field.value && "text-muted-foreground"
                               )}
                             >
                               { field.value ? (
                                 kelas.find(
                                   (mess) => mess.id === field.value
                                 )?.name || "kelas not found"
                               ) : (
                                 "Select kelas"
                               )}
                          
                             </Button>
                           </FormControl>
                         </PopoverTrigger>
                         <PopoverContent className="w-full p-0">
                           <Command >
                             <CommandInput placeholder="Search kelas..." />
                             <CommandList>
                               <CommandEmpty>
                                 { "No kelas found."}
                               </CommandEmpty>
                               <CommandGroup>
                                 {kelas.map((kelas) => (
                                   <CommandItem
                                     value={kelas.name || `kelas ${kelas.id}`}
                                     key={kelas.id}
                                     className=" cursor-pointer"
                                     onSelect={() => {
                                       form.setValue("kelas_id" as FieldPath<T>,  kelas.id as any);
                                     }}
                                   >
                                     <Check
                                       className={cn(
                                         "mr-2 h-4 w-4",
                                         kelas.id === field.value
                                           ? "opacity-100"
                                           : "opacity-0"
                                       )}
                                     />
                                     {kelas.name || `kelas ${kelas.id}`}
                                   </CommandItem>
                                 ))}
                               </CommandGroup>
                             </CommandList>
                           </Command>
                         </PopoverContent>
                       </Popover>
                       <FormDescription >
                         { kelas.length > 0  && "Select an available kelas for the candidate." }
                       </FormDescription>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               ): (
                       <FormField
                control={form.control}
                name={"kelas_id" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>kelas</FormLabel>
                    <Select 
                      onValueChange={() => {
                        toast.error("No kelas available, please create an kelas first.");
                        router.visit("/dashboard/kelas");
                      }} 
                      value={field.value || ""}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize w-full">
                          <SelectValue placeholder="Empty Running kelas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent 
                
                      >
                    
                          <SelectItem
                    
                            key="no-kelas"
                            value={"no-kelas"}
                            className="capitalize relative w-full flex justify-between"
                          
                          >
                           <span>Add New kelas</span>  <Plus className=" right-2 absolute" /> 
                          </SelectItem>
                        
                       
                      </SelectContent>
                    </Select>
                    <FormDescription >Select The kelas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               )}
                

         
      
            </section>
          </section>
        </main>
       
        {children}
      </form>
    </Form>
  );
}