import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

const CreatePost = () => {
  const router = useRouter();
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'question' | 'alert' | 'news'>('general');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (postContent.trim()) {
      setIsLoading(true);
      
      // In a real app, we would send this to an API
      // For now, we'll just simulate a network request
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 1000);
    }
  };
  
  return (
    <Layout title="Create Post - Neighborly">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Post</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex space-x-2">
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('general')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                    selectedCategory === 'general' 
                      ? 'bg-green-100 text-green-800 border-green-500' 
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  General
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('question')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                    selectedCategory === 'question' 
                      ? 'bg-purple-100 text-purple-800 border-purple-500' 
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Question
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('alert')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                    selectedCategory === 'alert' 
                      ? 'bg-red-100 text-red-800 border-red-500' 
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Alert
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('news')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border ${
                    selectedCategory === 'news' 
                      ? 'bg-blue-100 text-blue-800 border-blue-500' 
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  News
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={8}
                placeholder="Share something with your neighbors..."
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add to your post (optional)
              </label>
              <div className="flex space-x-4">
                <button 
                  type="button"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Photo
                </button>
                <button 
                  type="button"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </button>
                <button 
                  type="button"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attachment
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => router.push('/')}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md text-sm flex items-center"
                disabled={isLoading || !postContent.trim()}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;