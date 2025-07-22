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
import { TaskForm as CalonForm } from "../forms/siswa-form";


import { siswaSchema as calonSchemaForm , type SiswaSchema as CalonSchemaForm } from "@/lib/validations/siswa";


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

import { KelasSchema as Elections } from "@/lib/validations/siswa";

export function CreateTaskSheet({ elections }: { elections: Elections[] }) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  


       const isDesktop = useIsMobile();



 

  const form  =   useForm<CalonSchemaForm>({
    mode: "onSubmit", 
    defaultValues: {
     name: "",
    
      },
    resolver: zodResolver(calonSchemaForm),
  }) 




  

function onSubmit(input: CalonSchemaForm) {
  startTransition( () => {
    setLoading(true);


    
    router.post(route(`dashboard.siswa.store`), input, { 
      preserveScroll: true,
      preserveState: true,
   
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Student created");
        setLoading(false);
      },
      onError: (error) => {
        console.error("Submit error:", error);
        toast.error(`Error: ${Object.values(error).join(', ')}`);
        setLoading(false);
           form.reset();
      }
    });
  });
}



      
        if (!isDesktop) {
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true} >
 
      <SheetTrigger asChild  >
        <Button variant="outline" className=" text-sm  bg-background" size="sm">
          <Plus  className=" mr-3 "/>
          Add New 
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 overflow-y-scroll ">
        <SheetHeader className="text-left sm:px-6 space-y-1 bg-background z-30  sticky top-0   p-4 border-b  ">
          <SheetTitle className=" text-lg">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base capitalize">Siswa</Button> </SheetTitle>
          <SheetDescription className=" sr-only">
            Fill in the details below to create a new task
          </SheetDescription>
        </SheetHeader>
        <CalonForm kelas={elections} isPending={loading} form={form}  onSubmit={onSubmit}>
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
        </CalonForm>
      </SheetContent>
    </Sheet>
  );
}


  

return(
     <Drawer open={open} onOpenChange={setOpen} modal={true}  >
   <DrawerTrigger asChild>
        <Button variant="outline" className=" bg-background" size="sm">
          <Plus  className=""/>
         <span className=" sr-only">Add New </span> 
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col  ">
        <DrawerHeader className="text-left sm:px-6 space-y-1 bg-background    p-4 border-b  ">
        <DrawerTitle className=" text-xl">Add New <Button type="button"   variant={"outline"} className=" ml-2  px-2.5 text-base">Siswa</Button> </DrawerTitle>

        
              <DrawerDescription className=" text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
          
        </DrawerHeader>


         <CalonForm  kelas={elections}   isPending={loading} form={form}  onSubmit={onSubmit}>

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
          </CalonForm>

      </DrawerContent>
    </Drawer>
)
}