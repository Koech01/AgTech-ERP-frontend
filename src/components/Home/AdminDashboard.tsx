import { useEffect, useState } from 'react';
import AdminChart from '../Chart/AdminChart';
import { useAuth } from '../Auth/authContext';


interface CropPerFarmer {
  farmer: string;
  totalCrops: number;
}


const AdminDashboard = () => {

  const { accessToken } = useAuth();
  const [totalFarmers, setTotalFarmers] = useState<number>(0);
  const [totalCrops, setTotalCrops] = useState<number>(0);
  const [cropsPerFarmer, setCropsPerFarmer] = useState<CropPerFarmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');  

  
  useEffect(() => {
    if (!accessToken) return;

    const fetchAdminStats = async () => {
      setLoading(true); 

      try {
        const reponse = await fetch('http://127.0.0.1:8000/api/v1/crops/stats/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!reponse.ok) throw new Error('Failed to fetch admin stats');

        const data = await reponse.json();

        setUsername(data.username);
        setTotalFarmers(data.total_farmers);
        setTotalCrops(data.total_crops);
        setCropsPerFarmer(data.crops_per_farmer || []);
      } 
      
      catch (error) {
        console.error(error);
        setTotalFarmers(0);
        setTotalCrops(0);
        setCropsPerFarmer([]);
        setUsername('User');
      } 
      
      finally { setLoading(false); }
    };

    fetchAdminStats();
  }, [accessToken]);


  return (
    <div className='font-myFont p-4 sm:ml-64'>
       
      <div className='relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-800/50 px-6 py-2.5 rounded-tl-[8px] rounded-tr-[12px] border-t border-t-white/10 sm:px-3.5 sm:before:flex-1'>
        <div
          aria-hidden='true'
          className='absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl'
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className='aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-40'
          />
        </div>
        <div
          aria-hidden='true'
          className='absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl'
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className='aspect-577/310 w-144.25 bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-40'
          />
        </div>
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
          <p className='text-sm/6 text-gray-100'>
            <strong className='font-semibold'>{username.charAt(0).toUpperCase() + username.slice(1)}</strong>
            <svg viewBox='0 0 2 2' aria-hidden='true' className='mx-2 inline size-0.5 fill-current'>
              <circle r={1} cx={1} cy={1} />
            </svg>
            Welcome back to AgTech 👋🏻.
          </p>
        </div>
        <div className='flex flex-1 justify-end'>
          <button type='button' className='-m-3 p-3 focus-visible:-outline-offset-4'>
            <span className='sr-only'>Dismiss</span>
          </button>
        </div>
      </div>


      <div className='w-full bg-white border border-gray-200 border-t-0 rounded-lg rounded-t-none shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-0'>
        <div id='fullWidthTabContent' className='border-t border-gray-200 dark:border-gray-600'>
          <div className=' p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800' id='stats' role='tabpanel' aria-labelledby='stats-tab'>

            <dl className='grid max-w-screen-xl grid-cols-2 gap-8 p-1 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white sm:p-8'>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-1 text-3xl font-extrabold'>{totalFarmers}</dt>
                <dd className='text-gray-500 dark:text-gray-400'>{totalCrops === 1 ? 'Farmer' : 'Farmers'}</dd>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-1 text-3xl font-extrabold'>{totalCrops}</dt>
                <dd className='text-gray-500 dark:text-gray-400'> {totalCrops === 1 ? 'Crop Quantity (kg)' : 'Crop Quantity (kgs)'}</dd>
              </div>
            </dl>

          </div> 
        </div>
      </div> 

      <div className='w-full'>   
        {cropsPerFarmer.length > 0 && !loading && (<h5 className='text-xl font-bold dark:text-white text-center mt-8 mb-8 sm:mt-5 sm:mb-0'>Total Crops per Farmer</h5>)}
        <AdminChart data={cropsPerFarmer} loading={loading}/>
      </div>
    </div>
  );
};

export default AdminDashboard;