import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StakeForm from './StakeForm';
import UnstakeForm from './UnstakeForm';
import PerformanceChart from './PerformanceChart';
import StakePositions from './StakePositions';
import { useToast } from "@/components/ui/use-toast";
import { StakingProvider } from '../context/StakingContext';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <StakingProvider>
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your BRD Staking Summary</CardTitle>
                <CardDescription>Track your staked tokens and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Total Staked</div>
                    <div className="text-3xl font-bold">0.00 BRD</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Total Rewards</div>
                    <div className="text-3xl font-bold text-brd-accent">+0.00 BRD</div>
                  </div>
                </div>

                <div className="mt-8">
                  <PerformanceChart />
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <StakePositions />
            </div>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Stake Your BRD</CardTitle>
                <CardDescription>Earn rewards by staking your tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stake">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="stake">Stake</TabsTrigger>
                    <TabsTrigger value="unstake">Unstake</TabsTrigger>
                  </TabsList>
                  <TabsContent value="stake">
                    <StakeForm />
                  </TabsContent>
                  <TabsContent value="unstake">
                    <UnstakeForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col items-start text-xs text-muted-foreground border-t pt-4">
                <p>• Early unstaking may result in reduced rewards.</p>
                <p>• Gas fees apply for staking and unstaking operations.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </StakingProvider>
  );
};

export default Dashboard;
