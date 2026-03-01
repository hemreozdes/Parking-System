import { useState, useEffect } from 'react';
import { getActiveRecord, checkOut } from '../api/ParkingApi';

function CheckOutModal({ slot, onClose }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getActiveRecord(slot.id)
      .then(res => setRecord(res.data))
      .catch(err => console.error(err))
      .finally(() => setFetching(false));
  }, [slot.id]);

  const handleCheckOut = () => {
    setLoading(true);
    checkOut(slot.id)
      .then(() => onClose())
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('tr-TR');
  };

  const calculateDuration = (checkInTime) => {
    if (!checkInTime) return '-';
    const diff = new Date() - new Date(checkInTime);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) return `${remainingMinutes} dakika`;
    return `${hours} saat ${remainingMinutes} dakika`;
  };

  return (
    <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Araç Çıkışı</h3>
          <p className="text-slate-400 text-sm">Slot P-{String(slot.slotNumber).padStart(2, '0')}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
      </div>

      <div className="p-6">
        {fetching ? (
          <p className="text-slate-400 text-center">Yükleniyor...</p>
        ) : record ? (
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Plaka</span>
                <span className="text-white font-mono font-bold text-lg tracking-widest">{record.license}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Giriş Saati</span>
                <span className="text-white text-sm">{formatDate(record.checkInTime)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Çıkış Saati</span>
                <span className="text-white text-sm">{formatDate(new Date())}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Süre</span>
                <span className="text-white text-sm">{calculateDuration(record.checkInTime)}</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex justify-between items-center">
              <span className="text-blue-400 font-bold">Tahmini Ücret</span>
              <span className="text-white text-xl font-bold">
                {(() => {
                  const minutes = Math.floor((new Date() - new Date(record.checkInTime)) / 60000);
                  if (minutes <= 60) return '50 ₺';
                  const additionalHours = Math.ceil((minutes - 60) / 60);
                  return `${50 + additionalHours * 30} ₺`;
                })()}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-center">Aktif araç bulunamadı.</p>
        )}
      </div>

      <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors"
        >
          İptal
        </button>
        <button
          onClick={handleCheckOut}
          disabled={loading || fetching || !record}
          className="px-8 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'İşleniyor...' : 'Çıkış Yap'}
        </button>
      </div>
    </div>
  );
}

export default CheckOutModal;