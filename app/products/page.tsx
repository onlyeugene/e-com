import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
// import { Button } from "@/components/ui/button";
// import { ProductsDummyData } from "@/constants/data";
import { columns } from "./columns";
import AddProduct from "@/components/products/add-products";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/server/prisma";




  export default async function ProductsPage() {

    const session = await auth()
    if (!session?.user) {
      redirect("/login")
    }

    const products = await prisma.product.findMany({})

    // data.sort((a: any, b: any) => b.orders - a.orders);

    return (
        <div className="p-6">
            <AnalyticsCard 
                title="Products"
                subtitle="Showing all products"
            >
                <AddProduct />
                <DataTable columns={columns} data={products as any} />
                {/* <DataTable columns={columns} data={ProductsDummyData} /> */}
            </AnalyticsCard>
        </div>
    )
  }