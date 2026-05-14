import { User as UserIcon } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";
import { Evaluation } from "@/models/performance/evaluation";
import { authClient } from "@/lib/auth/auth-client";
import { useEffect } from "react";
interface PersonnelStepProps {
  form: Partial<Evaluation>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userOptions: SearchSelectOption[];
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function PersonnelStep({
  form,
  handleChange,
  userOptions,
  setForm,
}: PersonnelStepProps) {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session?.user?.id) {
      setForm((p: any) => ({ ...p, evaluatedBy: session.user.id }));
    }
  }, [session?.user?.id]);
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex items-center gap-3 text-xl font-bold text-gray-800 border-b pb-4">
        <UserIcon className="text-blue-500" /> Personnel Information
      </div>
      <div className="grid grid-cols-1  gap-6">
        <SearchSelect
          label="Employee Name"
          options={userOptions}
          value={form.userId as any}
          onChange={(v) => setForm((p: any) => ({ ...p, userId: v as string }))}
        />
        <InputField
          type="text"
          label="Evaluated By"
          value={session?.user.name}
          disabled
          className="disabled:cursor-not-allowed"
        />
        <InputField
          label="Start Period"
          name="evaluationDateStart"
          type="date"
          value={form.evaluationDateStart as any}
          onChange={handleChange}
        />
        <InputField
          label="End Period"
          name="evaluationDateEnd"
          type="date"
          value={form.evaluationDateEnd as any}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
