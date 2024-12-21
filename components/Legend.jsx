"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Legend = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed top-0 right-0 md:top-[3rem] md:right-1 flex flex-col items-end">
      <div
        className={`legend-container fixed top-0 right-0 md:top-[3rem] text-neutral-500 thin-italic transition-transform transform ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center relative">
          <button
            onClick={toggleVisibility}
            className={`ui legend-toggle-button rounded-full text-white p-2 focus:outline-none transition-transform transform ${
              isVisible ? "rotate-180" : "rotate-0"
            }`}
            aria-label="Toggle Legend"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={32}
              className="chevron-icon transition-transform duration-300"
            />
          </button>
          {isVisible ? "" : <p className="thin-italic Alt">Legenda</p>}

          <div className="legend-content p-4">
            <h1 className="text-center">Legenda:</h1>
            <p>WG-Winda Główna</p>
            <p>WS-Winda Szklana</p>
            <p>WB-Winda Biblioteczna</p>
            <p>SCH-Schody</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
