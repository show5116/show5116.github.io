import { PhaserGame } from './components/PhaserGame';
import { QuestModal } from './components/QuestModal';
import { useGameLogic } from './hooks/useGameLogic';
import { MOCK_OBJECTS } from './components/InteractiveObjects';
import { InventoryButton } from './components/InventoryButton';
import { InventoryModal } from './components/InventoryModal';

const GRID_SIZE = 20;
const INITIAL_PLAYER_POSITION = { x: 9, y: 9 };

function App() {
  const { activeModalId, closeModal } = useGameLogic({
    gridSize: GRID_SIZE,
    initialPlayerPosition: INITIAL_PLAYER_POSITION,
    objects: MOCK_OBJECTS,
  });

  const activeObject = MOCK_OBJECTS.find(obj => obj.id === activeModalId);

  return (
    <div className="font-sans antialiased bg-black w-screen h-screen overflow-hidden text-slate-50 selection:bg-amber-500/30 relative">
      
      {/* 1. Phaser 게임 레이어 (가장 아래) */}
      <div id="game-container" className="absolute inset-0 z-0">
        <PhaserGame />
      </div>

      {/* 2. React UI 레이어 (게임 위에 겹침, 포인터 이벤트 무시) */}
      <div id="ui-layer" className="absolute inset-0 z-10 pointer-events-none">
        
        {/* 인벤토리 모달 & 버튼 (포인터 이벤트 활성화) */}
        <InventoryModal />
        <InventoryButton />

        {/* 기존 상호작용 모달 */}
        {activeObject && (
          <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
            <QuestModal object={activeObject} onClose={closeModal} />
          </div>
        )}

        {/* 조작법 안내 오버레이 */}
        <div className="absolute top-4 left-4 retro-panel p-4 z-40 hidden md:block">
          <h1 className="text-xl font-bold text-amber-400 mb-4 drop-shadow-md">Developer's Quest</h1>
          <ul className="text-xs sm:text-sm text-slate-200 space-y-3 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-amber-200">▶</span> 이동: 방향키, <span className="text-amber-400 font-bold">WASD</span> 또는 <span className="text-amber-400 font-bold">화면 클릭</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-200">▶</span> 인벤토리: 우측 하단 <span className="text-amber-400 font-bold">가방 버튼</span> 클릭
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
