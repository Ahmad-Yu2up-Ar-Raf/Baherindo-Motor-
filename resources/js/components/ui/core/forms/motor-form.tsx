"use client";


import * as React from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { MEREK_MOTOR, KATEGORI_MOTOR, STATUS_MOTOR, OptionItem } from "@/config/enum-type";
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
  type: 'motor' | 'mobil'
  Merek: OptionItem[]
  Kategori: OptionItem[]
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
  type = 'motor',
   fileUploadRef,
   Merek ,
   Kategori,
  children,
  initialFiles,
  isPending,
}: TaskFormProps<T>) {





   

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
                
                      placeholder={`${type} name`}
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">{`Your ${type} name.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />




            <MoneyInput
          form={form}
          disable={isPending}
          label="Harga"
          name="harga"
          placeholder={`Harga ${type}`}
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
                  <FormDescription className=" sr-only">{`Plat Nomor  ${type}.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name={"tahun" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Tahun</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder={`${type} name`}
                      type="number"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">{`Your ${type} name.`}</FormDescription>
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
              name={"url" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>URL Video</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder="url"
                      type="url"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">{`Your ${type} name.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


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
                    <FormDescription className="sr-only">{`${type} deskripsion`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


<MoneyInput
          form={form}
          disable={isPending}
          label="DP Minimum"
          name="dp_minimum"
          placeholder={`dp ${type}`}
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
                
                      placeholder={`${type} warna`}
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">Warna type.</FormDescription>
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
                  {Kategori.map((item,i ) => (

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
            <FormItem>
              <FormLabel>Merek</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Merek.map((item,i ) => (

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
          name={"status" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STATUS_MOTOR.map((item,i ) => (

                  <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
                <FormDescription className=" sr-only">You can manage email addresses in your email settings.</FormDescription>
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