import React from "react";
import connectDB from "@/config/database";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
import Aggregate from "@/models/Aggregate";
import Place from "@/models/Place";
import Link from "next/link";

const AggregatePage = async ({ params }) => {
  const { aggregateNumber } = params;
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    redirect("/aggregate/login"); // Redirect to login page if not authenticated
  }

  await connectDB();

  // Fetch the aggregate
  const aggregate = await Aggregate.findOne({ VRV: aggregateNumber }).lean();
  if (!aggregate) {
    return redirect("/aggregate/err");
  }

  // Fetch all valid places
  const validPlaces = await Place.find({}, { Pokoj: 1 }).lean();
  const validPlaceNumbers = validPlaces.map(
    (place) => place.Pokoj.replace(/\s+/g, "_") // Normalize database places to match URL format
  );

  return (
    <div className="main flex flex-col justify-start items-center h-screen mt-[8rem]">
      <div className="print-legend hidden print:block absolute top-0 right-0 text-right text-xs">
        <h1>Legenda:</h1>
        <p>WG - Winda Główna</p>
        <p>WS - Winda Szklana</p>
        <p>WB - Winda Biblioteczna</p>
        <p>SCH - Schody</p>
      </div>

      <h1 className="print text-4xl md:text-5xl mb-6">
        Agregat {aggregate.VRV}
      </h1>
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <tbody>
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
              Pomieszczenie:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              {aggregate.Pomieszczenie}
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Pokoje:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              {aggregate.Places && aggregate.Places.length > 0
                ? aggregate.Places.map((place, index) => {
                    // Normalize the place name for comparison
                    const normalizedPlace = place.replace(/\s+/g, "_");
                    const isValid = validPlaceNumbers.includes(normalizedPlace);

                    return isValid ? (
                      <Link
                        key={index}
                        href={`/aggregate/listingsPlaces/${normalizedPlace}`}
                        className="hover:text-gray-500"
                      >
                        {place}
                      </Link>
                    ) : (
                      <span
                        key={index}
                        className="text-gray-600 cursor-not-allowed"
                        title="Pokój nie istnieje"
                      >
                        {place}
                      </span>
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
