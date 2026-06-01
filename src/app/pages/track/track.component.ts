import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  ID_DOCUMENT_LABELS,
  STATUS_LABELS,
  STATUS_ORDER,
  SubscriptionRequest,
  SubscriptionStatus,
} from '../../core/models/subscription.model';
import {
  getStatusProgress,
  SubscriptionService,
} from '../../core/services/subscription.service';

@Component({
  selector: 'app-track',
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  template: `
    <div class="cie-page-hero">
      <div class="cie-container max-w-3xl">
        <span class="cie-section-label">Suivi</span>
        <h1 class="cie-page-title mt-3">Suivre ma demande</h1>
        <p class="mt-3 text-lg text-slate-600">Entrez votre code reçu à la souscription — ex. <code class="rounded-lg bg-white px-2 py-0.5 font-mono text-sm text-[#e85d04]">CIE-DEMO01</code></p>
      </div>
    </div>

    <div class="cie-container max-w-3xl pb-20 pt-10">
      <form [formGroup]="form" (ngSubmit)="search()" class="flex flex-col gap-3 rounded-3xl border border-[#e8edf2] bg-[#f4f7f9] p-2 sm:flex-row">
        <input formControlName="code" class="cie-input flex-1 border-0 bg-white font-mono uppercase shadow-none sm:bg-white" placeholder="CIE-XXXXXX" aria-label="Code de suivi" />
        <button type="submit" class="cie-btn-primary shrink-0 sm:rounded-2xl">Vérifier</button>
      </form>

      @if (notFound()) {
        <div class="cie-card mt-8 border-red-100 bg-red-50/50 p-8 text-center">
          <p class="font-semibold text-red-800">Aucune demande trouvée</p>
          <p class="mt-2 text-sm text-red-600">Vérifiez le code saisi.</p>
          <a routerLink="/souscription" class="cie-btn-primary mt-5 inline-flex">Nouvelle souscription</a>
        </div>
      }

      @if (request(); as req) {
        <div class="mt-8 space-y-6">
          <div class="cie-card overflow-hidden p-0">
            <div class="bg-[#0a2e36] px-6 py-5 text-white sm:px-8">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-medium uppercase tracking-wider text-slate-400">Code de suivi</p>
                  <p class="font-mono text-2xl font-extrabold text-[#e85d04] sm:text-3xl">{{ req.trackingCode }}</p>
                </div>
                <span class="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-[#52b788]">{{ statusLabel(req.status) }}</span>
              </div>
              <div class="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div class="h-full rounded-full bg-gradient-to-r from-[#e85d04] to-[#52b788] transition-all duration-500" [style.width.%]="progress(req.status)"></div>
              </div>
              <p class="mt-2 text-right text-xs text-slate-400">{{ progress(req.status) }} % complété</p>
            </div>

            <ol class="px-6 py-6 sm:px-8">
              @for (step of statusSteps; track step; let i = $index) {
                <li class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <span class="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold" [class]="stepClass(req.status, step)">
                      @if (isStepDone(req.status, step)) { ✓ } @else { {{ i + 1 }} }
                    </span>
                    @if (i < statusSteps.length - 1) {
                      <span class="my-1 min-h-[1.5rem] w-0.5 flex-1" [class]="isStepDone(req.status, step) ? 'bg-[#2d6a4f]' : 'bg-[#e8edf2]'"></span>
                    }
                  </div>
                  <div class="pb-6">
                    <p class="font-semibold" [class]="isStepCurrent(req.status, step) ? 'text-[#e85d04]' : 'text-[#0a2e36]'">{{ statusLabel(step) }}</p>
                    @if (isStepCurrent(req.status, step)) {
                      <p class="mt-0.5 text-sm text-slate-500">Étape en cours</p>
                    }
                  </div>
                </li>
              }
            </ol>
          </div>

          <div class="cie-card">
            <h2 class="text-lg font-bold text-[#0a2e36]">Détails de la demande</h2>
            <dl class="mt-5 grid gap-4 sm:grid-cols-2">
              <div class="rounded-2xl bg-[#f4f7f9] p-4">
                <dt class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Demandeur</dt>
                <dd class="mt-1 font-semibold text-[#0a2e36]">{{ req.prenoms }} {{ req.nom }}</dd>
              </div>
              <div class="rounded-2xl bg-[#f4f7f9] p-4">
                <dt class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Téléphone</dt>
                <dd class="mt-1">{{ req.telephone }}</dd>
              </div>
              <div class="rounded-2xl bg-[#f4f7f9] p-4">
                <dt class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Localisation</dt>
                <dd class="mt-1">{{ req.quartier }}, {{ req.commune }}</dd>
              </div>
              <div class="rounded-2xl bg-[#f4f7f9] p-4">
                <dt class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Offre</dt>
                <dd class="mt-1">Kit {{ req.offreKit }} · {{ req.locationType === 'rural' ? 'Rural' : 'Urbain' }}</dd>
              </div>
              <div class="rounded-2xl bg-[#f4f7f9] p-4 sm:col-span-2">
                <dt class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Soumis le</dt>
                <dd class="mt-1">{{ req.createdAt | date:'dd/MM/yyyy à HH:mm' }}</dd>
              </div>
            </dl>
          </div>
        </div>
      }
    </div>
  `,
})
export class TrackComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({ code: [''] });
  readonly request = signal<SubscriptionRequest | null>(null);
  readonly notFound = signal(false);
  readonly statusSteps = STATUS_ORDER;

  ngOnInit(): void {
    this.subscriptionService.seedDemoRequest();
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.form.controls.code.setValue(code);
      this.search();
    }
  }

  search(): void {
    const code = this.form.controls.code.value.trim();
    if (!code) return;

    const found = this.subscriptionService.findByCode(code);
    this.request.set(found ?? null);
    this.notFound.set(!found);
  }

  statusLabel(status: SubscriptionStatus): string {
    return STATUS_LABELS[status];
  }

  idLabel(type: SubscriptionRequest['typePiece']): string {
    return ID_DOCUMENT_LABELS[type];
  }

  progress(status: SubscriptionStatus): number {
    return getStatusProgress(status);
  }

  isStepDone(current: SubscriptionStatus, step: SubscriptionStatus): boolean {
    return STATUS_ORDER.indexOf(current) >= STATUS_ORDER.indexOf(step);
  }

  isStepCurrent(current: SubscriptionStatus, step: SubscriptionStatus): boolean {
    return current === step;
  }

  stepClass(current: SubscriptionStatus, step: SubscriptionStatus): string {
    if (this.isStepCurrent(current, step)) {
      return 'bg-[#e85d04] text-white ring-4 ring-[#e85d04]/20';
    }
    if (this.isStepDone(current, step)) {
      return 'bg-[#2d6a4f] text-white';
    }
    return 'bg-[#f4f7f9] text-slate-400';
  }
}
