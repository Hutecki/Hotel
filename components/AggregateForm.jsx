"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import addAggregate from "@/app/actions/addAggregate";
import { usePathname } from "next/navigation";
const AggregateForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  if (pathname !== "/aggregate/listingsAggregates") return null;
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await addAggregate(formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to add aggregate:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="add_button ui-Link absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C19A6B]">
          <FaPlus size={20} />
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj nowy agregat</DialogTitle>
          <DialogDescription>
            Wypełnij dane dla nowego agregatu
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSubmit(formData);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="VRV"
            placeholder="VRV"
            required
            className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
          />
          <input
            type="text"
            name="Zabezpieczenie"
            placeholder="Zabezpieczenie"
            required
            className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
          />
          <input
            type="text"
            name="Pomieszczenie"
            placeholder="Pomieszczenie"
            className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
          />
          <textarea
            name="Places"
            placeholder="Pokoje (comma-separated)"
            className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
            rows="3"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C19A6B] text-white p-3 rounded-md hover:shadow-md"
          >
            {isSubmitting ? "Dodawanie..." : "Dodaj agregat"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AggregateForm;
