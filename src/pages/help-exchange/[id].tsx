import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import SimpleMap from '../../components/SimpleMap';
import { HelpRequest } from '../../types';

const HelpRequestDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [helpRequest, setHelpRequest] = useState<HelpRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, we would fetch the help request from an API
  useEffect(() => {
    if (id) {
      // Simulate API call with mock data
      setTimeout(() => {
        setHelpRequest({
          id: id as string,
          authorId: 'user1',
          authorName: 'Emily Taylor',
          authorAvatar: '/avatar-placeholder.jpg',
          title: 'Need help moving furniture',
          description: "I'm moving to a new apartment this Saturday and could use some help moving a couch and a bookshelf. I can provide pizza and drinks as a thank you!\n\nI live on the second floor, and the new place is on the third floor of a building about 2 miles away. I've rented a small moving truck, so we just need to get the furniture down the stairs, into the truck, and then up the stairs at the new place.\n\nI'm thinking it would take about 2 hours with 2-3 people helping. The furniture isn't extremely heavy, but it's awkward to move alone.",
          category: 'request',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          status: 'open',
          location: { latitude: 34.052235, longitude: -118.243683 }
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
  
  const handleVolunteer = () => {
    setIsLoading(true);
    
    // In a real app, we would send this to an API
    // For now, we'll just simulate a network request
    setTimeout(() => {
      if (helpRequest) {
        setHelpRequest({
          ...helpRequest,
          status: 'in-progress',
          volunteers: ['currentUser']
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleMarkCompleted = () => {
    setIsLoading(true);
    
    // In a real app, we would send this to an API
    // For now, we'll just simulate a network request
    setTimeout(() => {
      if (helpRequest) {
        setHelpRequest({
          ...helpRequest,
          status: 'completed'
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const isUserAuthor = () => {
    // In a real app, we would check if the current user is the author
    // For now, we'll return false
    return false;
  };
  
  const isUserVolunteer = () => {
    // In a real app, we would check if the current user is a volunteer
    // For now, we'll return helpRequest?.status === 'in-progress' for demo purposes
    return helpRequest?.status === 'in-progress';
  };
  
  if (!helpRequest) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={`${helpRequest.title} - Neighborly`}>
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.push('/help-exchange')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Help Exchange
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{helpRequest.title}</h1>
                
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src={helpRequest.authorAvatar || "/avatar-placeholder.jpg"}
                      alt={helpRequest.authorName}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{helpRequest.authorName}</div>
                    <div className="text-sm text-gray-600">Posted on {formatDate(helpRequest.createdAt)}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  helpRequest.category === 'request' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {helpRequest.category === 'request' ? 'Need Help' : 'Offering Help'}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  helpRequest.status === 'open' 
                    ? 'bg-green-100 text-green-800' 
                    : helpRequest.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {helpRequest.status === 'in-progress' ? 'In Progress' : helpRequest.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-6">
              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <div className="whitespace-pre-line text-gray-700 mb-6">
                  {helpRequest.description}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  {helpRequest.status === 'open' && !isUserAuthor() && (
                    <button 
                      onClick={handleVolunteer}
                      disabled={isLoading}
                      className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : 'Volunteer to Help'}
                    </button>
                  )}
                  
                  {helpRequest.status === 'in-progress' && isUserAuthor() && (
                    <button 
                      onClick={handleMarkCompleted}
                      disabled={isLoading}
                      className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : 'Mark as Completed'}
                    </button>
                  )}
                  
                  {helpRequest.status === 'in-progress' && isUserVolunteer() && (
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
                      >
                        Message Requester
                      </button>
                      <button 
                        className="w-full md:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
                      >
                        Share Status
                      </button>
                    </div>
                  )}
                  
                  {helpRequest.status === 'completed' && (
                    <div className="text-center text-gray-600">
                      This help request has been completed
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Location</h2>
                <SimpleMap location={helpRequest.location} />
                
                {helpRequest.volunteers && helpRequest.volunteers.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Volunteers</h2>
                    <div className="bg-blue-50 rounded-md p-4">
                      <p className="text-sm text-blue-800 mb-2">
                        {helpRequest.volunteers.length} {helpRequest.volunteers.length === 1 ? 'neighbor has' : 'neighbors have'} volunteered to help
                      </p>
                      
                      <div className="flex flex-wrap">
                        {/* We would map through volunteers here */}
                        <div className="relative w-10 h-10 m-1">
                          <Image
                            src="/avatar-placeholder.jpg"
                            alt="Volunteer"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        </div>
                        {helpRequest.volunteers.length > 1 && (
                          <div className="relative w-10 h-10 m-1">
                            <Image
                              src="/avatar-placeholder.jpg"
                              alt="Volunteer"
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Similar Requests</h2>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 cursor-pointer">
                      <div className="font-medium text-sm">Help with yard work</div>
                      <div className="text-xs text-gray-600">Posted 2 days ago</div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 cursor-pointer">
                      <div className="font-medium text-sm">Need help assembling furniture</div>
                      <div className="text-xs text-gray-600">Posted 3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpRequestDetail;