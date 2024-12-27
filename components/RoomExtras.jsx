"use client";

import React from "react";
import Legend from "@/components/Legend";
import PrintButton from "@/components/PrintButton";

const RoomExtras = () => {
  return (
    <div className="absolute left-[13rem]">
      <PrintButton />
      <Legend />
    </div>
  );
};

export default RoomExtras;
