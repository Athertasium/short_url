
// app/page.js
import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-16">
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
           
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                </svg>
              </div>
            </div>
             <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                URLShort
              </span>
            </h1>
             <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Shorten your URLs with custom names and track their performance with ease
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/shortener" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Try Now
              </Link>
              {!session && (
                <Link 
                  href="/login" 
                  className="bg-white text-blue-600 border-2 border-blue-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
     


 
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose URLShort?</h2>
            <p className="text-xl text-gray-600">Create custom short URLs that are memorable and brandable</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Custom Names</h3>
              <p className="text-gray-600 text-lg">Choose your own custom short URL names for better branding</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="bg-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure Storage</h3>
              <p className="text-gray-600 text-lg">All URLs are securely stored with MongoDB database</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Redirect</h3>
              <p className="text-gray-600 text-lg">Lightning-fast redirects to your original URLs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


