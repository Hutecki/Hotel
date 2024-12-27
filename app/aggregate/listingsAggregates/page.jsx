import connectDB from "@/config/database";
import Aggregate from "@/models/Aggregate";
import { redirect } from "next/navigation";
import { checkAuthentication } from "@/services/authenticate";
import ShowAggregate from "@/components/ShowAggregate";
const AggregatePage = async () => {
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    redirect("/login"); // Redirect to login page if not authenticated
  }
  await connectDB();

  // Fetch rooms and sort by Pokoj (ascending order)
  const aggregates = await Aggregate.find({}).lean();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-10">
      <h1 className="text-4xl mb-10">Agregaty</h1>
      <div className="w-full max-w-6xl mx-auto">
        {aggregates.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 text-center">
            {aggregates.map((aggregate) => (
              <ShowAggregate key={aggregate._id} aggregate={aggregate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AggregatePage;
