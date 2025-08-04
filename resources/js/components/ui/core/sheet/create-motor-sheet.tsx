"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/fragments/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/fragments/sheet";
import { TaskForm } from "../forms/motor-form";
import { motorSchema , type MotorSchema } from "@/lib/validations";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/fragments/drawer";
import { router } from "@inertiajs/react";
import { FileUploadRef } from "../../fragments/file-uploud";
import { cn } from "@/lib/utils";

interface type  extends React.ComponentPropsWithRef<typeof Sheet>{
  trigger? : boolean

}


export function CreateTaskSheet({ ...props}: type) {

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
  const fileUploadRef = React.useRef<FileUploadRef>(null)
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen  = props.open ? open : internalOpen;
  const setIsOpen = props.onOpenChange || setInternalOpen
  const isDesktop = useIsMobile();

  const form = useForm<MotorSchema>({
    mode: "onSubmit", 
    defaultValues: {
     name: "",
       harga: 0,
       files: [],
       plat_nomor: "",
       warna: "",
       deskripsi: "",
      },
    resolver: zodResolver(motorSchema),
  }) 

function onSubmit(input: MotorSchema) {
    console.log("Form input before submission:", input);
    
    // Validasi apakah semua files memiliki base64Data
    const filesWithoutBase64 = input.files.filter(file => !file.base64Data);
    if (filesWithoutBase64.length > 0) {
      toast.error("Some files are missing data. Please try uploading again.");
      return;
    }

    toast.loading("Motor creating....", {
      id: "create-motor"
    });
    
  startTransition(() => {
    setLoading(true);

    // Prepare data dengan struktur yang benar

    console.log("Prepared form data:", input);

    router.post(route(`dashboard.motor.store`), input, { 
      preserveScroll: true,
      preserveState: true,
      onBefore: (visit) => {
        console.log('Request about to start:', visit);
      },
      onSuccess: () => {
        form.reset();
        setIsOpen(false);
        toast.success("Motor created successfully", {
          id: "create-motor"
        });
        setLoading(false);
      },
      onError: (error) => {
        console.error("Submit error:", error);
        toast.error(`Error: ${Object.values(error).join(', ')}`, {
          id: "create-motor"
        });
        setLoading(false);
      },
      onFinish: () => {
        setLoading(false);
        console.log('Request finished');
      }
    });
  });
}

if (!isDesktop) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true} >
 
      <SheetTrigger asChild  className={cn(props.trigger == false && "sr-only" )} >
        <Button variant="outline" className=" text-sm  bg-background" size="sm">
          <Plus  className=" mr-3 "/>
          Add New 
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 overflow-y-scroll ">
        <SheetHeader className="text-left sm:px-6 space-y-1 bg-background z-30  sticky top-0   p-4 border-b  ">
          <SheetTitle className=" text-lg">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base capitalize">Motor</Button> </SheetTitle>
          <SheetDescription className=" sr-only">
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <TaskForm isPending={loading} form={form} fileUploadRef={fileUploadRef}  onSubmit={onSubmit}>
          <SheetFooter className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
            <SheetClose disabled={loading} asChild onClick={() => form.reset()}>
              <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                    {loading && <Loader className="animate-spin" />}
                Cancel
              </Button>
            </SheetClose>
            <Button disabled={loading} type="submit" className="w-fit dark:bg-primary !pointer-events-auto  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
              {loading && <Loader className="animate-spin" />}
              Add
            </Button>
          </SheetFooter>
        </TaskForm>
      </SheetContent> 
    </Sheet>
  );
}

return(
     <Drawer open={isOpen} onOpenChange={setIsOpen}  modal={true}  >
   <DrawerTrigger asChild className={cn(props.trigger == false && "sr-only" )} >
       <Button variant="outline" className=" text-sm  bg-background" size="sm">
          <Plus  className=" mr-3 "/>
          Add New 
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col  ">
        <DrawerHeader className="text-left sm:px-6 space-y-1 bg-background    p-4 border-b  ">
        <DrawerTitle className=" text-xl">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base">motor</Button> </DrawerTitle>
              <DrawerDescription className=" text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
        </DrawerHeader>

         <TaskForm   isPending={loading} form={form}  fileUploadRef={fileUploadRef}  onSubmit={onSubmit}>
        <DrawerFooter className="gap-3 px-3 py-4 w-full flex-row justify-end  flex  border-t sm:space-x-0">
             <DrawerClose disabled={loading} asChild onClick={() => form.reset()}>
                            <Button  disabled={loading} type="button" className="  w-fit" size={"sm"} variant="outline">
                                  {loading && <Loader className="animate-spin" />}
                              Cancel
                            </Button>
                          </DrawerClose>
                          <Button type="submit"  disabled={loading} className="w-fit  !pointer-events-auto  dark:bg-primary  dark:text-primary-foreground  bg-primary text-primary-foreground " size={"sm"}>
                            {loading && <Loader className="animate-spin" />}
                            Add
                          </Button>
        </DrawerFooter>
          </TaskForm>
      </DrawerContent>
    </Drawer>
)
}