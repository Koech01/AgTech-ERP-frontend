// src/components/Home/DashboardCard.tsx
type DashboardCardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
};

const DashboardCard = ({ title, subtitle, children, className = '' }: DashboardCardProps) => (
  <div className={`flex items-center justify-center rounded-sm bg-gray-50 dark:bg-gray-800 ${className}`}>
    {title ? (
      <div className="w-full max-w-md p-[8px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img className="w-12 h-12 rounded-full" src="src/assets/react.svg" alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0 ms-4 space-y-1">
                  <h6 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h6>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">{subtitle}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      children
    )}
  </div>
);

export default DashboardCard;
