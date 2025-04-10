import { useUser } from "@/context/UserContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import { EarningsChart } from "@/components/ui/earnings-chart";
import { ContentCard } from "@/components/ui/content-card";
import { formatCompactNumber, formatNumber } from "@/utils/formatters";
import { TrendingUp, Users, Wallet, Radio, Trophy, Music, BookAudio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { topChartPlaylists, topChartPodcasts, mockContests } from "@/utils/dashboardMockData";
// Mock data for the earnings chart
const earningsData = [
  { date: 'Apr 1', tokens: 320 },
  { date: 'Apr 2', tokens: 450 },
  { date: 'Apr 3', tokens: 380 },
  { date: 'Apr 4', tokens: 520 },
  { date: 'Apr 5', tokens: 480 },
  { date: 'Apr 6', tokens: 600 },
  { date: 'Apr 7', tokens: 750 },
];

export default function Dashboard() {
  const { user, playlists, podcasts, isCreatorMode } = useUser();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {isCreatorMode ? "Creator Dashboard" : "Listener Dashboard"}
        </h1>
        <p className="text-white/70">
          Welcome back, {user.displayName}. Here's your latest stats and activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Earnings"
          value={`${formatNumber(user.tokensEarned)} BRD`}
          icon={<Wallet className="h-4 w-4" />}
          trend={5.2}
          trendLabel="week"
        />
        <StatCard
          title="Subscribers"
          value={formatCompactNumber(user.subscribers)}
          icon={<Users className="h-4 w-4" />}
          trend={2.8}
          trendLabel="day"
        />
        <StatCard
          title={isCreatorMode ? "Active Livestreams" : "Watched Livestreams"}
          value={isCreatorMode ? "1" : "12"}
          icon={<Radio className="h-4 w-4" />}
        />
        <StatCard
          title={isCreatorMode ? "Contest Wins" : "Contests Participated"}
          value={isCreatorMode ? "2" : "5"}
          icon={<Trophy className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EarningsChart 
            data={earningsData} 
            title="Earnings Over Time (Last 7 Days)"
          />
        </div>
        
        <div>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-white/70">Latest Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Earning Update</h4>
                  <p className="text-xs text-white/70">Earned 125.5 BRD from "Summer Vibes 2025"</p>
                  <p className="text-xs text-white/50 mt-0.5">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">New Subscriber</h4>
                  <p className="text-xs text-white/70">MusicLover248 subscribed to your channel</p>
                  <p className="text-xs text-white/50 mt-0.5">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">ROI Increase</h4>
                  <p className="text-xs text-white/70">Your "Tech Talks Weekly" podcast ROI increased to 35.1%</p>
                  <p className="text-xs text-white/50 mt-0.5">1 day ago</p>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="ghost" className="w-full text-xs">View All Activity</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isCreatorMode && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <Music className="h-5 w-5 mr-2 text-brand-purple" />
              Your Playlists
            </h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {playlists.slice(0, 5).map(playlist => (
              <ContentCard key={playlist.id} content={playlist} type="playlist" />
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <BookAudio className="h-5 w-5 mr-2 text-brand-purple" />
              Your Podcasts
            </h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {podcasts.slice(0, 5).map(podcast => (
              <ContentCard key={podcast.id} content={podcast} type="podcast" />
            ))}
          </div>
        </>
      )}

      {!isCreatorMode && (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Music className="h-5 w-5 mr-2 text-brand-purple" />
              Top Playlists
            </h2>
          </div>

          <div className="glass-card rounded-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/70 font-medium text-sm">#</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Playlist</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Listeners</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Market Cap</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">ROI</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topChartPlaylists.map((playlist, index) => (
                    <tr key={playlist.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 font-medium">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-secondary mr-3 overflow-hidden">
                            <img src={playlist.coverArt} alt={playlist.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium">{playlist.title}</div>
                            <div className="text-sm text-white/50">Creator: {playlist.creatorId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{formatCompactNumber(playlist.listeners)}</td>
                      <td className="p-4">{formatCompactNumber(playlist.marketCap)} BRD</td>
                      <td className="p-4 text-brand-green">{playlist.roi}%</td>
                      <td className="p-4">
                        <Button size="sm" className="bg-brand-purple hover:bg-brand-purple/80 h-8 px-3">
                          Stake
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <BookAudio className="h-5 w-5 mr-2 text-brand-purple" />
              Top Podcasts
            </h2>
          </div>

          <div className="glass-card rounded-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/70 font-medium text-sm">#</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Podcast</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Listeners</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Market Cap</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">ROI</th>
                    <th className="text-left p-4 text-white/70 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topChartPodcasts.map((podcast, index) => (
                    <tr key={podcast.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 font-medium">{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-secondary mr-3 overflow-hidden">
                            <img src={podcast.coverArt} alt={podcast.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium">{podcast.title}</div>
                            <div className="text-sm text-white/50">Creator: {podcast.creatorId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{formatCompactNumber(podcast.listeners)}</td>
                      <td className="p-4">{formatCompactNumber(podcast.marketCap)} BRD</td>
                      <td className="p-4 text-brand-green">{podcast.roi}%</td>
                      <td className="p-4">
                        <Button size="sm" className="bg-brand-purple hover:bg-brand-purple/80 h-8 px-3">
                          Stake
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-brand-purple" />
          Remix Contests
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mockContests.map(contest => (
          <Card key={contest.id} className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{contest.title}</h3>
                  <p className="text-sm text-white/70">{contest.description}</p>
                </div>
                <div className={`px-2 py-1 text-xs rounded ${
                  contest.status === 'active' ? 'bg-brand-green/20 text-brand-green' : 
                  contest.status === 'upcoming' ? 'bg-brand-blue/20 text-brand-blue' : 
                  'bg-brand-purple/20 text-brand-purple'
                }`}>
                  {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-white/70">Prize Pool:</div>
                <div className="font-bold">{formatNumber(contest.prize)} BRD</div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-white/70">Entries:</div>
                <div>{contest.entriesCount}</div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-white/70">Status:</div>
                <div>
                  {contest.hasEntered ? (
                    contest.isWinner ? (
                      <span className="text-brand-green">Winner! 🏆</span>
                    ) : (
                      <span>Entered</span>
                    )
                  ) : (
                    <span>Not Entered</span>
                  )}
                </div>
              </div>
              <Button 
                className={`w-full ${
                  contest.status === 'completed' 
                    ? 'bg-secondary/50 hover:bg-secondary/50 cursor-not-allowed' 
                    : 'bg-brand-purple hover:bg-brand-purple/80'
                }`}
                disabled={contest.status === 'completed'}
              >
                {contest.status === 'upcoming' 
                  ? 'Remind Me' 
                  : contest.status === 'active' 
                    ? contest.hasEntered ? 'View Entry' : 'Enter Contest'
                    : 'Contest Ended'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
