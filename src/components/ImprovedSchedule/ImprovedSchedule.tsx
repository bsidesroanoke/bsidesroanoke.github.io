import React, { useState } from 'react';
import { marked } from 'marked';

// --- DATA MODEL & CONFIGURATION ---
// Define a mapping of tracks to Tailwind CSS background colors for visual distinction.
const TRACK_COLORS = {
  'Red Team': 'bg-red-500',
  'Blue Team': 'bg-blue-500',
  'Cyber Fundamentals': 'bg-green-500',
  'Keynote': 'bg-purple-500',
  'Breakout Sessions': 'bg-blue-300',
  'General Session': 'bg-gray-400'
} as const;

// Helper function to extract start and end times from formatted time string
const parseTimeString = (timeStr: string): { startTime?: string, endTime?: string } => {
  if (!timeStr) return {};

  // Check if it's a formatted time like "09:00 - 09:45"
  const formatMatch = timeStr.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (formatMatch) {
    return { startTime: formatMatch[1], endTime: formatMatch[2] };
  }

// Check if it's an ISO time range like "2025-10-26T10:00:00Z - 2025-10-26T11:00:00Z"
const isoMatch = timeStr.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\s*-\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)/);
if (isoMatch) {
  // Preserve ISO format for consistent sorting and display
  return { startTime: isoMatch[1], endTime: isoMatch[2] };
}

  // If not in expected format, try to use as-is
  if (timeStr.includes('-')) {
    return { startTime: timeStr.split('-')[0].trim(), endTime: timeStr.split('-')[1].trim() };
  }

  return {};
};

// Helper function to handle ISO time parsing and sorting
const getTalkSortKey = (talk: Talk): string => {
  // If both times are missing, treat as "All day" and sort towards the beginning
  if (!talk.startTime && !talk.endTime) {
    return '00:00';
  }

  // Parse ISO times for sorting
  let startTime = talk.startTime;
  let endTime = talk.endTime;

  // Try to parse from time field as fallback
  if (!startTime || !endTime) {
    const parsedTimes = parseTimeString(talk.time || '');
    if (parsedTimes.startTime) startTime = parsedTimes.startTime;
    if (parsedTimes.endTime) endTime = parsedTimes.endTime;
  }

  // If still no times, use a default sort key
  if (!startTime) {
    return '99:00'; // Sort undefined times towards the end
  }

  // Format for consistent sorting (HH:mm)
  const timeParts = startTime.split(':');
  if (timeParts.length >= 2) {
    let hours = timeParts[0];
    let minutes = timeParts[1];

    // Handle 12-hour format conversion to 24-hour
    if (hours.includes('AM') || hours.includes('PM')) {
      const timeValue = parseInt(hours, 10);
      if ((hours.includes('PM') && timeValue < 12) || (hours.includes('AM') && timeValue === 12)) {
        hours = '0' + String(timeValue % 12 || 12); // Convert to 24-hour format
      } else {
        hours = String(timeValue % 12 || 12);
      }
    }

    return `${hours.padStart(2, '0')}:${minutes || '00'}`;
  }

  return startTime; // Fallback to original time string
};

// Define Talk interface
interface Talk {
  id: number | string;
  slug: string;
  title: string;
  speaker: string;
  startTime?: string; // Start time in various formats (ISO or local)
  endTime?: string;   // End time in various formats (ISO or local)
  room: string;
  track: keyof typeof TRACK_COLORS;
  time?: string;      // Time field for backward compatibility
  abstract: string;
}

// Helper function to strip markdown from a string
const stripMarkdown = (markdown: string): string => {
  // This regex removes markdown link syntax: [text](url) -> text
  return markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
};

// --- HELPER COMPONENTS ---

