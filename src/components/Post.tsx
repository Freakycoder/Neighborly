// src/components/Post.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Post as PostType } from '../types/index';

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const formatDate = (dateValue: Date) => {
    // Create a consistent date string for server/client rendering
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, we would send this to the backend
      // For now, we'll just clear the input
      setNewComment('');
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'question': return 'bg-purple-500';
      case 'alert': return 'bg-red-500';
      case 'news': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      <div className="flex items-center p-4">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src={post.authorAvatar || "/avatar-placeholder.jpg"}
            alt={post.authorName}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm mb-1">
            {post.authorName}
            <span className={`inline-block text-xs font-semibold uppercase px-1.5 py-0.5 rounded-full text-white ml-2 ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>
          <div className="text-gray-500 text-xs">{formatDate(post.createdAt)}</div>
        </div>
      </div>
      
      <div className="px-4 pb-4 text-sm leading-relaxed">
        {post.content}
      </div>
      
      <div className="flex border-t border-gray-200 py-2 px-4">
        <button 
          className={`flex items-center px-2 py-1 mr-4 text-xs ${isLiked ? 'text-primary-600' : 'text-gray-600'}`}
          onClick={handleLike}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
        </button>
        
        <button 
          className="flex items-center px-2 py-1 text-xs text-gray-600"
          onClick={() => setShowComments(!showComments)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
        </button>
        
        <button className="flex items-center px-2 py-1 text-xs text-gray-600 ml-auto">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
      
      {showComments && (
        <div className="border-t border-gray-200 p-4">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex mb-4">
              <div className="relative w-8 h-8 mr-3">
                <Image
                  src={comment.authorAvatar || "/avatar-placeholder.jpg"}
                  alt={comment.authorName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 bg-gray-100 rounded-md p-2 text-sm">
                <div className="font-semibold mb-1">{comment.authorName}</div>
                <div>{comment.content}</div>
              </div>
            </div>
          ))}
          
          <form onSubmit={handleAddComment} className="flex mt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button 
              type="submit"
              className="px-3 py-2 bg-primary-600 text-white border-none rounded-md font-medium text-xs"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;