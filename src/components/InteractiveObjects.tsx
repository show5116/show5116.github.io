import React from 'react';
import type { Position, InteractiveObject } from '../types';

interface InteractiveObjectsProps {
  objects: InteractiveObject[];
  playerPosition: Position;
}

export const InteractiveObjects: React.FC<InteractiveObjectsProps> = ({ objects, playerPosition }) => {
  return (
    <>
      {objects.map((obj) => {
        const distance = Math.abs(obj.position.x - playerPosition.x) + Math.abs(obj.position.y - playerPosition.y);
        const isNear = distance === 1;

        return (
          <div
            key={obj.id}
            className={`flex flex-col items-center justify-center z-20 transition-transform ${isNear ? 'animate-[bounce_0.5s_infinite]' : 'hover:-translate-y-1'}`}
            style={{
              gridColumnStart: obj.position.x + 1,
              gridRowStart: obj.position.y + 1,
            }}
            title={obj.name}
          >
            {/* Building Emoji Icon with drop-shadow for retro outline */}
            <div className="relative flex flex-col items-center mb-1">
              <div className="z-10">
                {obj.icon ? obj.icon : <span className="text-4xl md:text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">🏛️</span>}
              </div>
              {/* Shadow for object */}
              <div className="absolute bottom-[-2px] w-8 h-2 sm:w-10 sm:h-3 bg-black/60 rounded-[50%] blur-[1px] z-0" />
            </div>
            {/* Wooden Sign Label */}
            <div className="retro-sign px-2 py-1 text-white text-[8px] sm:text-[10px] md:text-xs text-center whitespace-nowrap hidden sm:block shadow-lg">
              {obj.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export const MOCK_OBJECTS: InteractiveObject[] = [
  {
    id: 'abocado',
    name: 'AbocadoTV',
    position: { x: 3, y: 3 },
    summary: '시작의 마을: AbocadoTV 방송국. 인터넷 방송 플랫폼의 프론트엔드/백엔드 아키텍처를 경험한 프로젝트입니다.',
    notionLink: 'https://notion.so/abocadotv',
    icon: <span className="text-4xl md:text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] relative z-10">📺</span>,
    colorClass: '',
  },
  {
    id: 'ddti',
    name: 'DDTI LMS',
    position: { x: 15, y: 5 },
    summary: '시작의 마을: DDTI LMS 아카데미 본관. 온라인 교육 플랫폼 개발 및 수강 관리 시스템 구축.',
    notionLink: 'https://notion.so/ddti',
    icon: <span className="text-4xl md:text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] relative z-10">🏫</span>,
    colorClass: '',
  },
  {
    id: 'ibs',
    name: 'IBS 코어',
    position: { x: 10, y: 12 },
    summary: '제국의 중앙 본부: 대규모 트래픽을 처리하는 SmartOMS 교역소 및 AI Agent 시스템.',
    notionLink: 'https://notion.so/ibs',
    icon: <span className="text-4xl md:text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] relative z-10">🏭</span>,
    colorClass: '',
  }
];
