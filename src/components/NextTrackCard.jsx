const NextTrackCard = ({ track }) => {
  return (
    <div className="flex flex-col items-center p-2 bg-base-200 rounded-lg shadow-md w-32">
      <img
        src={track.albumCover}
        alt={track.title}
        className="w-24 h-24 object-cover rounded-md mb-2"
      />
      <p className="text-xs text-center font-semibold text-gray-700 truncate">
        {track.title}
      </p>
    </div>
  );
};

export default NextTrackCard;
