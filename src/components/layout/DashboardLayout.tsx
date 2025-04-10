import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import NavigationBar from '@/components/NavigationBar';
import HeaderDashboard from "@/components/layout/HeaderDashboard"


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* <Header /> */}
      <NavigationBar />
      <HeaderDashboard/>
        <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
