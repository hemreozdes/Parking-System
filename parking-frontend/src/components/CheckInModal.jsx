import { useState } from 'react';
import { checkIn } from '../api/ParkingApi';

function CheckInModal({ slot, onClose }) {
  const [license, setLicense] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!license.trim()) {
      setError('Plaka boş bırakılamaz.');
      return;
    }
    setLoading(true);
    checkIn(slot.id, license)
      .then(() => onClose())
      .catch(err => {
        setError('Giriş yapılamadı. Tekrar deneyin.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Araç Girişi</h3>
          <p className="text-slate-400 text-sm">Slot P-{String(slot.slotNumber).padStart(2, '0')}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="text-slate-300 text-sm font-medium block mb-2">Plaka</label>
          <input
            type="text"
            value={license}
            onChange={e => setLicense(e.target.value.toUpperCase())}
            placeholder="34ABC123"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-lg tracking-widest"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="text-slate-400 text-sm">
          <p>Giriş saati otomatik kaydedilecek.</p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors"
        >
          İptal
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Giriş Yap'}
        </button>
      </div>
    </div>
  );
}

export default CheckInModal;