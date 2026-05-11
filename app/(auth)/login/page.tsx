"use client";

import { useState } from "react";
import InputField from "@/components/UI/InputField";
import { LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { signIn } from "@/actions/admin/signIn";
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
            <p className="text-sm text-gray-300">
              Sign in to manage your SmartCard access
            </p>
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
        <div className="max-w-lg mx-auto md:mx-0 space-y-4">
          <div className="h-1 w-12 bg-gold-400 rounded-full mb-4" />
          <h2 className="text-4xl font-bold leading-tight">
            Seamless <br />
            Corporate Access
          </h2>
          <p className="leading-relaxed text-lg text-gray-200">
            The{" "}
            <span className="font-bold text-gold-200 underline">
              Smart Access System
            </span>{" "}
            is an integrated, company-wide platform that unifies three core
            employee functions — physical door access, daily attendance
            tracking, and canteen cashless payments — into a single contactless
            card. The system eliminates the need for multiple identification
            tools and gives HR and admin staff real-time visibility into
            employee activity.
          </p>
        </div>
      </div>
    </div>
  );
}
