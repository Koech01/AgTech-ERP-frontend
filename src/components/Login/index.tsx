import { useAuth } from '../Auth/authContext';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 


const Login = () => {

  const { setAccessToken, setRole } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Invalid email or password');
        setLoading(false);
        return;
      }

      const { access, role } = data;  
      setAccessToken(access);
      setRole(role); 
      navigate(role === 'admin' ? '/admin' : '/');
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
          Sign in to your account.
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleLogin} className='space-y-6 p-6 pt-1 rounded-lg w-full max-w-md mx-auto mt-1'>

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
        
          <div className='m-0 p-0'>
            <input
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='email'
              className='block w-full rounded-t-md bg-gray-800 border border-gray-600 px-2 py-2 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div className='m-0 p-0'>
            <input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='current-password'
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className='mt-1 text-center text-sm text-gray-400'>
          Don't have an account ? {' '}
          <Link
            to='/signup'
            className='font-semibold text-indigo-400 hover:text-indigo-300 ml-[5px]'
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 