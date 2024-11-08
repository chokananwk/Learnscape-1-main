'use client';  

import { useState, useEffect } from 'react';  
import { useSession } from 'next-auth/react';  
import PlaceCard from '../PlaceCard'; // ปรับ path ตามโครงสร้างโปรเจค  
import { Search } from 'lucide-react';  

export default function UserPlaces({ onDelete, onLike }) {  
    const [places, setPlaces] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [searchTerm, setSearchTerm] = useState('');  
    const { data: session } = useSession();  

    // ดึงข้อมูล places ของ user  
    useEffect(() => {  
        const fetchUserPlaces = async () => {  
            try {  
                if (!session?.user?.id) return;  

                const response = await fetch(`/api/places/user/${session.user.id}`);  
                
                if (!response.ok) {  
                    throw new Error('Failed to fetch places');  
                }  

                const data = await response.json();  
                setPlaces(data);  
                
            } catch (error) {  
                setError(error.message);  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchUserPlaces();  
    }, [session]);  

    // ฟังก์ชันสำหรับค้นหา  
    const handleSearch = async (e) => {  
        e.preventDefault();  
        try {  
            setLoading(true);  
            const response = await fetch(`/api/places/search?term=${searchTerm}&userId=${session.user.id}`);  
            
            if (!response.ok) {  
                throw new Error('Failed to search places');  
            }  

            const data = await response.json();  
            setPlaces(data);  
            
        } catch (error) {  
            setError(error.message);  
        } finally {  
            setLoading(false);  
        }  
    };  

    if (loading) {  
        return (  
            <div className="flex items-center justify-center p-8">  
                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>  
            </div>  
        );  
    }  

    if (error) {  
        return (  
            <div className="p-4 text-center text-red-500">  
                <p>Error: {error}</p>  
            </div>  
        );  
    }  

    return (  
        <div className="space-y-6">  
            {/* Search Bar */}  
            <form onSubmit={handleSearch} className="flex gap-2">  
                <div className="relative flex-1">  
                    <input  
                        type="text"  
                        value={searchTerm}  
                        onChange={(e) => setSearchTerm(e.target.value)}  
                        placeholder="Search your places..."  
                        className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    />  
                    <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />  
                </div>  
                <button  
                    type="submit"  
                    className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"  
                >  
                    Search  
                </button>  
            </form>  

            {/* Places Grid */}  
            {places.length === 0 ? (  
                <div className="py-8 text-center text-gray-500">  
                    <p>No places found. Try adding some!</p>  
                </div>  
            ) : (  
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">  
                    {places.map((place) => (  
                        <PlaceCard  
                            key={place._id}  
                            place={place}  
                            onDelete={onDelete}  
                            onLike={onLike}  
                            isOwner={true}  
                        />  
                    ))}  
                </div>  
            )}  
        </div>  
    );  
}