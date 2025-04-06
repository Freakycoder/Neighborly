import { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import HelpRequestCard from '../components/HelpRequestCard';
import { HelpRequest } from '../types';

const HelpExchange: NextPage = () => {
  // Sample data for help requests
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([
    {
      id: '1',
      authorId: 'user1',
      authorName: 'Emily Taylor',
      authorAvatar: '/avatar-placeholder.jpg',
      title: 'Need help moving furniture',
      description: "I'm moving to a new apartment this Saturday and could use some help moving a couch and a bookshelf. I can provide pizza and drinks as a thank you!",
      category: 'request',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      status: 'open',
      location: { latitude: 34.052235, longitude: -118.243683 }
    },
    {
      id: '2',
      authorId: 'user2',
      authorName: 'Mike Chen',
      authorAvatar: '/avatar-placeholder.jpg',
      title: 'Offering free math tutoring',
      description: "I'm a high school math teacher with some free time on weekends. Happy to help students in the neighborhood with math homework or test prep. All grade levels welcome!",
      category: 'offer',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      status: 'open',
      location: { latitude: 34.052235, longitude: -118.243683 }
    },
    {
      id: '3',
      authorId: 'user3',
      authorName: 'Sarah Johnson',
      authorAvatar: '/avatar-placeholder.jpg',
      title: 'Looking for a lawnmower to borrow',
      description: "My lawnmower broke down and I need to mow my lawn before the HOA inspection this Friday. Would anyone be willing to let me borrow theirs for a few hours? I'll return it in perfect condition.",
      category: 'request',
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      status: 'in-progress',
      volunteers: ['user4'],
      location: { latitude: 34.052235, longitude: -118.243683 }
    },
    {
      id: '4',
      authorId: 'user5',
      authorName: 'Robert Williams',
      authorAvatar: '/avatar-placeholder.jpg',
      title: 'Free plants and gardening supplies',
      description: "I'm downsizing my garden and have several healthy plants and supplies to give away. I have succulents, herbs, and some vegetable seedlings. Also have extra pots, soil, and tools. First come, first served!",
      category: 'offer',
      createdAt: new Date(Date.now() - 345600000), // 4 days ago
      status: 'completed',
      location: { latitude: 34.052235, longitude: -118.243683 }
    }
  ]);
  
  const [activeTab, setActiveTab] = useState<'all' | 'requests' | 'offers' | 'mine'>('all');
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'request' as 'request' | 'offer'
  });
  
  const handleVolunteer = (id: string) => {
    setHelpRequests(requests => 
      requests.map(request => 
        request.id === id 
          ? { 
              ...request, 
              status: 'in-progress', 
              volunteers: [...(request.volunteers || []), 'currentUser'] 
            }
          : request
      )
    );
  };
  
  const handleMarkCompleted = (id: string) => {
    setHelpRequests(requests => 
      requests.map(request => 
        request.id === id 
          ? { ...request, status: 'completed' }
          : request
      )
    );
  };
  
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newRequest.title.trim() && newRequest.description.trim()) {
      const createdRequest: HelpRequest = {
        id: `help-${Date.now()}`,
        authorId: 'currentUser',
        authorName: 'Alex Johnson',
        authorAvatar: '/avatar-placeholder.jpg',
        title: newRequest.title,
        description: newRequest.description,
        category: newRequest.category,
        createdAt: new Date(),
        status: 'open',
        location: { latitude: 34.052235, longitude: -118.243683 }
      };
      
      setHelpRequests([createdRequest, ...helpRequests]);
      setNewRequest({
        title: '',
        description: '',
        category: 'request'
      });
      setShowModal(false);
    }
  };
  
  const filteredRequests = helpRequests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'requests') return request.category === 'request';
    if (activeTab === 'offers') return request.category === 'offer';
    if (activeTab === 'mine') return request.authorId === 'currentUser';
    return true;
  });
  
  return (
    <Layout title="Help Exchange - Neighborly">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Help Exchange</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Create Request
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'all' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'requests' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Help Needed
            </button>
            <button 
              onClick={() => setActiveTab('offers')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'offers' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Help Offered
            </button>
            <button 
              onClick={() => setActiveTab('mine')}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === 'mine' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              My Requests
            </button>
          </div>
        </div>
        
        <div>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No help requests found in this category.
            </div>
          ) : (
            filteredRequests.map(request => (
              <HelpRequestCard 
                key={request.id} 
                helpRequest={request} 
                onVolunteer={handleVolunteer}
                onMarkCompleted={handleMarkCompleted}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Create Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Request</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateRequest}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="flex space-x-2">
                  <button 
                    type="button"
                    onClick={() => setNewRequest(prev => ({ ...prev, category: 'request' }))}
                    className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                      newRequest.category === 'request' 
                        ? 'bg-primary-100 text-primary-700 border-primary-500' 
                        : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    I Need Help
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewRequest(prev => ({ ...prev, category: 'offer' }))}
                    className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                      newRequest.category === 'offer' 
                        ? 'bg-primary-100 text-primary-700 border-primary-500' 
                        : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    I'm Offering Help
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="What do you need help with?"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="Provide details about your request..."
                  required
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
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HelpExchange;