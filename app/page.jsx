import React from "react";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
import { getVrvMode } from "@/services/vrvMode";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage = async () => {
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    await delay(1000);
    redirect("/login");
    return null;
  }

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
