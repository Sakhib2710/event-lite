import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  Calendar,
  MapPin,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

// Enhanced mock data with more events and varied images
const mockEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    date: "2024-11-15",
    time: "18:00",
    location: "Central Park, New York",
    description:
      "Join us for an evening of live music featuring local and international artists. Food trucks and refreshments will be available.",
    image: "/api/placeholder/800/600",
    category: "Music",
    thumbnailColor: "bg-purple-500",
  },
  {
    id: 2,
    name: "Tech Conference 2024",
    date: "2024-11-20",
    time: "09:00",
    location: "Convention Center, San Francisco",
    description:
      "A day full of inspiring talks from industry leaders, networking opportunities, and hands-on workshops.",
    image: "/api/placeholder/800/600",
    category: "Technology",
    thumbnailColor: "bg-blue-500",
  },
  {
    id: 3,
    name: "Food & Wine Festival",
    date: "2024-11-25",
    time: "12:00",
    location: "Downtown Square, Chicago",
    description:
      "Sample dishes from top local restaurants and enjoy wine tastings from regional vineyards.",
    image: "/api/placeholder/800/600",
    category: "Food",
    thumbnailColor: "bg-red-500",
  },
  {
    id: 4,
    name: "Art Exhibition Opening",
    date: "2024-12-01",
    time: "19:00",
    location: "Modern Art Gallery, Los Angeles",
    description:
      "Opening night of our new contemporary art exhibition featuring works from emerging artists.",
    image: "/api/placeholder/800/600",
    category: "Art",
    thumbnailColor: "bg-indigo-500",
  },
  {
    id: 5,
    name: "Marathon 2024",
    date: "2024-12-05",
    time: "07:00",
    location: "City Center, Boston",
    description:
      "Annual marathon event with both professional and amateur categories. Register now to participate!",
    image: "/api/placeholder/800/600",
    category: "Sports",
    thumbnailColor: "bg-green-500",
  },
  {
    id: 6,
    name: "Comedy Night Special",
    date: "2024-12-10",
    time: "20:00",
    location: "Laugh Factory, Chicago",
    description:
      "A night of non-stop laughter with top comedians from around the country.",
    image: "/api/placeholder/800/600",
    category: "Entertainment",
    thumbnailColor: "bg-yellow-500",
  },
];

// Enhanced EventCard Component with better image handling
const EventCard = ({ event, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
      onClick={() => onClick(event)}
    >
      <div className="relative aspect-video">
        {imageError ? (
          <div
            className={`w-full h-full ${event.thumbnailColor} flex items-center justify-center`}
          >
            <ImageIcon className="w-12 h-12 text-white opacity-75" />
          </div>
        ) : (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <span className="absolute top-4 right-4 inline-block bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {event.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
          {event.name}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString()}
            </span>
            <Clock className="w-4 h-4 flex-shrink-0 ml-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Modal Component with better image handling
const Modal = ({ event, onClose }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative aspect-video">
          {imageError ? (
            <div
              className={`w-full h-full ${event.thumbnailColor} flex items-center justify-center`}
            >
              <ImageIcon className="w-16 h-16 text-white opacity-75" />
            </div>
          ) : (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{event.name}</h2>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
              <Clock className="w-5 h-5 ml-4" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>

            <p className="text-gray-700 mt-4 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SearchBar Component (unchanged)
const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="Search events by name or location..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
};

// Main App Component
const App = () => {
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setEvents(mockEvents);
      return;
    }

    const filtered = mockEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">EventSpot Lite</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">
              No events found matching your search.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={setSelectedEvent}
              />
            ))}
          </div>
        )}
      </main>

      {selectedEvent && (
        <Modal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default App;
