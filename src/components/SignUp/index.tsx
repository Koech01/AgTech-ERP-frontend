import { useAuth } from '../Auth/authContext';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 


const SignUp = () => {

  const navigate = useNavigate();
  const { setAccessToken, setRole } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { accessToken, role } = useAuth();


  useEffect(() => {
    if (accessToken && role) {
      navigate(role === 'admin' ? '/admin' : '/');
    }
  }, [accessToken, role, navigate]);


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessages =
          typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Registration failed.';
        setError(errorMessages);
        setLoading(false);
        return;
      }
 
      const { access } = data.tokens;
      const { role } = data.user;

      setAccessToken(access);
      setRole(role); 

      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate(role === 'admin' ? '/admin' : '/');
      }, 1000);
    } 
    
    catch { setError('Something went wrong. Please try again.'); } 
    
    finally { setLoading(false); }
  };

  
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  
  return (
    <div className='font-myFont flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-900 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mb-[0px] pb-[0px] text-center text-2xl font-bold tracking-tight text-white'>
          Create a new account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          onSubmit={handleSignup}
          className='space-y-6 p-6 pt-1 rounded-lg w-full max-w-md mx-auto mt-1'
        >
          
          {error && (  
            <div id='alert-additional-content-2' className='p-2 mb-2 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800' role='alert'>
              <div className='flex items-center'>
                <svg className='shrink-0 w-4 h-4 me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z'/>
                </svg>
                <span className='sr-only'>Info</span>
                <h3 className='text-lg font-medium'>Error</h3>
              </div>

              <div className='mt-1 mb-1 text-sm'>{error}</div>
            </div>
          )}

          {success && <p className='text-green-600 text-sm text-center'>{success}</p>}

          <div className='m-0 p-0'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='block w-full rounded-t-md bg-gray-800 border border-gray-600 px-2 py-2 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div className='m-0 p-0'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='block w-full bg-gray-800 border border-gray-600 px-2 py-2 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-[5px]'
            />
          </div>

          <div className='m-0 p-0'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='block w-full rounded-b-md bg-gray-800 border border-gray-600 px-2 py-2 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-[5px] mb-[20px]'
            />
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-indigo-500 px-2 py-2 text-[15px] text-white font-semibold hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className='mt-1 text-center text-sm text-gray-400'>
          Already have an account ? {' '}

          <Link
            to='/login'
            className='font-semibold text-indigo-400 hover:text-indigo-300 ml-[5px]'
          >
            Login
          </Link>  
        </p>
      </div>
    </div>
  );
};

export default SignUp;