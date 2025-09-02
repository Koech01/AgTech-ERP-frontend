import { useAuth } from '../Auth/authContext';
import React, { useState, useEffect } from 'react';


interface Crop {
  id: number;
  name: string;
  crop_type: string;
  quantity: number;
  farmer?: string;
}

interface CropsListProps {
  isAdmin?: boolean;
}

const Crops: React.FC<CropsListProps> = ({ isAdmin = false }) => {
  const { accessToken } = useAuth();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCrops = async () => {
    setLoading(true);
    const url = isAdmin ? 'http://127.0.0.1:8000/api/v1/crops/' : 'http://127.0.0.1:8000/api/v1/farmer/crops/';
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to fetch crops');
      setCrops(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this crop?')) return;
    const url = isAdmin
      ? `http://127.0.0.1:8000/api/v1/crops/${id}/`
      : `http://127.0.0.1:8000/api/v1/farmer/crops/${id}/`;
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error('Failed to delete crop');
      setCrops(crops.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className='p-6 bg-gray-900 min-h-screen text-white'>
      <h2 className='text-2xl font-bold mb-4'>Crops</h2>
      
      {error && ( 
        <div className='p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='min-w-full text-left border border-gray-700'>
          <thead>
            <tr className='bg-gray-800'>
              {isAdmin && <th className='px-4 py-2'>Farmer</th>}
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Type</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(c => (
              <tr key={c.id} className='border-t border-gray-700'>
                {isAdmin && <td className='px-4 py-2'>{c.farmer}</td>}
                <td className='px-4 py-2'>{c.name}</td>
                <td className='px-4 py-2'>{c.crop_type}</td>
                <td className='px-4 py-2'>{c.quantity}</td>
                <td className='px-4 py-2 space-x-2'>
                  <button
                    onClick={() => alert('Edit feature coming soon')}
                    type='submit'
                    disabled={loading}
                    className={`flex w-full justify-center rounded-md bg-indigo-500 px-2 py-2 text-[15px] text-white font-semibold hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Edit...' : 'Edit'}
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    type='submit'
                    disabled={loading}
                    className={`flex w-full justify-center rounded-md bg-indigo-500 px-2 py-2 text-[15px] text-white font-semibold hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Crops;