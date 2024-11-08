// ลบการ import Place model ออก (ถ้ามี)  
// import Place from '@/models/Place';  <- ลบบรรทัดนี้ออก  

// แทนที่ด้วยการกำหนดค่าคงที่แบบปกติ  
export const PLACE_TYPES = [  
  { value: "restaurant", label: "Restaurant" },  
  { value: "cafe", label: "Cafe" },  
  { value: "park", label: "Park" },  
  { value: "museum", label: "Museum" },  
];  

export const MOODS = [  
  { id: "happy", label: "Happy" },  
  { id: "relaxed", label: "Relaxed" },  
  { id: "excited", label: "Excited" },  
  { id: "peaceful", label: "Peaceful" },  
];  

// ถ้าต้องการ mock data สำหรับ testing  
export const MOCK_DATA = [  
  {  
    id: "1",  
    name: "Sample Place",  
    type: "restaurant",  
    location: "Sample Location",  
    experience: "Great experience",  
    mood: "happy",  
    rating: 4,  
    imageUrl: "/default-image.jpg",  
    likes: 0,  
  },  
  // เพิ่ม mock data ตามต้องการ  
];  

// ฟังก์ชันสำหรับแปลง type เป็น label  
export const getTypeLabel = (type) => {  
  const placeType = PLACE_TYPES.find((t) => t.value === type);  
  return placeType ? placeType.label : type;  
};  

// ฟังก์ชันสำหรับแปลง mood เป็น label  
export const getMoodLabel = (mood) => {  
  const moodType = MOODS.find((m) => m.id === mood);  
  return moodType ? moodType.label : mood;  
};