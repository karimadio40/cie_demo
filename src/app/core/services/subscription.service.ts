import { Injectable } from '@angular/core';
import {
  SubscriptionRequest,
  SubscriptionStatus,
  STATUS_ORDER,
} from '../models/subscription.model';

const STORAGE_KEY = 'cie-demo-subscriptions';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  submit(data: Omit<SubscriptionRequest, 'id' | 'trackingCode' | 'status' | 'createdAt' | 'updatedAt'>): SubscriptionRequest {
    const request = this.createRequest(data);
    const all = this.loadAll();
    all.push(request);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return request;
  }

  findByCode(code: string): SubscriptionRequest | undefined {
    const normalized = code.trim().toUpperCase();
    return this.loadAll().find((r) => r.trackingCode === normalized);
  }

  findById(id: string): SubscriptionRequest | undefined {
    return this.loadAll().find((r) => r.id === id);
  }

  getAll(): SubscriptionRequest[] {
    return this.loadAll().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  updateStatus(id: string, status: SubscriptionStatus): SubscriptionRequest | undefined {
    const all = this.loadAll();
    const index = all.findIndex((r) => r.id === id);
    if (index < 0) return undefined;

    all[index] = {
      ...all[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[index];
  }

  countByStatus(): Record<SubscriptionStatus, number> {
    const counts = Object.fromEntries(
      STATUS_ORDER.map((s) => [s, 0]),
    ) as Record<SubscriptionStatus, number>;

    for (const req of this.loadAll()) {
      counts[req.status]++;
    }
    return counts;
  }

  /** Demo: advance status for presentation purposes */
  seedDemoRequest(): void {
    const all = this.loadAll();
    if (all.some((r) => r.trackingCode === 'CIE-DEMO01')) return;

    const demo: SubscriptionRequest = {
      id: crypto.randomUUID(),
      trackingCode: 'CIE-DEMO01',
      status: 'en_analyse',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      nom: 'Kouassi',
      prenoms: 'Aya Marie',
      telephone: '+225 07 00 00 00 01',
      commune: 'Yopougon',
      quartier: 'Siporex',
      typePiece: 'cni',
      numeroPiece: 'CI0000000',
      locationType: 'urbain',
      offreKit: 'B5',
      paiementComptant: false,
    };
    all.push(demo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  private createRequest(
    data: Omit<SubscriptionRequest, 'id' | 'trackingCode' | 'status' | 'createdAt' | 'updatedAt'>,
  ): SubscriptionRequest {
    const now = new Date().toISOString();
    return {
      ...data,
      id: crypto.randomUUID(),
      trackingCode: this.generateTrackingCode(),
      status: 'soumise',
      createdAt: now,
      updatedAt: now,
    };
  }

  private generateTrackingCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i++) {
      suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    return `CIE-${suffix}`;
  }

  private loadAll(): SubscriptionRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SubscriptionRequest[]) : [];
    } catch {
      return [];
    }
  }
}

export function getStatusProgress(status: SubscriptionStatus): number {
  const index = STATUS_ORDER.indexOf(status);
  return index < 0 ? 0 : Math.round((index / (STATUS_ORDER.length - 1)) * 100);
}
