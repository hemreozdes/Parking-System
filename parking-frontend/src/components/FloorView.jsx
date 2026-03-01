import { useState, useEffect } from 'react';
import { getAllSlots } from '../api/ParkingApi';
import CheckInModal from './CheckInModal';
import CheckOutModal from './CheckOutModal';
import ParkingSlot from './ParkingSlot';

function FloorView({ floor, onBack }) {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
  getAllSlots()
    .then(res => {
      const floorSlots = res.data.filter(s => s.floor === floor);
      setSlots(floorSlots);
    })
    .catch(err => console.error(err));

  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer);
}, [floor]);

  const fetchSlots = () => {
    getAllSlots()
      .then(res => {
        const floorSlots = res.data.filter(s => s.floor === floor);
        setSlots(floorSlots);
      })
      .catch(err => console.error(err));
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setModalType(slot.occupied ? 'checkout' : 'checkin');
  };

  const handleModalClose = () => {
    setSelectedSlot(null);
    setModalType(null);
    fetchSlots();
  };

  const topRow = slots.slice(0, 5);
  const bottomRow = slots.slice(5, 10);
  const available = slots.filter(s => !s.occupied).length;
  const occupied = slots.filter(s => s.occupied).length;

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 h-16 flex items-center justify-between px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors"
        >
          <span className="font-medium">Floor {String(floor).padStart(2, '0')}</span>
          <span>▼</span>
        </button>

        <h1 className="text-xl font-bold tracking-widest text-white uppercase italic absolute left-1/2 -translate-x-1/2">
          Parking<span className="text-blue-500">System</span>
        </h1>

        <div className="text-right">
          <p className="text-lg font-mono font-bold text-blue-400">
            {time.toLocaleTimeString('tr-TR', { hour12: false })}
          </p>
          <p className="text-xs text-slate-400 uppercase tracking-tighter">
            {time.toLocaleDateString('tr-TR', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-8 relative"
        style={{
          backgroundColor: '#1e293b',
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>

        {/* Watermark */}
        <div className="absolute top-10 left-10 opacity-10 pointer-events-none">
          <h2 className="text-8xl font-black text-white">FLOOR {String(floor).padStart(2, '0')}</h2>
        </div>

        {/* Parking Grid */}
        <section className="relative z-10 w-full max-w-5xl bg-slate-900/80 rounded-3xl border-4 border-slate-700 shadow-2xl flex flex-col justify-between p-12"
          style={{ aspectRatio: '16/9' }}>

          {/* Top Row */}
          <div className="grid grid-cols-5 gap-4 h-1/3">
            {topRow.map(slot => (
              <ParkingSlot key={slot.id} slot={slot} onClick={handleSlotClick} />
            ))}
          </div>

          {/* Lane */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-full h-1 bg-slate-600 opacity-30 mb-8"></div>
            <div className="flex items-center gap-2 text-slate-500 animate-pulse">
              <span>→</span>
              <span className="uppercase tracking-widest text-sm font-bold">Main Traffic Flow</span>
            </div>
            <div className="w-full h-1 bg-slate-600 opacity-30 mt-8"></div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-5 gap-4 h-1/3">
            {bottomRow.map(slot => (
              <ParkingSlot key={slot.id} slot={slot} onClick={handleSlotClick} />
            ))}
          </div>
        </section>

        {/* Legend */}
        <div className="absolute bottom-6 right-8 flex flex-col gap-2 bg-slate-900/50 backdrop-blur-md p-3 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm border-2 border-green-500 bg-green-500/20"></div>
                <span className="text-xs font-medium text-slate-300">Available ({available})</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm border-2 border-red-500 bg-red-500/20"></div>
                <span className="text-xs font-medium text-slate-300">Occupied ({occupied})</span>
            </div>
        </div>
      </main>

      {/* Modals */}
      {modalType && selectedSlot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {modalType === 'checkin'
            ? <CheckInModal slot={selectedSlot} onClose={handleModalClose} />
            : <CheckOutModal slot={selectedSlot} onClose={handleModalClose} />
          }
        </div>
      )}
    </div>
  );
}

export default FloorView;