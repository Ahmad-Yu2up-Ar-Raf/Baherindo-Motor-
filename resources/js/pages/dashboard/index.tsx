import MainSection from "@/components/ui/core/report/components/overview";
import Wrapper from "@/components/ui/core/report/wrapper";
import { PageProps } from "@/types";







export default function Pages({ reports }: PageProps) {
    console.log("reports", reports.countsHighest);
    return (
        < Wrapper>

         <MainSection reports={reports}  />
            
        </Wrapper>
    );
}
