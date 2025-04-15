import React from "react";
import Link from "next/link";
import connectDB from "@/config/database";
import Place from "@/models/Place";
import Aggregate from "@/models/Aggregate";

const PlacePage = async ({ params }) => {
  const { placeNumber } = params;

  if (!placeNumber) {
    redirect("/aggregate/err");
  }
  await connectDB();

  const place = await Place.findOne({ Pokoj: placeNumber }).lean();

  if (!place) {
    return redirect("/aggregate/err");
  }
  const aggregate = await Aggregate.findOne({ VRV: place.Agregat }).lean();

  return (
    <div className="main flex flex-col justify-start items-center h-screen p-4 mt-10">
      <h1 className="print text-4xl md:text-5xl mb-6">
        Pokój {place.Pokoj.replace(/_/g, " ")}
      </h1>

      <table className="table-auto border-collapse border border-gray-300 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <tbody>
          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Budynek:
            </td>
            <td className="p-2 md:p-4 text-base md:text-lg">{place.Budynek}</td>
          </tr>

          <tr className="border-t print:hidden">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Sektor:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              {place.Sektor}
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-2 md:p-4 border-r font-medium text-base md:text-lg">
              Agregat:
            </td>
            <td className="p-2 md:p-4 break-words text-base md:text-lg">
              <Link
                href={`/aggregate/listingsAggregates/${place.Agregat}`}
                className="hover:text-gray-500"
              >
                {place.Agregat}
              </Link>
            </td>
          </tr>

          {aggregate && (
            <>
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
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlacePage;
