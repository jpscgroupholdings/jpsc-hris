"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import { CheckIcon, GlobeIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const destination = session ? "/dashboard" : "/login";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={"/images/city_bg.jpg"}
          fill // Use fill for absolute background positioning
          className="object-cover"
          quality={75}
          alt="City Background"
          priority // Eager loading for LCP
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Content Container: Column on mobile, Row on Desktop */}
      <div className="z-10 flex w-full max-w-6xl flex-col gap-8 p-6 md:flex-row md:items-center md:p-12">
        {/* Text Section with Blur Effect */}
        <div className="relative flex-1 space-y-6 rounded-2xl bg-gray-500/50 p-8 text-white backdrop-blur-md border border-slate-700/50 shadow-2xl">
          <Image
            src={"/images/jpsc_logo.png"}
            alt="jpsc_logo"
            width={500}
            height={500}
            className="justify-self-center"
          />
          <h1 className="text-2xl font-bold md:text-4xl text-gold-500 text-center underline font-sans">
            JPSC Group Holdings Inc.
          </h1>

          <div className="space-y-4 text-sm leading-relaxed md:text-lg opacity-90">
            <p>
              <br />
              We partner with organizations to design and deliver
              technology-driven strategies that solve complex challenges,
              streamline operations, and unlock sustainable growth — turning
              vision into measurable outcomes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              label="Get Started"
              icon={CheckIcon}
              variant="success"
              className="w-full sm:w-auto"
              onClick={() => {
                router.push(destination);
                session
                  ? toast.success("Welcome Back!")
                  : toast.info("Please Login First");
              }}
            />
            <Button
              label="Official Website"
              icon={GlobeIcon}
              variant="info"
              className="w-full sm:w-auto"
              onClick={() => window.open("https://yourwebsite.com", "_blank")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
