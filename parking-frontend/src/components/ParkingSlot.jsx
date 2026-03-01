function ParkingSlot({ slot, onClick }) {
  const isOccupied = slot.occupied;

  return (
    <div
      onClick={() => onClick(slot)}
      className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 rounded-sm
        ${isOccupied
          ? 'bg-red-500/20 border-2 border-red-500 hover:bg-red-500/30'
          : 'bg-green-500/10 border-2 border-green-500 hover:bg-green-500/20'
        }`}
    >
      <span className="text-xs text-slate-500 absolute top-2 left-2 font-mono">
        P-{String(slot.slotNumber).padStart(2, '0')}
      </span>

      {isOccupied && (
        <svg className="w-12 h-12 text-red-500 opacity-80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
        </svg>
      )}
    </div>
  );
}

export default ParkingSlot;