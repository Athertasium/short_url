// components/Navbar.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 fixed w-full z-50 top-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold hover:text-gray-200 transition-colors duration-300">
              URLShort
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/shortener" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md text-sm font-medium">Shortener</Link>
              <Link href="/about" className="text-white hover:bg-purple-500 px-3 py-2 rounded-md text-sm font-medium">About me</Link>
            </div>
          </div>

        
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="text-white text-sm">Loading...</div>
            ) : session ? (
              <>
                <Link href="/dashboard" className="text-white hover:bg-purple-500 hover:bg-opacity-20 px-4 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <button onClick={() => signOut()} className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white px-4 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link href="/login" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">Sign Up</Link>
              </>
            )}
          </div>

         
          <div className="md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-white">
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-6 bg-white transform transition-all ${isOpen ? 'rotate-45 top-2.5' : 'top-0'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-white transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100 top-2.5'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-white transform transition-all ${isOpen ? '-rotate-45 top-2.5' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-700 to-purple-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" onClick={toggleMenu} className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/shortener" onClick={toggleMenu} className="text-white block px-3 py-2 rounded-md text-base font-medium">Shortener</Link>
            <Link href="/about" onClick={toggleMenu} className="text-white block px-3 py-2 rounded-md text-base font-medium">About me</Link>
            <div className="border-t border-white/20 pt-4 mt-4">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={toggleMenu} className="text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                  <button onClick={() => { signOut(); toggleMenu(); }} className="w-full text-left text-white block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={toggleMenu} className="text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                  <Link href="/login" onClick={toggleMenu} className="mt-2 w-full text-center bg-white text-blue-600 block px-3 py-2 rounded-full text-base font-semibold">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
