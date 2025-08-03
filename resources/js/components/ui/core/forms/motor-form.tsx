"use client";


import * as React from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { MEREK_MOTOR, KATEGORI_MOTOR } from "@/config/motorcyle-type";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/fragments/command"
import { cn } from "@/lib/utils";

import {  MotorSchema } from "@/lib/validations";
import MoneyInput from "../../fragments/shadcn-ui-money-input";

import FormFileUpload, { FileUploadRef } from "@/components/ui/fragments/file-uploud"
import { Textarea } from "../../fragments/textarea";

interface TaskFormProps<T extends FieldValues, >
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  initialFiles?: FileWithPreview[] | undefined
  currentKelas?: MotorSchema;
  fileUploadRef: React.RefObject<FileUploadRef | null>
}
import {
  format
} from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/fragments/popover"
import { Button } from "../../fragments/button";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../../fragments/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/fragments/select"
import { FileWithPreview } from "@/hooks/use-file-upload";
import KilometerInput from "../../fragments/kilometer-input";
export function TaskForm<T extends FieldValues, >({
  form,
  onSubmit,
   fileUploadRef,
  children,
  initialFiles,
  isPending,
}: TaskFormProps<T>) {


  const [isOpen, setIsOpen] = React.useState(false)

  //  console.log("initialFiles", initialFiles);
  const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex overflow-y-scroll pt-6 md:pt-0 md:overflow-y-clip flex-col gap-4 px-0"
      >
        <main className="space-y-6 mb-6">
          <section className="space-y-10 border-b pb-8 pt-2 px-4 sm:px-6" >


            
            <FormField
              control={form.control}
              name={"name" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Name</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder="motor name"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your Motor name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MoneyInput
          form={form}
          disable={isPending}
          label="Harga"
          name="harga"
          placeholder="Harga Motor"
        />
            
       
            <FormField
          control={form.control}
          name={"files" as FieldPath<T>}
          render={( { field}) => (
            <FormItem className=" ">
              <FormLabel className="">Gambar</FormLabel>
              <FormControl>
                <FormFileUpload 
                  {...field}
                  initialFiles={initialFiles}
                  ref={fileUploadRef}
                  control={form.control}
                  name="files"
                  maxSizeMB={5}
                  maxFiles={6}
               
                  isLoading={isPending}
                  isPending={isPending}
                />
              </FormControl>
              <FormDescription className="sr-only">Upload files for your project</FormDescription>
              <FormMessage className=" sr-only" />
            </FormItem>
          )}
        />


<FormField
              control={form.control}
              name={"plat_nomor" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Plat Nomor</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder="Plat Nomor"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">Plat Nomor Motor.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
          control={form.control}
          name={"tahun" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahun Keluaran</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((item,i ) => (

                  <SelectItem key={i} value={item.toString()}>{item}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
                <FormDescription className=" sr-only">You can manage email addresses in your email settings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

    <KilometerInput
  form={form}
  disable={isPending}
  label="Odometer"
  name="odometer"
  placeholder="0 km"
  description="Jarak tempuh kendaraan dalam kilometer"
/>

          </section>
          
          <section className="space-y-10 px-4 sm:px-6">
            <header>
              <h1 className="text-lg font-semibold">Optional Fields</h1>
              <p className="text-sm text-muted-foreground">These are columns that do not need any value</p>
            </header>
            
            <section className="space-y-10">
         

            <FormField
                control={form.control}
                name={"deskripsi" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Deskripcion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">Motor deskripsion</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


<MoneyInput
          form={form}
          disable={isPending}
          label="DP Minimum"
          name="dp_minimum"
          placeholder="dp motor"
        />

   

<FormField
      control={form.control}
      name={"masa_berlaku_pajak" as FieldPath<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Masa berlaku pajak</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Masa berlaku pajak</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
               captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
       <FormDescription className=" sr-only">Your date of birth is used to calculate your age.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

         
         <FormField
              control={form.control}
              name={"warna" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Warna</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder="motor warna"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">Warna motor.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />



<FormField
          control={form.control}
          name={"kategori" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {KATEGORI_MOTOR.map((item,i ) => (

                  <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
                <FormDescription className=" sr-only">You can manage email addresses in your email settings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />




<FormField
          control={form.control}
          name={"merek" as FieldPath<T>}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Merek</FormLabel>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      
                    >
                      {field.value
                        ? MEREK_MOTOR.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select Merek"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search merek..." />
                    <CommandList>
                      <CommandEmpty>No Merek found.</CommandEmpty>
                      <CommandGroup>
                        {MEREK_MOTOR.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("merek" as FieldPath<T>, language.value as any);
                              setIsOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className=" sr-only">This is the language that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

            </section>
          </section>
        </main>
       
        {children}
      </form>
    </Form>
  );
}