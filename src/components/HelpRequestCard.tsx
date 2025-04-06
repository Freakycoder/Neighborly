import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ThumbsUp, 
  MapPin, 
  Clock, 
  Calendar, 
  Plus, 
  X,
  ChevronDown,
  HandHelping,
  Tag,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Sample help requests data
const sampleHelpRequests = [
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
  }
];

// Modern styled help request card
const HelpRequestCard = ({ helpRequest, onVolunteer, onMarkCompleted } : any) => {
  const formatDate = (dateValue : any) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const timeAgo = (date : any) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };
  
  const getStatusColor = () => {
    switch(helpRequest.status) {
      case 'open': return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-4 w-4" /> };
      case 'in-progress': return { bg: 'bg-blue-100', text: 'text-blue-800', icon: <AlertCircle className="h-4 w-4" /> };
      case 'completed': return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <CheckCircle className="h-4 w-4" /> };
      default: return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-4 w-4" /> };
    }
  };
  
  const getCategoryColor = () => {
    return helpRequest.category === 'request' 
      ? { bg: 'bg-purple-100', text: 'text-purple-800', icon: <HelpCircle className="h-4 w-4" /> }
      : { bg: 'bg-orange-100', text: 'text-orange-800', icon: <HandHelping className="h-4 w-4" /> };
  };
  
  const isUserAuthor = () => false; // Demo value
  const isUserVolunteer = () => helpRequest.status === 'in-progress'; // Demo value
  
  const statusStyle = getStatusColor();
  const categoryStyle = getCategoryColor();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-4"
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/api/placeholder/40/40" alt={helpRequest.authorName} />
                <AvatarFallback>{helpRequest.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{helpRequest.authorName}</CardTitle>
                <CardDescription className="text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{timeAgo(helpRequest.createdAt)}</span>
                </CardDescription>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Badge variant="outline" className={`flex items-center gap-1 ${categoryStyle.bg} ${categoryStyle.text}`}>
                {categoryStyle.icon}
                <span>{helpRequest.category === 'request' ? 'Need Help' : 'Offering Help'}</span>
              </Badge>
              <Badge variant="outline" className={`flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.icon}
                <span>{helpRequest.status === 'in-progress' ? 'In Progress' : helpRequest.status}</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">{helpRequest.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{helpRequest.description}</p>
          
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            <span className="mr-3">0.5 miles away</span>
            
            <Clock className="h-4 w-4 mr-1 text-primary ml-2" />
            <span>Posted on {formatDate(helpRequest.createdAt)}</span>
          </div>
          
          {helpRequest.volunteers && helpRequest.volunteers.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">
                {helpRequest.volunteers.length} {helpRequest.volunteers.length === 1 ? 'neighbor has' : 'neighbors have'} volunteered to help
              </p>
              <div className="flex">
                {[1, 2].map((_, i) => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-background -mr-2">
                    <AvatarImage src="/api/placeholder/32/32" alt="Volunteer" />
                    <AvatarFallback>V{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-3">
          {helpRequest.status === 'open' && !isUserAuthor() && (
            <Button 
              onClick={() => onVolunteer(helpRequest.id)}
              className="w-full flex items-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Volunteer to Help</span>
            </Button>
          )}
          
          {helpRequest.status === 'in-progress' && isUserAuthor() && (
            <Button 
              onClick={() => onMarkCompleted && onMarkCompleted(helpRequest.id)}
              variant="secondary"
              className="w-full"
            >
              Mark as Completed
            </Button>
          )}
          
          {helpRequest.status === 'in-progress' && isUserVolunteer() && (
            <Button 
              variant="outline"
              className="w-full"
            >
              Contact Requester
            </Button>
          )}
          
          {helpRequest.status === 'completed' && (
            <div className="w-full text-center text-sm text-gray-500">
              This request has been completed
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// New request dialog
const NewRequestDialog = ({ open, onOpenChange, onCreateRequest } : any) => {
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'request'
  });
  
  const handleSubmit = (e : any) => {
    e.preventDefault();
    onCreateRequest(newRequest);
    setNewRequest({
      title: '',
      description: '',
      category: 'request'
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Help Request</DialogTitle>
          <DialogDescription>
            Share what you need or how you can help your neighbors
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block">Type</Label>
              <RadioGroup 
                value={newRequest.category} 
                onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="request" id="request" />
                  <Label htmlFor="request" className="cursor-pointer flex items-center">
                    <HelpCircle className="h-4 w-4 text-purple-500 mr-1" />
                    <span>I Need Help</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offer" id="offer" />
                  <Label htmlFor="offer" className="cursor-pointer flex items-center">
                    <HandHelping className="h-4 w-4 text-orange-500 mr-1" />
                    <span>I'm Offering Help</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="title" className="text-sm font-medium mb-1 block">Title</Label>
              <Input
                id="title"
                placeholder="What do you need help with?"
                value={newRequest.title}
                onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="description" className="text-sm font-medium mb-1 block">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about your request..."
                rows={4}
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Create Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Help Exchange Component
const ImprovedHelpExchange = () => {
  const [helpRequests, setHelpRequests] = useState(sampleHelpRequests);
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleVolunteer = (id : any) => {
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
  
  const handleMarkCompleted = (id : any) => {
    setHelpRequests(requests => 
      requests.map(request => 
        request.id === id 
          ? { ...request, status: 'completed' }
          : request
      )
    );
  };
  
  const handleCreateRequest = (newRequest : any) => {
    const createdRequest = {
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
    setDialogOpen(false);
  };
  
  const filteredRequests = helpRequests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'requests') return request.category === 'request';
    if (activeTab === 'offers') return request.category === 'offer';
    if (activeTab === 'mine') return request.authorId === 'currentUser';
    return true;
  });
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Help Exchange</h1>
        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Request</span>
        </Button>
      </div>
      
      <NewRequestDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreateRequest={handleCreateRequest}
      />
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="requests">Help Needed</TabsTrigger>
          <TabsTrigger value="offers">Help Offered</TabsTrigger>
          <TabsTrigger value="mine">My Requests</TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredRequests.length === 0 ? (
              <Card className="p-12 flex flex-col items-center justify-center text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No help requests found</h3>
                <p className="text-muted-foreground mb-6">There are no requests in this category yet.</p>
                <Button onClick={() => setDialogOpen(true)}>Create the first one</Button>
              </Card>
            ) : (
              <div>
                {filteredRequests.map(request => (
                  <HelpRequestCard 
                    key={request.id} 
                    helpRequest={request} 
                    onVolunteer={handleVolunteer}
                    onMarkCompleted={handleMarkCompleted}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default ImprovedHelpExchange;