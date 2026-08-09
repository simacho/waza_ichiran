import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Technique, Grade, Category } from '../types';
import { ALL_GRADES } from '../data/techniques';

interface AddTechniqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTechnique: (technique: Technique) => void;
}

const CATEGORIES: Category[] = ['打撃技', '蹴り技', '投げ技', '関節・絞め技', '防御・受け身', '特殊・奥義'];

export const AddTechniqueModal: React.FC<AddTechniqueModalProps> = ({
  isOpen,
  onClose,
  onAddTechnique
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [reading, setReading] = useState('');
  const [grade, setGrade] = useState<Grade>('7・8級');
  const [category, setCategory] = useState<Category>('打撃技');
  const [videoUrl, setVideoUrl] = useState('');
  const [difficultyRating, setDifficultyRating] = useState<number>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTechnique: Technique = {
      id: `custom-tech-${Date.now()}`,
      grip: category || '正面打ち',
      rawGrip: category || '正面打ち',
      displayName: name.trim(),
      name: name.trim(),
      reading: reading.trim(),
      grade,
      category,
      description: '',
      keyPoints: [],
      videoUrl: videoUrl.trim() || '',
      isMastered: false,
      isFavorite: false,
      difficultyRating
    };

    onAddTechnique(newTechnique);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#003d9b] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <h2 className="text-lg font-bold">新しい技の追加</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Name & Reading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                技名 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 四方投げ"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#003d9b] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                読み（ひらがな）
              </label>
              <input
                type="text"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                placeholder="例: しほうなげ"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#003d9b] focus:bg-white"
              />
            </div>
          </div>

          {/* Grade & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">対象級段位</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as Grade)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#003d9b] focus:bg-white"
              >
                {ALL_GRADES.filter((g) => g !== 'すべて').map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">分類</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#003d9b] focus:bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">動画URL（YouTube埋め込みまたは.mp4）</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#003d9b] focus:bg-white"
            />
          </div>

          {/* Submit buttons */}
          <div className="flex gap-2 pt-2 justify-end border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold text-white bg-[#003d9b] hover:bg-[#002d73] rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>技を追加</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
