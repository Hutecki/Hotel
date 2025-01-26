import React from "react";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
import { setVrvMode, getVrvMode } from "@/services/vrvMode";
const HomePage = async () => {
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    redirect("/login");
  }
  const vrvMode = await getVrvMode();
  if (vrvMode) {
    redirect("/aggregate");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SearchBar />
    </div>
  );
};

export default HomePage;
