// "use client";
import HomeRoom from "./HomeRoom";
import connectDB from "@/config/database";
import Room from "@/models/Room";

const RoomListing = async () => {
  await connectDB();
  const rooms = await Room.find({}).lean();

  console.log(rooms);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-10">Room Listings</h1>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
        {rooms.map((room) => (
          <HomeRoom key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomListing;
