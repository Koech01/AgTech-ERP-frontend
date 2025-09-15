import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/authContext';


const NotFound = () => {
    
    const { role } = useAuth();
    const homePath = role === 'admin' ? '/admin' : '/';

    return( 
        <>
            <main className='font-myFont grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8'>
                <div className='text-center'>
                <p className='text-base font-semibold text-indigo-400'>404</p>
                <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl'>
                    Page not found
                </h1>
                <p className='mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8'>
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <Link
                        to={homePath}
                        className='inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                        <span className='w-full'>Go back home</span>
                        <svg
                        className='w-4 h-4 ms-2 rtl:rotate-180'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 10'
                        >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M1 5h12m0 0L9 1m4 4L9 9'
                        />
                        </svg>
                    </Link>
                </div>
                </div>
            </main>
        </> 
    );
}

export default  NotFound;