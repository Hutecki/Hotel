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
import AggregateEditForm from "@/components/AggregateEditFrom";
import Aggregate from "@/models/Aggregate";
import connectDB from "@/config/database";

const AggregateLayout = async ({ children, params }) => {
  await connectDB();

  const aggregate = await Aggregate.findOne({
    VRV: params.aggregateNumber,
  }).lean();

  if (aggregate && aggregate._id) {
    aggregate._id = aggregate._id.toString();
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
          <Link
            className="ui-Home-Container absolute left-[10rem]"
            href="/aggregate"
          >
            <FaHome size={32} className="ui-Home" />
          </Link>
          {aggregate && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="edit_button absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg">
                  <FaPen size={17} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="mb-4">
                  <DialogTitle>Aktualizuj agregat</DialogTitle>
                  <DialogDescription>
                    Aktualizuj dane agregatu: {aggregate.VRV}
                  </DialogDescription>
                </DialogHeader>
                <AggregateEditForm aggregate={aggregate} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="h-screen">{children}</div>
    </div>
  );
};

export default AggregateLayout;
