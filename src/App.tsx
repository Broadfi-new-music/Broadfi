
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import Contest from "./pages/Contest";
import Playlists from "./pages/Playlists";
import Podcast from "./pages/Podcast";
import Swap from "./pages/Swap";
import Jukebox from "./pages/Jukebox";
import AudioYield from "./pages/AudioYield";
import Stake from "./pages/Stake";
import NotFound from "./pages/NotFound";
import ContestDetail from "./pages/ContestDetail";
import PlaylistDetail from "./pages/PlaylistDetail";
import Upload from "./pages/UploadPlaylist";
import PodcastDetail from "./pages/PodcastDetail";
import UploadPodcast from "./pages/UploadPodcast";
import Dashboard from "./pages/DashboardPage";
import Wallet from "./pages/Wallet";
import CreateContest from "./pages/CreateContest";
import LivestreamBattle from "./pages/LivestreamBattle";
import CreateSchedule from "./pages/CreateSchedule"; 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <UserProvider>
    <AppProvider>
    <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/jukebox" element={<Jukebox />} />
          <Route path="/audio-yield" element={<AudioYield />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
          <Route path="/contest/:id" element={<ContestDetail />} />
          <Route path="/podcast/:id" element={<PodcastDetail />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload" element={<UploadPodcast />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/create-contest" element={<CreateContest />} />
          <Route path="/create-schedule" element={<CreateSchedule />} />
          <Route path="/livestream" element={<LivestreamBattle/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
    </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
