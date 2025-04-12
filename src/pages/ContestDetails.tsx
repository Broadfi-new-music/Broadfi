import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Contest, Remix } from '@/types/contest';
import { fetchContestById, fetchRemixesByContestId } from '@/data/contest';
import ContestTabs from '@/components/ContestTabs';

const ContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [contest, setContest] = useState<Contest | null>(null);
  const [remixes, setRemixes] = useState<Remix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContestData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const contestData = await fetchContestById(id);
      
      if (!contestData) {
        setError('Contest not found');
        return;
      }
      
      setContest(contestData);
      
      const remixesData = await fetchRemixesByContestId(id);
      setRemixes(remixesData);
      
    } catch (err) {
      setError('Failed to load contest data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadContestData();
  }, [id]);

  const handleRefreshRemixes = () => {
    if (id) {
      fetchRemixesByContestId(id)
        .then(data => setRemixes(data))
        .catch(err => console.error('Failed to refresh remixes', err));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-brand-purple-light border-t-brand-purple rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading contest details...</p>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Contest not found'}</h2>
        <Link to="/">
          <Button>Back to Contests</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-brand-purple mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Contests
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">{contest.title}</h1>
            <span className="ml-3 px-3 py-1 bg-brand-purple-light text-brand-purple-dark text-sm font-medium rounded-full">
              {contest.category}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{contest.description}</p>
        </div>
        
        <div className="flex flex-col items-start md:items-end">
          <div className="text-gray-200 flex flex-col md:items-end">
            <span>Submission Deadline:</span>
            <span className="font-semibold">
              {new Date(contest.deadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <ContestTabs 
          contest={contest} 
          remixes={remixes} 
          onRefreshRemixes={handleRefreshRemixes} 
        />
      </div>
    </div>
  );
};

export default ContestDetail;
