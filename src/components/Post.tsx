import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Sample post data based on your existing types
const samplePosts = [
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
      }
    ],
    category: 'alert',
    location: { latitude: 34.052235, longitude: -118.243683 }
  }
];

// Custom Post component with animations and modern UI
const Post = ({ post } : any) => {
  const [liked, setLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(post.likes);
  const [showComments, setShowComments] = React.useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((prev : any) => liked ? prev - 1 : prev + 1);
  };
  
  const getCategoryIcon = () => {
    switch(post.category) {
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'question': return <HelpCircle className="h-4 w-4 text-purple-500" />;
      case 'news': return <Info className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };
  
  const getCategoryColor = () => {
    switch(post.category) {
      case 'alert': return 'bg-red-50 border-red-200';
      case 'question': return 'bg-purple-50 border-purple-200';
      case 'news': return 'bg-blue-50 border-blue-200';
      default: return '';
    }
  };
  
  const formatTimeAgo = (date : any) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className={cn("overflow-hidden shadow-sm", getCategoryColor())}>
        <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/api/placeholder/40/40" alt={post.authorName} />
              <AvatarFallback>{post.authorName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{post.authorName}</span>
                {getCategoryIcon()}
              </div>
              <div className="text-xs text-muted-foreground">{formatTimeAgo(post.createdAt)}</div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-3">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("flex gap-1 items-center", liked && "text-red-500")}
              onClick={handleLike}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              <span>{likesCount}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex gap-1 items-center"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="flex gap-1 items-center">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </CardFooter>
        
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t px-4 py-3"
            >
              {post.comments.map((comment : any) => (
                <div key={comment.id} className="flex gap-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt={comment.authorName} />
                    <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-2 rounded-lg text-xs flex-1">
                    <div className="font-medium mb-1">{comment.authorName}</div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3 mt-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="Your Avatar" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea placeholder="Write a comment..." className="text-xs min-h-8" />
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Post</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

// Main Feed Component
const CommunityFeed = () => {
  const [newPostContent, setNewPostContent] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Community Feed</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Textarea
            placeholder="Share something with your neighbors..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="mb-4 resize-none"
            rows={3}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <HelpCircle className="h-4 w-4 text-purple-500" />
                <span>Question</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span>Alert</span>
              </Button>
            </div>
            
            <Button disabled={!newPostContent.trim()}>Post</Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-2">
          {samplePosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-4 mt-2">
          {samplePosts
            .filter(post => post.category === 'question')
            .map(post => <Post key={post.id} post={post} />)
          }
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4 mt-2">
          {samplePosts
            .filter(post => post.category === 'alert')
            .map(post => <Post key={post.id} post={post} />)
          }
        </TabsContent>
        
        <TabsContent value="news" className="space-y-4 mt-2">
          {samplePosts
            .filter(post => post.category === 'news')
            .map(post => <Post key={post.id} post={post} />)
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityFeed;