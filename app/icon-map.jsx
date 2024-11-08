'use client';  

import Link from 'next/link';  
import { MapPin } from 'lucide-react';  

export default function FloatingMapButton() {  
  return (  
    <div className="fixed z-50 bottom-6 right-6 group">  
      <Link  
        href="/map"  
        className="block p-4 text-white transition-all duration-300 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"  
        aria-label="View Map"  
      >  
        <MapPin className="w-6 h-6" />  
      </Link>  
      
      {/* Tooltip */}  
      <div className="absolute right-0 mb-2 transition-opacity duration-200 opacity-0 bottom-full group-hover:opacity-100">  
        <div className="px-3 py-1 text-sm text-white bg-gray-800 rounded-lg whitespace-nowrap">  
          View Map  
        </div>  
        {/* Tooltip Arrow */}  
        <div className="w-2 h-2 bg-gray-800 transform rotate-45 translate-x-4 translate-y-[-4px]"></div>  
      </div>  
    </div>  
  );  
}