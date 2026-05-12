"use client";
import DigitalWallet from "@/components/UI/DigitalWallet";
import { authClient } from "@/lib/auth/auth-client";
import { useEffect, useState } from "react";

export default function Wallet() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isPending, setPending] = useState(true); // Start as true
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        // Corrected query param to use user.id
        const res = await fetch(
          `/api/transaction/digitalWallet?userId=${user?.id}`,
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (isPending)
    return (
      <div className="p-10 animate-pulse text-gray-400">Loading Wallet...</div>
    );

  // Formatting with optional chaining to prevent crashes
  const firstName = user?.firstName || "Guest";
  const lastName = user?.lastName || "";
  const birthday = user?.birthDate ? new Date(user.birthDate) : null;

  let birthDateString = "00/00";
  if (birthday) {
    const month = (birthday.getMonth() + 1).toString().padStart(2, "0");
    const day = birthday.getDate().toString().padStart(2, "0");
    birthDateString = `${month}/${day}`;
  }
  // const cardString =

  return (
    <div>
      <DigitalWallet
        cardNumber={data?.cardNumber}
        firstName={firstName}
        lastName={lastName}
        birthdayString={birthDateString} // Changed prop name to match component
      />
    </div>
  );
}
