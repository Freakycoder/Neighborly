import { useState } from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { Post as PostType } from '../types/index';

const Home = () => {
  
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: '1',
      authorId: 'user1',
      authorName: 'Sarah Johnson',
      authorAvatar: '/avatar-placeholder.jpg',
      content: "Hi neighbors! Just moved to Maple Street last week. Looking forward to meeting everyone! I've got some extra moving boxes if anyone needs them.",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 12,
      comments: [
        {
          id: 'c1',
          authorId: 'user2',
          authorName: 'Mike Chen',
          authorAvatar: '/avatar-placeholder.jpg',
          content: 'Welcome to the neighborhood! I live down at 432. Let me know if you need anything!',
          createdAt: new Date(Date.now() - 3000000),
          likes: 2
        }
      ],
      category: 'general',
      location: { latitude: 34.052235, longitude: -118.243683 }
    },
    {
      id: '2',
      authorId: 'user2',
      authorName: 'Mike Chen',
      authorAvatar: '/avatar-placeholder.jpg',
      content: "ALERT: Several cars on Oak St had their windows smashed last night. Please check your vehicles and report any incidents to the police. I've already contacted our community officer.",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      likes: 24,
      comments: [
        {
          id: 'c2',
          authorId: 'user3',
          authorName: 'Jennifer Lopez',
          authorAvatar: '/avatar-placeholder.jpg',
          content: 'Thanks for the heads up, checking my car now.',
          createdAt: new Date(Date.now() - 84400000),
          likes: 1
        },
        {
          id: 'c3',
          authorId: 'user4',
          authorName: 'Robert Williams',
          authorAvatar: '/avatar-placeholder.jpg',
          content: 'I saw a suspicious person around 2AM. Will DM you the details.',
          createdAt: new Date(Date.now() - 82400000),
          likes: 3
        }
      ],
      category: 'alert',
      location: { latitude: 34.052235, longitude: -118.243683 }
    },
    {
      id: '3',
      authorId: 'user5',
      authorName: 'Emily Taylor',
      authorAvatar: '/avatar-placeholder.jpg',
      content: "Does anyone know a good plumber in the area? My kitchen sink is leaking and it's becoming a real issue. Looking for someone reliable who can come on short notice.",
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      likes: 7,
      comments: [
        {
          id: 'c4',
          authorId: 'user6',
          authorName: 'David Miller',
          authorAvatar: '/avatar-placeholder.jpg',
          content: 'I used ABC Plumbing last month, they were great. Their number is 555-1234',
          createdAt: new Date(Date.now() - 169800000),
          likes: 2
        }
      ],
      category: 'question',
      location: { latitude: 34.052235, longitude: -118.243683 }
    },
    {
      id: '4',
      authorId: 'user7',
      authorName: 'Local Library',
      authorAvatar: '/avatar-placeholder.jpg',
      content: "NEWS: The community library is extending hours starting next week! We'll now be open until 8PM on weekdays and 6PM on weekends. We're also starting a new book club on Thursdays at 6PM. All are welcome!",
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      likes: 32,
      comments: [
        {
          id: 'c5',
          authorId: 'user8',
          authorName: 'Lisa Anderson',
          authorAvatar: '/avatar-placeholder.jpg',
          content: 'This is great news! Will definitely join the book club.',
          createdAt: new Date(Date.now() - 255200000),
          likes: 4
        }
      ],
      category: 'news',
      location: { latitude: 34.052235, longitude: -118.243683 }
    }
  ]);
  
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'question' | 'alert' | 'news'>('general');
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (postContent.trim()) {
      const newPost: PostType = {
        id: `post-${Date.now()}`,
        authorId: 'currentUser',
        authorName: 'Alex Johnson',
        authorAvatar: '/avatar-placeholder.jpg',
        content: postContent,
        createdAt: new Date(),
        likes: 0,
        comments: [],
        category: selectedCategory,
        location: { latitude: 34.052235, longitude: -118.243683 }
      };
      
      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedCategory('general');
    }
  };
  
  return (
    <Layout title="Community Feed - Neighborly">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Community Feed</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share something with your neighbors..."
              className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            />
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('general')}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    selectedCategory === 'general' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  General
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('question')}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    selectedCategory === 'question' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  Question
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('alert')}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    selectedCategory === 'alert' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  Alert
                </button>
                <button 
                  type="button"
                  onClick={() => setSelectedCategory('news')}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    selectedCategory === 'news' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  News
                </button>
              </div>
              
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Post
              </button>
            </div>
          </form>
        </div>
        
        <div>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;