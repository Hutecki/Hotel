// app/aggregate/[aggregateNumber]/layout.js
import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
import AggregateEditForm from "@/components/AggregateEditFrom"; // Note: Typo in original filename? 'From' vs 'Form'
import Aggregate from "@/models/Aggregate";
import connectDB from "@/config/database";
import { hasAdminPermission } from "@/lib/permissions"; // <-- Import new function

// Layout is already async
const AggregateLayout = async ({ children, params }) => {
  await connectDB();
  const aggregate = await Aggregate.findOne({
    VRV: params.aggregateNumber,
  }).lean();

  if (aggregate && aggregate._id) {
    aggregate._id = aggregate._id.toString();
  }

  // Use the centralized permission check
  const canEditAggregate = await hasAdminPermission(); // <-- Use the function

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
            height={64} // Adjusted height to match other layout
          />
          <Link
            className="ui-Home-Container absolute left-[10rem]"
            href="/aggregate"
          >
            <FaHome size={32} className="ui-Home" />
          </Link>
          {/* Pass the determined permission flag */}
          {/* Also pass aggregate only if it exists */}
          {aggregate && (
            <AggregateEditForm
              aggregate={aggregate}
              canEdit={canEditAggregate}
            />
          )}
        </div>
      </div>
      <Link
        href="/aggregate/listingsAggregates"
        className="absolute ui-Link top-[5.5rem] left-1 text-white rounded-full shadow p-2 bg-[#C19A6B]"
        title="Powrót"
      >
        <FaArrowLeft size={20} />
      </Link>

      {/* Adjust pt-20 to avoid overlap with fixed navbar */}
      <div className="pt-20">{children}</div>

      {/* Removed fixed positioning for credits if it's inside scrolling content */}
      {/* <div className="credits font-Roboto text-sm md:text-base font-extralight italic text-right pr-2 py-1">
         design: Hubert & Jerzy
       </div> */}
    </div>
  );
};

export default AggregateLayout;
