import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Type definitions based on your existing code
const eventType = {
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
  attendees: ['user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8'],
  capacity: 50,
  image: '/placeholder-event.jpg'
};

const ImprovedEventCard = () => {
  const event = eventType;
  
  const formatDate = (dateValue : any) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (dateValue : any) => {
    const date = new Date(dateValue);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const isPastEvent = () => {
    return new Date(event.endDate) < new Date();
  };
  
  const isUserAttending = () => {
    return false; // Demo value
  };
  
  const isUserHost = () => {
    return false; // Demo value
  };

  // Maximum number of avatars to show before displaying +X more
  const MAX_AVATARS = 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="w-full max-w-md"
    >
      <Card className="overflow-hidden shadow-lg border-0">
        {event.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src="/api/placeholder/400/320"
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {isPastEvent() && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">Event Ended</Badge>
              </div>
            )}
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
            <Badge variant="outline" className="font-medium">
              {event.capacity - event.attendees.length} spots left
            </Badge>
          </div>
          <CardDescription className="flex gap-2 items-center mt-1">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.startDate)}</span>
            <Clock className="h-4 w-4 text-primary ml-2" />
            <span>{formatTime(event.startDate)}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span className="truncate">{event.address}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">{event.attendees.length} attending</span>
              </div>
            </div>
            
            <div className="flex -space-x-2">
              <TooltipProvider>
                {event.attendees.slice(0, MAX_AVATARS).map((attendee, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <Avatar className="border-2 border-background h-8 w-8">
                        <AvatarImage src="/api/placeholder/40/40" alt="Attendee" />
                        <AvatarFallback>U{index}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Attendee {index + 1}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                
                {event.attendees.length > MAX_AVATARS && (
                  <Avatar className="bg-secondary text-secondary-foreground border-2 border-background h-8 w-8">
                    <AvatarFallback>+{event.attendees.length - MAX_AVATARS}</AvatarFallback>
                  </Avatar>
                )}
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 border-t">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src="/api/placeholder/40/40" alt={event.hostName} />
              <AvatarFallback>{event.hostName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              {event.hostName}
            </span>
          </div>
          
          {!isPastEvent() && !isUserHost() && !isUserAttending() && (
            <Button 
              className="gap-1" 
              variant="default"
              size="sm"
            >
              RSVP <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          
          {!isPastEvent() && isUserAttending() && (
            <Button 
              className="gap-1" 
              variant="destructive"
              size="sm"
            >
              Cancel RSVP
            </Button>
          )}
          
          {!isPastEvent() && isUserHost() && (
            <Button 
              className="gap-1" 
              variant="default"
              size="sm"
            >
              Manage Event
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ImprovedEventCard;