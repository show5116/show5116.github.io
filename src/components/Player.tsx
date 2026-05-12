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
        <div className="text-3xl sm:text-4xl lg:text-5xl drop-shadow-md animate-float relative z-10">
          🧙‍♂️
        </div>
        {/* Shadow */}
        <div className="w-6 h-2 sm:w-8 sm:h-2.5 lg:w-10 lg:h-3 bg-black/40 rounded-[50%] mt-[-4px] blur-[1px] absolute bottom-[-4px] z-0" />
      </div>
    </div>
  );
};
