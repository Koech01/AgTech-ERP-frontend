import { useAuth } from '../Auth/authContext'; 
import React, { useState, useEffect } from 'react';


interface Farmer {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

const FarmersList: React.FC = () => {
  const { accessToken } = useAuth();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/farmers/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to fetch farmers');
      setFarmers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this farmer?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/farmers/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error('Failed to delete farmer');
      setFarmers(farmers.filter(f => f.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className='p-6 bg-gray-900 min-h-screen text-white'>
        <h2 className='text-2xl font-bold mb-4'>Farmers</h2>
      
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
              <th className='px-4 py-2'>Username</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Active</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map(f => (
              <tr key={f.id} className='border-t border-gray-700'>
                <td className='px-4 py-2'>{f.username}</td>
                <td className='px-4 py-2'>{f.email}</td>
                <td className='px-4 py-2'>{f.is_active ? 'Yes' : 'No'}</td>
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
                        onClick={() => handleDelete(f.id)}
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

export default FarmersList;