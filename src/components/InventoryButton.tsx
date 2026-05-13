import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Backpack } from 'lucide-react';

export const InventoryButton: React.FC = () => {
  const toggleInventory = useGameStore((state) => state.toggleInventory);

  return (
    <button 
      onClick={toggleInventory}
      className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-amber-500 border-4 border-amber-700 shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-white hover:bg-amber-400 active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] transition-all pointer-events-auto z-50"
    >
      <Backpack size={28} />
    </button>
  );
};
