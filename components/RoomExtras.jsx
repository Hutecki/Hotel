"use client";

import React from "react";
import Legend from "@/components/Legend";
import PrintButton from "@/components/PrintButton";

const RoomExtras = () => {
  return (
    <div className="absolute left-[13rem]">
      {/* Legend and PrintButton will only render on room pages */}
      <PrintButton />
      <Legend />
    </div>
  );
};

export default RoomExtras;
