import React from 'react';
import { GeoLocation } from '../types';

interface SimpleMapProps {
  location: GeoLocation;
  title?: string;
  className?: string;
}

const SimpleMap = ({ location, title, className = "h-60 w-full rounded-md overflow-hidden" }: SimpleMapProps) => {
  // In a real implementation, we would use a mapping service like Google Maps or Mapbox
  // For this example, we'll create a simple visual representation
  
  // Generate a unique position on the grid based on latitude and longitude
  const baseX = Math.abs(Math.round(location.longitude * 100) % 100);
  const baseY = Math.abs(Math.round(location.latitude * 100) % 100);
  
  return (
    <div className={className}>
      <div className="h-full w-full bg-blue-50 relative">
        {/* Simulate roads */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300"></div>
        <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gray-300"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300"></div>
        
        {/* Simulate blocks/buildings */}
        <div className="absolute top-[10%] left-[10%] w-[15%] h-[15%] bg-gray-200 rounded-sm"></div>
        <div className="absolute top-[10%] left-[50%] w-[20%] h-[10%] bg-gray-200 rounded-sm"></div>
        <div className="absolute top-[30%] left-[20%] w-[10%] h-[30%] bg-gray-200 rounded-sm"></div>
        <div className="absolute top-[40%] left-[60%] w-[15%] h-[20%] bg-gray-200 rounded-sm"></div>
        <div className="absolute top-[70%] left-[10%] w-[20%] h-[15%] bg-gray-200 rounded-sm"></div>
        <div className="absolute top-[75%] left-[45%] w-[25%] h-[10%] bg-gray-200 rounded-sm"></div>
        
        {/* Simulate parks */}
        <div className="absolute top-[45%] left-[5%] w-[12%] h-[18%] bg-green-200 rounded-full"></div>
        <div className="absolute top-[15%] left-[75%] w-[15%] h-[25%] bg-green-200 rounded-full"></div>
        
        {/* Location marker */}
        <div 
          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ top: `${baseY}%`, left: `${baseX}%` }}
        >
          <div className="animate-pulse">
            <svg className="w-6 h-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Location name tooltip */}
        {title && (
          <div 
            className="absolute bg-white px-2 py-1 rounded shadow-md text-xs font-medium text-gray-700 transform -translate-x-1/2 z-20"
            style={{ top: `${baseY - 10}%`, left: `${baseX}%` }}
          >
            {title}
          </div>
        )}
        
        {/* Scale and controls (purely decorative) */}
        <div className="absolute bottom-2 right-2 flex flex-col items-end">
          <div className="bg-white rounded-md shadow p-1 mb-1">
            <div className="flex items-center text-xs text-gray-600">
              <div className="w-10 h-1 bg-gray-400 mr-1"></div>
              <span>500 ft</span>
            </div>
          </div>
          <div className="bg-white rounded-md shadow p-1 flex space-x-1">
            <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;