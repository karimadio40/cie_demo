import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ID_DOCUMENT_LABELS,
  STATUS_LABELS,
  STATUS_ORDER,
  SubscriptionRequest,
  SubscriptionStatus,
} from '../../core/models/subscription.model';
import { SubscriptionService } from '../../core/services/subscription.service';

@Component({
  selector: 'app-agent-dashboard',
  imports: [FormsModule, RouterLink, DatePipe],
  template: `
    <div class="min-h-screen bg-[#f4f7f9]">
      <!-- Bandeau agent -->
      <div class="border-b border-[#0a2e36]/10 bg-[#0a2e36] text-white">
        <div class="cie-container flex flex-wrap items-center justify-between gap-4 py-4">
          <div class="flex items-center gap-3">
            <img src="/logo1.webp" alt="Logo CIE" class="h-10 w-auto object-contain rounded-xl bg-white p-1" />
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-[#52b788]">Espace réservé</p>
              <h1 class="text-lg font-bold sm:text-xl">Gestion des demandes PEPT</h1>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">Agent CIE — Démo</span>
            <a routerLink="/" class="cie-btn-secondary !border-white/20 !bg-white/10 !text-white text-sm hover:!bg-white/20">
              ➔ Portail usagers
            </a>
          </div>
        </div>
      </div>

      <div class="cie-container py-8 sm:py-10">
        <!-- Statistiques -->
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button
            type="button"
            class="rounded-2xl border bg-white p-4 text-left transition hover:shadow-md"
            [class]="filterStatus() === 'all' ? 'border-[#e85d04] ring-2 ring-[#e85d04]/20' : 'border-[#e8edf2]'"
            (click)="filterStatus.set('all')"
          >
            <p class="text-2xl font-extrabold text-[#0a2e36]">{{ totalCount() }}</p>
            <p class="text-xs font-medium text-slate-500">Total</p>
          </button>
          @for (status of statusOrder; track status) {
            <button
              type="button"
              class="rounded-2xl border bg-white p-4 text-left transition hover:shadow-md"
              [class]="filterStatus() === status ? 'border-[#e85d04] ring-2 ring-[#e85d04]/20' : 'border-[#e8edf2]'"
              (click)="filterStatus.set(status)"
            >
              <p class="text-2xl font-extrabold" [class]="statusColor(status)">{{ counts()[status] }}</p>
              <p class="text-xs font-medium text-slate-500">{{ statusLabels[status] }}</p>
            </button>
          }
        </div>

        <!-- Filtres -->
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            class="cie-input flex-1"
            placeholder="Rechercher par code, nom, téléphone, commune..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange()"
          />
          <select
            class="cie-input sm:w-56"
            [ngModel]="filterStatus()"
            (ngModelChange)="filterStatus.set($event); refreshList()"
          >
            <option value="all">Tous les statuts</option>
            @for (status of statusOrder; track status) {
              <option [value]="status">{{ statusLabels[status] }}</option>
            }
          </select>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-12">
          <!-- Liste -->
          <div class="lg:col-span-5">
            <div class="rounded-3xl border border-[#e8edf2] bg-white shadow-sm">
              <div class="border-b border-[#e8edf2] px-5 py-4">
                <h2 class="font-bold text-[#0a2e36]">Demandes ({{ filteredRequests().length }})</h2>
              </div>
              <ul class="max-h-[32rem] divide-y divide-[#e8edf2] overflow-y-auto">
                @if (filteredRequests().length === 0) {
                  <li class="px-5 py-10 text-center text-sm text-slate-500">Aucune demande trouvée.</li>
                }
                @for (req of filteredRequests(); track req.id) {
                  <li>
                    <button
                      type="button"
                      class="w-full px-5 py-4 text-left transition hover:bg-[#f4f7f9]"
                      [class]="selectedId() === req.id ? 'bg-orange-50/80 border-l-4 border-[#e85d04]' : ''"
                      (click)="selectRequest(req.id)"
                    >
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <p class="font-mono text-sm font-bold text-[#e85d04]">{{ req.trackingCode }}</p>
                          <p class="mt-0.5 font-medium text-[#0a2e36]">{{ req.prenoms }} {{ req.nom }}</p>
                          <p class="text-xs text-slate-500">{{ req.commune }} — Kit {{ req.offreKit }}</p>
                        </div>
                        <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" [class]="statusBadgeClass(req.status)">
                          {{ statusLabels[req.status] }}
                        </span>
                      </div>
                      <p class="mt-1 text-[10px] text-slate-400">{{ req.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- Détail & traitement -->
          <div class="lg:col-span-7">
            @if (selected(); as req) {
              <div class="rounded-3xl border border-[#e8edf2] bg-white p-6 shadow-sm sm:p-8">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wide text-slate-400">Dossier</p>
                    <p class="font-mono text-2xl font-extrabold text-[#e85d04]">{{ req.trackingCode }}</p>
                  </div>
                  <span class="rounded-2xl px-4 py-2 text-sm font-semibold" [class]="statusBadgeClass(req.status)">
                    {{ statusLabels[req.status] }}
                  </span>
                </div>

                <dl class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl bg-[#f4f7f9] p-4">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Demandeur</dt>
                    <dd class="mt-1 font-semibold">{{ req.prenoms }} {{ req.nom }}</dd>
                  </div>
                  <div class="rounded-2xl bg-[#f4f7f9] p-4">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Téléphone</dt>
                    <dd class="mt-1"><a [href]="'tel:' + req.telephone" class="text-[#e85d04] no-underline">{{ req.telephone }}</a></dd>
                  </div>
                  @if (req.email) {
                    <div class="rounded-2xl bg-[#f4f7f9] p-4 sm:col-span-2">
                      <dt class="text-[10px] font-bold uppercase text-slate-400">E-mail</dt>
                      <dd class="mt-1">{{ req.email }}</dd>
                    </div>
                  }
                  <div class="rounded-2xl bg-[#f4f7f9] p-4">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Adresse</dt>
                    <dd class="mt-1">{{ req.quartier }}, {{ req.commune }}</dd>
                  </div>
                  <div class="rounded-2xl bg-[#f4f7f9] p-4">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Offre</dt>
                    <dd class="mt-1">Kit {{ req.offreKit }} — {{ req.locationType === 'rural' ? 'Rural' : 'Urbain' }}</dd>
                  </div>
                  <div class="rounded-2xl bg-[#f4f7f9] p-4 sm:col-span-2">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Pièce d'identité</dt>
                    <dd class="mt-1">{{ idLabels[req.typePiece] }} — {{ req.numeroPiece }}</dd>
                  </div>
                  <div class="rounded-2xl bg-[#f4f7f9] p-4">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Paiement comptant</dt>
                    <dd class="mt-1">{{ req.paiementComptant ? 'Oui' : 'Non (crédit)' }}</dd>
                  </div>
                  <div class="rounded-2xl bg-[#f4f7f9] p-4">
                    <dt class="text-[10px] font-bold uppercase text-slate-400">Dernière mise à jour</dt>
                    <dd class="mt-1 text-sm">{{ req.updatedAt | date:'dd/MM/yyyy à HH:mm' }}</dd>
                  </div>
                  @if (req.message) {
                    <div class="rounded-2xl bg-amber-50 p-4 sm:col-span-2">
                      <dt class="text-[10px] font-bold uppercase text-amber-700">Message</dt>
                      <dd class="mt-1 text-sm text-amber-900">{{ req.message }}</dd>
                    </div>
                  }
                </dl>

                <div class="mt-8 rounded-2xl border border-[#e8edf2] bg-[#f4f7f9] p-5">
                  <h3 class="font-bold text-[#0a2e36]">Traiter la demande</h3>
                  <p class="mt-1 text-sm text-slate-500">Modifier le statut visible par l'usager sur la page de suivi.</p>
                  <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div class="flex-1">
                      <label class="mb-1.5 block text-sm font-medium text-slate-700" for="newStatus">Nouveau statut</label>
                      <select id="newStatus" class="cie-input" [(ngModel)]="editStatus">
                        @for (status of statusOrder; track status) {
                          <option [value]="status">{{ statusLabels[status] }}</option>
                        }
                      </select>
                    </div>
                    <button type="button" class="cie-btn-primary shrink-0" (click)="saveStatus()">
                      Enregistrer
                    </button>
                  </div>
                  @if (saveMessage()) {
                    <p class="mt-3 text-sm font-medium text-[#2d6a4f]">{{ saveMessage() }}</p>
                  }
                </div>

                <div class="mt-4 flex flex-wrap gap-2">
                  <button type="button" class="cie-btn-secondary text-sm" (click)="advanceStatus()" [disabled]="req.status === 'terminee'">
                     Étape suivante ➔
                  </button>
                  <a [routerLink]="['/suivi']" [queryParams]="{ code: req.trackingCode }" class="cie-btn-ghost text-sm" target="_blank">
                    Voir côté usager ↗
                  </a>
                </div>
              </div>
            } @else {
              <div class="flex min-h-[20rem] items-center justify-center rounded-3xl border border-dashed border-[#e8edf2] bg-white p-8 text-center">
                <div>
                  <p class="text-5xl">📋</p>
                  <p class="mt-3 font-medium text-slate-600">Sélectionnez une demande dans la liste</p>
                  <p class="mt-1 text-sm text-slate-400">ou créez-en une via le formulaire usager</p>
                  <a routerLink="/souscription" class="cie-btn-primary mt-6 inline-flex">Formulaire de souscription</a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AgentDashboardComponent implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);

  readonly statusOrder = STATUS_ORDER;
  readonly statusLabels = STATUS_LABELS;
  readonly idLabels = ID_DOCUMENT_LABELS;

  readonly requests = signal<SubscriptionRequest[]>([]);
  readonly selectedId = signal<string | null>(null);
  readonly filterStatus = signal<SubscriptionStatus | 'all'>('all');
  searchQuery = '';
  editStatus: SubscriptionStatus = 'soumise';
  readonly saveMessage = signal('');

  readonly counts = computed(() => this.subscriptionService.countByStatus());
  readonly totalCount = computed(() => this.requests().length);

  readonly filteredRequests = computed(() => {
    const q = this.searchQuery.trim().toLowerCase();
    const status = this.filterStatus();
    return this.requests().filter((r) => {
      if (status !== 'all' && r.status !== status) return false;
      if (!q) return true;
      const haystack = [
        r.trackingCode,
        r.nom,
        r.prenoms,
        r.telephone,
        r.commune,
        r.quartier,
        r.offreKit,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  });

  readonly selected = computed(() => {
    const id = this.selectedId();
    return id ? this.requests().find((r) => r.id === id) : undefined;
  });

  ngOnInit(): void {
    this.subscriptionService.seedDemoRequest();
    this.refreshList();
  }

  refreshList(): void {
    this.requests.set(this.subscriptionService.getAll());
    const sel = this.selectedId();
    if (sel && !this.requests().some((r) => r.id === sel)) {
      this.selectedId.set(null);
    } else if (sel) {
      const updated = this.subscriptionService.findById(sel);
      if (updated) this.editStatus = updated.status;
    }
  }

  onSearchChange(): void {
    /* ngModel binding */
  }

  selectRequest(id: string): void {
    this.selectedId.set(id);
    const req = this.subscriptionService.findById(id);
    if (req) this.editStatus = req.status;
    this.saveMessage.set('');
  }

  saveStatus(): void {
    const id = this.selectedId();
    if (!id) return;
    const updated = this.subscriptionService.updateStatus(id, this.editStatus);
    if (updated) {
      this.refreshList();
      this.saveMessage.set('Statut mis à jour — visible pour l\'usager.');
      setTimeout(() => this.saveMessage.set(''), 3000);
    }
  }

  advanceStatus(): void {
    const req = this.selected();
    if (!req) return;
    const idx = STATUS_ORDER.indexOf(req.status);
    if (idx < STATUS_ORDER.length - 1) {
      this.editStatus = STATUS_ORDER[idx + 1];
      this.saveStatus();
    }
  }

  statusBadgeClass(status: SubscriptionStatus): string {
    const map: Record<SubscriptionStatus, string> = {
      soumise: 'bg-slate-100 text-slate-700',
      en_analyse: 'bg-amber-100 text-amber-800',
      validee: 'bg-blue-100 text-blue-800',
      installation: 'bg-purple-100 text-purple-800',
      terminee: 'bg-green-100 text-green-800',
    };
    return map[status];
  }

  statusColor(status: SubscriptionStatus): string {
    return status === 'terminee' ? 'text-[#2d6a4f]' : 'text-[#0a2e36]';
  }
}
