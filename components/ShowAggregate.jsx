import React from "react";
import Link from "next/link";

const ShowAggregate = ({ aggregate }) => {
  return (
    <Link href={`/aggregate/listingsAggregates/${aggregate.VRV}`} passHref>
      <div
        className={`relative mt-1 room-${aggregate.Pokoj} p-4 border border-gray-300 rounded cursor-pointer`}
      >
        {/* Sektor Indicator */}
        <div className="ui absolute top-1 right-1  text-white text-xs px-2 py-1 rounded">
          Pom {aggregate.Pomieszczenie}
        </div>

        {/* Room Link */}
        <button className="w-full h-full text-center">{aggregate.VRV}</button>
      </div>
    </Link>
  );
};

export default ShowAggregate;
