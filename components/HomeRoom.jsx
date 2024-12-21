import React from "react";
import Link from "next/link";

const HomeRoom = ({ room }) => {
  return (
    <Link href={`/room/${room.Pokoj}`} passHref>
      <div
        className={`relative mt-1 room-${room.Pokoj} p-4 border border-gray-300 rounded cursor-pointer`}
      >
        {/* Sektor Indicator */}
        <div className="ui absolute top-1 right-1  text-white text-xs px-2 py-1 rounded">
          Sektor {room.Sektor}
        </div>

        {/* Room Link */}
        <button className="w-full h-full text-center">{room.Pokoj}</button>
      </div>
    </Link>
  );
};

export default HomeRoom;
