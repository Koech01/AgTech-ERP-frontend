// src/components/Home/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';



const adminItems = [
  { label: 'Dashboard', to: '/', icon: 
    (
        <svg
className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
aria-hidden='true'
xmlns='http://www.w3.org/2000/svg'
fill='currentColor'
viewBox='0 0 22 21'
>
<path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
<path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
</svg>
    )
   },
  { label: 'Crops', to: 'crops', icon: (
    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
<path fill="currentColor" d="M10.9715 12.2168c-.0118.0406-.0234.0795-.0347.1166.0391.0574.0819.1192.1278.1855.3277.473.812 1.172 1.2141 2.0892.2147-.2864.4616-.5799.7447-.8832l-.0024-.0317c-.0236-.3254-.0361-.7783.0091-1.2905.0882-.9978.4095-2.3695 1.4623-3.39555 1.0079-.98229 2.3556-1.42385 3.4044-1.59916.5344-.08932 1.0323-.11665 1.4296-.09869.1954.00883.3932.02974.5707.07034.0872.01996.1979.05097.3114.10232.0867.03927.3102.14854.4769.39195.1453.21217.1993.45929.22.55586.0321.14963.0559.32134.0712.50398.0307.36676.0311.82807-.0291 1.32915-.1181.9828-.4871 2.2522-1.47 3.2102-1.0357 1.0093-2.4736 1.3803-3.5197 1.5249-.542.0749-1.0253.0952-1.3736.0969-.036.0002-.0706.0002-.1037 0-.931.9987-1.2688 1.7317-1.4072 2.3512-.0345.1545-.0581.303-.0739.451.0004.0342.0006.0685.0006.1029v2c0 .5523-.4477 1-1 1s-1-.4477-1-1c0-.1991-.0064-.4114-.0131-.6334-.0142-.4713-.0298-.9868.0117-1.5138-.0358-1.8786-.7555-2.9405-1.40123-3.8932-.13809-.2037-.2728-.4025-.39671-.6032-.05186-.0105-.10709-.0222-.16538-.035-.39471-.0865-.93803-.2268-1.53416-.4432-1.15636-.4197-2.67587-1.1841-3.58743-2.5531-.90552-1.35993-1.03979-2.96316-.96002-4.15955.04066-.60984.13916-1.15131.24451-1.56046.05234-.20327.10977-.38715.16845-.53804.02865-.07367.06419-.15663.10713-.23658.02132-.03968.0522-.09319.0933-.15021.03213-.04456.11389-.15344.24994-.25057.18341-.13093.36351-.16755.42749-.17932.0854-.01572.16019-.01941.21059-.02024.1023-.0017.20235.00733.28493.0176.17089.02126.37298.06155.58906.11526.43651.1085.99747.2886 1.59668.54576 1.16944.50188 2.63819 1.3629 3.52935 2.70126.9248 1.38891.9601 2.99601.818 4.14739-.0726.589-.1962 1.0975-.3016 1.4594Z"/>
</svg>
  ) },
  { label: 'Farmers', to: 'farmers', icon: (
    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
<path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
</svg>
  ) },
  { label: 'Koech', to: 'profile', icon: (
    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
<path fill="currentColor" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
</svg>
  ) },
  { label: 'Sign Out', to: '/', icon: (
    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
</svg>
  ) },
];

const AdminLayout = () => (
  <>
    <button /* mobile toggle */ className="inline-flex items-center p-2 mt-2 ms-3 ..." >
      <span className="sr-only">Open sidebar</span>
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/></svg>
    </button>
    <Sidebar items={adminItems} />
    <Outlet />
  </>
);

export default AdminLayout;
