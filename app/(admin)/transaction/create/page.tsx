"use client";
import React, { useState, useEffect } from "react";
import SearchSelect, { SearchSelectOption } from "@/components/UI/SelectField";
import InputField from "@/components/UI/InputField";
import { UserIcon } from "lucide-react";
import { toast } from "sonner";

export default function CreateTransaction() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [options, setOptions] = useState<SearchSelectOption[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const res = await fetch("/api/employee/user/");
        const json = await res.json();

        const mapped = json.map((emp: any) => ({
          value: emp._id,
          label: `${emp.firstName} ${emp.lastName}`,
          description: emp.role,
        }));
        setOptions(mapped);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setPending(false);
      }
    };

    fetchData(); // ← you were missing this call
  }, []); // ← empty array so it only runs once on mount
  const handleSubmit = async () => {
    if (!selected || !amount || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setPending(true);
      const res = await fetch("/api/transaction/txn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selected, // this is the _id from SearchSelect
          amount,
          date: new Date(),
          description,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      toast.success("Transaction created!");
      // Reset form
      setSelected(null);
      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to create transaction.");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <h1>Create Transaction</h1>
      <SearchSelect
        className="pb-10"
        label="Employee"
        placeholder={pending ? "Loading..." : "Select an employee..."}
        options={options}
        value={selected ?? undefined}
        onChange={(val) => setSelected(val)}
        disabled={pending}
      />
      <InputField
        label="Amount"
        type="number"
        placeholder="Php"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <InputField
        label="Description"
        type="text"
        placeholder="Cash In"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={pending}
        className="mt-4 px-6 py-2.5 rounded-lg bg-jpsc-500 text-white text-sm font-semibold
    hover:bg-jpsc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Saving..." : "Create Transaction"}
      </button>
    </div>
  );
}
