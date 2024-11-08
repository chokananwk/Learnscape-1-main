"use client";

import { useState } from "react";
import { MOCK_EVENTS } from "./mockData";
import { EventFilter, EventCard } from "./EventComponents";
import { YearlyCalendar } from "./YearlyCalendar";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function EventPage() {
  const { data: session } = useSession();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesFilter = activeFilter === "all" || event.type === activeFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
    <Navbar session={session} />
      <div className="min-h-screen pb-20 bg-gray-50">
        <div className="p-4 mx-auto max-w-7xl">
          {/* Calendar Section */}
          <YearlyCalendar events={MOCK_EVENTS} />

          {/* Divider with spacing */}
          <div className="h-8" />

          {/* Filter Section - Now between Calendar and Events */}
          <div className="sticky top-0 z-10">
            <EventFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onSearch={setSearchQuery}
            />
          </div>

          {/* Events Section */}
          {filteredEvents.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              ไม่พบกิจกรรมที่ค้นหา
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
      </>
  );
}
