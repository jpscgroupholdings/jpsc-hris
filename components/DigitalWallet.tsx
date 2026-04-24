"use client";
import React, { useState } from "react";
import { employees, transactions } from "@/lib/mockData";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const WalletPanel: React.FC = () => {
  const [selectedId, setSelectedId] = useState(employees[0].id);
  const [topUpAmt, setTopUpAmt] = useState("50");
  const [balances, setBalances] = useState<Record<string, number>>(
    Object.fromEntries(employees.map((e) => [e.id, e.balance])),
  );

  const selected = employees.find((e) => e.id === selectedId)!;
  const empTxns = transactions
    .filter((t) => t.employeeId === selectedId)
    .slice(0, 8);
  const totalBalance = Object.values(balances).reduce((s, b) => s + b, 0);

  const handleTopUp = () => {
    const amt = parseFloat(topUpAmt);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setBalances((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] || 0) + amt,
    }));
    toast.success(`Added $${amt.toFixed(2)} to ${selected.name}'s wallet`);
  };

  const handleBulkTopUp = () => {
    setBalances((prev) =>
      Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, v + 25])),
    );
    toast.success("Bulk top-up: +$25 added to all employees");
  };

  const txIcon = (t: string) => {
    if (t === "topup")
      return {
        I: ArrowDownLeft,
        bg: "bg-jpsc-500/10",
        color: "text-jpsc-400",
      };
    if (t === "refund")
      return {
        I: RotateCcw,
        bg: "bg-jpsc-400/10",
        color: "text-jpsc-300",
      };
    return {
      I: ArrowUpRight,
      bg: "bg-rose-500/10",
      color: "text-rose-400",
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Summary + Top-up */}
      <div className="lg:col-span-1 space-y-4">
        {/* Wallet Summary */}
        <div className="bg-linear-to-br from-jpsc-600 via-jpsc-700 to-jpsc-900 rounded-2xl p-6 text-foreground shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Wallet className="w-6 h-6 opacity-80" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-md">
                Total Pool
              </span>
            </div>
            <p className="text-jpsc-300 text-sm mt-6">
              Combined wallet balance
            </p>
            <h2 className="text-4xl font-bold mt-1">
              ${totalBalance.toFixed(2)}
            </h2>
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-jpsc-700 text-sm">
              <div>
                <p className="text-jpsc-400 text-xs">Transactions</p>
                <p className="font-semibold">{transactions.length}</p>
              </div>
              <div>
                <p className="text-jpsc-400 text-xs">Avg Balance</p>
                <p className="font-semibold">
                  ${(totalBalance / employees.length).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-jpsc-400 text-xs">Active</p>
                <p className="font-semibold">{employees.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top-up Card */}
        <div className="bg-background border border-jpsc-800 rounded-2xl p-5">
          <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-jpsc-400" /> Top up wallet
          </h3>

          <label className="text-xs text-jpsc-400">Employee</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full mt-1 mb-3 bg-background border border-jpsc-800 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-jpsc-500"
          >
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} — ${balances[e.id].toFixed(2)}
              </option>
            ))}
          </select>

          <label className="text-xs text-jpsc-400">Amount (USD)</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              value={topUpAmt}
              onChange={(e) => setTopUpAmt(e.target.value)}
              className="flex-1 bg-background border border-jpsc-800 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-jpsc-500"
            />
            <button
              onClick={handleTopUp}
              className="px-4 py-2 rounded-lg bg-jpsc-500 text-background text-sm font-semibold hover:bg-jpsc-400 transition"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            {[10, 25, 50, 100].map((a) => (
              <button
                key={a}
                onClick={() => setTopUpAmt(a.toString())}
                className="flex-1 py-1.5 text-xs rounded-md bg-jpsc-800 text-foreground hover:bg-jpsc-700"
              >
                ${a}
              </button>
            ))}
          </div>

          <button
            onClick={handleBulkTopUp}
            className="w-full mt-3 py-2 rounded-lg border border-jpsc-700 text-foreground hover:bg-jpsc-800 text-sm font-medium flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Bulk top-up all (+$25)
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="lg:col-span-2 bg-background border border-jpsc-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-jpsc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selected.avatar}
              alt={selected.name}
              className="w-12 h-12 rounded-full ring-2 ring-jpsc-500/40"
            />
            <div>
              <p className="text-foreground font-semibold">{selected.name}</p>
              <p className="text-jpsc-400 text-xs">
                {selected.role} · {selected.department}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-jpsc-400 text-xs">Current balance</p>
            <p className="text-2xl font-bold text-foreground">
              ${balances[selectedId].toFixed(2)}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground font-semibold">
              Recent transactions
            </h3>
            <span className="text-xs text-jpsc-400">
              {empTxns.length} entries
            </span>
          </div>

          <div className="space-y-2">
            {empTxns.length === 0 && (
              <p className="text-jpsc-400 text-sm text-center py-8">
                No transactions yet
              </p>
            )}

            {empTxns.map((t) => {
              const { I, bg, color } = txIcon(t.type);
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-jpsc-800/40 transition"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}
                  >
                    <I className={`w-4 h-4 ${color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-medium truncate">
                      {t.description}
                    </p>
                    <p className="text-jpsc-400 text-xs">
                      {t.id} · {t.time}
                    </p>
                  </div>

                  <span
                    className={`font-semibold text-sm ${
                      t.type === "topup" || t.type === "refund"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {t.type === "topup" || t.type === "refund" ? "+" : "-"}$
                    {t.amount.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPanel;
