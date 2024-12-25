"use client";
import React, { useState } from "react";
import "@/assets/globals.css";
import Link from "next/link";
import { FaHome, FaPlus } from "react-icons/fa";
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
import AggregateForm from "@/components/AggregateForm";

const AggregateListingLayout = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openDialog}
                className="add_button absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C19A6B]"
              >
                <FaPlus size={20} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj nowy pokój</DialogTitle>
                <DialogDescription>
                  Wypełnij dane dla nowego pokoju
                </DialogDescription>
              </DialogHeader>
              <AggregateForm closeDialog={closeDialog} />
            </DialogContent>
          </Dialog>
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
