import Modal from '../Modal';
import { useAuth } from '../Auth/authContext';
import React, { useEffect, useState } from 'react';


const CROP_TYPES = [
  { value: 'cereal', label: 'Cereal/Grain' },
  { value: 'legume', label: 'Legume' },
  { value: 'vegetable', label: 'Vegetable' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'root_tuber', label: 'Root/Tuber' },
  { value: 'oil_crop', label: 'Oil Crop' },
  { value: 'fodder', label: 'Fodder/Forage' },
  { value: 'other', label: 'Other' },
];


interface Crop {
  id: number;
  name: string;
  farmer: string;
  crop_type: string;
  quantity: number;
  created: string;
}


const Crops = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [formData, setFormData] = useState({name: '', crop_type: '', quantity: '',});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { accessToken, role } = useAuth();


  const fetchCrops = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/farmer/crops/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch crops');
      }

      const data = await response.json();
      setCrops(data); 
    }

    catch (error) { console.error(error); } 
    
    finally { setLoading(false); }
  };


  useEffect(() => { fetchCrops(); }, []);

  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleAddOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');  

    const url = editingCrop ? `http://127.0.0.1:8000/api/v1/farmer/crops/${editingCrop.id}/` : 'http://127.0.0.1:8000/api/v1/farmer/crops/';
    const method = editingCrop ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`, },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) { 
        const detail = data.detail || Object.values(data).flat().join(', ') || 'Something went wrong.';
        setErrorMessage(detail);
        return;
      }
 
      if (editingCrop) { setSuccessMessage('Crop updated successfully!'); } 
      else { setSuccessMessage('Crop added successfully!'); }

      setEditingCrop(null);
      setFormData({ name: '', crop_type: '', quantity: '' });

      fetchCrops();

      setTimeout(() => {
        setSuccessMessage('');
        setShowForm(false);
      }, 2000);

    } catch (error) { setErrorMessage('Network error. Please try again.'); }
  };


  const handleDeleteSelected = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        fetch(`http://127.0.0.1:8000/api/v1/farmer/crops/${id}/`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      )
    );

    setSelectedIds([]);
    fetchCrops();
    setIsDeleteModalOpen(false);
  };


  const toggleSelect = (id: number) => {
    setSelectedIds((prev: number[]) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };


  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.crop_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.quantity.toString().includes(searchTerm)
  );

  
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);


  return (
    <div className='font-myFont p-4 sm:ml-64'>
      <div className='w-full mt-1 mb-5'>  
        <h5 className='text-xl font-bold dark:text-white text-center my-3'>Crop Management</h5> 
      </div>
 
 
      {!showForm && (
        <div className='pb-4 bg-white dark:bg-gray-900'>
          <label htmlFor='table-search' className='sr-only'>Search</label>
          <div className='relative mt-1 flex flex-col md:flex-row items-start md:items-center justify-start md:space-x-7 space-y-3 md:space-y-0'>

            <input 
              type='text' 
              id='table-search' 
              className='block text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 h-10 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
              placeholder='Search for crops'  
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className='flex flex-row items-center gap-4'>
              <button
                type='button'
                className='inline-flex items-center py-2 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white'
                onClick={() => { setShowForm(true); console.log('ShowForm:', true); }}
              >
                Add Crop
              </button>

              {selectedIds.length > 0 && (
                <button 
                  onClick={() => setIsDeleteModalOpen(true)} 
                  type='button' 
                  className='inline-flex items-center py-2 px-3 text-xs font-medium text-white bg-red-700 border border-red-700 rounded-lg hover:bg-red-800 hover:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:focus:ring-red-900'
                >
                  Delete
                </button>
              )}
            </div>
          </div> 
        </div> 
      )}

  
      {loading ? (
        <div className='flex items-center justify-center h-64 mt-6 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
          <div role='status'>
            <svg aria-hidden='true' className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'/><path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill'/></svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : showForm ? ( 
        <form className='max-w-sm mx-auto' onSubmit={handleAddOrEdit}>  
          {successMessage && (
            <div className='flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400' role='alert'>
              <svg className='shrink-0 inline w-4 h-4 me-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z'/>
              </svg>
              <span className='sr-only'>Info</span>
              <div>
                <span className='font-medium'>Success !</span> {successMessage}
              </div>
            </div>
          )}

          <div className='sm:col-span-2 mb-3'>
            <label
              htmlFor='crop_type'
              className='block text-sm font-semibold text-white mb-2'
            >
              Crop Type
            </label>

            <div className='relative inline-block w-full'>
              <button
                type='button'
                onClick={() => setIsCropDropdownOpen((prev) => !prev)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
                items-center justify-between w-full dark:bg-blue-600 
                dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                {formData.crop_type ? CROP_TYPES.find((t) => t.value === formData.crop_type)?.label : 'Select Crop Type'}

                <svg
                  className='w-2.5 h-2.5 ml-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 4 4 4-4'
                  />
                </svg>
              </button>

              {isCropDropdownOpen && (
                <div
                  className='absolute z-10 mt-2 bg-white divide-y divide-gray-100 
                  rounded-lg shadow-sm w-full dark:bg-gray-700'
                >
                  <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
                    {CROP_TYPES.map((type) => (
                      <li key={type.value}>
                        <button
                          type='button'
                          className='block w-full text-left px-4 py-2 hover:bg-gray-100 
                          dark:hover:bg-gray-600 dark:hover:text-white'
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, crop_type: type.value }));
                            setIsCropDropdownOpen(false); 
                          }}
                        >
                        {type.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div> 
 
          <div className='mb-5'>
            <label htmlFor='name' className='block text-sm/6 font-semibold text-white'>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleFormChange}
              placeholder='Name'
              className='block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'
            />
          </div>
 
          <div className=' mb-5'>
            <label htmlFor='quantity' className='block text-sm/6 font-semibold text-white'>Quantity (Kgs)</label>
            <input
              id='quantity'
              name='quantity'
              type='number'
              value={formData.quantity}
              onChange={handleFormChange}
              placeholder='Quantity'
              className='block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'
            />
          </div>

          <button 
            type='submit' 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            {editingCrop ? 'Update' : 'Add'}
          </button>

          <button
            type='button'
            onClick={() => {
            setShowForm(false);
            setEditingCrop(null);
            }}
            className='inline-flex items-center py-2 px-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white ml-6'
          >
            Cancel
          </button>

          {errorMessage && (
            <div id='alert-additional-content-2' className='p-2 mt-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800' role='alert'>
              <div className='flex items-center'>
                <svg className='shrink-0 w-4 h-4 me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z'/>
                </svg>
                <span className='sr-only'>Info</span>
                <h3 className='text-lg font-medium'>Error</h3>
              </div>

              <div className='mt-1 mb-1 text-sm'>{errorMessage}</div>
            </div> 
          )}
        </form>
      ) : filteredCrops.length === 0 ? (
        <div
          id='alert-additional-content-1'
          className='p-4 mt-5 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800'
          role='alert'
        >
          <div className='flex items-center'>
            <svg className='shrink-0 w-4 h-4 me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z'/>
            </svg>

            <span className='sr-only'>Info</span>
            <h3 className='text-lg font-medium'>No Crop Available.</h3>
          </div>

          <div className='mt-2 mb-4 text-sm'> 
            <b>Note: </b>This project is hosted on a free Render instance, which may spin down when inactive.<br/>
            If the application seems unresponsive, please log out and sign in again to refresh the connection.
          </div>
        </div> 
      ) : ( 
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='p-4'>
                <div className='flex items-center'></div>
              </th>
              
              <th scope='col' className='px-6 py-3'>Crop Name</th>
              <th scope='col' className='px-6 py-3'>Type</th>
              <th scope='col' className='px-6 py-3'>Quantity (Kgs)</th>
              <th scope='col' className='px-6 py-3'>User</th> 
              <th scope='col' className='px-6 py-3'>Update</th> 
            </tr>
          </thead>

          <tbody>
            {filteredCrops.map((crop) => (
              <tr key={crop.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input 
                      id='checkbox-table-search-1' 
                      type='checkbox' 
                      checked={selectedIds.includes(crop.id)}
                      onChange={() => toggleSelect(crop.id)}
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label htmlFor='checkbox-table-search-1' className='sr-only'>checkbox</label>
                  </div>
                </td>

                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{crop.name}</th>
                <td className='px-6 py-4'>{CROP_TYPES.find((t) => t.value === crop.crop_type)?.label}</td>
                <td className='px-6 py-4'>{crop.quantity}</td>
                <td className='px-6 py-4'>
                  {role === 'farmer' ? new Date(crop.created).toLocaleDateString() : crop.farmer}
                </td>
                <td className='px-6 py-4'>
                <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  onClick={() => {
                    setEditingCrop(crop);
                    setFormData({
                      name: crop.name,
                      crop_type: crop.crop_type,
                      quantity: crop.quantity.toString(),
                    });
                    setShowForm(true);
                  }}
                >Edit</a>
                </td>
              </tr> 
            ))}
          </tbody> 
        </table> 
      )}
 
      {isDeleteModalOpen && (
        <Modal
          title='Confirm Deletion'
          message={`Are you sure you want to delete ${selectedIds.length} selected crop(s) ?`}
          confirmLabel='Delete'
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteSelected}
          confirmClass='bg-red-600 hover:bg-red-500'
        />
      )} 
    </div>
  );
};

export default Crops;