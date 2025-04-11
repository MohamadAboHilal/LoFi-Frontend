import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import axios from "axios";

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const NowPlayingCard = ({
  track,
  onNext,
  onPrev,
  isInitiallyFavorite = false,
  onUnfavorite,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  const audioRef = useRef(null);
  const token = localStorage.getItem("token-LoFi");

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const wasPlaying = isPlaying;
    setFade(false);
    setTimeout(() => {
      onNext();
      setFade(true);
      setShouldAutoPlay(wasPlaying);
      setIsPlaying(false);
    }, 200);
  };

  const handlePrev = () => {
    const wasPlaying = isPlaying;
    setFade(false);
    setTimeout(() => {
      onPrev();
      setFade(true);
      setShouldAutoPlay(wasPlaying);
      setIsPlaying(false);
    }, 200);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setFade(false);
      setTimeout(() => {
        onNext();
        setFade(true);
        setShouldAutoPlay(true);
      }, 200);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (fade && shouldAutoPlay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setShouldAutoPlay(false);
    }
  }, [fade, shouldAutoPlay]);

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickedPercent = clickX / width;
    const newTime = clickedPercent * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleToggleFavorite = async () => {
    if (!token) {
      toast.info("Please login to save favorites!");
      return;
    }

    try {
      if (isFavorite) {
        console.log("Removing favorite...");
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/favorites/${track._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        console.log("Adding favorite...");
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/favorites`,
          { trackId: track._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const newIsFavorite = !isFavorite;
      setIsFavorite(newIsFavorite);

      if (onUnfavorite && !newIsFavorite) {
        onUnfavorite(track._id);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      toast.error("Something went wrong saving your favorite!");
    }
  };

  useEffect(() => {
    setIsFavorite(isInitiallyFavorite);
  }, [isInitiallyFavorite, track._id]);

  return (
    <div className="card w-80 bg-base-100 shadow-xl items-center p-4">
      {/* Fade-In/Fade-Out Only for Cover/Title/Artist */}
      <div
        className={`transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <figure className="w-48 h-48">
          <img
            src={track.albumCover}
            alt={track.title}
            className="rounded-xl object-cover w-full h-full"
          />
        </figure>

        <div className="card-body items-center text-center p-2">
          <h2 className="card-title text-gray-800">{track.title}</h2>
          <p className="text-gray-500">{track.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div onClick={handleSeek} className="w-full cursor-pointer">
          <progress
            className="progress progress-warning w-full"
            value={progress}
            max="100"
          ></progress>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={handlePrev} className="btn btn-info btn-sm">
          <FaBackward size={18} />
        </button>

        <button
          onClick={handlePlayPause}
          className="btn btn-warning btn-sm flex items-center gap-2"
        >
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        </button>

        <button onClick={handleNext} className="btn btn-info btn-sm">
          <FaForward size={18} />
        </button>

        {/* Favorite Button ❤️ */}
        <button
          onClick={handleToggleFavorite}
          className={`btn btn-sm ${isFavorite ? "btn-error" : "btn-outline"}`}
        >
          {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
        </button>
      </div>

      {/* Volume Control */}
      <div className="w-full mt-6 flex flex-row justify-center">
        <div className="flex items-center gap-2 mb-2 mr-2">
          <FaVolumeUp className="text-gray-600" size={18} />
        </div>

        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => {
            const newVolume = parseInt(e.target.value) / 100;
            setVolume(newVolume);
          }}
          className="range range-warning range-xs w-full"
        />
      </div>

      {/* Hidden Audio */}
      <audio ref={audioRef} src={track.audioUrl} />
    </div>
  );
};

export default NowPlayingCard;
