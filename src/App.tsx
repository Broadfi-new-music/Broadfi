
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contest from "./pages/Contest";
import Playlists from "./pages/Playlists";
import Podcast from "./pages/Podcast";
import Swap from "./pages/Swap";
import AmmPools from "./pages/AmmPools";
import Jukebox from "./pages/Jukebox";
import AudioYield from "./pages/AudioYield";
import Stake from "./pages/Stake";
import NotFound from "./pages/NotFound";
import ContestDetail from "./pages/ContestDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/amm-pools" element={<AmmPools />} />
          <Route path="/jukebox" element={<Jukebox />} />
          <Route path="/audio-yield" element={<AudioYield />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/contest/:id" element={<ContestDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
