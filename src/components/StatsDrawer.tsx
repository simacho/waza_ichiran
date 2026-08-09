import React from 'react';
import { X, Trophy, CheckCircle2, Award, Percent, ChevronRight } from 'lucide-react';
import { Technique, Grade } from '../types';
import { ALL_GRADES } from '../data/techniques';

interface StatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  techniques: Technique[];
  onSelectGradeFilter: (grade: Grade) => void;
}

export const StatsDrawer: React.FC<StatsDrawerProps> = ({
  isOpen,
  onClose,
  techniques,
  onSelectGradeFilter
}) => {
  if (!isOpen) return null;

  const totalCount = techniques.length;
  const masteredCount = techniques.filter((t) => t.isMastered).length;
  const overallPercentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  // Grade breakdown
  const gradeStats = ALL_GRADES.filter((g) => g !== 'すべて').map((g) => {
    const list = techniques.filter((t) => t.grade === g);
    const total = list.length;
    const mastered = list.filter((t) => t.isMastered).length;
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { grade: g, total, mastered, pct };
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-start animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#003d9b] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-300" />
            <h2 className="text-lg font-bold">習得進捗・達成率</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {/* Overall Progress Card */}
          <div className="bg-gradient-to-br from-[#003d9b] to-[#002868] text-white p-4.5 rounded-2xl shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-200 font-medium">全技習得率</span>
              <Award className="w-5 h-5 text-amber-300" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{overallPercentage}%</span>
              <span className="text-xs text-blue-200">
                ({masteredCount} / {totalCount} 技完了)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>

          {/* By Grade / Rank Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-1">
              級段位別の習得状況
            </h3>

            <div className="space-y-2">
              {gradeStats.map(({ grade, total, mastered, pct }) => (
                <div
                  key={grade}
                  onClick={() => {
                    onSelectGradeFilter(grade);
                    onClose();
                  }}
                  className="bg-slate-50 hover:bg-blue-50/60 p-3 rounded-xl border border-slate-200 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1 pr-2">
                      <span className="group-hover:text-[#003d9b] transition-colors">{grade}</span>
                      <span className="text-slate-500">
                        {mastered} / {total} 技 ({pct}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          pct === 100 ? 'bg-emerald-500' : 'bg-[#003d9b]'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#003d9b] shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
