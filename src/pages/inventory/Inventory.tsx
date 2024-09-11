import { ColumnDef } from "@tanstack/react-table";
import Header from "../components/Header/Header";
import DataTable from "../components/DataTable/DataTable";
import { Checkbox } from "@/components/ui/checkbox";

interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

const popularProducts = Array.from({ length: 10 }).map((_, i) => ({
  productId: (i + 1).toString(),
  name: "product name",
  price: (i + 1) * 1000,
  rating: i % 6,
  stockQuantity: (i + 1) * 1000,
}));

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock Quantity",
  },
];

const Inventory = () => {
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataTable columns={columns} data={popularProducts} />
    </div>
  );
};

export default Inventory;
