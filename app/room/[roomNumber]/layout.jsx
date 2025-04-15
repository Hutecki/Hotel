// app/room/[roomNumber]/layout.js
import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
import RoomEditForm from "@/components/RoomEditForm";
import Room from "@/models/Room";
import connectDB from "@/config/database";
import { redirect } from "next/navigation";
import RoomExtras from "@/components/RoomExtras";
import { hasAdminPermission } from "@/lib/permissions"; // <-- Import new function

// Layout is already async
const RoomLayout = async ({ children, params }) => {
  const { roomNumber } = params;
  if (isNaN(roomNumber)) {
    console.error("Invalid room number:", roomNumber);
    return redirect("/err"); // Consider redirecting to a known error page or 404
  }
  await connectDB();

  const room = await Room.findOne({ Pokoj: params.roomNumber }).lean();
  if (room && room._id) {
    room._id = room._id.toString();
  }

  // Use the centralized permission check
  const canEditRoom = await hasAdminPermission(); // <-- Use the function

  return (
    <div className="room-detail">
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
          {room && <RoomExtras />} {/* Conditionally render if room exists */}
          {/* Pass permission flag and only render/pass room if it exists */}
          {room && <RoomEditForm room={room} canEdit={canEditRoom} />}
        </div>
      </div>
      <div className="pt-20">{children}</div> {/* Adjust pt-20 */}
      {/* Removed fixed positioning for credits if it's inside scrolling content */}
      {/* <div className="credits font-Roboto text-sm md:text-base font-extralight italic text-right pr-2 py-1">
         design: Hubert & Jerzy
       </div> */}
    </div>
  );
};

export default RoomLayout;
