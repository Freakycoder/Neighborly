import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <aside className="w-60 min-w-60 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="text-2xl font-bold text-primary-600 flex items-center px-6 py-5 border-b border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
        Neighborly
      </div>
      
      <nav className="flex flex-col py-4">
        <Link href="/">
          <a className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
            isActive('/') 
              ? 'text-primary-600 bg-gray-100 border-l-3 border-primary-600' 
              : 'text-gray-600 border-l-3 border-transparent'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
            </svg>
            Community Feed
          </a>
        </Link>
        
        <Link href="/help-exchange">
          <a className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
            isActive('/help-exchange') 
              ? 'text-primary-600 bg-gray-100 border-l-3 border-primary-600' 
              : 'text-gray-600 border-l-3 border-transparent'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            Help Exchange
          </a>
        </Link>
        
        <Link href="/events">
          <a className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
            isActive('/events') 
              ? 'text-primary-600 bg-gray-100 border-l-3 border-primary-600' 
              : 'text-gray-600 border-l-3 border-transparent'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            Events Calendar
          </a>
        </Link>
        
        <div className="text-xs font-semibold uppercase text-gray-400 px-6 py-3 mt-2">
          Neighborhood
        </div>
        
        <Link href="/groups">
          <a className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
            isActive('/groups') 
              ? 'text-primary-600 bg-gray-100 border-l-3 border-primary-600' 
              : 'text-gray-600 border-l-3 border-transparent'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
            </svg>
            Groups
          </a>
        </Link>
        
        <Link href="/directory">
          <a className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
            isActive('/directory') 
              ? 'text-primary-600 bg-gray-100 border-l-3 border-primary-600' 
              : 'text-gray-600 border-l-3 border-transparent'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
            </svg>
            Neighbor Directory
          </a>
        </Link>
      </nav>
      
      <div className="mt-auto p-5 border-t border-gray-200">
        <Link href="/create-post">
          <a className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2.5 px-4 rounded-md font-medium text-sm transition duration-150 ease-in-out">
            Create Post
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;