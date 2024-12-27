import React from "react";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
const HomePage = async () => {
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SearchBar />
    </div>
  );
};

export default HomePage;
