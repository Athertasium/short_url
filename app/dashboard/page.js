// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    topUrl: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
       if (status === 'unauthenticated') {
      router.push('/login');
    }

    
    if (status === 'authenticated') {
      fetchUserUrls();
    }
  }, [status, router]);

  const fetchUserUrls = async () => {
    setIsLoading(true);
    try {
     
      const response = await fetch('/api/url');

      if (response.ok) {
        const data = await response.json();
        setUrls(data);
        calculateStats(data);
      } else {
        console.error('Failed to fetch URLs');
        setUrls([]); 
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (urlList) => {
    const totalUrls = urlList.length;
    const totalClicks = urlList.reduce((sum, url) => sum + url.clicks, 0);
    const topUrl = urlList.length > 0
      ? urlList.reduce((max, url) => (url.clicks > max.clicks ? url : max), urlList[0])
      : null;

    setStats({ totalUrls, totalClicks, topUrl });
  };

 
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-8 pt-24 px-8">     
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">          
          Welcome back, {session.user?.name || session.user?.email}!
        </h1>
        <p className="text-gray-600">Manage your shortened URLs and track their performance.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-medium">Total URLs</p>
              <p className="text-4xl font-bold">{stats.totalUrls}</p>
            </div>
            <svg className="w-12 h-12 text-blue-200 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
       
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-green-100 font-medium">Total Clicks</p>
               <p className="text-4xl font-bold">{stats.totalClicks}</p>
             </div>
             <svg className="w-12 h-12 text-green-200 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 12.062A8.004 8.004 0 0112.062 7.188m0 9.724a8.004 8.004 0 01-4.874-4.874" />
             </svg>
           </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
             <div>
               <p className="text-purple-100 font-medium">Top Performer</p>
               <p className="text-xl font-bold truncate">{stats.topUrl?.preferredName || 'N/A'}</p>
               <p className="text-sm text-purple-200">{stats.topUrl?.clicks || 0} clicks</p>
             </div>
             <svg className="w-12 h-12 text-purple-200 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.049 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
             </svg>
           </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Your URLs</h2>
             

          <Link href="/shortener" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
            + Create New
          </Link>
        </div>
        
         {urls.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-gray-500 mb-4 text-lg">You have not created any short URLs yet.</p>
            <Link href="/shortener" className="text-blue-600 hover:underline">Create your first URL</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urls.map((url) => (
                  <tr key={url._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">{url.originalUrl}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                      <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{url.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
   
  );
}
