import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'Neighborly - Connect with your community' }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="A platform for neighbors to connect, share, and help each other" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Sidebar />
      
      <div className="flex flex-col flex-grow overflow-hidden">
        <Header />
        <main className="flex-grow overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;