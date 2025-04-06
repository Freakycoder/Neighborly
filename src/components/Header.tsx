import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="flex justify-between items-center px-5 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="relative w-full max-w-xl mx-8">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search for posts, events, or neighbors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div className="flex items-center gap-1 text-gray-600 font-medium text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
        <span>Maple Street, 90210</span>
      </div>
      
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="relative w-8 h-8">
          <Image 
            src="/avatar-placeholder.jpg" 
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full border-2 border-primary-600"
          />
        </div>
        <span className="font-medium">Alex Johnson</span>
      </div>
    </header>
  );
};

export default Header;