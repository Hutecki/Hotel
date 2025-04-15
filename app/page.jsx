import React from "react";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";

import { getVrvMode } from "@/services/vrvMode";

const HomePage = async () => {
  const vrvMode = await getVrvMode();

  if (vrvMode) {
    redirect("/aggregate");
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SearchBar />
    </div>
  );
};

export default HomePage;
