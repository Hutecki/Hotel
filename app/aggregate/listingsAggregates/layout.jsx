// app/aggregate/layout.js
import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
import AggregateForm from "@/components/AggregateForm";
// ----> 1. Import the centralized permission function
import { hasAdminPermission } from "@/lib/permissions";

// Layout is async to allow await
const AggregateListingLayout = async ({ children }) => {
  // ----> 2. Call the function on the server to check permission
  const canManageAggregates = await hasAdminPermission();

  return (
    <>
      <div className="fixed navbar top-0 left-0 bg-white z-50 shadow-md border-b border-gray-300 w-full">
        <div className="relative h-20 flex items-center justify-start">
          {/* Navbar content... */}
          <Image
            src={logo}
            alt="Logo"
            className="absolute left-[1rem] h-16 w-auto"
            width={110}
            height={64}
          />
          <Link
            className="ui-Home-Container absolute left-[10rem]"
            href="/aggregate"
          >
            <FaHome size={32} className="ui-Home" />
          </Link>

          {/* ----> 3. Pass the permission result as a prop */}
          <AggregateForm canManage={canManageAggregates} />
        </div>
      </div>
      <div className="pt-20">{children}</div>
      <div className="credits font-Roboto fixed right-1 bottom-0 text-sm md:text-base font-extralight italic">
        design: Hubert & Jerzy
      </div>
    </>
  );
};

export default AggregateListingLayout;
