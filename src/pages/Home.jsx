import { useEffect, useState } from "react";
import { fetchTracks } from "../services/api";
import NowPlayingCard from "../components/NowPlayingCard";
import axios from "axios";
import NextTrackCard from "../components/NextTrackCard";

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([]);
  const token = localStorage.getItem("token-LoFi");

  useEffect(() => {
    const getTracksAndFavorites = async () => {
      try {
        const data = await fetchTracks();
        setTracks(data);

        if (token) {
          const favRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/favorites`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const ids = favRes.data.map((track) => track._id);
          setFavoriteTrackIds(ids);
        }
      } catch (error) {
        console.error("Error loading tracks or favorites:", error);
      }
    };

    getTracksAndFavorites();
  }, [token]);

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  if (tracks.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#DBE2E9]">
        <p className="text-lg text-gray-600">Loading tracks...</p>
      </div>
    );
  }

  const currentTrack = tracks[currentTrackIndex];
  const isFavorite = favoriteTrackIds.includes(currentTrack._id);

  const upcomingTracks = tracks
    .slice(currentTrackIndex + 1)
    .concat(tracks.slice(0, currentTrackIndex));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#DBE2E9]">
      <NowPlayingCard
        track={currentTrack}
        onNext={handleNext}
        onPrev={handlePrev}
        isInitiallyFavorite={isFavorite}
      />

      {/* Upcoming Tracks */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Up Next 🎵</h2>

        <div className="flex gap-4 flex-wrap justify-center">
          {upcomingTracks.slice(0, 4).map((track) => (
            <NextTrackCard key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
