"use client";  

import { Star, ThumbsUp } from "lucide-react";  
import Image from "next/image";  
import { getTypeLabel, getMoodLabel } from "../constants";  

export default function PlaceCard({ place, onLike }) {  
  const {  
    name,  
    type,  
    location,  
    experience,  
    mood,  
    rating,  
    imageUrl,  
    likes = 0,  
  } = place;  

  return (  
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">  
      <div className="relative h-48">  
        <Image  
          src={imageUrl || "/default-image.jpg"}  
          alt={name}  
          layout="fill"  
          objectFit="cover"  
        />  
      </div>  
      
      <div className="p-4">  
        <h3 className="text-xl font-semibold">{name}</h3>  
        
        <div className="mt-2 space-y-2">  
          <p className="text-sm text-gray-600">  
            <span className="font-medium">Type:</span> {getTypeLabel(type)}  
          </p>  
          <p className="text-sm text-gray-600">  
            <span className="font-medium">Location:</span> {location}  
          </p>  
          <p className="text-sm text-gray-600">  
            <span className="font-medium">Mood:</span> {getMoodLabel(mood)}  
          </p>  
          <p className="text-sm text-gray-600">  
            <span className="font-medium">Experience:</span> {experience}  
          </p>  
        </div>  

        <div className="flex items-center justify-between mt-4">  
          <div className="flex items-center">  
            {[...Array(5)].map((_, index) => (  
              <Star  
                key={index}  
                size={16}  
                className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}  
              />  
            ))}  
          </div>  

          <button  
            onClick={() => onLike?.(place.id)}  
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition-colors border border-blue-600 rounded-full hover:bg-blue-50"  
          >  
            <ThumbsUp size={14} />  
            <span>{likes}</span>  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}
// import { Heart, X, MapPin, Star } from "lucide-react";
// import { MOODS } from "../constants";

// export default function PlaceCard({ place, onDelete, onLike }) {
//   return (
//     <div className="transition-all bg-white shadow-sm rounded-xl hover:shadow-md group">
//       <div className="relative">
//         <img
//           src={place.imageUrl || "/default-image.jpg"} // ใช้ `imageUrl` และใส่รูปภาพ default หากไม่มี
//           alt={place.name}
//           className="object-cover w-full h-48 rounded-t-xl"
//         />
//         <div className="absolute flex gap-2 top-2 right-2">
//           <button
//             onClick={() => onDelete(place._id)} // ใช้ `place._id`
//             className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="flex items-start justify-between">
//           <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
//           <div className="flex items-center gap-1 text-yellow-500">
//             <Star size={16} fill="currentColor" />
//             <span className="text-sm font-medium">{place.rating}</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-1 mt-1 text-gray-600">
//           <MapPin size={16} />
//           <span className="text-sm">{place.location}</span>
//         </div>

//         <div className="flex gap-2 mt-2">
//           <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
//             {place.type}
//           </span>
//           {place.mood && (
//             <span
//               className={`inline-block px-2 py-1 ${
//                 MOODS.find((m) => m.id === place.mood)?.color || "bg-gray-200"
//               } text-xs rounded-full`}
//             >
//               {MOODS.find((m) => m.id === place.mood)?.label || place.mood}
//             </span>
//           )}
//         </div>

//         <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
//           {place.experience}
//         </p>

//         <div className="flex items-center justify-between pt-3 mt-4 border-t">
//           <button className="text-sm text-blue-500 hover:text-blue-600">
//             Read more
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
