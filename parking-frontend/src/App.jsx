import { useState } from 'react';
import FloorSelection from './components/FloorSelection';
import FloorView from './components/FloorView';
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('floorSelection');
  const [selectedFloor, setSelectedFloor] = useState(1);

  const handleFloorConfirm = (floor) => {
    setSelectedFloor(floor);
    setCurrentView('floorView');
  };

  const handleBack = () => {
    setCurrentView('floorSelection');
  };

  return (
    <>
      {currentView === 'floorSelection' && (
        <FloorSelection onConfirm={handleFloorConfirm} />
      )}
      {currentView === 'floorView' && (
        <FloorView floor={selectedFloor} onBack={handleBack} />
      )}
    </>
  );
}

export default App;
