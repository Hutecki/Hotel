import React from "react";
import connectDB from "@/config/database";
import { redirect } from "next/navigation";
import Aggregate from "@/models/Aggregate";
import Place from "@/models/Place";
import Link from "next/link";

const AggregatePage = async ({ params }) => {
  const { aggregateNumber } = params;

  await connectDB();

  // Fetch the aggregate data
  const aggregate = await Aggregate.findOne({ VRV: aggregateNumber }).lean();
  if (!aggregate) {
    return redirect("/aggregate/err");
  }

  // Fetch all places and their relationships
  const places = await Place.find({}).lean();
  const placeMapping = places.reduce((acc, place) => {
    acc[place.Pokoj] = place.Powiazanie || [];
    return acc;
  }, {});

  return (
    <div className="main flex flex-col justify-start items-center h-screen mt-[8rem] relative">
      <h1 className="print text-4xl md:text-5xl mb-6">
        Agregat {aggregate.VRV}
      </h1>
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <tbody>
          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Pomieszczenie:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              {aggregate.Pomieszczenie}
            </td>
          </tr>
          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Zabezpieczenie:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              {aggregate.Zabezpieczenie}
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Pokoje:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              {aggregate.Places && aggregate.Places.length > 0
                ? aggregate.Places.map((place, index) => {
                    // Check if the place exists in Powiazanie
                    const mainRoom =
                      Object.keys(placeMapping).find((key) =>
                        placeMapping[key].includes(place)
                      ) || place;

                    const normalizedMainRoom = mainRoom
                      .replace(/\s+/g, "_")
                      .toLowerCase();

                    // Render as clickable link or plain text
                    return (
                      <Link
                        key={index}
                        href={`/aggregate/listingsPlaces/${normalizedMainRoom}`}
                        className="hover:text-gray-500"
                      >
                        {place}
                      </Link>
                    );
                  }).reduce((prev, curr) => [prev, ", ", curr])
                : "Brak danych"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AggregatePage;
