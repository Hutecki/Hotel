import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome, FaPen } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
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
          <AggregateEditForm aggregate={aggregate} />
        </div>
      </div>

      <div className="h-screen">{children}</div>
    </div>
  );
};

export default AggregateLayout;
