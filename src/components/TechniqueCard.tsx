import React from 'react';
import { PlayCircle, CheckCircle2, Star, Video, Layers, ExternalLink } from 'lucide-react';
import { Technique } from '../types';

interface TechniqueCardProps {
  technique: Technique;
  onSelect: (technique: Technique) => void;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onToggleMastered: (e: React.MouseEvent, id: string) => void;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  technique,
  onSelect,
  onToggleFavorite,
  onToggleMastered
}) => {
  const displayTitle = technique.displayName || (
    technique.numberLabel 
      ? `${technique.rawGrip || technique.grip || ''} ${technique.name} ${technique.numberLabel}`
      : technique.name
  );

  return (
    <div
      onClick={() => onSelect(technique)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-[#003d9b]/60 p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99]"
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={(e) => onToggleMastered(e, technique.id)}
          className={`shrink-0 p-1.5 rounded-full transition-colors ${
            technique.isMastered
              ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
              : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
          }`}
          title={technique.isMastered ? '習得済み（クリックで解除）' : '未習得（クリックで習得完了）'}
        >
          <CheckCircle2 className={`w-5 h-5 ${technique.isMastered ? 'fill-emerald-500 text-white' : ''}`} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {/* Suwari-waza / Stance Tag */}
            {technique.isSuwariWaza && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
                <Layers className="w-3 h-3" />
                座り技 (※)
              </span>
            )}

            {/* Grip category tag */}
            {technique.grip && technique.grip !== 'すべて' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                {technique.grip}
              </span>
            )}

            {/* Grade Badges */}
            {technique.grades && technique.grades.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {technique.grades.slice(0, 3).map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {g}
                  </span>
                ))}
                {technique.grades.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-500">
                    +{technique.grades.length - 3}
                  </span>
                )}
              </div>
            ) : technique.grade && technique.grade !== 'すべて' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {technique.grade}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#003d9b] transition-colors leading-snug">
            {displayTitle}
          </h3>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          onClick={(e) => onToggleFavorite(e, technique.id)}
          className={`p-2 rounded-full transition-colors ${
            technique.isFavorite ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
          }`}
          title={technique.isFavorite ? 'お気に入り解除' : 'お気に入りに追加'}
        >
          <Star className={`w-4 h-4 ${technique.isFavorite ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Direct HTML Link Button (Opens in new tab) */}
        {technique.videoUrl && (
          <a
            href={technique.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 text-slate-500 hover:text-[#003d9b] hover:bg-slate-100 rounded-lg transition-colors"
            title="HTMLページを新しいタブで直接開く"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}

        {/* Modal Player Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(technique);
          }}
          className="flex items-center gap-1.5 text-[#003d9b] hover:text-[#002d73] font-semibold text-xs sm:text-sm transition-all py-1.5 px-2.5 sm:px-3 rounded-lg bg-blue-50/80 hover:bg-blue-100/80"
        >
          {technique.videoUrl ? (
            <Video className="w-4 h-4 text-[#003d9b]" />
          ) : (
            <PlayCircle className="w-4 h-4 text-[#003d9b]" />
          )}
          <span className="hidden sm:inline">再生・HTML</span>
          <span className="sm:hidden">開く</span>
        </button>
      </div>
    </div>
  );
};
