import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, useMediaQuery, useTheme } from '@mui/material';


interface CropPerFarmer {
  farmer: string;
  totalCrops: number;
}


interface AdminChartProps {
  data: CropPerFarmer[];
  loading: boolean; 
}


const AdminChart: React.FC<AdminChartProps> = ({ data, loading }) => {

  const dataset = data.map((d) => ({farmer: d.farmer, crops: d.totalCrops,}));
  const isEmpty = dataset.length === 0;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const chartMargin = isMobile ? { left: 0, right: 25, top: 10, bottom: 0 } : { left: 0, right: 0, top: 0, bottom: 40 }; 
  const chartHeight = isMobile ? 350 : 300; 

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading crop data...
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
            <h3 className="text-lg font-medium">No Data Available.</h3>
          </div>

          <div className="mt-2 mb-4 text-sm">This chart will display the crops quantity (kgs) per farmer once crops are added.</div> 
        </div> 
      ) : ( 
        <LineChart
          dataset={dataset}
          xAxis={[
            {
              dataKey: 'farmer',
              label: 'Farmer Username',
              labelStyle: { fontSize: 14, fill: '#A3A3A3' },
              tickLabelStyle: { fontSize: 12, fill: '#A3A3A3' },
              scaleType: 'point',  
            },
          ]}
          yAxis={[
            {
              dataKey: 'crops',
              label: 'Total Crops (kgs.)',
              width: 60,
              labelStyle: { fontSize: 14, fill: '#A3A3A3' },
              tickLabelStyle: { fontSize: 12, fill: '#A3A3A3' },
            },
          ]}
          series={[{ dataKey: 'crops', },]}
          height={chartHeight}
          margin={chartMargin} 
          sx={{
            [`.${axisClasses.root}`]: {
              [`.${axisClasses.line}`]: { stroke: '#A3A3A3', strokeWidth: 2 },
              [`.${axisClasses.tick}`]: { stroke: '#A3A3A3', strokeWidth: 2 },
            },
          }}
        />
      )} 
    </Box>
  );
};

export default AdminChart;