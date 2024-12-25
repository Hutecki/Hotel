// "use client";
import connectDB from "@/config/database";
import ShowAggregate from "./ShowAggregate";
import Aggregate from "@/models/Aggregate";
const AggregateFind = async () => {
  await connectDB();
  const aggregates = await Aggregate.find({}).lean();
  console.log(aggregates);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-10">Spis pokoji</h1>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
        {aggregates.map((aggregate) => (
          <ShowAggregate key={aggregate._id} aggregate={aggregate} />
        ))}
      </div>
    </div>
  );
};

export default AggregateFind;
