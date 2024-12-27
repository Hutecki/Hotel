import React from "react";
import SearchPlace from "@/components/SearchPlace";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
const HomePageAggregate = async () => {
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    redirect("/login"); // Redirect to login page if not authenticated
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <SearchPlace />
    </div>
  );
};

export default HomePageAggregate;
