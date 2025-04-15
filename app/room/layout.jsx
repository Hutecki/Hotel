// app/room/layout.js
// REMOVE "use client" if it exists
import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa"; // Removed FaPlus, RoomForm handles its own icon
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
import RoomForm from "@/components/RoomForm";
import { hasAdminPermission } from "@/lib/permissions"; // <-- Import new function

// Make layout async
const ListingLayout = async ({ children }) => {
  // <-- Make async

  // Use the centralized permission check
  const canManageRooms = await hasAdminPermission(); // <-- Use the function

  return (
    <>
      <div className="fixed navbar top-0 left-0 bg-white z-50 shadow-md border-b border-gray-300 w-full">
        {" "}
        {/* Added w-full */}
        <div className="relative h-20 flex items-center justify-start">
          <Image
            src={logo}
            alt="Logo"
            className="absolute left-[1rem] h-16 w-auto"
            width={110}
            height={64} // Adjusted height
          />
          <Link className="ui-Home-Container absolute left-[10rem]" href="/">
            <FaHome size={32} className="ui-Home" />
          </Link>
          {/* Pass the determined permission flag */}
          <RoomForm canManage={canManageRooms} />
        </div>
      </div>
      <div className="pt-[1rem]">{children}</div> {/* Adjust pt-20 */}
      <div className="credits font-Roboto fixed right-1 bottom-0 text-sm md:text-base font-extralight italic">
        design: Hubert & Jerzy
      </div>
    </>
  );
};

export default ListingLayout;
