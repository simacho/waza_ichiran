import React from 'react';
import { X, CheckCircle2, Star, Video, Layers, ExternalLink } from 'lucide-react';
import { Technique } from '../types';

interface VideoModalProps {
  technique: Technique | null;
  onClose: () => void;
  onToggleMastered: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  technique,
  onClose,
  onToggleMastered,
  onToggleFavorite
}) => {
  if (!technique) return null;

  const displayTitle = technique.displayName || (
    technique.numberLabel 
      ? `${technique.rawGrip || technique.grip || ''} ${technique.name} ${technique.numberLabel}`
      : technique.name
  );

  const url = technique.videoUrl || '';
  const isMp4 = url.includes('.mp4');
  const isTwitter = url.includes('twitter.com') || url.includes('x.com');
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');

  let youtubeEmbedUrl = '';
  if (isYouTube) {
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch && watchMatch[1]) {
      youtubeEmbedUrl = `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
    } else {
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch && shortMatch[1]) {
        youtubeEmbedUrl = `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
      }
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#003d9b] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {technique.isSuwariWaza && (
                <span className="bg-amber-400 text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  座り技 (※)
                </span>
              )}
              {technique.grade && technique.grade !== 'すべて' && (
                <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {technique.grade}
                </span>
              )}
              {technique.grip && (
                <span className="bg-white/10 text-white/90 text-xs px-2.5 py-0.5 rounded-full">
                  {technique.grip}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {displayTitle}
            </h2>
            {technique.reading && (
              <p className="text-xs text-blue-100 font-sans">{technique.reading}</p>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onToggleFavorite(technique.id)}
              className={`p-2 rounded-full transition-colors ${
                technique.isFavorite ? 'text-amber-400 bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title="お気に入り切り替え"
            >
              <Star className={`w-5 h-5 ${technique.isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="閉じる"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Media Area */}
        <div className="shrink-0 bg-slate-950 text-white">
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {url ? (
              isMp4 ? (
                <video
                  src={url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              ) : isYouTube && youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={`${displayTitle} YouTube動画`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isTwitter ? (
                <div className="text-center p-6 bg-gradient-to-b from-slate-900 to-slate-950 w-full h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-inner">
                    <Video className="w-7 h-7" />
                  </div>
                  <div className="max-w-md px-4 space-y-1">
                    <p className="text-base font-bold text-white">Twitter (X) 公式動画・解説ページ</p>
                    <p className="text-xs text-slate-400">
                      公式Twitter（@samurai_kaze）の演武・解説投稿リンクです。以下のボタンから直接動画をご視聴いただけます。
                    </p>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Twitter (X) で動画を見る</span>
                  </a>
                </div>
              ) : (
                <iframe
                  src={url}
                  title={`${displayTitle} ページ`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <div className="text-center p-6 text-slate-400">
                <Video className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-500" />
                <p className="text-sm font-medium">動画・HTMLリンク準備中</p>
              </div>
            )}
          </div>
        </div>

        {/* HTML Link Action Bar */}
        {url && (
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="text-slate-600 font-medium">
              {isTwitter ? (
                <span>※ Twitter (X) 投稿ページのリンク（@samurai_kaze）</span>
              ) : isYouTube ? (
                <span>※ YouTube 公式解説動画</span>
              ) : (
                <span>※ 技参照HTMLリンク</span>
              )}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#003d9b] hover:bg-[#002d73] text-white font-bold rounded-lg transition-colors shadow-xs shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>新しいタブで開く</span>
            </a>
          </div>
        )}

        {/* Status Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onToggleMastered(technique.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-sm transition-all ${
              technique.isMastered
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{technique.isMastered ? '習得完了' : '未習得（クリックで完了）'}</span>
          </button>

          {technique.difficultyRating && (
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <span>難易度:</span>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (technique.difficultyRating || 0) ? 'fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
