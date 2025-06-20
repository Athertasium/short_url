// app/shortener/page.js
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GenerateButton from '@/components/generatebutton';

const Shortener = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 
  useEffect(() => {
    if (status === 'loading') return; 
    
    if (!session) {
      router.push('/login'); 
      return;
    }
  }, [session, status, router]);


  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

 
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/generate', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl,
          preferredName,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setShortUrl(data.shortUrl);
        setSuccess('URL shortened successfully!');
        setOriginalUrl('');
        setPreferredName('');
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setSuccess('URL copied to clipboard!');
    } catch (err) {
      setError('Failed to copy URL');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">     
        <div className="text-center mb-12">
          <div className="mb-4">
            <p className="text-lg text-gray-600">
              Welcome back, <span className="font-semibold text-blue-600">{session.user.name || session.user.email}</span>!
            </p>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              URL Shortener
            </span>
          </h1>
          <p className="text-xl text-gray-600">Create your custom short URL</p>
        </div>

   
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
         
            <div>
              <label htmlFor="originalUrl" className="block text-lg font-semibold text-gray-700 mb-2">
                Original URL *
              </label>
              <input
                type="url"
                id="originalUrl"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="w-full px-6 py-4 text-lg border-2 text-gray-700  border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                required
              />
            </div>

           
            <div>
              <label htmlFor="preferredName" className="block text-lg font-semibold text-gray-700 mb-2">
                Preferred Short Name *
              </label>
              <div className="flex items-center">
                <span className="bg-gray-100 px-4 py-4 rounded-l-xl text-lg text-gray-800 border-2 border-r-0 border-gray-200">
                  urlshort.ly/
                </span>
                <input
                  type="text"
                  id="preferredName"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="google"
                  className="flex-1 px-6 py-4 text-lg text-gray-600 border-2  border-gray-200 rounded-r-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Only lowercase letters, numbers, and hyphens allowed</p>
            </div>
            <div className='flex justify-center items-center' >
              <GenerateButton isLoading={isLoading} />
            </div>
          </form>

          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}

          
          {success && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-600 font-medium">{success}</p>
              </div>
            </div>
          )}
        </div>

     
        {shortUrl && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Short URL is Ready!</h3>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 bg-gray-50 rounded-xl p-6">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 break-all"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy URL
              </button>
            </div>
          </div>
        )}

       
        <div className="flex justify-center space-x-8 mt-12">
          <Link 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-300"
          >
            View Dashboard
          </Link>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shortener;
