"use client";

import { useState } from "react";
import InputField from "@/components/UI/InputField";
import { LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { signIn } from "@/actions/auth/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!username || !password) {
      return toast.error("Please enter both credentials.");
    }

    try {
      setLoading(true);
      await signIn(username, password);
      toast.success("Login Success! Redirecting...");
      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      console.error("Login crash:", err);
      toast.error(`${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col-reverse md:flex-row min-h-screen w-full overflow-hidden">
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat">
        <Image
          src={"/images/office_bg.png"}
          alt="office-bg"
          width={1920}
          height={1080}
          loading="eager"
        />
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-azure-950/50 backdrop-blur-[2px]" />
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-6 p-8 border border-white/20 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome
            </h1>
            <p className="text-sm text-gray-300">Sign in to continue...</p>
          </div>

          <div className="space-y-4">
            {/* Note: Ensure InputField components have white text/labels to be visible on dark bg */}
            <div>
              <InputField
                label="Username or Email"
                placeholder="Enter username"
                type="text"
                icon={MailIcon}
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="bg-background"
              />
            </div>

            <div>
              <InputField
                label="Password"
                placeholder="********"
                type="password"
                icon={LockIcon}
                showPassword={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 p-3 rounded-xl transition-all bg-gold-500 text-white hover:bg-gold-400 active:scale-[0.98] disabled:opacity-50 shadow-lg font-semibold"
          >
            {loading ? (
              <LoaderIcon className="animate-spin" size={20} />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="relative z-10 flex-1 flex flex-col justify-center p-8 md:p-16 text-white bg-transparent md:bg-white/5">
        <div className="max-w-xl mx-auto md:mx-0 space-y-4 p-6 rounded-3xl bg-azure-900/60">
          <div className="h-2 w-12 bg-gold-500 rounded-full mb-2" />
          <h2 className="text-5xl font-sans font-bold leading-tight">
            <span className="underline">JPSC</span> <br />
            Human Resource Information System
          </h2>
          <p className="leading-relaxed text-lg text-gray-200">
            A centralized, digital hub for managing employee data, automating
            routine HR tasks, and supporting compliance. Its primary purpose is
            to streamline core administrative processes—such as payroll,
            benefits, and time tracking—improving efficiency and providing
            data-driven insights for strategic decision-making.
          </p>
        </div>
      </div>
    </div>
  );
}
