import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { Button } from "@/components/ui/button";
import { ordersDummyData } from "@/constants/data";
import { columns } from "./columns";




  export default async function OrdersPage() {

    // data.sort((a: any, b: any) => b.orders - a.orders);

    return (
        <div className="p-6">
            <AnalyticsCard 
                title="Products"
                subtitle="Showing all products"
            >
                <Button className="mb-3">Create New Order</Button>
                <DataTable columns={columns} data={ordersDummyData} />
            </AnalyticsCard>
        </div>
    )
  }