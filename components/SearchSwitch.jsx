"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { setVrvMode, getVrvMode } from "@/services/vrvMode";
const SearchSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVrvMode, setIsVrvMode] = useState(false);

  useEffect(() => {
    if (pathname === "/login") return;

    const fetchVrvMode = async () => {
      const vrvMode = await getVrvMode();
      setIsVrvMode(vrvMode);
    };

    fetchVrvMode();
  }, [pathname]);

  const handleToggle = async (checked) => {
    setIsVrvMode(checked);

    await setVrvMode(checked);

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
