import { useState, useEffect, useCallback } from 'react';
import type { Position, InteractiveObject } from '../types';

interface UseGameLogicProps {
  gridSize: number;
  initialPlayerPosition: Position;
  objects: InteractiveObject[];
}

export const useGameLogic = ({ gridSize, initialPlayerPosition, objects }: UseGameLogicProps) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(initialPlayerPosition);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeModalId) {
      if (e.key === 'Escape') {
        setActiveModalId(null);
      }
      return; // Do not move if modal is open
    }

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        newY -= 1;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        newY += 1;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        newX -= 1;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        newX += 1;
        break;
      case ' ':
      case 'Enter':
        // Check for adjacent object
        const adjacentObj = objects.find(
          obj => 
            Math.abs(obj.position.x - playerPosition.x) + Math.abs(obj.position.y - playerPosition.y) === 1
        );
        if (adjacentObj) {
          setActiveModalId(adjacentObj.id);
        }
        return;
      default:
        return;
    }

    // Boundary check
    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
      return;
    }

    // Collision check
    const isCollision = objects.some(obj => obj.position.x === newX && obj.position.y === newY);
    if (isCollision) {
      return;
    }

    setPlayerPosition({ x: newX, y: newY });
  }, [playerPosition, gridSize, objects, activeModalId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const closeModal = () => setActiveModalId(null);

  return {
    playerPosition,
    activeModalId,
    closeModal,
  };
};
