import { useState } from "react";
import { useUser } from "@/context/UserContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateTime, formatNumber, truncateAddress } from "@/utils/formatters";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Coins, Radio, BookAudio, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Wallet() {
  const { user, transactions, withdrawTokens } = useUser();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { toast } = useToast();

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw",
        variant: "destructive"
      });
      return;
    }

    if (amount > user.tokensEarned) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough tokens to withdraw this amount",
        variant: "destructive"
      });
      return;
    }

    withdrawTokens(amount);
    setWithdrawAmount("");
    
    toast({
      title: "Withdrawal initiated",
      description: `${amount} BRD will be sent to your wallet shortly`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Wallet</h1>
        <p className="text-white/70">Manage your tokens, view transactions, and withdraw earnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="glass-card col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <WalletIcon className="mr-2 h-5 w-5 text-brand-purple" />
              Token Balance
            </CardTitle>
            <CardDescription>Your current BRD token balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {formatNumber(user.tokensEarned)} <span className="text-brand-purple">BRD</span>
            </div>
            <div className="text-sm text-white/70 mb-4">
              Connected Wallet: {truncateAddress(user.walletAddress)}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 mb-1 block">Withdraw Amount</label>
                <div className="flex space-x-2">
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-secondary/40 border-white/10"
                  />
                  <Button 
                    onClick={handleWithdraw}
                    className="bg-brand-purple hover:bg-brand-purple/80"
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">Max</Button>
                <Button variant="outline" size="sm">Connect New Wallet</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Token Distribution</CardTitle>
            <CardDescription>Breakdown of your token earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple mr-3">
                    <Radio className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Livestreams</span>
                </div>
                <div className="text-2xl font-bold mb-1">1,737.75 BRD</div>
                <div className="text-xs text-white/70">11.8% of total earnings</div>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink mr-3">
                    <Music className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Playlists</span>
                </div>
                <div className="text-2xl font-bold mb-1">8,431.00 BRD</div>
                <div className="text-xs text-white/70">57.1% of total earnings</div>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue mr-3">
                    <BookAudio className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Podcasts</span>
                </div>
                <div className="text-2xl font-bold mb-1">4,584.14 BRD</div>
                <div className="text-xs text-white/70">31.1% of total earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
          <CardDescription>Recent token activities on your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="staking">Staking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Type</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Amount</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Source</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Date & Time</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center ${
                              tx.type === 'earning' ? 'bg-brand-green/20 text-brand-green' : 
                              tx.type === 'withdrawal' ? 'bg-brand-red/20 text-brand-red' : 
                              'bg-brand-blue/20 text-brand-blue'
                            }`}>
                              {tx.type === 'earning' ? <ArrowDownLeft className="h-4 w-4" /> : 
                               tx.type === 'withdrawal' ? <ArrowUpRight className="h-4 w-4" /> : 
                               <Coins className="h-4 w-4" />}
                            </div>
                            <div className="font-medium capitalize">{tx.type}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`${
                            tx.type === 'earning' ? 'text-brand-green' : 
                            tx.type === 'withdrawal' ? 'text-brand-red' : 
                            'text-brand-blue'
                          }`}>
                            {tx.type === 'earning' ? '+' : tx.type === 'withdrawal' ? '-' : tx.type === 'staking' ? '-' : ''}
                            {formatNumber(tx.amount)} BRD
                          </div>
                        </td>
                        <td className="p-4">{tx.source || '-'}</td>
                        <td className="p-4 text-white/70">{formatDateTime(tx.timestamp)}</td>
                        <td className="p-4">
                          <div className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                            tx.status === 'completed' ? 'bg-brand-green/20 text-brand-green' : 
                            tx.status === 'pending' ? 'bg-brand-orange/20 text-brand-orange' : 
                            'bg-brand-red/20 text-brand-red'
                          }`}>
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Type</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Amount</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Source</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Date & Time</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .filter(tx => tx.type === 'earning')
                      .map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-brand-green/20 text-brand-green mr-3 flex items-center justify-center">
                                <ArrowDownLeft className="h-4 w-4" />
                              </div>
                              <div className="font-medium capitalize">{tx.type}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-brand-green">
                              +{formatNumber(tx.amount)} BRD
                            </div>
                          </td>
                          <td className="p-4">{tx.source || '-'}</td>
                          <td className="p-4 text-white/70">{formatDateTime(tx.timestamp)}</td>
                          <td className="p-4">
                            <div className="inline-flex items-center px-2 py-1 text-xs rounded bg-brand-green/20 text-brand-green">
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>  
            
            <TabsContent value="withdrawals" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Type</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Amount</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Wallet</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Date & Time</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .filter(tx => tx.type === 'withdrawal')
                      .map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-brand-red/20 text-brand-red mr-3 flex items-center justify-center">
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                              <div className="font-medium capitalize">{tx.type}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-brand-red">
                              -{formatNumber(tx.amount)} BRD
                            </div>
                          </td>
                          <td className="p-4">{truncateAddress(user.walletAddress)}</td>
                          <td className="p-4 text-white/70">{formatDateTime(tx.timestamp)}</td>
                          <td className="p-4">
                            <div className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                              tx.status === 'completed' ? 'bg-brand-green/20 text-brand-green' : 
                              tx.status === 'pending' ? 'bg-brand-orange/20 text-brand-orange' : 
                              'bg-brand-red/20 text-brand-red'
                            }`}>
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="staking" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Type</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Amount</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Content</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Date & Time</th>
                      <th className="text-left p-4 text-white/70 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .filter(tx => tx.type === 'staking')
                      .map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-brand-blue/20 text-brand-blue mr-3 flex items-center justify-center">
                                <Coins className="h-4 w-4" />
                              </div>
                              <div className="font-medium capitalize">{tx.type}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-brand-blue">
                              -{formatNumber(tx.amount)} BRD
                            </div>
                          </td>
                          <td className="p-4">{tx.source || '-'}</td>
                          <td className="p-4 text-white/70">{formatDateTime(tx.timestamp)}</td>
                          <td className="p-4">
                            <div className="inline-flex items-center px-2 py-1 text-xs rounded bg-brand-green/20 text-brand-green">
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
