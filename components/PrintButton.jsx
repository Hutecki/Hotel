"use client";

import React from "react";
import { FaPrint } from "react-icons/fa";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <FaPrint
      size={43}
      onClick={handlePrint}
      className="ui-Print print-btn print:hidden  cursor-pointer  p-2 rounded "
    />
  );
};

export default PrintButton;
