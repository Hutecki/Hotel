import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome, FaPen } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import RoomEditForm from "@/components/RoomEditForm";
import Room from "@/models/Room";
import connectDB from "@/config/database";
export const dynamic = "force-dynamic"; // Disable wrapping from parent layouts
import { redirect } from "next/navigation";
import RoomExtras from "@/components/RoomExtras";

const RoomLayout = async ({ children, params }) => {
  const { roomNumber } = params;
  if (isNaN(roomNumber)) {
    return redirect("/err");
  }
  await connectDB();

  // Fetch the current room details and convert it to plain JSON

  const room = await Room.findOne({ Pokoj: params.roomNumber }).lean();
  if (room && room._id) {
    room._id = room._id.toString(); // Convert _id to a string
  }

  return (
    <div className="room-detail">
      <div className="fixed navbar top-0 left-0 bg-white z-50 shadow-md border-b border-gray-300">
        <div className="relative h-20 flex items-center justify-start">
          <Image
            src={logo}
            alt="Logo"
            className="absolute left-[1rem] h-16 w-auto"
            width={110}
            height={100}
          />
          <Link className="ui-Home-Container absolute left-[10rem]" href="/">
            <FaHome size={32} className="ui-Home" />
          </Link>
          <RoomExtras />
          <RoomEditForm room={room} />
        </div>
      </div>

      <div className="h-screen">{children}</div>
    </div>
  );
};

export default RoomLayout;
