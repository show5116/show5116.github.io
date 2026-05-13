import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '../game/MainScene';

export const PhaserGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    // Phaser 게임 설정
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: gameRef.current,
      pixelArt: true, // 레트로 스타일 픽셀 아트 (안티앨리어싱 제거)
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 }, // 탑다운 뷰이므로 중력 0
          debug: false,
        },
      },
      scene: [MainScene],
      scale: {
        mode: Phaser.Scale.RESIZE, // 창 크기에 맞춰 자동 리사이즈
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: '#3b5e2b', // 기존 React 맵의 잔디 배경색과 유사하게 설정
    };

    // 게임 인스턴스 생성
    const game = new Phaser.Game(config);

    // 정리(Cleanup) 함수: 컴포넌트 언마운트 시 Phaser 게임 인스턴스 파괴
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div 
      ref={gameRef} 
      className="w-full h-full absolute inset-0 overflow-hidden"
    />
  );
};
