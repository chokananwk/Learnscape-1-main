"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Mail,
  Camera,
  Settings,
  Star,
  MapPin,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

// Mock data for collections

const INITIAL_COLLECTIONS = [
  {
    id: 1,
    name: "Café Hopping",
    image: "/api/placeholder/400/300",
    rating: 4.5,
    location: "Thonglor, Bangkok",
    type: "Café",
    mood: "Peaceful",
    experience:
      "A cozy corner café with amazing latte art and freshly baked croissants. The ambient music and natural lighting make it perfect for both work and relaxation.",
  },
  {
    id: 2,
    name: "Hidden Bar",
    image: "/api/placeholder/400/300",
    rating: 4.8,
    location: "Sukhumvit, Bangkok",
    type: "Bar",
    mood: "Lively",
    experience:
      "Speakeasy bar with creative cocktails and great atmosphere. The mixologist crafts unique drinks with local ingredients. Perfect for evening hangouts.",
  },
  {
    id: 3,
    name: "Local Eatery",
    image: "/api/placeholder/400/300",
    rating: 4.3,
    location: "Chinatown, Bangkok",
    type: "Restaurant",
    mood: "Casual",
    experience:
      "Authentic street food experience with a modern twist. Famous for their pad thai and mango sticky rice. The place gets busy during dinner time.",
  },
];

export default function Profile() {

  const { data: session } = useSession();

  // Profile states
  const [profileImage, setProfileImage] = useState("/api/placeholder/128/128");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    location: "Bangkok, Thailand",
    bio: "Web developer and coffee enthusiast",
  });

  // Profile handlers
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Name and email are required");
      return;
    }

    setIsEditing(false);
    setIsSettingsOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsSettingsOpen(false);
    setFormData({
      fullName: "John Doe",
      email: "john.doe@example.com",
      location: "Bangkok, Thailand",
      bio: "Web developer and coffee enthusiast",
    });
  };

  // Collection handlers
  const handleDelete = (id) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="px-4 py-8 containermax-w-5xl">
        <Navbar session={session} />
        {/* Profile Section */}
        <div className="mb-12 overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="md:flex">
            {/* แก้ไขส่วนรูปโปรไฟล์ */}
            <div className="p-8 md:w-1/4">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={profileImage}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 rounded-full hover:scale-105"
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute p-2 text-white transition-all duration-300 rounded-full cursor-pointer bg-blue-500/90 backdrop-blur-sm bottom-2 right-2 hover:bg-blue-600 hover:scale-110"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="p-8 md:w-2/3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {session?.user?.name}
                  </h1>
                  <button
                    onClick={() => {
                      setIsSettingsOpen(!isSettingsOpen);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-2 px-6 py-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                <div className="flex items-center text-blue-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-medium">{session?.user?.email}</span>
                </div>
                <p className="text-lg text-gray-600">{formData.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {isSettingsOpen && (
          <div className="p-6 mb-12 space-y-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Profile Settings
              </h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={session?.user?.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={session?.user?.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Password Section (Optional) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Change Password
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                onClick={handleCancel}
                className="px-6 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Collections Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">My Collections</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* แสดงเฉพาะ 2 collections แรก */}
            {collections.slice(0, 2).map((place) => (
              <div
                key={place.id}
                className="transition-all bg-white shadow-sm rounded-xl hover:shadow-md group"
              >
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="object-cover w-full h-48 rounded-t-xl"
                  />
                  <div className="absolute flex gap-2 top-2 right-2">
                    <button
                      onClick={() => handleDelete(place.id)}
                      className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {place.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-medium">
                        {place.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">{place.location}</span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                      {place.type}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">
                      {place.mood}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {place.experience}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-4 border-t">
                    <button className="text-sm text-blue-500 hover:text-blue-600">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* ปุ่ม Go to All Collections */}
            <Link href="/collections" className="block">
              <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl transition-all hover:shadow-md group cursor-pointer">
                <div className="text-center">
                  <div className="mb-4">
                    <ArrowRight className="w-12 h-12 mx-auto text-blue-500 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Go to All Collections
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    View all {collections.length} collections
                  </p>
                </div>
              </div>
            </Link>
          </div>{" "}
          {/* ปิด grid container */}
        </div>
      </main>
    </div>
  );
}
