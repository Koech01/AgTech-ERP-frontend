import DashboardCard from './DashboardCard';

const DashboardWrapper = () => { 

  // Example cards, can fetch real data later
  const cards = Array.from({ length: 3 });

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DashboardCard title="James" subtitle="Welcome back to Agri Tech" />
          <DashboardCard>
            <svg
              className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {cards.map((_, i) => (
            <DashboardCard key={i}>
              <svg
                className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </DashboardCard>
          ))}
        </div>

        <DashboardCard className="h-48 mb-4">
          <svg
            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardWrapper;
