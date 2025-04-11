const PlayerControls = ({ onPrev, onNext }) => {
  return (
    <div className="flex items-center gap-6 mt-4">
      <button
        onClick={onPrev}
        className="bg-[#7BAFD4] hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
      >
        ⏮️ Prev
      </button>

      <button
        onClick={onNext}
        className="bg-[#7BAFD4] hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full transition-all"
      >
        Next ⏭️
      </button>
    </div>
  );
};

export default PlayerControls;
