"use client";
import React from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/images/logo_1_png.png";
import AggregateForm from "@/components/AggregateForm";

const AggregateListingLayout = ({ children }) => {
  return (
    <>
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
          <AggregateForm />
        </div>
      </div>

      <div className="pt-10">{children}</div>

      <div className="credits font-Roboto fixed right-1 bottom-0 text-sm md:text-base font-extralight italic">
        design: Hubert & Jerzy
      </div>
    </>
  );
};

export default AggregateListingLayout;
