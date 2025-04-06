// src/components/HelpRequestCard.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HelpRequest } from '../types/index';

interface HelpRequestCardProps {
  helpRequest: HelpRequest;
  onVolunteer: (id: string) => void;
  onMarkCompleted?: (id: string) => void;
}

const HelpRequestCard = ({ helpRequest, onVolunteer, onMarkCompleted }: HelpRequestCardProps) => {
  const [distance, setDistance] = useState("0.5 miles away");
  
  // Using useEffect to ensure client-side only rendering for dynamic content
  useEffect(() => {
    // Generate random distance on client side only
    setDistance(`${(Math.round(Math.random() * 10) / 10).toFixed(1)} miles away`);
  }, []);
  
  const formatDate = (dateValue: Date) => {
    // Consistent date handling for SSR
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-green-100 text-green-800';
    }
  };
  
  const getTypeColor = (category: string) => {
    return category === 'request' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-orange-100 text-orange-800';
  };
  
  const isUserAuthor = () => {
    // In a real app, we would check if the current user is the author
    // For now, we'll return false
    return false;
  };
  
  const isUserVolunteer = () => {
    // In a real app, we would check if the current user is a volunteer
    // For now, we'll return false
    return false;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <div className="relative w-8 h-8 mr-2">
              <Image
                src={helpRequest.authorAvatar || "/avatar-placeholder.jpg"}
                alt={helpRequest.authorName}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="text-sm font-medium">{helpRequest.authorName}</span>
          </div>
          
          <div className="flex space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(helpRequest.category)}`}>
              {helpRequest.category === 'request' ? 'Need Help' : 'Offering Help'}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(helpRequest.status)}`}>
              {helpRequest.status === 'in-progress' ? 'In Progress' : helpRequest.status}
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-1">{helpRequest.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{helpRequest.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Posted on {formatDate(helpRequest.createdAt)}
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {distance}
        </div>
        
        {helpRequest.volunteers && helpRequest.volunteers.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">
              {helpRequest.volunteers.length} {helpRequest.volunteers.length === 1 ? 'neighbor has' : 'neighbors have'} volunteered to help
            </p>
            <div className="flex">
              {/* We would map through volunteers here */}
              <div className="relative w-8 h-8 -mr-2">
                <Image
                  src="/avatar-placeholder.jpg"
                  alt="Volunteer"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="relative w-8 h-8 -mr-2">
                <Image
                  src="/avatar-placeholder.jpg"
                  alt="Volunteer"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          {helpRequest.status === 'open' && !isUserAuthor() && (
            <button 
              onClick={() => onVolunteer(helpRequest.id)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Volunteer to Help
            </button>
          )}
          
          {helpRequest.status === 'in-progress' && isUserAuthor() && (
            <button 
              onClick={() => onMarkCompleted && onMarkCompleted(helpRequest.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Mark as Completed
            </button>
          )}
          
          {helpRequest.status === 'in-progress' && isUserVolunteer() && (
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Contact Requester
            </button>
          )}
          
          {helpRequest.status === 'completed' && (
            <div className="flex-1 text-center text-sm text-gray-500">
              This request has been completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpRequestCard;