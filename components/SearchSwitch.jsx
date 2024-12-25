"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const SearchSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVrvMode, setIsVrvMode] = useState(false);

  // Load the initial state from the cookie and handle redirection on page load
  useEffect(() => {
    const savedState = document.cookie
      .split("; ")
      .find((row) => row.startsWith("vrvMode="))
      ?.split("=")[1];
    const isVrvEnabled = savedState === "true";

    setIsVrvMode(isVrvEnabled);

    // Redirect to /aggregate if the toggle is in the checked state
    if (isVrvEnabled && !pathname.startsWith("/aggregate")) {
      router.push("/aggregate");
    }
  }, [pathname, router]);

  const handleToggle = (checked) => {
    setIsVrvMode(checked);

    // Save the state in a cookie
    document.cookie = `vrvMode=${checked}; path=/; max-age=31536000`; // 1 year

    // Redirect based on the toggle state
    router.push(checked ? "/aggregate" : "/");
  };

  return (
    <div className="flex flex-col items-center justify-center absolute left-[15rem] space-y-1 md:space-y-0 md:flex-row md:space-x-2 top-8">
      <Switch
        id="change-search"
        checked={isVrvMode}
        onCheckedChange={handleToggle}
      />
      <label
        htmlFor="change-search"
        className="text-sm font-medium text-gray-700 sm:ml-2"
      >
        Zmień wyszukiwanie
      </label>
    </div>
  );
};

export default SearchSwitch;