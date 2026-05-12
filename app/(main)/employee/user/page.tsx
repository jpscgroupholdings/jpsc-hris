"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Button from "@/components/UI/Button";
import { Edit2Icon, EditIcon, PlusCircleIcon } from "lucide-react";
import Loading from "@/components/Loading";
import { format } from "date-fns";
import FilterTable from "@/components/UI/FilterTable";
import { User } from "@/models/employee/user";
import { getAllUser } from "@/actions/employee/userActions";
import Link from "next/link";

export default function Employee() {
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);
  const [pending, setPending] = useState(true);
  const [userFilterText, setUserFilterText] = useState("");

  const columns = [
    {
      name: "Name",
      // selector: (row: User) => row.name,
      cell: (row: User) => (
        <Link
          className="underline text-azure-500"
          href={`user/view/${row._id}`}
        >
          {row.name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: User) => row.departmentId?.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: User) => row.designationId?.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row: User) => row.username,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row: User) => row.mobileNumber,
      sortable: true,
    },
    {
      name: "Birthday",
      selector: (row: any) =>
        row.birthDate ? format(new Date(row.birthDate), "MMM dd yyyy") : "N/A",
      sortable: true,
    },
    { name: "Balance", selector: (row: User) => row.balance },
    { name: "Card Number", selector: (row: User) => row.cardNumber },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser();
        setData(res);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // --- Filter Logic ---
  const filteredUsers = useMemo(() => {
    const lowerText = userFilterText.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerText) ||
        item.username.toLowerCase().includes(lowerText) ||
        item.designationId.name.toLowerCase().includes(lowerText) ||
        item.departmentId.name.toLowerCase().includes(lowerText) ||
        item.cardNumber.toLowerCase().includes(lowerText),
    );
  }, [data, userFilterText]);

  return (
    <div>
      <div className="flex flex-row justify-end py-2 my-2 items-center">
        <Button
          className="text-xs md:text-lg "
          label="Add Employee"
          icon={PlusCircleIcon}
          iconSize={28}
          variant="success"
          onClick={() => router.push("/employee/create")}
        />
      </div>

      <div className="rounded-xl shadow-lg border overflow-hidden">
        <DataTable
          className="font-sans"
          columns={columns}
          data={filteredUsers}
          pagination
          fixedHeaderScrollHeight="600px"
          progressPending={pending}
          progressComponent={<Loading />}
          highlightOnHover
          pointerOnHover
          fixedHeader
          subHeader
          subHeaderWrap
          subHeaderComponent={
            <div className="flex items-center justify-between w-full py-2">
              <h1 className="text-md md:text-2xl font-sans font-bold">
                Employees
              </h1>
              <FilterTable
                onFilter={(e) => setUserFilterText(e.target.value)}
                onClear={() => setUserFilterText("")}
                filterText={userFilterText}
                placeholder="Search Transactions.."
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
