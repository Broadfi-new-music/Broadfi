import React from 'react';
import { Calendar, Music, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Contest } from '@/types/contest';
import { Link } from 'react-router-dom';

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const formattedDate = new Date(contest.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link to={`/contest/${contest.id}`}>
      <Card className="h-full overflow-hidden remix-card">
        <div className="w-full h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
          {/* Use a placeholder if image is missing or invalid */}
          <img 
            src={contest.image || "/placeholder.svg"} 
            alt={contest.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <Badge className="absolute top-3 right-3 z-20 bg-brand-purple">{contest.category}</Badge>
        </div>
        
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{contest.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{contest.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Trophy size={16} className="mr-1 text-brand-purple" />
            <span>{contest.prize.toLocaleString()} BRD tokens</span>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-3 flex justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>Deadline: {formattedDate}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Music size={14} className="mr-1" />
            <span>Theme Audio</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ContestCard;
