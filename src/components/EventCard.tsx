// src/components/EventCard.tsx
import React from 'react';
import Image from 'next/image';
import { Event } from '../types/index';

interface EventCardProps {
  event: Event;
  onRSVP: (id: string, attending: boolean) => void;
}

const EventCard = ({ event, onRSVP }: EventCardProps) => {
  const formatDate = (dateValue: Date) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (dateValue: Date) => {
    const date = new Date(dateValue);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const isUserAttending = () => {
    return false;
  };
  
  const isUserHost = () => {
    // In a real app, we would check if the current user is the host
    // For now, we'll return false
    return false;
  };

  const isPastEvent = () => {
    return new Date(event.endDate) < new Date();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      {event.image && (
        <div className="w-full h-40 relative">
          <Image
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(event.startDate)}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(event.startDate)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image
                src={event.hostAvatar || "/avatar-placeholder.jpg"}
                alt={event.hostName}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="text-xs text-gray-600">Hosted by <span className="font-medium">{event.hostName}</span></span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.address}
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">
            {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'} attending
            {event.capacity && ` · ${event.capacity - event.attendees.length} spots left`}
          </p>
          <div className="flex">
            {/* We would map through attendees here */}
            <div className="relative w-8 h-8 -mr-2">
              <Image
                src="/avatar-placeholder.jpg"
                alt="Attendee"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-white"
              />
            </div>
            <div className="relative w-8 h-8 -mr-2">
              <Image
                src="/avatar-placeholder.jpg"
                alt="Attendee"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-white"
              />
            </div>
            <div className="relative w-8 h-8 -mr-2">
              <Image
                src="/avatar-placeholder.jpg"
                alt="Attendee"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-white"
              />
            </div>
            {event.attendees.length > 3 && (
              <div className="relative w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full border-2 border-white text-xs font-medium">
                +{event.attendees.length - 3}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {!isPastEvent() && !isUserHost() && !isUserAttending() && (
            <button 
              onClick={() => onRSVP(event.id, true)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              RSVP
            </button>
          )}
          
          {!isPastEvent() && isUserAttending() && (
            <>
              <button 
                onClick={() => onRSVP(event.id, false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Cancel RSVP
              </button>
              <button 
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Add to Calendar
              </button>
            </>
          )}
          
          {!isPastEvent() && isUserHost() && (
            <button 
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Manage Event
            </button>
          )}
          
          {isPastEvent() && (
            <div className="flex-1 text-center text-sm text-gray-500">
              This event has ended
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;