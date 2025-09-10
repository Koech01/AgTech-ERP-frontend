import React from 'react';
import type { CropByType } from '../types';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, useMediaQuery, useTheme } from '@mui/material';


type FarmerChartProps = {
  data: CropByType[];
  loading: boolean;  
};


const FarmerChart: React.FC<FarmerChartProps> = ({ data, loading }) => {

  const dataset = data.map(d => ({crop: d.name.join(', '), count: Number(d.count || 0)}));
  const isEmpty = dataset.every(d => d.count === 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const chartMargin = isMobile ? { left: 0, right: 0, top: 0, bottom: 10 } : { left: 0, right: 0, top: 0, bottom: 40 }; 
  const chartHeight = isMobile ? 380 : 350; 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 mt-6 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>  
    );
  }
 
  return (
    <Box className="w-full sm:border-0 pl-0 ml-0 sm:p-4 sm:ml-4"> 
      {isEmpty ? (
        <div id="alert-additional-content-1" className="p-4 mt-5 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
          <div className="flex items-center">
            <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>

            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Add Your First Crop.</h3>
          </div>

          <div className="mt-2 mb-4 text-sm">
            Get started by adding crops to see your farm stats and insights.
          </div> 
        </div> 
      ) : (

        <BarChart
          dataset={dataset}
          xAxis={[
            {
              dataKey: 'crop',
              label: 'Crop Type',
              labelStyle: { fontSize: 14, fill: '#A3A3A3' },
              tickLabelStyle: { fill: '#A3A3A3', fontSize: 12 },
            },
          ]}
          yAxis={[
            {
              dataKey: 'count',
              label: 'Quantity (units)',
              labelStyle: { fontSize: 14, fill: '#A3A3A3' },
              tickLabelStyle: { fill: '#A3A3A3', fontSize: 12 },
            },
          ]}
          series={[{ dataKey: 'count', color: 'url(#CropPattern)' }]} // use pattern
          height={chartHeight}
          margin={chartMargin} 
          sx={{
            [`.${axisClasses.root}`]: {
              [`.${axisClasses.line}`]: { stroke: '#A3A3A3', strokeWidth: 2 },
              [`.${axisClasses.tick}`]: { stroke: '#A3A3A3', strokeWidth: 2 },
            },
          }}
        >
          {/* Gradient example */}
          <linearGradient id="CropGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>

          {/* Pattern example */}
          <pattern
            id="CropPattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="40"
            patternTransform="scale(0.5)"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="#4F46E5" />
            <path
              d="M0 20h20L10 40zm-10-10h20L0 20zm20 0h20L20 20zM0-5h20L10 15z"
              strokeWidth="1"
              stroke="#818CF8"
              fill="none"
            />
          </pattern>
        </BarChart> 
      )}
    </Box>
  );
};

export default FarmerChart;