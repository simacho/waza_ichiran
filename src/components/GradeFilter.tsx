import React from 'react';
import { Grade, StanceFilterOption } from '../types';
import { Layers } from 'lucide-react';

interface GradeFilterProps {
  grades: Grade[];
  selectedGrade: Grade;
  onSelectGrade: (grade: Grade) => void;
  gradeCounts?: Record<string, number>;
  stanceFilter?: StanceFilterOption;
  onSelectStanceFilter?: (stance: StanceFilterOption) => void;
}

export const GradeFilter: React.FC<GradeFilterProps> = ({
  grades,
  selectedGrade,
  onSelectGrade,
  gradeCounts = {},
  stanceFilter = 'all',
  onSelectStanceFilter
}) => {
  return (
    <div className="w-full my-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 tracking-wider mb-2">
        <span>審査級段位で絞り込み</span>
        {onSelectStanceFilter && (
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full border border-slate-200">
            <button
              onClick={() => onSelectStanceFilter('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                stanceFilter === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ※すべて
            </button>
            <button
              onClick={() => onSelectStanceFilter('tachi')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                stanceFilter === 'tachi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ※立ち技のみ
            </button>
            <button
              onClick={() => onSelectStanceFilter('suwari')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                stanceFilter === 'suwari'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ※座り技のみ
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 py-1">
        {grades.map((grade) => {
          const isSelected = selectedGrade === grade;
          const count = gradeCounts[grade] ?? 0;

          return (
            <button
              key={grade}
              onClick={() => onSelectGrade(grade)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-[#003d9b] text-white border-[#003d9b] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50/80'
              }`}
            >
              {grade}
              {grade !== 'すべて' && count > 0 && (
                <span
                  className={`ml-1 text-xs px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
