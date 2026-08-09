import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { GradeFilter } from './components/GradeFilter';
import { GripFilter } from './components/GripFilter';
import { TechniqueCard } from './components/TechniqueCard';
import { VideoModal } from './components/VideoModal';
import { AddTechniqueModal } from './components/AddTechniqueModal';
import { StatsDrawer } from './components/StatsDrawer';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { Technique, Grade, GripType, NotificationItem } from './types';
import { INITIAL_TECHNIQUES, ALL_GRADES, GRIP_CATEGORIES } from './data/techniques';
import { Filter, Layers, BookOpen } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'aistudio_techniques_v2';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '演武・審査技データの一括搭載完了',
    time: '本日 10:00',
    read: false,
    content: '全200項目以上の技（正面打ち・横面打ち・片手打ち・両手持ち・肘持ち・肩持ち・胸持ち・後ろ技・座り技・武器取り等）の動画参照を反映しました。'
  },
  {
    id: 'notif-2',
    title: '座り技(※)・持たせ方（グリップ）フィルタ機能を追加',
    time: '昨日',
    read: true,
    content: 'かかり手ごとの絞り込みや「座り技（※）」のワンタップ表示に対応しました。審査準備にご活用ください。'
  }
];

export default function App() {
  // State for techniques
  const [techniques, setTechniques] = useState<Technique[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse local storage', e);
    }
    return INITIAL_TECHNIQUES;
  });

  // Filters & Search
  const [selectedGrade, setSelectedGrade] = useState<Grade>('すべて');
  const [selectedCategory, setSelectedCategory] = useState<GripType>('すべて');
  const [showSuwariOnly, setShowSuwariOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // Modals & Drawers
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Save techniques to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(techniques));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [techniques]);

  // Compute technique count per grade
  const gradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_GRADES.forEach((g) => {
      if (g === 'すべて') {
        counts[g] = techniques.length;
      } else {
        counts[g] = techniques.filter((t) => t.grade === g).length;
      }
    });
    return counts;
  }, [techniques]);

  // Compute technique count per grip category
  const gripCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    GRIP_CATEGORIES.forEach((cat) => {
      if (cat === 'すべて') {
        counts[cat] = techniques.length;
      } else {
        counts[cat] = techniques.filter((t) => t.grip === cat).length;
      }
    });
    return counts;
  }, [techniques]);

  // Filtered techniques list
  const filteredTechniques = useMemo(() => {
    return techniques.filter((tech) => {
      // Grade filter
      if (selectedGrade !== 'すべて' && tech.grade !== selectedGrade) {
        return false;
      }

      // Grip Category filter
      if (selectedCategory !== 'すべて' && tech.grip !== selectedCategory) {
        return false;
      }

      // Suwari-waza filter
      if (showSuwariOnly && !tech.isSuwariWaza) {
        return false;
      }

      // Favorite filter
      if (showFavoritesOnly && !tech.isFavorite) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = tech.name.toLowerCase().includes(query);
        const matchesDisplay = tech.displayName ? tech.displayName.toLowerCase().includes(query) : false;
        const matchesGrip = tech.grip ? tech.grip.toLowerCase().includes(query) : false;
        const matchesRawGrip = tech.rawGrip ? tech.rawGrip.toLowerCase().includes(query) : false;
        const matchesGrade = tech.grade.toLowerCase().includes(query);

        return matchesName || matchesDisplay || matchesGrip || matchesRawGrip || matchesGrade;
      }

      return true;
    });
  }, [techniques, selectedGrade, selectedCategory, showSuwariOnly, showFavoritesOnly, searchTerm]);

  // Handlers
  const handleToggleFavorite = (e?: React.MouseEvent, id?: string) => {
    if (e) e.stopPropagation();
    if (!id) return;

    setTechniques((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    );

    if (selectedTechnique && selectedTechnique.id === id) {
      setSelectedTechnique((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleToggleMastered = (e?: React.MouseEvent | string, id?: string) => {
    let targetId: string | undefined = id;
    if (typeof e === 'string') {
      targetId = e;
    } else if (e) {
      e.stopPropagation();
    }

    if (!targetId) return;

    setTechniques((prev) =>
      prev.map((t) => (t.id === targetId ? { ...t, isMastered: !t.isMastered } : t))
    );

    if (selectedTechnique && selectedTechnique.id === targetId) {
      setSelectedTechnique((prev) => (prev ? { ...prev, isMastered: !prev.isMastered } : null));
    }
  };

  const handleAddTechnique = (newTech: Technique) => {
    setTechniques((prev) => [newTech, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const favoriteCount = useMemo(() => techniques.filter((t) => t.isFavorite).length, [techniques]);
  const unreadNotifCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 font-sans antialiased selection:bg-[#003d9b]/20">
      {/* Mobile-centric or centered desktop layout container */}
      <div className="max-w-md sm:max-w-xl md:max-w-3xl mx-auto min-h-screen bg-white sm:shadow-lg sm:border-x border-slate-200/80 flex flex-col">
        {/* Header Component */}
        <Header
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          unreadCount={unreadNotifCount}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
          favoriteCount={favoriteCount}
        />

        {/* Main Content Area */}
        <main className="p-3.5 sm:p-5 flex-1 space-y-3">
          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultCount={filteredTechniques.length}
          />

          {/* Grip/Category Filter Chips */}
          <GripFilter
            categories={GRIP_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            showSuwariOnly={showSuwariOnly}
            onToggleSuwariOnly={() => setShowSuwariOnly(!showSuwariOnly)}
            gripCounts={gripCounts}
          />

          {/* Grade/Rank Filter Chips */}
          <GradeFilter
            grades={ALL_GRADES}
            selectedGrade={selectedGrade}
            onSelectGrade={setSelectedGrade}
            gradeCounts={gradeCounts}
          />

          {/* Active Filter Indicators */}
          {(showFavoritesOnly || selectedGrade !== 'すべて' || selectedCategory !== 'すべて' || showSuwariOnly || searchTerm) && (
            <div className="flex items-center justify-between text-xs bg-blue-50/80 border border-blue-100 rounded-lg px-3 py-2 text-slate-700">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Filter className="w-3.5 h-3.5 text-[#003d9b]" />
                <span className="font-semibold text-slate-600">適用中の絞り込み:</span>
                {selectedCategory !== 'すべて' && (
                  <span className="font-bold text-[#003d9b] bg-white px-2 py-0.5 rounded border border-blue-200">
                    持たせ方: {selectedCategory}
                  </span>
                )}
                {selectedGrade !== 'すべて' && (
                  <span className="font-bold text-[#003d9b] bg-white px-2 py-0.5 rounded border border-blue-200">
                    級段位: {selectedGrade}
                  </span>
                )}
                {showSuwariOnly && (
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    座り技(※)のみ
                  </span>
                )}
                {showFavoritesOnly && (
                  <span className="font-bold text-amber-600 bg-white px-2 py-0.5 rounded border border-amber-200">
                    お気に入りのみ
                  </span>
                )}
                {searchTerm && (
                  <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    "{searchTerm}"
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedGrade('すべて');
                  setSelectedCategory('すべて');
                  setShowSuwariOnly(false);
                  setShowFavoritesOnly(false);
                  setSearchTerm('');
                }}
                className="text-[#003d9b] hover:underline font-bold shrink-0 ml-2"
              >
                全解除
              </button>
            </div>
          )}

          {/* Technique Cards List */}
          <div className="space-y-2.5 pt-1">
            {filteredTechniques.length > 0 ? (
              filteredTechniques.map((technique) => (
                <TechniqueCard
                  key={technique.id}
                  technique={technique}
                  onSelect={setSelectedTechnique}
                  onToggleFavorite={(e, id) => handleToggleFavorite(e, id)}
                  onToggleMastered={(e, id) => handleToggleMastered(e, id)}
                />
              ))
            ) : (
              <div className="py-12 px-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  該当する技が見つかりませんでした
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  検索条件を全解除するか、右上の「＋」ボタンから新しい技を追加できます。
                </p>
                <button
                  onClick={() => {
                    setSelectedGrade('すべて');
                    setSelectedCategory('すべて');
                    setShowSuwariOnly(false);
                    setShowFavoritesOnly(false);
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#002d73] transition-colors"
                >
                  条件を全解除する
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-slate-50/80 px-4 py-3 text-center text-xs text-slate-500">
          <div className="flex items-center justify-center gap-1.5 font-medium text-slate-600">
            <BookOpen className="w-3.5 h-3.5 text-[#003d9b]" />
            <span>武道演武・審査技データ参照システム</span>
          </div>
        </footer>
      </div>

      {/* Modals & Drawers */}
      <VideoModal
        technique={selectedTechnique}
        onClose={() => setSelectedTechnique(null)}
        onToggleMastered={(id) => handleToggleMastered(id, id)}
        onToggleFavorite={(id) => handleToggleFavorite(undefined, id)}
      />

      <AddTechniqueModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTechnique={handleAddTechnique}
      />

      <StatsDrawer
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        techniques={techniques}
        onSelectGradeFilter={(g) => {
          setSelectedGrade(g);
          setShowFavoritesOnly(false);
        }}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />
    </div>
  );
}
