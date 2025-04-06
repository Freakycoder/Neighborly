// Types for our neighborhood social app

export type User = {
    id: string;
    name: string;
    avatar: string;
    address: string;
    bio?: string;
    joinedDate: Date;
};

export type Post = {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string; 
    content: string;
    createdAt: Date;
    likes: number;
    comments: Comment[];
    category: 'general' | 'question' | 'alert' | 'news';
    location: GeoLocation;
};

export type Comment = {
    id: string;
    authorId: string;
    authorName: string; 
    authorAvatar?: string; 
    content: string;
    createdAt: Date;
    likes: number;
};

export type HelpRequest = {
    id: string;
    authorId: string;
    authorName: string; 
    authorAvatar?: string; 
    title: string;
    description: string;
    category: 'request' | 'offer';
    createdAt: Date;
    status: 'open' | 'in-progress' | 'completed';
    volunteers?: string[]; // User IDs
    location: GeoLocation;
};

export type Event = {
    id: string;
    hostId: string;
    hostName: string; 
    hostAvatar?: string; 
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: GeoLocation;
    address: string;
    attendees: string[]; // User IDs
    capacity?: number;
    image?: string;
};

export type GeoLocation = {
    latitude: number;
    longitude: number;
};