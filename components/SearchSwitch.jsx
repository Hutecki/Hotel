"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const SearchSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVrvMode, setIsVrvMode] = useState(false);

  useEffect(() => {
    if (pathname === "/login") return;

    const savedState = document.cookie
      .split("; ")
      .find((row) => row.startsWith("vrvMode="))
      ?.split("=")[1];
    const isVrvEnabled = savedState === "true";

    setIsVrvMode(isVrvEnabled);

    if (isVrvEnabled && !pathname.startsWith("/aggregate")) {
      router.push("/aggregate");
    }
  }, [pathname, router]);

  const handleToggle = (checked) => {
    setIsVrvMode(checked);

    document.cookie = `vrvMode=${checked}; path=/; max-age=31536000`;

    router.push(checked ? "/aggregate" : "/");
  };

  if (pathname !== "/aggregate" && pathname !== "/") {
    return null;
  }

  return (
    <div className="Switch flex flex-col items-center absolute right-2 justify-start space-y-1 md:space-y-0 md:flex-row md:space-x-2 top-[40%]">
      <label
        htmlFor="change-search"
        className="text-base font-medium text-gray-700 sm:ml-2 sm:text-xs"
      >
        Pokoje
      </label>
      <Switch
        id="change-search"
        checked={isVrvMode}
        onCheckedChange={handleToggle}
      />
      <label
        htmlFor="change-search"
        className="text-base font-medium text-gray-700 sm:ml-2 sm:text-xs"
      >
        Agregaty
      </label>
    </div>
  );
};

export default SearchSwitch;
