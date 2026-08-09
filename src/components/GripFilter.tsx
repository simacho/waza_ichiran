import React from 'react';
import { GripType } from '../types';
import { Layers } from 'lucide-react';

interface GripFilterProps {
  categories: GripType[];
  selectedCategory: GripType;
  onSelectCategory: (category: GripType) => void;
  showSuwariOnly: boolean;
  onToggleSuwariOnly: () => void;
  gripCounts?: Record<string, number>;
}

export const GripFilter: React.FC<GripFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  showSuwariOnly,
  onToggleSuwariOnly,
  gripCounts = {}
}) => {
  return (
    <div className="w-full my-2 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
        <span>技のかかり手（持たせ方・攻撃種類）で絞り込み</span>

        <button
          onClick={onToggleSuwariOnly}
          className={`px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all border ${
            showSuwariOnly
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>※座り技のみ表示</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 py-0.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = gripCounts[cat] ?? 0;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 border whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-[#003d9b] text-white border-[#003d9b] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
              {cat !== 'すべて' && count > 0 && (
                <span
                  className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full ${
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
