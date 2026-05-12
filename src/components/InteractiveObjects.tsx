import React from 'react';
import type { Position, InteractiveObject } from '../types';
import { Building, GraduationCap, MonitorPlay } from 'lucide-react';

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
            {/* Building Icon */}
            <div className="mb-1">
              {obj.icon ? obj.icon : <Building className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" />}
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
    icon: <MonitorPlay className="w-12 h-12 md:w-16 md:h-16 text-[#4ade80] drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" />,
    colorClass: '',
  },
  {
    id: 'ddti',
    name: 'DDTI LMS',
    position: { x: 15, y: 5 },
    summary: '시작의 마을: DDTI LMS 아카데미 본관. 온라인 교육 플랫폼 개발 및 수강 관리 시스템 구축.',
    notionLink: 'https://notion.so/ddti',
    icon: <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-[#60a5fa] drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" />,
    colorClass: '',
  },
  {
    id: 'ibs',
    name: 'IBS 코어',
    position: { x: 10, y: 12 },
    summary: '제국의 중앙 본부: 대규모 트래픽을 처리하는 SmartOMS 교역소 및 AI Agent 시스템.',
    notionLink: 'https://notion.so/ibs',
    icon: <Building className="w-12 h-12 md:w-16 md:h-16 text-[#c084fc] drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" />,
    colorClass: '',
  }
];
