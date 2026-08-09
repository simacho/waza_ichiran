import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  resultCount
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="技名で検索"
          className="w-full bg-white text-slate-800 placeholder-slate-400 border border-slate-300 rounded-lg pl-10 pr-10 py-2.5 text-base shadow-2xs focus:outline-none focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            title="検索語句をクリア"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="text-xs text-slate-500 mt-1.5 px-1 font-medium">
          検索結果: <span className="text-[#003d9b] font-bold">{resultCount}</span> 件
        </div>
      )}
    </div>
  );
};
