import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import StakingModal from '@/components/StakingModal';
import { mockPodcasts, stakeTokens, withdrawTokens, getUserStake } from '@/data/mockDataPodcast';
import { type Podcast } from '@/components/PodcastCard';

const PodcastDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [userStake, setUserStake] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch podcast details
    const fetchPodcast = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundPodcast = mockPodcasts.find(p => p.id === id);
        if (foundPodcast) {
          setPodcast(foundPodcast);
          setUserStake(getUserStake(foundPodcast.id));
        }
        setIsLoading(false);
      }, 500);
    };
    
    fetchPodcast();
  }, [id]);
  
  const handleStake = (amount: number) => {
    if (!podcast) return;
    
    // In a real app, this would be a blockchain transaction
    const success = stakeTokens(podcast.id, amount);
    if (success) {
      setUserStake(prevStake => prevStake + amount);
      setPodcast({
        ...podcast,
        tokenPrice: podcast.tokenPrice + amount * 0.0001,
        stakedAmount: podcast.stakedAmount + amount,
        roi: podcast.roi + 0.5
      });
    }
  };
  
  const handleWithdraw = (amount: number) => {
    if (!podcast) return;
    
    // In a real app, this would be a blockchain transaction
    const success = withdrawTokens(podcast.id, amount);
    if (success) {
      setUserStake(prevStake => prevStake - amount);
      setPodcast({
        ...podcast,
        tokenPrice: podcast.tokenPrice - amount * 0.0001,
        stakedAmount: podcast.stakedAmount - amount,
        roi: podcast.roi - 0.5
      });
    }
  };
  
  const handleEpisodePlay = (episodeIndex: number) => {
    // This would trigger the audio player in a real app
    // Here we'll just log for demo purposes
    console.log(`Playing episode ${episodeIndex + 1} from ${podcast?.title}`);
    
    // In a production app, this would dispatch an event to the global
    // audio player component to start playback
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!podcast) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl mb-4">Podcast not found</h2>
        <Button onClick={() => navigate('/')}>Back to Discover</Button>
      </div>
    );
  }
  
  const priceChangeClass = podcast.roi >= 0 ? 'text-positive' : 'text-negative';
  const TrendIcon = podcast.roi >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="animate-slide-up">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Discover
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img 
            src={podcast.imageUrl} 
            alt={podcast.title} 
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-lg font-bold">{podcast.tokenPrice.toFixed(3)} BRD</p>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-lg font-bold">{podcast.marketCap.toLocaleString()} BRD</p>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">ROI</p>
              <div className="flex items-center text-lg font-bold">
                <TrendIcon className={`${priceChangeClass} h-5 w-5 mr-1 text-green-400`} />
                <span className={`${priceChangeClass} text-green-400`}>
                  {Math.abs(podcast.roi).toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Total Staked</p>
              <p className="text-lg font-bold">{podcast.stakedAmount.toLocaleString()} BRD</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Your Stake</p>
              <p className="text-lg font-bold">{userStake.toFixed(3)} BRD</p>
            </div>
            
            <Button 
              className="w-full bg-brd hover:bg-brdDark text-green-400" 
              onClick={() => setIsStakingModalOpen(true)}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Stake Tokens
            </Button>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div>
            <h1 className="text-3xl font-bold">{podcast.title}</h1>
            <p className="text-xl text-muted-foreground">{podcast.creator}</p>
          </div>
          
          <div className="flex items-center gap-8 my-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{podcast.listeners.toLocaleString()} listeners</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-muted-foreground" />
              <span>{podcast.episodes.length} episodes</span>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">Episodes</h2>
          
          <div className="space-y-4">
            {podcast.episodes.map((episode, index) => (
              <div 
                key={episode.id} 
                className="flex items-center p-4 rounded-md bg-card border border-border hover:border-primary transition-colors"
              >
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="mr-4" 
                  onClick={() => handleEpisodePlay(index)}
                >
                  <Play className="h-5 w-5" />
                </Button>
                
                <div className="flex-grow">
                  <h3 className="font-medium">{episode.title}</h3>
                  <p className="text-sm text-muted-foreground">{episode.duration}</p>
                </div>
                
                <div className="hidden sm:flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <StakingModal
        open={isStakingModalOpen}
        onOpenChange={setIsStakingModalOpen}
        podcastId={podcast.id}
        podcastTitle={podcast.title}
        tokenPrice={podcast.tokenPrice}
        onStake={handleStake}
        onWithdraw={handleWithdraw}
        userStakedAmount={userStake}
      />
    </div>
  );
};

export default PodcastDetail;
