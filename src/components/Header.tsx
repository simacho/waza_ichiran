import React from 'react';
import { BarChart2, Bell, Plus, BookmarkCheck } from 'lucide-react';

interface HeaderProps {
  onOpenStats: () => void;
  onOpenNotifications: () => void;
  onOpenAddModal: () => void;
  unreadCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoriteCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenStats,
  onOpenNotifications,
  onOpenAddModal,
  unreadCount,
  showFavoritesOnly,
  onToggleFavorites,
  favoriteCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between transition-all">
      {/* Left Icon: Analytics / Stats */}
      <button
        onClick={onOpenStats}
        className="p-2 text-[#003d9b] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
        title="習得状況・統計"
        aria-label="習得状況・統計"
      >
        <BarChart2 className="w-6 h-6 stroke-[2]" />
      </button>

      {/* Center Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#003d9b] tracking-tight">
          技一覧
        </h1>
      </div>

      {/* Right Icons: Add, Favorites, Notifications */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Favorites filter toggle */}
        <button
          onClick={onToggleFavorites}
          className={`p-2 rounded-lg transition-all relative flex items-center ${
            showFavoritesOnly 
              ? 'bg-[#003d9b] text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title={showFavoritesOnly ? 'すべての技を表示' : 'お気に入りのみ表示'}
        >
          <BookmarkCheck className="w-5 h-5" />
          {favoriteCount > 0 && (
            <span className={`text-xs ml-1 font-semibold ${showFavoritesOnly ? 'text-white' : 'text-[#003d9b]'}`}>
              {favoriteCount}
            </span>
          )}
        </button>

        {/* Add custom technique */}
        <button
          onClick={onOpenAddModal}
          className="p-2 text-[#003d9b] hover:bg-slate-100 rounded-lg transition-colors active:scale-95 flex items-center gap-1"
          title="新しい技を追加"
          aria-label="新しい技を追加"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="p-2 text-[#003d9b] hover:bg-slate-100 rounded-lg transition-colors relative active:scale-95"
          title="お知らせ"
          aria-label="お知らせ"
        >
          <Bell className="w-6 h-6 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
};
