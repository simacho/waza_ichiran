export type StanceType = 'すべて' | '立ち技' | '座り技(※)' | '半身半立ち' | 'その他';

export type StanceFilterOption = 'all' | 'tachi' | 'suwari';

export type GripType = 
  | 'すべて'
  | '正面打ち'
  | '横面打ち'
  | '片手持ち'
  | '両手持ち'
  | '肘持ち'
  | '肩持ち'
  | '胸持ち'
  | '片手綾持ち'
  | '正面突き'
  | '後ろ技'
  | '半身半立ち'
  | '武器・多人数';

export type Grade = 
  | 'すべて'
  | '7・8級'
  | '5・6級'
  | '6・5級'
  | '5級'
  | '4級'
  | '3級'
  | '2級'
  | '1級'
  | '初段'
  | '二段'
  | '三段'
  | '少年7級'
  | '少年5・6級'
  | '少年3・4級'
  | '少年2・1級'
  | '少年初段';

export type Category = '打撃技' | '蹴り技' | '投げ技' | '関節・絞め技' | '防御・受け身' | '特殊・奥義' | string;

export interface Technique {
  id: string;
  grip: string; // e.g. "正面打ち" or "※正面打ち"
  rawGrip?: string; // e.g. "正面打ち"
  isSuwariWaza?: boolean; // true if starts with ※
  name: string; // e.g. "四方投げ"
  numberLabel?: string; // e.g. "①", "②", "○", "③"
  displayName?: string; // e.g. "正面打ち 四方投げ ①"
  videoUrl?: string; // e.g. "https://x.com/samurai_kaze/status/..."
  imageUrl?: string; // HTML hotlinked image URL
  description: string;
  keyPoints: string[];
  grade: Grade;
  grades?: Grade[];
  reading?: string;
  category?: Category;
  difficultyRating?: number;
  isHotlinkedImage?: boolean;
  isMastered?: boolean;
  isFavorite?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  content: string;
}
