import { useState, useEffect } from 'react';
import { getAllSlots } from '../api/ParkingApi';

function FloorSelection({ onConfirm }) {
  const [slots, setSlots] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1);

  useEffect(() => {
    getAllSlots()
      .then(res => setSlots(res.data))
      .catch(err => console.error(err));
  }, []);

  const getFloorStats = (floor) => {
    const floorSlots = slots.filter(s => s.floor === floor);
    const available = floorSlots.filter(s => !s.occupied).length;
    const total = floorSlots.length;
    return { available, total };
  };

  const totalAvailable = slots.filter(s => !s.occupied).length;
  const totalSlots = slots.length;
  const occupancyRate = totalSlots > 0
    ? (((totalSlots - totalAvailable) / totalSlots) * 100).toFixed(1)
    : 0;

  const getStatusColor = (available, total) => {
    if (available === 0) return 'bg-rose-500';
    if (available / total < 0.5) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusText = (available) => {
    if (available === 0) return 'Full Capacity';
    return `${available} spots available`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#221610]">
      <div className="relative z-10 w-full max-w-lg bg-[#221610] border border-orange-500/20 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-orange-500/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
              🅿️
            </div>
            <div>
              <h2 className="text-slate-100 text-lg font-bold">Parking Management</h2>
              <p className="text-orange-500/70 text-xs">Terminal A - South Wing</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-100 mb-1">Select Floor</h3>
            <p className="text-slate-400 text-sm">Choose a parking level to monitor occupancy</p>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map(floor => {
              const { available, total } = getFloorStats(floor);
              const isSelected = selectedFloor === floor;

              return (
                <label
                  key={floor}
                  className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                    ${isSelected
                      ? 'border-orange-500/20 bg-orange-500/5'
                      : 'border-white/5 bg-white/5 hover:bg-orange-500/5'
                    }`}
                  onClick={() => setSelectedFloor(floor)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center bg-[#221610] rounded-lg border
                      ${isSelected ? 'border-orange-500/30' : 'border-white/10'}`}>
                      <span className={`text-xl font-bold ${isSelected ? 'text-orange-500' : 'text-slate-400'}`}>
                        {String(floor).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-100 font-semibold">Floor {floor}</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(available, total)}`}></span>
                        <p className="text-slate-400 text-xs">{getStatusText(available)}</p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="floor-select"
                    checked={isSelected}
                    onChange={() => setSelectedFloor(floor)}
                    className="accent-orange-500 w-5 h-5"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-orange-500/10">
          <button
            onClick={() => onConfirm(selectedFloor)}
            className="px-8 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-500/90 transition-all"
          >
            Confirm View
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-8 flex gap-8">
        <div className="flex flex-col items-center">
          <p className="text-orange-500 text-2xl font-bold">{totalSlots}</p>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Total Space</p>
        </div>
        <div className="flex flex-col items-center border-l border-white/10 pl-8">
          <p className="text-emerald-500 text-2xl font-bold">{totalAvailable}</p>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Available</p>
        </div>
        <div className="flex flex-col items-center border-l border-white/10 pl-8">
          <p className="text-slate-300 text-2xl font-bold">{occupancyRate}%</p>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Occupancy</p>
        </div>
      </div>
    </div>
  );
}

export default FloorSelection;