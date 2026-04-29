"use client";

import { useEffect, useState } from "react";
import { signUp } from "@/actions/signUp";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import { redirect, RedirectType } from "next/navigation";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  IdCardIcon,
  WalletIcon,
  CopyIcon,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { DigitalWallet } from "@/models/digitalWallet";
import { generatePassword } from "@/actions/generatePassword";

export default function Register() {
  // Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // Selection State
  const [department, setDepartment] = useState("");
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [designation, setDesignation] = useState("");
  const [designationsList, setDesignationsList] = useState<Designation[]>([]);
  const [cardNumber, SetcardNumber] = useState("");
  const [balance, setBalance] = useState(0);

  // Status State
  const [loading, setLoading] = useState(false);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingDesignations, setLoadingDesignations] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Fetch all departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepts(true);
      try {
        const response = await fetch("/api/employee/department");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartmentsList(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load departments");
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchDepartments();
  }, []);

  // 2. Fetch designations whenever department changes
  useEffect(() => {
    const fetchDesignations = async () => {
      if (!department) {
        setDesignationsList([]);
        setDesignation("");
        return;
      }

      setLoadingDesignations(true);
      try {
        const response = await fetch(
          `/api/employee/designation?departmentId=${department}`,
        );
        if (!response.ok) throw new Error("Failed to fetch designations");
        const data = await response.json();
        setDesignationsList(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load designations");
      } finally {
        setLoadingDesignations(false);
      }
    };

    fetchDesignations();
  }, [department]);

  interface Department {
    _id: string;
    name: string;
  }

  interface Designation {
    _id: string;
    name: string;
    departmentId: string;
  }

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleRegister() {
    if (!firstName || !lastName || !email || !designation || !department) {
      return toast.error("Please fill in all required fields");
    }

    const birthDateObject = new Date(birthdate);
    if (isNaN(birthDateObject.getTime())) {
      return toast.error("Please select a valid birthdate");
    }

    const name = `${firstName} ${middleName.charAt(0).toUpperCase()} . ${lastName}`;
    const username = (firstName.charAt(0) + middleName.charAt(0) + lastName)
      .toLowerCase()
      .replace(/\s/g, "");
    let success = false;
    try {
      setLoading(true);
      const res = await signUp(
        firstName,
        middleName,
        lastName,
        name,
        birthDateObject,
        mobileNumber,
        email,
        password,
        username,
        department,
        designation,
        cardNumber,
        balance,
      );

      toast.success(`Employee Created successfully for user ${username}`);
      success = true;
    } catch (err) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
    if (success) {
      redirect("/employee", RedirectType.replace);
    }
  }

  return (
    <div>
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create a new Employee
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in the details below
          </p>
        </div>
        <div className=" gap-5">
          {/* ... Standard InputField ... */}
          <InputField
            label="First Name"
            type="text"
            placeholder="John"
            icon={UserIcon}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Middle Name"
            type="text"
            placeholder="Optional"
            icon={UserIcon}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <InputField
            label="Last Name"
            type="text"
            placeholder="Dela Cruz"
            icon={UserIcon}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            label="Birthdate"
            type="date"
            icon={CalendarIcon}
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <InputField
            label="Mobile Number"
            type="tel"
            placeholder="+639XXXXXXXXX"
            icon={PhoneIcon}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="example@email.com"
            icon={MailIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Department Selection */}
          <div className="flex flex-col py-2">
            <label className="text-sm font-medium text-jpsc-900">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDesignation("");
              }}
              disabled={loadingDepts}
              className="block w-full px-3 py-2.5 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-jpsc-500 text-sm "
            >
              <option value="">Select Department</option>
              {departmentsList.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation Selection */}
          <div className="flex flex-col py-2">
            <label className="text-sm font-medium text-jpsc-900">
              Designation
            </label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              disabled={!department || loadingDesignations}
              className="block w-full px-3 py-2.5 border bg-white border-gray-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-jpsc-500 text-sm disabled:bg-jpsc-600 disabled:text-jpsc-50"
            >
              <option value="">
                {!department
                  ? "Select Department first..."
                  : loadingDesignations
                    ? "Loading designations..."
                    : "Select a Designation"}
              </option>
              {designationsList.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Card Number"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            icon={IdCardIcon}
            value={cardNumber}
            onChange={(e) => SetcardNumber(e.target.value)}
          />

          <InputField
            label="Card Initial Balance"
            type="number"
            placeholder="1000"
            icon={WalletIcon}
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
        </div>
        <div className="relative group">
          <InputField
            label="New Password"
            type="text"
            placeholder="Click here to generate password"
            icon={LockIcon}
            value={password}
            // Clicking the input itself will now generate the password
            onClick={() => setPassword(generatePassword(8))}
            readOnly
            aria-selected
            onChange={() => {}}
            className="hover:cursor-pointer"
            // Important: Ensure your InputField has 'pr-12' class on the <input>
            // so text doesn't overlap the copy button
          />

          {/* Updated Alignment:
            'top-[62%]' usually hits the center of the input box when a label is present.
            'translate-y-[-50%]' ensures it stays mathematically centered.
          */}
          <div className="absolute right-2 top-[67%] -translate-y-1/2 flex items-center justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the InputField onClick
                handleCopy();
              }}
              disabled={!password}
              className="p-2 text-gray-400 hover:text-jpsc-500 transition-colors disabled:opacity-0"
              title="Copy"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-jpsc-500 hover:bg-jpsc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jpsc-500 transition-all disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
