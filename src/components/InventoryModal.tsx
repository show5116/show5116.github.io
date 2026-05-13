import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { X } from 'lucide-react';

export const InventoryModal: React.FC = () => {
  const { isInventoryOpen, toggleInventory } = useGameStore();

  if (!isInventoryOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-auto z-50 backdrop-blur-sm">
      <div className="bg-slate-800 border-4 border-slate-600 rounded-lg p-6 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={toggleInventory}
          className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 border-2 border-red-700 rounded-full flex items-center justify-center text-white hover:bg-red-400 shadow-lg"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-amber-400 mb-4 text-center border-b-2 border-slate-700 pb-2">인벤토리</h2>
        
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-slate-900 border-2 border-slate-700 rounded shadow-inner flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer"
            >
              {/* 빈 슬롯 */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
