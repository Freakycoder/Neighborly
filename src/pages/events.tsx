import { useState } from 'react';
import Layout from '../components/Layout';
import EventCard from '../components/EventCard';
import { Event } from '../types';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      hostId: 'user1',
      hostName: 'Community Center',
      hostAvatar: '/avatar-placeholder.jpg',
      title: 'Neighborhood Block Party',
      description: "Join us for our annual block party! There will be food, games, and live music. Everyone is welcome. Bring a dish to share if you'd like.",
      startDate: new Date(Date.now() + 604800000), // 7 days from now
      endDate: new Date(Date.now() + 622800000), // 7 days + 5 hours from now
      location: { latitude: 34.052235, longitude: -118.243683 },
      address: 'Maple Street Park',
      attendees: ['user2', 'user3', 'user4', 'user5', 'user6'],
      capacity: 50,
      image: '/placeholder-event.jpg'
    },
    {
      id: '2',
      hostId: 'user2',
      hostName: 'Sarah Johnson',
      hostAvatar: '/avatar-placeholder.jpg',
      title: 'Gardening Workshop',
      description: "Learn how to grow your own vegetables and herbs! I'll share tips on soil preparation, seed starting, and pest management. All skill levels welcome.",
      startDate: new Date(Date.now() + 864000000), // 10 days from now
      endDate: new Date(Date.now() + 871200000), // 10 days + 2 hours from now
      location: { latitude: 34.052235, longitude: -118.243683 },
      address: '123 Maple Street',
      attendees: ['user1', 'user3'],
      capacity: 15
    },
    {
      id: '3',
      hostId: 'user3',
      hostName: 'Mike Chen',
      hostAvatar: '/avatar-placeholder.jpg',
      title: 'Neighborhood Watch Meeting',
      description: "Monthly meeting to discuss safety concerns and updates. Our community police officer will be joining us to answer questions.",
      startDate: new Date(Date.now() + 432000000), // 5 days from now
      endDate: new Date(Date.now() + 439200000), // 5 days + 2 hours from now
      location: { latitude: 34.052235, longitude: -118.243683 },
      address: 'Community Hall, 456 Oak Street',
      attendees: ['user1', 'user2', 'user4', 'user7'],
      capacity: 30
    },
    {
      id: '4',
      hostId: 'user4',
      hostName: 'Emily Taylor',
      hostAvatar: '/avatar-placeholder.jpg',
      title: 'Book Club: "The Midnight Library"',
      description: "Join our monthly book club! This month we're discussing 'The Midnight Library' by Matt Haig. New members always welcome.",
      startDate: new Date(Date.now() + 1209600000), // 14 days from now
      endDate: new Date(Date.now() + 1216800000), // 14 days + 2 hours from now
      location: { latitude: 34.052235, longitude: -118.243683 },
      address: 'Local Coffee Shop, 789 Pine Street',
      attendees: ['user2', 'user5', 'user6', 'user8'],
      capacity: 20
    }
  ]);
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'attending' | 'hosting'>('upcoming');
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    address: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    capacity: ''
  });
  
  const handleRSVP = (id: string, attending: boolean) => {
    setEvents(currentEvents => 
      currentEvents.map(event => 
        event.id === id 
          ? { 
              ...event, 
              attendees: attending 
                ? [...event.attendees, 'currentUser'] 
                : event.attendees.filter(userId => userId !== 'currentUser')
            }
          : event
      )
    );
  };
  
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      newEvent.title.trim() && 
      newEvent.description.trim() && 
      newEvent.address.trim() && 
      newEvent.startDate && 
      newEvent.startTime
    ) {
      const startDateTime = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
      let endDateTime = new Date(`${newEvent.endDate || newEvent.startDate}T${newEvent.endTime || newEvent.startTime}`);
      
      // Ensure end date is not before start date
      if (endDateTime < startDateTime) {
        endDateTime = new Date(startDateTime.getTime() + 7200000); // Default to 2 hours after start
      }
      
      const createdEvent: Event = {
        id: `event-${Date.now()}`,
        hostId: 'currentUser',
        hostName: 'Alex Johnson',
        hostAvatar: '/avatar-placeholder.jpg',
        title: newEvent.title,
        description: newEvent.description,
        startDate: startDateTime,
        endDate: endDateTime,
        location: { latitude: 34.052235, longitude: -118.243683 },
        address: newEvent.address,
        attendees: ['currentUser'],
        capacity: newEvent.capacity ? parseInt(newEvent.capacity) : undefined
      };
      
      setEvents([createdEvent, ...events]);
      setNewEvent({
        title: '',
        description: '',
        address: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        capacity: ''
      });
      setShowModal(false);
    }
  };
  
  const now = new Date();
  
  const filteredEvents = events.filter(event => {
    const isPastEvent = new Date(event.endDate) < now;
    
    if (activeTab === 'upcoming') return !isPastEvent;
    if (activeTab === 'past') return isPastEvent;
    if (activeTab === 'attending') return event.attendees.includes('currentUser');
    if (activeTab === 'hosting') return event.hostId === 'currentUser';
    return true;
  });
  
  return (
    <Layout title="Events - Neighborly">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Events Calendar</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Create Event
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'upcoming' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setActiveTab('attending')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'attending' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Attending
            </button>
            <button 
              onClick={() => setActiveTab('hosting')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'hosting' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Hosting
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'past' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Past
            </button>
          </div>
        </div>
        
        <div>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events found in this category.
            </div>
          ) : (
            filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRSVP={handleRSVP}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Event</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Name your event"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="Describe your event..."
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="address"
                  value={newEvent.address}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter address or location name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity (optional)
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Maximum number of attendees"
                  min="1"
                />
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md text-sm"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Events;