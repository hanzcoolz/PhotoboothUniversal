export type KioskView =
  | 'attract'
  | 'mode-select'
  | 'payment'
  | 'capture'
  | 'processing'
  | 'finish'
  | 'error';

export type AdminView =
  | 'login'
  | 'dashboard'
  | 'events'
  | 'sessions'
  | 'license'
  | 'settings';

export type AppMode = 'kiosk' | 'admin';

export type SessionType = 'photo' | 'gif' | 'video' | 'boomerang';

export type SessionStatus =
  | 'created'
  | 'awaiting_payment'
  | 'paid'
  | 'capturing'
  | 'processing'
  | 'printing'
  | 'completed'
  | 'failed'
  | 'expired';

export interface Session {
  id: string;
  eventId: string;
  eventName: string;
  status: SessionStatus;
  sessionType: SessionType;
  paymentOrderId?: string;
  guestEmail?: string;
  guestPhone?: string;
  amount: number;
  createdAt: string;
  completedAt?: string;
  synced: boolean;
}

export interface Event {
  id: string;
  slug: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  pricing: { photo: number; gif: number; video: number; boomerang: number };
  isActive: boolean;
  sessions: number;
  revenue: number;
}

export interface License {
  id: string;
  licenseKey: string;
  plan: 'basic' | 'pro' | 'unlimited';
  status: 'active' | 'expired' | 'suspended';
  machineId?: string;
  boothName: string;
  activatedAt: string;
  expiresAt: string;
  forceReleaseCount: number;
}
