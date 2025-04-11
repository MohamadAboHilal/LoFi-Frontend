import { useEffect, useState } from "react";
import axios from "axios";
import NowPlayingCard from "../components/NowPlayingCard";
import NextTrackCard from "../components/NextTrackCard";

const Favorites = () => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const token = localStorage.getItem("token-LoFi");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavoriteTracks(res.data);
      } catch (err) {}
    };

    fetchFavorites();
  }, [token]);

  const handleNext = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex + 1) % favoriteTracks.length
    );
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? favoriteTracks.length - 1 : prevIndex - 1
    );
  };

  const handleUnfavorite = (trackId) => {
    // Remove the unfavorited track from the array
    setFavoriteTracks((prevFavorites) =>
      prevFavorites.filter((track) => track._id !== trackId)
    );

    // If the unfavorited track was currently playing
    if (favoriteTracks[currentTrackIndex]?._id === trackId) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === favoriteTracks.length - 1 ? 0 : prevIndex
      );
    }
  };

  if (favoriteTracks.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#DBE2E9]">
        <p className="text-lg text-gray-600">No favorite tracks left! 💔</p>
      </div>
    );
  }

  const currentTrack = favoriteTracks[currentTrackIndex];

  const upcomingTracks = favoriteTracks
    .slice(currentTrackIndex + 1)
    .concat(favoriteTracks.slice(0, currentTrackIndex));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#DBE2E9] p-6">
      <NowPlayingCard
        track={currentTrack}
        onNext={handleNext}
        onPrev={handlePrev}
        isInitiallyFavorite={true}
        onUnfavorite={handleUnfavorite}
      />

      {/* Upcoming Favorites */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Up Next ❤️</h2>

        <div className="flex gap-4 flex-wrap justify-center">
          {upcomingTracks.slice(0, 4).map((track) => (
            <NextTrackCard key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