// This component is dedicated to rendering a single talk card.
// It's a "dumb" component that just receives data via props.
const TalkCard = ({ talk, onSelect }: { talk: Talk, onSelect: (talk: Talk) => void }) => {
  // Parse time information from various possible sources
  let displayStartTime = talk.startTime;
  let displayEndTime = talk.endTime;

  // If startTime and endTime are not provided, try to parse from the 'time' field
  if (!displayStartTime || !displayEndTime) {
    const parsedTimes = parseTimeString(talk.time || '');
    if (parsedTimes.startTime) displayStartTime = parsedTimes.startTime;
    if (parsedTimes.endTime) displayEndTime = parsedTimes.endTime;
  }

  // Format time for display
  const formatDisplayTime = (time?: string) => {
    if (!time) return '';
    // Convert ISO times to local time format with AM/PM
    if (time.includes('T')) {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    // Handle 24-hour format with AM/PM
    const date = new Date(`2000-01-01T${time}:00`);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Check if both start and end times are missing
  const isAllDay = !displayStartTime && !displayEndTime;

  let displayStart = isAllDay ? "All day" : formatDisplayTime(displayStartTime);
  let displayEnd = isAllDay ? "" : formatDisplayTime(displayEndTime);

  return (
    <div onClick={() => onSelect(talk)} className="bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-700 h-full flex flex-col justify-between cursor-pointer hover:border-blue-500 transition-colors">
      {/* Title and speaker on same line */}
      <div className="flex items-center justify-between mb-2 flex-grow">
        <h3 className="text-white font-semibold text-lg mr-2">{stripMarkdown(talk.title)}</h3>
        <p className="text-gray-400 text-sm">{talk.speaker}</p>
      </div>

      {/* Room, track, and times on same line */}
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <div className="flex items-center">
          {/* SVG icon for the room */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="mr-4">{talk.room}</span>

          {/* Track tag */}
          <div className={`px-2 py-1 font-medium text-white rounded-full ${TRACK_COLORS[talk.track]}`}>
            {talk.track}
          </div>
        </div>

        {/* Times */}
        <div>{displayStart} - {displayEnd}</div>
      </div>
    </div>
  );
};

// Modal component to display talk details
const TalkModal = ({ talk, onClose, eventSlug }: { talk: Talk | null, onClose: () => void, eventSlug?: string }) => {
  if (!talk) return null;

  // Prepend event slug to relative anchor links
  const processedAbstract = talk.abstract.replace(/href="\/#/g, `href="/events/${eventSlug}/#`);
  const abstractHtml = marked(processedAbstract || talk.abstract);
  const cleanTitle = stripMarkdown(talk.title);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-700" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-start">
          <div>
            <a href={`/talks/${talk.slug}`} class="hover:underline">
              <h2 className="text-2xl font-bold text-white">
                {cleanTitle}
                <span class="text-blue-400 text-sm ml-2">🔗</span>
              </h2>
            </a>
            <p className="text-gray-400 mt-1">by {talk.speaker}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: abstractHtml }}
          />
        </div>
        <div className="p-4 bg-slate-900/50 rounded-b-2xl text-right">
           <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

// Main App component that renders the conference schedule.
const ImprovedSchedule = ({ talks = [], eventDate, eventSlug }: { talks: Talk[], eventDate: string, eventSlug?: string }) => {
  const [selectedRoom, setSelectedRoom] = useState('All Rooms');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);

  // Use a memoized list of unique items for filters to prevent unnecessary re-renders.
  const uniqueRooms = ['All Rooms'].concat([...new Set(talks.map(talk => talk.room))].sort());
  const uniqueTracks = ['All Tracks'].concat([...new Set(talks.map(talk => talk.track))].sort());

  // Filter talks based on selected filters and search query. This logic is clean and separate.
  const filteredTalks = talks.filter(talk => {
    if (!talk) return false;
    const matchesRoom = selectedRoom === 'All Rooms' || talk.room === selectedRoom;
    const matchesTrack = selectedTrack === 'All Tracks' || talk.track === selectedTrack;
    const matchesSearch = searchQuery.trim() === '' ||
      (talk.title && talk.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (talk.speaker && talk.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (talk.room && talk.room.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRoom && matchesTrack && matchesSearch;
  });

  // Sort talks by time using the sort key function
  const sortedTalks = [...filteredTalks].sort((a, b) => {
    const aKey = getTalkSortKey(a);
    const bKey = getTalkSortKey(b);
    return aKey.localeCompare(bKey);
  });

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">Conference Schedule</h1>
        <p className="text-center text-gray-400 mt-2">Day 1: {eventDate}</p>
      </header>

      {/* Filter controls section */}
      <div className="bg-slate-800 p-4 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-stretch md:items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Room Filter */}
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="bg-slate-700 text-gray-200 py-2 px-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {uniqueRooms.map((room, index) => (
              <option key={`room-${index}`} value={room}>{room}</option>
            ))}
          </select>
          {/* Track Filter */}
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="bg-slate-700 text-gray-200 py-2 px-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {uniqueTracks.map((track, index) => (
              <option key={`track-${index}`} value={track}>{track}</option>
            ))}
          </select>
        </div>
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search talks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-700 text-gray-200 py-2 px-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        />
      </div>

      {/* Conditional rendering for no results found */}
      {filteredTalks.length === 0 && (
        <div className="text-center text-gray-400 text-lg mt-16">No talks found matching your criteria.</div>
      )}

        {/* Responsive schedule grid with reduced gap */}
      <div className="grid gap-2 md:gap-3">

        {sortedTalks.map(talk => (
          <TalkCard key={talk.id} talk={talk} onSelect={setSelectedTalk} />
        ))}
      </div>

      <TalkModal talk={selectedTalk} onClose={() => setSelectedTalk(null)} eventSlug={eventSlug} />
    </div>
  );
};

export default ImprovedSchedule;
