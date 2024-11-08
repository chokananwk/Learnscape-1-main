"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/Logo.png";
import { signOut } from "next-auth/react";

function Navbar({ session }) {
  return (
    <>
      {/* Spacer div to compensate for fixed navbar */}
      <div className="h-16"></div>

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="px-3 py-1 text-xl font-bold text-black rounded bg-gradient-to-r from-blue-400 to-blue-600">
                  Learn Scape
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <ul className="flex space-x-4 my-4">
                {!session ? (
                  <>
                    <li>
                      <Link
                        href="/"
                        className="inline-flex items-center px-1 pt-1 text-gray-900 border-b-2 border-transparent hover:border-blue-500"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/welcome"
                        className="inline-flex items-center px-1 pt-1 text-gray-600 border-b-2 border-transparent hover:border-blue-500"
                      >
                        Welcome
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Profile"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Event"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Event
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="collections"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Sign in
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/"
                        className="inline-flex items-center px-1 pt-1 text-gray-900 border-b-2 border-transparent hover:border-blue-500"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Profile"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Event"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Event
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="collections"
                        className="inline-flex items-center px-1 pt-1 text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900"
                      >
                        Collections
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={() => signOut()}
                        className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                      >
                        Logout
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* <div className="flex items-center -mr-2 sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div> */}
          </div>
        </div>

        {/* Mobile menu
        {isOpen && (
          <div className="bg-white border-t border-gray-200 sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-base font-medium text-blue-700 border-l-4 border-blue-500 bg-blue-50"
              >
                Home
              </Link>
              <Link
                href="/Profile"
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Profile
              </Link>
              <Link
                href="/Event"
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Event
              </Link>
              <Link
                href="collections"
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Collections
              </Link>
              <Link
                href="/Signin"
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        )} */}
      </nav>
    </>
  );
}

export default Navbar;
