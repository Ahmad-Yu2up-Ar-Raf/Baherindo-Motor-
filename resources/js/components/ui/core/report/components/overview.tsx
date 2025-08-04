"use client"
import React from 'react'
import { SectionCards } from './section-card'
// import {  messsMotorCounts } from '@/queries/mess/dashboard-mess-queris';

// import {getroomsCapacityCounts, getRoomsStatusCounts, getroomsTypeCounts} from "@/queries/rooms/data-table-rooms-queris";
// import {  getEmployesCountsByDate } from '@/queries/employee/dashboard-employee-queris';
// import { getMotorStatusCounts, getEmployesGenderCounts, getEmployesRoleCounts } from '@/queries/employee/data-table-employee-queries';
import { Bike, BriefcaseBusiness, Building2,  CircleFadingArrowUp,  DoorOpen, UsersRound } from "lucide-react";
// import {  TabsContent } from '@/components/ui/fragments/tabs'
// import { ChartBarInteractive } from './chart/chart-bar-interactive';
// import { ChartPie } from './chart/chart-pie-donut-text';
// import { ChartAreaGradient } from './chart/chart-area-gradient';
// import {  ChartAreaInteractive } from './chart/chart-area-interactive';
// import { ChartBarActive } from './chart/chart-bar-active';
// import { getMotorCapacityCounts } from '@/queries/mess/data-table-mess-queris';
import { DataCard, PageProps, Reports } from '@/types';
import { ChartPie } from './charts/chat-pie-donut-text';
import { ChartAreaInteractive } from './charts/chart-area-interactive';
import { ChartBarActive } from './charts/chart-bar-active';
// import {  ReportDataQueris,  getCountsByDate,  RoomsMotorDataCounts } from '@/queries/dashboard-queris';




// import { ChartAreaGradient } from './chart/chart-area-gradient';

// interface type {
 
//   promises: Promise<
//     [
//       Awaited<ReturnType<typeof ReportDataQueris>>,
//       Awaited<ReturnType<typeof getEmployesRoleCounts>>,
//       Awaited<ReturnType<typeof getCountsByDate>>,
//       Awaited<ReturnType<typeof messsMotorCounts>>,
     
//       Awaited<ReturnType<typeof getMotorCapacityCounts>>,

//     ]
//   >;
// }

function MainSection( {  reports  }: PageProps) {


//   const [
//    ReportData,

//    EmployesRoleCounts,
//      getCountsByDate,
//       messsMotorCounts,
     
//        getMotorCapacityCounts,

//   ] = React.use(promises);


// const { data } =  ReportData

const dataCards: DataCard[] = [ 
    {
      title: "Total Motor",
      description: "This is total of your Motor ",
      value: reports["totalMotor"],
      icon: Bike,
      label: "Motor"
    },
    {
      title: "Motor Terjual",
      description: "This is total of your Motor sold out ",
      value: reports["totalMotorTerjual"],
      icon: CircleFadingArrowUp,
      label: "Terjual"
    },
    // {
    //   title: "Total Rooms",
    //   description: "This is total of your rooms ",
    //   value:  data['Total Ruangan'],
    //   icon: DoorOpen,
    //   label: "Rooms"
    // },
    // {
    //   title: "Total Motor",
    //   description: "This is total of your employee ",
    //   value: data['Total Karyawan'],
    //   icon: BriefcaseBusiness,
    //   label: "Motor"
    // },
  
    // {
    //   title: "Total Full Motor",
    //   description: "This is total of your full Motor ",
    //   value: data['Total Motor Full'],
    //   icon: UsersRound,
    //   label: "Full Motor"
    // },
  
  ];

  return (
 <>
        <section className='space-y-4'>
          <div className="@container/main flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionCards 
               dataCards={dataCards}
              />
        
            </div>
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs gap-y-4 md:gap-x-4   @5xl/main:grid-cols-3">
               
               
    
                      <ChartAreaInteractive isShowMess={false} isShowRooms={false} className='    col-span-2   'chartData={
             reports.countsByDate
              } />
                            <ChartPie showFooter={false} title='Motor Distribution - Gender' description='Current motor count by status' footerDeskripcion={"Showing total motor by the status distribution"}  className='    col-span-2 lg:col-span-1 ' data={reports.statusCount}  nameKey='Motor'/>
               
                      <ChartPie showFooter className='    col-span-2 lg:col-span-1 ' title='Motor Distribution - Merek Status' footerDeskripcion={"Showing total mess by the Capacity Status distribution"} description='Current mess count by capacity status' data={reports.merekCount} nameKey='Motor'/>
                    <ChartBarActive className='    col-span-2 lg:col-span-1 '  data={reports.countsHighest
              }/>


<ChartPie showFooter className='    col-span-2 lg:col-span-1 ' title='Motor Distribution - Kategori Status' footerDeskripcion={"Showing total mess by the  kategori"} description='Current mess count by capacity status' data={reports.kategoriCount} nameKey='Motor'/>
            {/* <ChartPie className='    col-span-2 lg:col-span-1 ' data={EmployesRoleCounts}/> */}
                 
</div>

          </div>
        </section>

 </>

  )
}

export default MainSection