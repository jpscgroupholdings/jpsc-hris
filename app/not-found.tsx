import React from "react";
import { OctagonAlertIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <OctagonAlertIcon className="text-yellow-400" size={100} />
      <p className="text-body">Page Not Found!</p>
    </div>
  );
}
