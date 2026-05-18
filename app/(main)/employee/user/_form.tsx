"use client";

import { useEffect, useState } from "react";
import { signUp } from "@/actions/auth/authActions";
import InputField from "@/components/UI/InputField";
import { useRouter } from "next/navigation";
import type { Department } from "@/models/admin/department";
import type { Designation } from "@/models/admin/designation";
import type { Role } from "@/models/admin/role";
import type { Company } from "@/models/admin/company";
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
import { generatePassword } from "@/actions/admin/generatePassword";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";

interface RegisterFormProps {
  initialData?: any;
}

export default function RegisterForm({ initialData }: RegisterFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData?._id;

  // --- 1. FORM STATE ---
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, SetcardNumber] = useState("");
  const [balance, setBalance] = useState(0);

  // --- 2. SELECTION STATE (SELECTED IDS) ---
  const [department, setDepartment] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);

  // --- 3. FETCHED LISTS DATA STATE ---
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [designationsList, setDesignationsList] = useState<Designation[]>([]);
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);

  // --- 4. STATUS LOADERS ---
  const [loading, setLoading] = useState(false);
  const [loadingBaseData, setLoadingBaseData] = useState(false);
  const [loadingDesignations, setLoadingDesignations] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- 5. INITIAL DATA MAPPING FOR EDIT MODE ---
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

      // Extract raw IDs from nested objects or fallback to string IDs
      setDepartment(initialData.departmentId?._id || null);
      setDesignation(initialData.designationId?._id || null);
      setRoleId(initialData.roleId?._id || initialData.roleId || null);
      setCompanyId(initialData.companyId?._id || initialData.companyId || null);
    }
  }, [initialData]);

  // --- 6. OPTION MAPS FOR SEARCHSELECT ---
  const deptOptions: SearchSelectOption[] = departmentsList.map((d) => ({
    value: String(d._id),
    label: String(d.name),
  }));

  const designationOptions: SearchSelectOption[] = designationsList.map(
    (d) => ({
      value: String(d._id),
      label: String(d.name),
    }),
  );

  const roleOptions: SearchSelectOption[] = rolesList.map((r) => ({
    value: String(r._id),
    label: String(r.name),
  }));

  const companyOptions: SearchSelectOption[] = companyList.map((c) => ({
    value: String(c._id),
    label: String(c.name),
  }));

  // --- 7. EFFECT FOR STATIC DROPDOWNS (Loads once on mount) ---
  useEffect(() => {
    const fetchGlobalDropData = async () => {
      setLoadingBaseData(true);
      try {
        const [deptRes, roleRes, companyRes] = await Promise.all([
          fetch("/api/admin/department"),
          fetch("/api/admin/role"),
          fetch("/api/admin/company"), // Fetching the complete company list
        ]);

        const depts = await deptRes.json();
        const roles = await roleRes.json();
        const companiesJson = await companyRes.json();

        // Safely extract arrays (handles pure arrays or wrapped { data: [...] } objects)
        setDepartmentsList(Array.isArray(depts) ? depts : depts.data || []);
        setRolesList(Array.isArray(roles) ? roles : roles.data || []);
        setCompanyList(
          Array.isArray(companiesJson)
            ? companiesJson
            : companiesJson.data || [],
        );
      } catch (err) {
        toast.error("Could not load dropdown fields data");
      } finally {
        setLoadingBaseData(false);
      }
    };
    fetchGlobalDropData();
  }, []);

  // --- 8. EFFECT FOR DYNAMIC DROPDOWNS (Depends on parent Department selection) ---
  useEffect(() => {
    const fetchDesignations = async () => {
      if (!department) {
        setDesignationsList([]);
        // Only wipe selected designation value if it doesn't match the record we are currently editing
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
          `/api/admin/designation?departmentId=${department}`,
        );
        const data = await response.json();
        setDesignationsList(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        toast.error("Could not load associated designations");
      } finally {
        setLoadingDesignations(false);
      }
    };
    fetchDesignations();
  }, [department, initialData]);

  // --- 9. UTILITY METHODS ---
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
      !roleId ||
      !companyId
    ) {
      return toast.error(
        "Please fill in all required fields including Company Unit",
      );
    }

    const birthDateObject = new Date(birthdate);
    const name = `${firstName} ${middleName ? middleName.charAt(0).toUpperCase() + " . " : ""}${lastName}`;
    const username = (
      firstName.charAt(0) +
      (middleName?.charAt(0) || "") +
      lastName
    )
      .toLowerCase()
      .replace(/\s/g, "");

    try {
      setLoading(true);

      const payload = {
        firstName,
        middleName,
        lastName,
        name,
        birthdate: birthDateObject,
        mobileNumber,
        email,
        departmentId: department,
        designationId: designation,
        roleId: roleId,
        companyId: companyId,
        cardNumber,
        balance,
      };

      if (isEditMode) {
        const res = await fetch(`/api/employee/user/${initialData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
          roleId,
          // If your sign up action supports companyId, add it here: ,companyId
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
    <div className="py-12">
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
          disabled={loadingBaseData}
          placeholder="Select Department"
        />
        {department && (
          <SearchSelect
            label="Designation"
            options={designationOptions}
            value={designation ?? undefined}
            onChange={(val) => setDesignation(val)}
            disabled={!department || loadingDesignations}
            placeholder={
              !department
                ? "Select Department first..."
                : "Select a Designation"
            }
          />
        )}

        <SearchSelect
          label="System Role"
          options={roleOptions}
          value={roleId ?? undefined}
          onChange={(val) => setRoleId(val)}
          disabled={loadingBaseData}
          placeholder="Select a Role"
        />

        <SearchSelect
          label="Company Unit"
          options={companyOptions}
          value={companyId ?? undefined}
          onChange={(val) => setCompanyId(val)}
          disabled={loadingBaseData}
          placeholder="Select a Company"
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
