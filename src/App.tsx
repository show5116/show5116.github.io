import React from 'react';
import { MapEngine } from './components/MapEngine';
import { Player } from './components/Player';
import { InteractiveObjects, MOCK_OBJECTS } from './components/InteractiveObjects';
import { QuestModal } from './components/QuestModal';
import { useGameLogic } from './hooks/useGameLogic';

const GRID_SIZE = 20;
const INITIAL_PLAYER_POSITION = { x: 9, y: 9 };

function App() {
  const { playerPosition, activeModalId, closeModal } = useGameLogic({
    gridSize: GRID_SIZE,
    initialPlayerPosition: INITIAL_PLAYER_POSITION,
    objects: MOCK_OBJECTS,
  });

  const activeObject = MOCK_OBJECTS.find(obj => obj.id === activeModalId);

  return (
    <div className="font-sans antialiased bg-slate-900 min-h-screen text-slate-50 selection:bg-amber-500/30">
      <MapEngine gridSize={GRID_SIZE}>
        <InteractiveObjects objects={MOCK_OBJECTS} playerPosition={playerPosition} />
        <Player position={playerPosition} />
      </MapEngine>

      {activeObject && (
        <QuestModal object={activeObject} onClose={closeModal} />
      )}

      {/* Basic instructions overlay */}
      <div className="fixed top-4 left-4 retro-panel p-4 z-40 pointer-events-none hidden md:block">
        <h1 className="text-xl font-bold text-amber-400 mb-4 drop-shadow-md">Developer's Quest</h1>
        <ul className="text-xs sm:text-sm text-slate-200 space-y-3 leading-relaxed">
          <li className="flex items-center gap-2">
            <span className="text-amber-200">▶</span> 이동: 방향키 또는 <span className="text-amber-400 font-bold">WASD</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-200">▶</span> 상호작용: 오브젝트 옆에서 <span className="text-amber-400 font-bold">Space</span> 또는 <span className="text-amber-400 font-bold">Enter</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
