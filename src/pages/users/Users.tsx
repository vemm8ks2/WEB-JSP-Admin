import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../components/DataTable/DataTable";
import Header from "../components/Header/Header";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  userId: string;
  name: string;
  email: string;
}

const users: User[] = Array.from({ length: 10 }).map((_, i) => ({
  userId: (i + 1).toString(),
  name: `user name ${i}`,
  email: `tmp${i}@gmail.com`,
}));

const columns: ColumnDef<User>[] = [
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
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const Users = () => {
  const isLoading = false;

  if (isLoading) return <div className="py-4">Loading...</div>;

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default Users;
