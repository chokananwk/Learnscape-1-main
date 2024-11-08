"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PlaceCard from "./components/PlaceCard";
import AddPlaceModal from "./components/AddplaceModal";
// import { MOCK_DATA } from "./constants";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
// import UserPlaces from '@/app/components/UserPlaces';  

export default function CollectionPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [places, setPlaces] = useState([]); // เริ่มต้นด้วย array ว่าง

  const { data: session } = useSession();
  // const router = useRouter(); 
  // const [loading, setLoading] = useState(true);  
  // const [error, setError] = useState(null);  
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  

  // เพิ่ม useEffect เพื่อดึงข้อมูลจาก API
  // collection/page.jsx
  useEffect(() => {  
    const fetchPlaces = async () => {  
      try {  
        const res = await fetch('/api/getPlaces');  
        if (!res.ok) {  
          throw new Error('Failed to fetch places');  
        }  
        const data = await res.json();  
        setPlaces(data);  
      } catch (error) {  
        console.error('Error fetching places:', error);  
      }  
    };  
  
    fetchPlaces();  
  }, []);  
  
  const handleDelete = async (id) => {  
    try {  
      const res = await fetch(`/api/places/${id}`, {  
        method: 'DELETE',  
      });  
  
      if (res.ok) {  
        setPlaces(places.filter((place) => place._id !== id));  
      } else {  
        console.error('Failed to delete place');  
      }  
    } catch (error) {  
      console.error('Error deleting place:', error);  
    }  
  };  
  
  const handleLike = async (id) => {  
    try {  
      const res = await fetch(`/api/places/${id}/like`, {  
        method: 'POST',  
      });  
  
      if (res.ok) {  
        setPlaces(  
          places.map((place) =>  
            place._id === id ? { ...place, likes: (place.likes || 0) + 1 } : place  
          )  
        );  
      }  
    } catch (error) {  
      console.error('Error liking place:', error);  
    }  
  };  
  
  const handleAddPlace = async (newPlace) => {  
    try {  
      const response = await fetch("/api/addPlace", {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json",  
        },  
        body: JSON.stringify(newPlace),  
      });  
  
      if (response.ok) {  
        const data = await response.json();  
        setPlaces(prevPlaces => [data.data, ...prevPlaces]);  
        setShowCreateModal(false);  
      } else {  
        console.error("Failed to add place");  
      }  
    } catch (error) {  
      console.error("Error adding place:", error);  
    }  
  };  

  return (
    <>
    <Navbar session={session} />
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Places</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              {!isMobile && "Add Place"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <PlaceCard
                key={place._id}
                place={place}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ))}
          </div>
        </div>

        {showCreateModal && (
          <AddPlaceModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleAddPlace}
          />
        )}
      </div>
    </>
  );
}
