import React from "react";
import connectDB from "@/config/database";
import Room from "@/models/Room";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
const RoomPage = async ({ params }) => {
  const { roomNumber } = params;
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    redirect("/login");
  }
  const stairsRooms = [
    "145",
    "214",
    "215",
    "216",
    "217",
    "218",
    "219",
    "319",
    "320",
    "321",
    "322",
    "323",
    "324",
    "325",
    "326",
  ];

  if (isNaN(roomNumber)) {
    return redirect("/err");
  }

  await connectDB();

  const room = await Room.findOne({ Pokoj: roomNumber }).lean();

  if (!room) {
    return redirect("/err");
  }

  const isStairsOnly = stairsRooms.includes(roomNumber.toString());

  return (
    <div className="main flex flex-col justify-start items-center h-screen p-4">
      <div className="print-legend hidden print:block absolute top-0 right-0  text-right text-xs">
        <h1>Legenda:</h1>
        <p>WG - Winda Główna</p>
        <p>WS - Winda Szklana</p>
        <p>WB - Winda Biblioteczna</p>
        <p>SCH - Schody</p>
      </div>

      <h1 className="print text-4xl md:text-5xl mb-6">Pokój {room.Pokoj}</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <tbody>
          {room.Pokoj > 400 && (
            <tr className="border-t">
              <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
                Budynek:
              </td>
              <td className="p-2 md:p-4 text-base md:text-lg">A3</td>
            </tr>
          )}

          {room.Atrybuty && (
            <tr className="border-t print:hidden">
              <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
                Atrybuty:
              </td>
              <td className="p-2 md:p-4 break-words text-base md:text-lg">
                {room.Atrybuty}
              </td>
            </tr>
          )}
          {room.Winda && (
            <tr className="border-t">
              <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
                Trasa:
              </td>
              <td className="p-2 md:p-4 break-words text-base md:text-lg">
                {room.Winda}
              </td>
            </tr>
          )}
          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Poziom:
            </td>
            <td className="p-2 md:p-4 text-base md:text-lg">
              {room.Pokoj === 400 ? "4+5+6" : room.Poziom}
            </td>
          </tr>
          {room.Sektor && (
            <tr className="border-t">
              <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
                Sektor:
              </td>
              <td className="p-2 md:p-4 text-base md:text-lg">{room.Sektor}</td>
            </tr>
          )}
        </tbody>
      </table>
      {isStairsOnly && (
        <p className="p-2 md:p-4 text-red-500 text-lg md:text-3xl">
          Uwaga: Schody!
        </p>
      )}
    </div>
  );
};

export default RoomPage;
