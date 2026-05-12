import React from 'react';
import type { Position } from '../types';

interface PlayerProps {
  position: Position;
}

export const Player: React.FC<PlayerProps> = ({ position }) => {
  return (
    <div
      className="flex items-center justify-center z-30 transition-all duration-200 ease-linear"
      style={{
        gridColumnStart: position.x + 1,
        gridRowStart: position.y + 1,
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Floating Character */}
        <div className="text-3xl sm:text-4xl lg:text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-float relative z-10">
          🧙‍♂️
        </div>
        {/* Shadow */}
        <div className="w-8 h-2.5 sm:w-10 sm:h-3 lg:w-12 lg:h-3.5 bg-black/60 rounded-[50%] blur-[1px] absolute bottom-[-4px] z-0" />
      </div>
    </div>
  );
};
