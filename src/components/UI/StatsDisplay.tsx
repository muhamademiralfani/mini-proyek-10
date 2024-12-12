import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/async/dataSlice"; // Sesuaikan path
import { RootState, AppDispatch } from "../../redux/store";

const StatsDisplay: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { experience, country, sold, variant, status } = useSelector(
    (state: RootState) => state.data // Pastikan sesuai dengan nama reducer di store
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center text-white">Loading stats...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Failed to load stats data</div>;
  }

  const stats = [
    { number: experience, label: "Year Experience" },
    { number: country, label: "Opened in the country" },
    { number: sold, label: "Furniture sold" },
    { number: variant, label: "Variant Furniture" },
  ];

  return (
    <div className="bg-teal-600 rounded-lg p-6 w-full mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative flex flex-col items-center justify-center text-center p-4">
            <span className="text-4xl font-bold text-white mb-2">{stat.number}</span>
            <span className="text-white text-sm md:text-base whitespace-pre-wrap max-w-[120px]">{stat.label}</span>
            {index < stats.length - 1 && (
              <div className="hidden md:block absolute top-1/2 right-0 h-3/4 w-px bg-white/20 transform -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDisplay;
