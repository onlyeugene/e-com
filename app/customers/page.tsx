import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { Button } from "@/components/ui/button";
import { columns, Customers } from "./columns";



async function getCustomers(): Promise<Customers[]> {
    const res = await fetch(
      "https://66a6d52223b29e17a1a39127.mockapi.io/Customers",
      {
        cache: "no-store",
      }
    );
  
    const data = await res.json();
    return data;
  }

  export default async function CustomersPage() {
    const data = await getCustomers();

    // data.sort((a: any, b: any) => b.orders - a.orders);

    return (
        <div className="p-6">
            <AnalyticsCard 
                title="Customers"
                subtitle="List of all customers with orders"
            >
                <Button className="mb-3">Add Customer</Button>
                <DataTable columns={columns} data={data} />
            </AnalyticsCard>
        </div>
    )
  }