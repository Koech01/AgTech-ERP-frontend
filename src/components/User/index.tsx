import { useState, useEffect } from 'react';
import { useAuth } from '../Auth/authContext';


const UserProfile = () => {

  const { accessToken } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ username: '',   email: '', profile_icon: null as File | null   });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProfileIcon, setSelectedProfileIcon] = useState<File | null>(null);


  useEffect(() => {
    if (!accessToken) return;
    const fetchUser = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/profile/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        setUser(data);
        setFormData({ username: data.username, email: data.email, profile_icon: null, });
      } 
      
      catch (error) { console.error(error); }

      finally { setLoading(false); }
    };

    fetchUser();
  }, [accessToken]);
 

  const toggleEditForm = () => setIsEditing(!isEditing);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'profile_icon' && files) {
      setFormData({ ...formData, profile_icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handlePhotoChangeClick = () => {
   const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');
    const payload = new FormData();
    payload.append('username', formData.username);
    payload.append('email', formData.email);

    
    if (selectedProfileIcon) {
      payload.append('profileIcon', selectedProfileIcon);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/update/', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to update profile. Please try again.');
        return;
      }

      let updatedProfileIcon = data.profile_icon;
      if (selectedProfileIcon) {
        updatedProfileIcon = URL.createObjectURL(selectedProfileIcon);
      }

      setUser({ ...data, profile_icon: updatedProfileIcon });

      const usernameChanged = formData.username !== user.username;
      const profileIconChanged = Boolean(selectedProfileIcon);

      if (usernameChanged || profileIconChanged) {
        setSuccessMessage('Profile updated successfully!');

        setTimeout(() => {
          setSuccessMessage('');
          setIsEditing(false);
        }, 2000);

      } 
      
      else { setIsEditing(false); }

    } 
    
    catch (error) { setErrorMessage('Network error. Please check your connection and try again.'); }
  };

  
  return (
    <div className='font-myFont p-4 sm:ml-64 flex flex-col items-center'> 
      {loading ? (
        <div className='flex items-center justify-center w-full lg:w-9/12 h-[50vh] mx-auto lg:mt-8 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
          <div role='status'>
            <svg aria-hidden='true' className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'/><path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill'/></svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>   
      ) : isEditing ? ( 
        <div className='isolate bg-gray-900 px-6 py-8 sm:py-12 lg:px-12 w-full lg:w-3/4'>
          <div
          aria-hidden='true'
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          >
            <div
            style={{
            clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75'
            />

          </div>

          <div className='mx-auto max-w-2xl text-center mb-0 pb-0'>
            <h2 className='text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl'>Account Settings</h2>
            <p className='mt-2 text-lg/8 text-gray-400'>Manage your personal information.</p>
          </div>

          <form className='mx-auto mt-0 pt-0 max-w-xl sm:mt-20' onSubmit={handleSubmit}>

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

            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
              <div className='sm:col-span-2 pt-0'>  
                <div className=' '> 
                  <div className='col-span-full'>
                    <label htmlFor='photo' className='block text-sm/6 font-medium text-white'>Photo</label>
                    <div className='mt-2 flex items-center gap-x-3'>
                      <img
                        className='w-24 h-24 rounded-full shadow-lg'
                        src={selectedProfileIcon ? URL.createObjectURL(selectedProfileIcon) : user.profile_icon }
                        alt='Bonnie image'
                      />
                      
                      <button 
                        type='button'
                        onClick={handlePhotoChangeClick}
                        className='rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20'>
                        Change
                      </button>

                      <input
                        type     = 'file'
                        accept   = 'image/jpeg, image/png, image/gif'
                        style    = {{ display: 'none' }}
                        onChange = {(e) => {
                          const selectedIcon = e.target.files?.[0];
                          if (selectedIcon) { setSelectedProfileIcon(selectedIcon); }
                        }}
                      />

                    </div>
                  </div>
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label htmlFor='email' className='block text-sm/6 font-semibold text-white'>Username</label>
                
                <div className='mt-2.5'>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete='given-name'
                    className='block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label htmlFor='email' className='block text-sm/6 font-semibold text-white'>Email</label>
                
                <div className='mt-2.5'>
                  <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete='email'
                  className='block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'
                  />
                </div>
              </div>
            </div>

            <div className='mt-10'>
              <button
              type='submit'
              className='block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
              >Save Changes</button>
            </div>

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
        </div>  
      ) : !user ? ( 
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
          <h3 className='text-lg font-medium'>No user data available.</h3>
        </div>

          <div className='mt-2 mb-4 text-sm'> 
            <b>Note: </b>This project is hosted on a free Render instance, which may spin down when inactive.<br/>
            If the application seems unresponsive, please log out and sign in again to refresh the connection.
          </div>
        </div>
      ) : (
        <>
          <div className='w-full lg:w-3/4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6 space-y-8 m-7'>
            <div className='flex items-center justify-between'> 
              <div className='flex items-center gap-4 flex-1'>
                <img className='w-24 h-24 rounded-full shadow-lg' src={user.profile_icon} alt={user.username} />

                <div className='flex flex-col w-full lg:w-1/2 p-2'>
                  <h4 className='text-xl text-gray-900 dark:text-white'>{user.username}</h4> 
                </div>
              </div>
    
              <button
                type='button'
                onClick={toggleEditForm}
                className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className='w-full lg:w-3/4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6 space-y-8'>
            <div className='flex flex-col md:flex-row md:gap-4 w-full'>
              <div className='flex items-start gap-4 w-full'> 
                <div className='flex flex-col w-full lg:w-1/2'>
                  <h5 className='text-base font-medium text-gray-900 dark:text-white'>Username</h5>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{user.username}</span>
                </div>

                <div className='flex flex-col w-full lg:w-1/2'>
                  <h5 className='text-base font-medium text-gray-900 dark:text-white'>Email</h5>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{user.email}</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col md:flex-row md:gap-4 w-full'>
              <div className='flex items-start gap-4 w-full'> 
                <div className='flex flex-col w-full lg:w-1/2'>
                  <h5 className='text-base font-medium text-gray-900 dark:text-white'>Joined</h5>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{new Date(user.created).toLocaleDateString()}</span>
                </div> 
              </div>
            </div>
          </div>
        </>
      )} 
    </div>  
  );
};

export default UserProfile;