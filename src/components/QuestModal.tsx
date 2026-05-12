import React from 'react';
import type { InteractiveObject } from '../types';
import { X, ExternalLink, ScrollText } from 'lucide-react';

interface QuestModalProps {
  object: InteractiveObject;
  onClose: () => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({ object, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px]" onClick={onClose}>
      <div 
        className="retro-panel w-[90%] max-w-lg p-6 relative animate-[pop_0.2s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b-4 border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <ScrollText className="text-amber-400 w-8 h-8 drop-shadow-md" />
            <h2 className="text-lg sm:text-xl font-bold text-amber-50 tracking-widest drop-shadow-md">{object.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors retro-button p-2 bg-slate-800 border-slate-600 hover:bg-slate-700"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-2">
          <p className="text-slate-200 leading-8 text-sm sm:text-base break-keep">
            {object.summary}
          </p>

          {/* Action Button */}
          <div className="mt-10 flex justify-end">
            <a
              href={object.notionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 retro-button px-6 py-3 font-bold text-sm sm:text-base text-slate-900"
            >
              <ExternalLink className="w-5 h-5" />
              <span>고대 문서 읽기</span>
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
