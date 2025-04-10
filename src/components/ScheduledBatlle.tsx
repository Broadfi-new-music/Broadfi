
import { Calendar, Clock } from 'lucide-react';

interface Creator {
  name: string;
  username: string;
  avatar: string;
}

interface ScheduledBattleProps {
  id: string;
  title: string;
  date: string;
  time: string;
  creator1: Creator;
  creator2: Creator;
}

const ScheduledBattleItem = ({ battle }: { battle: ScheduledBattleProps }) => {
  return (
    <div className="rounded-lg border border-border bg-secondary p-4 hover:bg-secondary/80 transition cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{battle.title}</h3>
        <div className="text-accent-foreground bg-accent/10 rounded px-2 py-1 text-xs">
          Coming Soon
        </div>
      </div>
      
      <div className="flex items-center mb-4 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1" /> 
        <span className="mr-3">{battle.date}</span>
        <Clock className="h-4 w-4 mr-1" /> 
        <span>{battle.time}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <img src={battle.creator1.avatar} alt={battle.creator1.name} className="w-8 h-8 rounded-full border-2 border-background" />
            <img src={battle.creator2.avatar} alt={battle.creator2.name} className="w-8 h-8 rounded-full border-2 border-background" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium">{battle.creator1.name} vs {battle.creator2.name}</p>
            <p className="text-xs text-muted-foreground">@{battle.creator1.username}, @{battle.creator2.username}</p>
          </div>
        </div>
        
        <button className="text-xs bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 transition">
          Remind me
        </button>
      </div>
    </div>
  );
};

const ScheduledBattles = ({ battles }: { battles: ScheduledBattleProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {battles.map((battle) => (
        <ScheduledBattleItem key={battle.id} battle={battle} />
      ))}
    </div>
  );
};

export default ScheduledBattles;
