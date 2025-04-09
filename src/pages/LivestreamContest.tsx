import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { LivestreamBattle } from "@/types/livebattle";
import LivestreamStatus from "@/components/LivestreamStatus";
import LiveBattleCard from "@/feature/LiveBattleCard";
import ScheduledBattleCard from "@/feature/ScheduledBattleCard";
import EndedBattleCard from "@/feature/EndedBattleCard";
import LivestreamView from "@/feature/LivestreamView";
import { mockLivestreamBattles, mockComments, mockGifts } from "@/feature/mockData";

const LivestreamContest: React.FC = () => {
  const navigate = useNavigate();
  
  const [activeBattle, setActiveBattle] = useState<LivestreamBattle | null>(null);
  
  const liveBattles = mockLivestreamBattles.filter(battle => battle.status === "live");
  const scheduledBattles = mockLivestreamBattles.filter(battle => battle.status === "scheduled");
  const endedBattles = mockLivestreamBattles.filter(battle => battle.status === "ended");
  
  const handleJoinLivestream = (battle: LivestreamBattle) => {
    setActiveBattle(battle);
  };
  
  const handleExit = () => {
    setActiveBattle(null);
  };
  
  const handleUpdateBattle = (updatedBattle: LivestreamBattle) => {
    setActiveBattle(updatedBattle);
  };
  
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      
      {!activeBattle ? (
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Livestream Contests</h1>
            <Button variant="outline" onClick={() => navigate("/")} className="hidden md:flex">
              Back to Home
            </Button>
          </div>
          
          {/* Live Battles Status Bar */}
          {liveBattles.length > 0 && (
            <div className="mb-6 overflow-x-auto scrollbar-hide">
              <h2 className="text-lg font-semibold mb-3">Live Now</h2>
              <div className="flex gap-3 pb-2">
                {liveBattles.map(battle => (
                  <LivestreamStatus 
                    key={battle.id}
                    battle={battle}
                    onJoin={() => handleJoinLivestream(battle)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Live Battles */}
          {liveBattles.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Live Battles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveBattles.map(battle => (
                  <LiveBattleCard
                    key={battle.id}
                    battle={battle}
                    onJoin={handleJoinLivestream}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Upcoming Battles */}
          {scheduledBattles.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Upcoming Battles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scheduledBattles.map(battle => (
                  <ScheduledBattleCard
                    key={battle.id}
                    battle={battle}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Past Battles */}
          {endedBattles.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4">Past Battles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {endedBattles.map(battle => (
                  <EndedBattleCard
                    key={battle.id}
                    battle={battle}
                    onJoin={handleJoinLivestream}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      ) : (
        <main className="container mx-auto px-0 md:px-4 py-0 md:py-6">
          <LivestreamView
            battle={activeBattle}
            comments={mockComments}
            gifts={mockGifts}
            onExit={handleExit}
            onUpdateBattle={handleUpdateBattle}
          />
        </main>
      )}
    </div>
  );
};

export default LivestreamContest;
