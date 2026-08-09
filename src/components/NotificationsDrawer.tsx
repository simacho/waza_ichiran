import React from 'react';
import { X, Bell, Check, Info, Sparkles, BookOpen } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#003d9b] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg font-bold">お知らせ・審査連絡</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            未読: {notifications.filter((n) => !n.read).length} 件
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-[#003d9b] font-bold hover:underline flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>すべて既読にする</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="p-3 overflow-y-auto space-y-2.5 flex-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                !item.read
                  ? 'bg-blue-50/60 border-blue-200/90 shadow-2xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  {!item.read && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />}
                  {item.title}
                </h4>
                <span className="text-[11px] text-slate-400 shrink-0">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
