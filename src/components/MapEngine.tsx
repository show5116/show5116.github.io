import React from 'react';

interface MapEngineProps {
  gridSize: number;
  children: React.ReactNode;
}

export const MapEngine: React.FC<MapEngineProps> = ({ gridSize, children }) => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div 
        className="w-full h-full max-w-[100vmin] max-h-[100vmin] relative grid border-8 border-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          backgroundColor: '#4e7a27'
        }}
      >
        {/* Render grass tiles */}
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isDarkGrass = (x + y) % 2 === 0;
          return (
            <div 
              key={i} 
              className={`w-full h-full ${isDarkGrass ? 'bg-[#5e913a]' : 'bg-[#6ea146]'}`} 
              style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)' }}
            />
          );
        })}
        {children}
      </div>
    </div>
  );
};
