"use client";

import React from "react";
import Image from "next/image";
import Dziadzio from "@/assets/images/dziadzio_b_w_png.png";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <Image
        src={Dziadzio}
        alt="Loading..."
        className="loading-image"
        width={160}
        height={240}
      />
    </div>
  );
};

export default LoadingPage;
