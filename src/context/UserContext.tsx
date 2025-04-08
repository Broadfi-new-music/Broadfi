import { createContext, useContext, useState, ReactNode } from "react";
import { LiveStream, Playlist, Podcast, StakeInfo, TokenTransaction, UserProfile } from "@/types/dashboard";
import { mockContests, mockLiveStreams, mockPlaylists, mockPodcasts, mockStakedContent, mockTransactions, mockUser } from "@/utils/dashboardMockData";

interface UserContextType {
  user: UserProfile;
  livestreams: LiveStream[];
  playlists: Playlist[];
  podcasts: Podcast[];
  stakedContent: StakeInfo[];
  transactions: TokenTransaction[];
  createLivestream: () => void;
  withdrawTokens: (amount: number) => void;
  isCreatorMode: boolean;
  toggleCreatorMode: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [livestreams, setLivestreams] = useState<LiveStream[]>(mockLiveStreams);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [podcasts, setPodcasts] = useState<Podcast[]>(mockPodcasts);
  const [stakedContent, setStakedContent] = useState<StakeInfo[]>(mockStakedContent);
  const [transactions, setTransactions] = useState<TokenTransaction[]>(mockTransactions);
  const [isCreatorMode, setIsCreatorMode] = useState(true);

  const createLivestream = () => {
    // This would be a real API call in a production app
    const newLivestream: LiveStream = {
      id: `ls${livestreams.length + 1}`,
      creatorId: user.id,
      title: "New Livestream",
      description: "My awesome new livestream",
      thumbnailUrl: "/placeholder.svg",
      isLive: true,
      viewersCount: 0,
      tokensEarned: 0,
      gifts: [],
      startedAt: new Date().toISOString(),
      collaborators: []
    };
    
    setLivestreams([newLivestream, ...livestreams]);
  };

  const withdrawTokens = (amount: number) => {
    // This would be a real API call in a production app
    const newTransaction: TokenTransaction = {
      id: `tx${transactions.length + 1}`,
      type: "withdrawal",
      amount: amount,
      timestamp: new Date().toISOString(),
      status: "pending"
    };
    
    setTransactions([newTransaction, ...transactions]);
    setUser({
      ...user,
      tokensEarned: user.tokensEarned - amount
    });
  };

  const toggleCreatorMode = () => {
    setIsCreatorMode(!isCreatorMode);
  };

  return (
    <UserContext.Provider 
      value={{
        user,
        livestreams,
        playlists,
        podcasts,
        stakedContent,
        transactions,
        createLivestream,
        withdrawTokens,
        isCreatorMode,
        toggleCreatorMode
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
