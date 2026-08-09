import React from 'react';
import { Grade } from '../types';

interface GradeFilterProps {
  grades: Grade[];
  selectedGrade: Grade;
  onSelectGrade: (grade: Grade) => void;
  gradeCounts?: Record<string, number>;
}

export const GradeFilter: React.FC<GradeFilterProps> = ({
  grades,
  selectedGrade,
  onSelectGrade,
  gradeCounts = {}
}) => {
  return (
    <div className="w-full my-3">
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
