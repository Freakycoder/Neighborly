import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import SimpleMap from '../../components/SimpleMap';
import { Event } from '../../types';

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [isAttending, setIsAttending] = useState(false);
  
  // In a real app, we would fetch the event from an API
  useEffect(() => {
    if (id) {
      // Simulate API call with mock data
      setTimeout(() => {
        setEvent({
          id: id as string,
          hostId: 'user1',
          hostName: 'Community Center',
          hostAvatar: '/avatar-placeholder.jpg',
          title: 'Neighborhood Block Party',
          description: "Join us for our annual block party! There will be food, games, and live music. Everyone is welcome. Bring a dish to share if you'd like.\n\nWe'll have activities for children, including face painting and a bouncy castle. For adults, we'll have a barbecue and local craft beer.\n\nThis is a great opportunity to meet your neighbors and have some fun together!",
          startDate: new Date(Date.now() + 604800000), // 7 days from now
          endDate: new Date(Date.now() + 622800000), // 7 days + 5 hours from now
          location: { latitude: 34.052235, longitude: -118.243683 },
          address: 'Maple Street Park',
          attendees: ['user2', 'user3', 'user4', 'user5', 'user6'],
          capacity: 50,
          image: '/placeholder-event.jpg'
        });
      }, 500);
    }
  }, [id]);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleRSVP = () => {
    setIsAttending(!isAttending);
    
    // Update event attendees (in a real app, this would be an API call)
    if (event) {
      setEvent({
        ...event,
        attendees: isAttending 
          ? event.attendees.filter(id => id !== 'currentUser')
          : [...event.attendees, 'currentUser']
      });
    }
  };
  
  if (!event) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  const isPastEvent = new Date(event.endDate) < new Date();
  
  return (
    <Layout title={`${event.title} - Neighborly`}>
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.push('/events')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Events
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {event.image && (
            <div className="w-full h-64 relative">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src={event.hostAvatar || "/avatar-placeholder.jpg"}
                  alt={event.hostName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600">Hosted by</div>
                <div className="font-medium">{event.hostName}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-2">Details</h2>
                <div className="whitespace-pre-line text-gray-700 mb-6">
                  {event.description}
                </div>
                
                <h2 className="text-lg font-semibold mb-2">Date and Time</h2>
                <div className="flex items-start mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium">{formatDate(event.startDate)}</div>
                    <div className="text-gray-600">
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </div>
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold mb-2">Location</h2>
                <div className="flex items-start mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="font-medium">{event.address}</div>
                </div>
              </div>
              
              <div>
                <SimpleMap location={event.location} title={event.address} />
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Attendees</h3>
                    <span className="text-sm text-gray-600">
                      {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'}
                      {event.capacity && ` · ${event.capacity - event.attendees.length} spots left`}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap">
                    {/* We would map through attendees here */}
                    <div className="relative w-10 h-10 m-1">
                      <Image
                        src="/avatar-placeholder.jpg"
                        alt="Attendee"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="relative w-10 h-10 m-1">
                      <Image
                        src="/avatar-placeholder.jpg"
                        alt="Attendee"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="relative w-10 h-10 m-1">
                      <Image
                        src="/avatar-placeholder.jpg"
                        alt="Attendee"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    {event.attendees.length > 3 && (
                      <div className="relative w-10 h-10 m-1 flex items-center justify-center bg-gray-200 rounded-full text-xs font-medium">
                        +{event.attendees.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              {!isPastEvent && !isAttending && (
                <button 
                  onClick={handleRSVP}
                  className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
                >
                  RSVP to this Event
                </button>
              )}
              
              {!isPastEvent && isAttending && (
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handleRSVP}
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
                  >
                    Cancel RSVP
                  </button>
                  <button 
                    className="w-full md:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
                  >
                    Add to Calendar
                  </button>
                  <button 
                    className="w-full md:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
                  >
                    Share Event
                  </button>
                </div>
              )}
              
              {isPastEvent && (
                <div className="text-center text-gray-500">
                  This event has ended
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;