import { useState, useCallback } from "react";
import { X, Camera, Star } from "lucide-react";
import { MOODS, PLACE_TYPES } from "../constants";


export default function AddPlaceModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    experience: "",
    mood: "",
    rating: 5,
  });


  const [imageFile, setImageFile] = useState(null);  
  const [imagePreview, setImagePreview] = useState(null);  
  const [isDragging, setIsDragging] = useState(false);  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [error, setError] = useState(null);  
  const [uploadProgress, setUploadProgress] = useState(0);  
  
   // Validate file  
   const validateFile = (file) => {  
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB  
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];  

    if (!ALLOWED_TYPES.includes(file.type)) {  
      throw new Error('Only JPG, PNG and WebP images are allowed');  
    }  

    if (file.size > MAX_SIZE) {  
      throw new Error('File size must be less than 5MB');  
    }  

    return true;  
  }; 

  const handleImageChange = (e) => {  
    const file = e.target.files[0];  
    try {  
      if (file && validateFile(file)) {  
        setImageFile(file);  
        setImagePreview(URL.createObjectURL(file));  
        setError(null);  
      }  
    } catch (err) {  
      setError(err.message);  
    }  
  };  

  // Prevent default drag behaviors
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle drag events
  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }, []);
  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setError(null);  
    setIsSubmitting(true);  
    setUploadProgress(0);  
    try {  
        // ถ้ามีการอัพโหลดรูปภาพ ควรอัพโหลดไปยัง server ก่อน  
        let imageUrl = '/default-image.jpg';  
        if (imageFile) {  
            const formData = new FormData();  
            formData.append('image', imageFile); 
            
            const xhr = new XMLHttpRequest(); 
            
            xhr.upload.onprogress = (event) => {  
              if (event.lengthComputable) {  
                const progress = Math.round((event.loaded / event.total) * 100);  
                setUploadProgress(progress);  
              }  
            };  
    
            // Upload image  
            const uploadResult = await new Promise((resolve, reject) => {  
              xhr.open('POST', '/api/upload');  
              
              xhr.onload = () => {  
                if (xhr.status === 200) {  
                  resolve(JSON.parse(xhr.response));  
                } else {  
                  reject(new Error('Upload failed'));  
                }  
              };  
              
              xhr.onerror = () => reject(new Error('Upload failed'));  
              xhr.send(formData);  
            });  
    
            imageUrl = uploadResult.imageUrl;  
          } 
            
            // สร้าง API endpoint สำหรับอัพโหลดรูปภาพ  
            const uploadResponse = await fetch('/api/upload', {  
                method: 'POST',  
                body: formData,  
            });  
            
            if (uploadResponse.ok) {  
                const uploadData = await uploadResponse.json();  
                imageUrl = uploadData.imageUrl;  
            }   

        const submitData = {  
            ...formData,  
            imageUrl,  
        };  

        const response = await fetch('/api/addPlace', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
            },  
            body: JSON.stringify(submitData),  
        });  

        if (!response.ok) {  
          const errorData = await response.json();  
          throw new Error(errorData.error || 'Failed to add place');  
        }  
  
        const data = await response.json();  
        onSubmit(data.data);  
        onClose();  
        
      } catch (err) {  
        setError(err.message);  
      } finally {  
        setIsSubmitting(false);  
        setUploadProgress(0);  
      }  
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add New Place</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">  
          {/* Image Upload Area */}  
          <div className="relative">  
            <input  
              type="file"  
              id="imageInput"  
              accept="image/jpeg,image/png,image/webp"  
              onChange={handleImageChange}  
              className="hidden"  
              disabled={isSubmitting}  
              aria-label="Upload image"  
            />
            <label
              htmlFor="imageInput"
              className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Place preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ) : (  
                <div className="flex flex-col items-center justify-center">  
                  <Camera className="w-8 h-8 text-gray-400" />  
                  <span className="mt-2 text-sm text-gray-500">  
                    Drop your image here or click to upload  
                  </span>  
                  <span className="mt-1 text-xs text-gray-400">  
                    (Max size: 5MB, JPG/PNG/WebP only)  
                  </span>  
                </div>  
              )}
              
              
              {/* Upload Progress */}  
              {uploadProgress > 0 && uploadProgress < 100 && (  
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">  
                  <div className="text-white">  
                    Uploading... {uploadProgress}%  
                  </div>  
                </div>  
              )}  
            </label>
          </div>

          {/* Name Input */}
          <div>
            <label
              htmlFor="placeName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Place Name
            </label>
            <input
              id="placeName"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Type Select */}
          <div>
            <label
              htmlFor="placeType"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="placeType"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select type</option>
              {PLACE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div>
            <label
              htmlFor="location"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Experience Textarea */}
          <div>
            <label
              htmlFor="experience"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <textarea
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Mood Select */}
          <div>
            <label
              htmlFor="mood"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Mood
            </label>
            <select
              id="mood"
              value={formData.mood}
              onChange={(e) =>
                setFormData({ ...formData, mood: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select mood</option>
              {MOODS.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Input */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Rating
            </label>
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  className="focus:outline-none"
                  aria-label={`Rate ${rating} stars`}
                >
                  <Star
                    size={24}
                    className={
                      formData.rating >= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button  
  type="submit"  
  disabled={isSubmitting}  
  className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"  
>  
  {isSubmitting ? (  
    <>  
      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />  
      Adding Place...  
    </>  
  ) : (  
    'Add Place'  
  )}  
</button> 
        </form>
      </div>
    </div>
  );
}
