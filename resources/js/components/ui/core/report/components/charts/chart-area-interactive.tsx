"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/fragments/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/select"
import {LucideChartNoAxesCombined } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChartDataType } from "@/types"

export const description = "An interactive area chart"




const chartConfig = {
  Count: {
    label: "Count",
  },
 
  mess: {
    label: "mess",
    color: "var(--chart-1)",
  },
  rooms: {
    label: "rooms",
    color: "var(--chart-2)",
  },
   motor: {
    label: "motor",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

type ChartAreaInteractiveProps = { 
    chartData: ChartDataType[]
    className?: string
     isShowRooms?: boolean
    isShowMess?: boolean
    title?: string
    deskripcion?: string
}
export function ChartAreaInteractive({ chartData , className, isShowMess = true, title = "Data Chart - Interactive" , deskripcion = "Showing total data Count for the last 3 month", isShowRooms = true  }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className={cn("pt-0 ", className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-7.5 sm:flex-row">
    
                <div className="grid flex-1 gap-1">
                    <CardTitle className=" line-clamp-1">{title}</CardTitle>
                    <CardDescription className=" line-clamp-1">
                      {deskripcion}
                    </CardDescription>
                  </div>
       
      
             {chartData.length > 0 && (
        <CardAction>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        </CardAction>
             )}
      </CardHeader>
      <CardContent className="px-2 pt-4 min-h-[300px] h-full content-center sm:px-6 sm:pt-6">
          {chartData.length > 1 ? (

        <ChartContainer
          config={chartConfig}
          className="aspect-auto max-h-[250px] h-full w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillmotor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-motor)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-motor)"
                  stopOpacity={0.1}
                />
              </linearGradient>
          

             {isShowRooms && (

                    <linearGradient id="fillrooms" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-rooms)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-rooms)"
                  stopOpacity={0.1}
                />
              </linearGradient>
             )}
          
   {isShowMess && (
<linearGradient id="fillmess" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mess)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mess)"
                  stopOpacity={0.1}
                />
              </linearGradient>
)

}

            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
              
            />


  {isShowMess && (
           <Area
              dataKey="mess"
              type="natural"
              fill="url(#fillmess)"
              stroke="var(--color-mess)"
              stackId="a"
            />
            
          )}

     {isShowRooms && (
           <Area
              dataKey="rooms"
              type="natural"
              fill="url(#fillrooms)"
              stroke="var(--color-rooms)"
              stackId="a"
            />
     )}

               

                
      
        
              <Area
              dataKey="motor"
              type="natural"
              fill="url(#fillmotor)"
              stroke="var(--color-motor)"
              stackId="a"
            />
      

            <ChartLegend content={<ChartLegendContent payload={undefined} />} />
         
          </AreaChart>
        </ChartContainer>
           ) : ( 
             <div className="text-center  aspect-auto content-center min-h-[250px] w-full text-muted-foreground">
            <LucideChartNoAxesCombined className="  size-6 m-auto mb-3 "/>
            <p className="text-lg font-medium">No chart to show</p>
            <p className="text-sm">Add new data to see the distribution</p>
          </div>
           )  }
      </CardContent>
    </Card>
  )
}