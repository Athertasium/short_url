// app/about/page.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
        </div>

       
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center">
          
            <div className="mb-8">
            <Image
                src="https://lh3.googleusercontent.com/a/ACg8ocIfqCWUWqd1sy33QPhK98nhNa1T4l1oOPh3hOcpXbAepyEWMA=s360-c-no"
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-gradient-to-r from-blue-600 to-purple-600"
                priority
              />
              
              <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
                I am a learner. This is my first project in production.
              </p>
              
              <p className="text-lg text-gray-600 mb-8">
                Welcome to URLShort! This URL shortener represents my journey into web development. 
                I am passionate about learning new technologies and building useful applications.
              </p>
            </div>

            {/* Social Links */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Connect with me</h3>
              <div className="flex justify-center space-x-8">
                {/* LinkedIn */}
                <a 
                  href="www.linkedin.com/in/abhishek-kumar-535680315" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-blue-600 font-medium group-hover:text-blue-700">LinkedIn</span>
                </a>

                {/* Twitter */}
                <a 
                  href="https://x.com/aethertasium" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <span className="text-blue-400 font-medium group-hover:text-blue-500">Twitter</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/athertasium/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center p-4 rounded-xl hover:bg-pink-50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-pink-500 font-medium group-hover:text-pink-600">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      
        <div className="text-center">
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

export default AboutPage;
