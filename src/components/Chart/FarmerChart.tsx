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

  const dataset = data.map(d => ({crop: d.crop_type, count: Number(d.count || 0),}));
  const isEmpty = dataset.every(d => d.count === 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const chartMargin = isMobile ? { left: 0, right: 0, top: 0, bottom: 10 } : { left: 0, right: 0, top: 0, bottom: 40 }; 
  const chartHeight = isMobile ? 380 : 350; 

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading crop data...
      </div>
    );
  }
 
  return (
    <Box className="w-full sm:border-0 pl-0 ml-0 sm:p-4 sm:ml-4"> 
      {!loading && isEmpty ? (
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