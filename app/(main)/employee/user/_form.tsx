"use client";

import { useEffect, useState } from "react";
import { signUp } from "@/actions/signUp";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";
import type { Department } from "@/models/employee/department";
import type { Designation } from "@/models/employee/designation";
import type { Role } from "@/models/employee/role";
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
import { generatePassword } from "@/actions/generatePassword";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";

interface RegisterFormProps {
  initialData?: any;
}

export default function RegisterForm({ initialData }: RegisterFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData?._id;

  // Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, SetcardNumber] = useState("");
  const [balance, setBalance] = useState(0);

  // Selection State
  const [department, setDepartment] = useState<string | null>(null);
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [designation, setDesignation] = useState<string | null>(null);
  const [designationsList, setDesignationsList] = useState<Designation[]>([]);
  // Added Role State
  const [roleId, setRoleId] = useState<string | null>(null);
  const [rolesList, setRolesList] = useState<Role[]>([]);

  // Status State
  const [loading, setLoading] = useState(false);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingDesignations, setLoadingDesignations] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email || "");
      setFirstName(initialData.firstName || "");
      setMiddleName(initialData.middleName || "");
      setLastName(initialData.lastName || "");
      if (initialData.birthdate || initialData.birthDate) {
        setBirthdate(
          new Date(initialData.birthdate || initialData.birthDate)
            .toISOString()
            .split("T")[0],
        );
      }
      setMobileNumber(initialData.mobileNumber || "");
      SetcardNumber(initialData.cardNumber || "");
      setBalance(initialData.balance || 0);

      // Fixed mapping for IDs
      setDepartment(
        initialData.departmentId?._id || initialData.departmentId || null,
      );
      setDesignation(
        initialData.designationId?._id || initialData.designationId || null,
      );
      setRoleId(initialData.roleId?._id || initialData.roleId || null);
    }
  }, [initialData]);

  const deptOptions: SearchSelectOption[] = departmentsList.map((d) => ({
    value: d._id,
    label: d.name,
  }));

  const designationOptions: SearchSelectOption[] = designationsList.map(
    (d) => ({
      value: d._id,
      label: d.name,
    }),
  );

  // Map roles to options
  const roleOptions: SearchSelectOption[] = rolesList.map((r) => ({
    value: r._id,
    label: r.name,
  }));

  useEffect(() => {
    const fetchBaseData = async () => {
      setLoadingDepts(true);
      try {
        const [deptRes, roleRes] = await Promise.all([
          fetch("/api/employee/department"),
          fetch("/api/employee/role"),
        ]);
        const depts = await deptRes.json();
        const roles = await roleRes.json();
        setDepartmentsList(depts);
        setRolesList(roles);
      } catch (err) {
        toast.error("Could not load form data");
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchBaseData();
  }, []);

  useEffect(() => {
    const fetchDesignations = async () => {
      if (!department) {
        setDesignationsList([]);
        if (
          !initialData ||
          department !==
            (initialData.departmentId?._id || initialData.departmentId)
        ) {
          setDesignation(null);
        }
        return;
      }
      setLoadingDesignations(true);
      try {
        const response = await fetch(
          `/api/employee/designation?departmentId=${department}`,
        );
        const data = await response.json();
        setDesignationsList(data);
      } catch (err) {
        toast.error("Could not load designations");
      } finally {
        setLoadingDesignations(false);
      }
    };
    fetchDesignations();
  }, [department, initialData]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleRegister() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !designation ||
      !department ||
      !roleId
    ) {
      return toast.error("Please fill in all required fields");
    }

    const birthDateObject = new Date(birthdate);
    const name = `${firstName} ${middleName.charAt(0).toUpperCase()} . ${lastName}`;
    const username = (firstName.charAt(0) + middleName.charAt(0) + lastName)
      .toLowerCase()
      .replace(/\s/g, "");

    try {
      setLoading(true);

      if (isEditMode) {
        const res = await fetch(`/api/employee/user/${initialData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            middleName,
            lastName,
            name,
            birthdate: birthDateObject,
            mobileNumber,
            email,
            departmentId: department,
            designationId: designation,
            roleId: roleId, // Added roleId
            cardNumber,
            balance,
          }),
        });
        if (!res.ok) throw new Error("Update failed");
        toast.success("Employee updated successfully");
      } else {
        await signUp(
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
          roleId, // Added roleId to signup action
        );
        toast.success(`Employee Created successfully for user ${username}`);
      }

      router.push("/employee/user");
      router.refresh();
    } catch (err) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {isEditMode ? "Edit Employee Details" : "Create a new Employee"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {isEditMode
            ? "Modify the fields below to update the profile"
            : "Please fill in the details below"}
        </p>
      </div>

      <div className="space-y-4">
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

        <SearchSelect
          label="Department"
          options={deptOptions}
          value={department ?? undefined}
          onChange={(val) => setDepartment(val)}
          disabled={loadingDepts}
          placeholder="Select Department"
        />

        <SearchSelect
          label="Designation"
          options={designationOptions}
          value={designation ?? undefined}
          onChange={(val) => setDesignation(val)}
          disabled={!department || loadingDesignations}
          placeholder={
            !department ? "Select Department first..." : "Select a Designation"
          }
        />

        {/* Added Role SearchSelect */}
        <SearchSelect
          label="System Role"
          options={roleOptions}
          value={roleId ?? undefined}
          onChange={(val) => setRoleId(val)}
          placeholder="Select a Role"
        />

        {!isEditMode && (
          <div className="relative group">
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
            <InputField
              label="New Password"
              type="text"
              placeholder="Click here to generate password"
              icon={LockIcon}
              value={password}
              onClick={() => setPassword(generatePassword(8))}
              readOnly
              className="hover:cursor-pointer"
            />
            <div className="absolute right-2 top-[67%] -translate-y-1/2 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                disabled={!password}
                className="p-2 text-gray-400 hover:text-gold-500 transition-colors disabled:opacity-0"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <CopyIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gold-500 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition-all disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : isEditMode
              ? "Update Details"
              : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
