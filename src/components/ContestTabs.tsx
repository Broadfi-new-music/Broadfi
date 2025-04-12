import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Contest, Remix } from '@/types/contest';
import AudioContests from './AudioContests';
import RemixCard from './RemixCard';
import UploadForm from './UploadForm';

interface ContestTabsProps {
  contest: Contest;
  remixes: Remix[];
  onRefreshRemixes: () => void;
}

const ContestTabs: React.FC<ContestTabsProps> = ({ contest, remixes, onRefreshRemixes }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="remixes">Remixes</TabsTrigger>
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
        <TabsTrigger value="upload">Upload</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contest Details</h2>
            <p className="text-gray-600">{contest.description}</p>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Rules</h3>
              <p className="text-sm text-gray-600">{contest.rules}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Prize</h3>
              <p className="text-xl font-semibold text-brand-purple">
                {contest.prize.toLocaleString()} BRD Tokens
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Theme Audio</h3>
            <p className="text-gray-600">Download and remix this track to participate in the contest.</p>
            <AudioContests audioUrl={contest.themeAudioUrl} title={`${contest.title} Theme`} />
            
            <a 
              href={contest.themeAudioUrl} 
              download 
              className="inline-block mt-4 px-6 py-3 bg-brand-purple text-white font-medium rounded-lg hover:bg-brand-purple-dark transition-colors"
            >
              Download Theme Track
            </a>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="remixes" className="mt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Submitted Remixes</h2>
          <p className="text-sm text-gray-500">{remixes.length} submissions</p>
        </div>
        
        {remixes.length > 0 ? (
          <div className="space-y-4">
            {remixes
              .sort((a, b) => b.votes - a.votes)
              .map((remix, index) => (
                <RemixCard 
                  key={remix.id} 
                  remix={remix} 
                  rank={index + 1} 
                  onUpdate={onRefreshRemixes} 
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium text-gray-600">No remixes submitted yet</h3>
            <p className="text-gray-500 mt-2">Be the first to submit your remix to this contest!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="announcements" className="mt-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Contest Announcements</h2>
          
          <div className="border rounded-lg p-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg">Contest Launch</h3>
              <p className="text-sm text-gray-200">Posted on April 1, 2025</p>
              <div className="mt-2 text-gray-200">
                <p>We're excited to announce the launch of the {contest.title} contest!</p>
                <p className="mt-2">Get ready to showcase your production skills and win BRD tokens. Download the theme track and start creating your remix now.</p>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg">Judging Criteria Announced</h3>
              <p className="text-sm text-gray-200">Posted on April 5, 2025</p>
              <div className="mt-2 text-gray-200">
                <p>Here's how entries will be judged:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Creativity & Originality (30%)</li>
                  <li>Production Quality (30%)</li>
                  <li>Musical Content (20%)</li>
                  <li>Community Votes (20%)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">One Week Remaining!</h3>
              <p className="text-sm text-gray-200">Posted on April 18, 2025</p>
              <div className="mt-2 text-gray-200">
                <p>Only one week left to submit your remixes! The response so far has been amazing, and we can't wait to hear more of your incredible creations.</p>
                <p className="mt-2">Remember to share your submission with your network to get more votes and increase your chances of winning!</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="upload" className="mt-6">
        <UploadForm contestId={contest.id} onUploadSuccess={onRefreshRemixes} />
      </TabsContent>
    </Tabs>
  );
};

export default ContestTabs;
