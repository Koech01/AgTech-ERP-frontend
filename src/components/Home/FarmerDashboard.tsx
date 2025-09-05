import type { CropByType } from "../types";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/authContext";
import FarmerChart from "../Chart/FarmerChart";


const DEFAULT_CROP_TYPES: CropByType[] = [
  { crop_type: 'Cereal/Grain', count: 0 },
  { crop_type: 'Legume', count: 0 },
  { crop_type: 'Vegetable', count: 0 },
  { crop_type: 'Fruit', count: 0 },
  { crop_type: 'Root/Tuber', count: 0 },
  { crop_type: 'Oil Crop', count: 0 },
  { crop_type: 'Fodder/Forage', count: 0 },
];


const FarmerDashboard = () => {

  const { accessToken } = useAuth();
  const [cropsByType, setCropsByType] = useState<CropByType[]>(DEFAULT_CROP_TYPES);
  const [totalCrops, setTotalCrops] = useState<number>(0);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchCropStats = async () => {
      if (!accessToken) return;

      setLoading(true);  

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/farmer/crops/stats/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error("Failed to fetch crop stats");

        const data = await response.json();

        const mergedData = DEFAULT_CROP_TYPES.map((crop) => {
          const found = data.crops_by_type.find((d: CropByType) => d.crop_type === crop.crop_type);
          return found || crop;
        });

        setCropsByType(mergedData);
        setTotalCrops(data.total_count);
        setRank(data.rank);
      } 
      
      catch (error) {
        console.error(error);
        setCropsByType(DEFAULT_CROP_TYPES);
        setTotalCrops(0);
        setRank(null);
      } 
      
      finally { setLoading(false); }
    };

    fetchCropStats();
  }, [accessToken]);

  return (
    <div className="font-myFont p-4 h-[90vh] flex flex-col sm:border-0 sm:ml-64 sm:h-auto sm:flex-none sm:justify-start">
       
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-800/50 px-6 py-2.5 rounded-tl-[8px] rounded-tr-[12px] border-t sm:px-3.5 sm:before:flex-1">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-40"
          />
        </div>
        
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className="aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm/6 text-gray-100">
            <strong className="font-semibold">Koech</strong>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
              <circle r={1} cx={1} cy={1} />
            </svg>
            Welcome back to AgTech 👋🏻.
          </p>
        </div>

        <div className="flex flex-1 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:-outline-offset-4">
            <span className="sr-only">Dismiss</span>
          </button>
        </div>
      </div>


      <div className="w-full bg-white border-t-0 rounded-lg rounded-t-none shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-0">
        <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
          <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">

            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-1 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-1 text-3xl font-extrabold">{rank ?? '-'}</dt>
                <dd className="text-gray-500 dark:text-gray-400">Rank</dd>
              </div>

              <div className="flex flex-col items-center justify-center">
                <dt className="mb-1 text-3xl font-extrabold">{totalCrops}</dt>
                <dd className="text-gray-500 dark:text-gray-400">   {totalCrops === 1 ? "Crop Quantity (kg)" : "Crop Quantity (kgs)"}</dd>
              </div>
            </dl>

          </div> 
        </div>
      </div> 

      <div className="w-full">  
        {cropsByType && cropsByType.some(crop => crop.count > 0) && (
          <h5 className="text-xl font-bold dark:text-white text-center mt-10 mb-10 sm:mt-5 sm:mb-0">Crop Quantities by Type</h5> 
        )}
         <FarmerChart data={cropsByType} loading={loading} />
      </div>
    </div>
  );
};

export default FarmerDashboard;