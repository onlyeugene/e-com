"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import AnalyticsCard from "./analytics-card";
import { ProductsDummyData } from "@/constants/data";
import { formatPrice } from "@/utils/formatPrice";

export type TopProducts = {
  id: number;
  name: string;
  revenue: number;
  price: number;
  image: string;
};

// export type Product = z.infer<typeof ProductSchema>;

export const topProductsColumns: ColumnDef<TopProducts>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const totalRevenue = row.getValue('revenue') as number

      return (
        <>
          {formatPrice(totalRevenue)}
        </>
      )
    }
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;

      return (
        <Image
          src={imageUrl}
          width={50}
          height={50}
          alt={`Product Image`}
          className="border-2 border-primary"
        />
      );
    },
  },
];

export const TopProducts = ({
  // data,
}: {
  // data: Product[];

}) => {
  const data = ProductsDummyData.sort((a, b) => b.revenue - a.revenue).slice(0,4);
  return (
    <AnalyticsCard
      title="Top Products"
      subtitle="Showing Most Sold Products"
    >
      <DataTable columns={topProductsColumns} data={data} />
    </AnalyticsCard>
  );
};