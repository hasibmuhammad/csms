"use client";

import { ReactNode, useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

interface IProps {
  children: ReactNode;
}

const DashboardWrapper = ({ children }: IProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300 ease-in-out min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 lg:p-8 flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
