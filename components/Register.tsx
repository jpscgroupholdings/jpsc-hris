"use client";

import { useEffect, useState } from "react";
import { signUp } from "@/actions/signUp";
import InputFields from "@/components/UI/InputFields";
import { redirect, RedirectType } from "next/navigation";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  BriefcaseIcon,
  BuildingIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  // Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Selection State
  const [department, setDepartment] = useState("");
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [role, setRole] = useState("");
  const [rolesList, setRolesList] = useState<Role[]>([]);

  // Status State
  const [loading, setLoading] = useState(false);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);

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

  // 2. Fetch roles whenever department changes
  useEffect(() => {
    const fetchRoles = async () => {
      if (!department) {
        setRolesList([]);
        setRole("");
        return;
      }

      setLoadingRoles(true);
      try {
        const response = await fetch(
          `/api/employee/role?departmentId=${department}`,
        );
        if (!response.ok) throw new Error("Failed to fetch roles");
        const data = await response.json();
        setRolesList(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load roles");
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, [department]);

  interface Department {
    _id: string;
    name: string;
  }

  interface Role {
    _id: string;
    name: string;
    departmentId: string;
  }

  async function handleRegister() {
    if (!firstName || !lastName || !email || !role || !department) {
      return toast.error("Please fill in all required fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const birthDateObject = new Date(birthdate);
    if (isNaN(birthDateObject.getTime())) {
      return toast.error("Please select a valid birthdate");
    }

    const name = `${firstName} ${middleName.charAt(0).toUpperCase()} ${lastName}`;
    const username = (firstName.charAt(0) + middleName.charAt(0) + lastName)
      .toLowerCase()
      .replace(/\s/g, "");

    try {
      setLoading(true);
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
        role,
      );

      toast.success("Employee Created successfully");
      redirect("employee", RedirectType.replace);
    } catch (err) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create a new Employee
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in the details below
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ... Standard InputFields ... */}
          <InputFields
            label="First Name"
            type="text"
            placeholder="John"
            icon={UserIcon}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputFields
            label="Middle Name"
            type="text"
            placeholder="Optional"
            icon={UserIcon}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <InputFields
            label="Last Name"
            type="text"
            placeholder="Dela Cruz"
            icon={UserIcon}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputFields
            label="Birthdate"
            type="date"
            icon={CalendarIcon}
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <InputFields
            label="Mobile Number"
            type="tel"
            placeholder="+639XXXXXXXXX"
            icon={PhoneIcon}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <InputFields
            label="Email Address"
            type="email"
            placeholder="example@email.com"
            icon={MailIcon}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Department Selection */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <BuildingIcon size={16} /> Department
            </label>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setRole("");
              }}
              disabled={loadingDepts}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-jpsc-500 text-sm disabled:bg-gray-50"
            >
              <option value="">Select Department</option>
              {departmentsList.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <BriefcaseIcon size={16} /> Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={!department || loadingRoles}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-jpsc-500 text-sm disabled:bg-gray-50"
            >
              <option value="">
                {!department
                  ? "Select Department first..."
                  : loadingRoles
                    ? "Loading roles..."
                    : "Select a Role"}
              </option>
              {rolesList.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <InputFields
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={LockIcon}
            showPassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputFields
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            icon={LockIcon}
            showPassword={true}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-jpsc-500 hover:bg-jpsc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jpsc-500 transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
