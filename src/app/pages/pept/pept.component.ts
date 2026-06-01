import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RURAL_OFFERS, URBAN_OFFERS } from '../../core/data/pept-offers';
import { ID_DOCUMENT_LABELS } from '../../core/models/subscription.model';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-pept',
  imports: [RouterLink, DecimalPipe, ScrollRevealDirective],
  template: `
    <div class="cie-page-hero">
      <div class="cie-container">
        <div class="grid items-center gap-10 lg:grid-cols-2">
          <div appScrollReveal revealAnimation="slide-left">
            <span class="cie-section-label">Programme national</span>
            <h1 class="cie-page-title mt-3">Électricité Pour Tous</h1>
            <p class="mt-3 max-w-xl text-lg text-slate-600">
              Formalités simplifiées et facilités de paiement sur 3 à 10 ans selon l'offre choisie.
            </p>
          </div>
          <div class="overflow-hidden rounded-3xl border border-[#e8edf2] shadow-lg" appScrollReveal revealAnimation="slide-right" [revealDelay]="100">
            <img src="/assets/images/pept-brochure.jpg" alt="Brochure PEPT" class="aspect-video w-full object-cover" onerror="this.src='/assets/images/pept-brochure.svg'" />
          </div>
        </div>
      </div>
    </div>

    <div class="cie-container space-y-14 py-14 sm:py-20">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="cie-card" appScrollReveal revealAnimation="fade-up">
          <h2 class="text-xl font-bold text-[#0a2e36]">Documents requis</h2>
          <ul class="mt-5 space-y-2.5">
            @for (doc of idDocs; track doc) {
              <li class="flex items-center gap-3 text-sm text-slate-600">
                <span class="h-1.5 w-1.5 rounded-full bg-[#e85d04]"></span>
                {{ doc }}
              </li>
            }
          </ul>
          <p class="mt-5 text-sm text-slate-500">+ Numéro de téléphone du propriétaire ou locataire</p>
        </div>
        <div class="cie-card" appScrollReveal revealAnimation="fade-up" [revealDelay]="100">
          <h2 class="text-xl font-bold text-[#0a2e36]">Niche du compteur</h2>
          <p class="mt-3 text-sm text-slate-600">À construire avant l'intervention des équipes PEPT.</p>
          <dl class="mt-6 grid grid-cols-3 gap-3">
            <div class="rounded-2xl bg-[#f4f7f9] p-4 text-center">
              <dt class="text-[10px] font-bold uppercase text-slate-400">Hauteur</dt>
              <dd class="mt-1 text-xl font-extrabold text-[#0a2e36]">1,85 m</dd>
            </div>
            <div class="rounded-2xl bg-[#f4f7f9] p-4 text-center">
              <dt class="text-[10px] font-bold uppercase text-slate-400">Profondeur</dt>
              <dd class="mt-1 text-xl font-extrabold text-[#0a2e36]">0,60 m</dd>
            </div>
            <div class="rounded-2xl bg-[#f4f7f9] p-4 text-center">
              <dt class="text-[10px] font-bold uppercase text-slate-400">Largeur</dt>
              <dd class="mt-1 text-sm font-bold text-[#0a2e36]">Variable</dd>
            </div>
          </dl>
        </div>
      </div>

      <section appScrollReveal revealAnimation="fade-up">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-2xl font-bold text-[#0a2e36]">Offres tarifaires</h2>
          <div class="flex rounded-2xl border border-[#e8edf2] bg-[#f4f7f9] p-1">
            <button
              type="button"
              class="rounded-xl px-5 py-2.5 text-sm font-semibold transition"
              [class]="zone() === 'rural' ? 'bg-white text-[#0a2e36] shadow-sm' : 'text-slate-500'"
              (click)="zone.set('rural')"
            >
              Rural
            </button>
            <button
              type="button"
              class="rounded-xl px-5 py-2.5 text-sm font-semibold transition"
              [class]="zone() === 'urbain' ? 'bg-[#0a2e36] text-white shadow-sm' : 'text-slate-500'"
              (click)="zone.set('urbain')"
            >
              Urbain
            </button>
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-3xl border border-[#e8edf2] shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[640px] text-left text-sm">
              <thead class="bg-[#f4f7f9] text-xs font-bold uppercase tracking-wide text-slate-500">
                <tr>
                  <th class="px-5 py-4">Kit</th>
                  <th class="px-5 py-4">Branchement</th>
                  <th class="px-5 py-4">Ampérage</th>
                  <th class="px-5 py-4">Pièces</th>
                  <th class="px-5 py-4">Prix TTC</th>
                  <th class="px-5 py-4">Mensualité</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e8edf2] bg-white">
                @for (offer of currentOffers(); track offer.kit) {
                  <tr class="transition hover:bg-[#f4f7f9]/50">
                    <td class="px-5 py-4 font-bold text-[#e85d04]">{{ offer.kit }}</td>
                    <td class="px-5 py-4 text-slate-600">{{ offer.connectionType }}</td>
                    <td class="px-5 py-4 text-slate-600">{{ offer.amperage }}</td>
                    <td class="px-5 py-4 text-slate-600">{{ offer.rooms }}</td>
                    <td class="px-5 py-4 font-medium">{{ offer.priceTtc | number }} F</td>
                    <td class="px-5 py-4 font-semibold text-[#2d6a4f]">{{ offer.monthlyPayment | number }} F</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div class="text-center">
        <a routerLink="/souscription" class="cie-btn-primary">Choisir mon offre et souscrire</a>
      </div>
    </div>
  `,
})
export class PeptComponent {
  readonly zone = signal<'rural' | 'urbain'>('rural');
  readonly idDocs = Object.values(ID_DOCUMENT_LABELS);
  readonly currentOffers = computed(() =>
    this.zone() === 'rural' ? RURAL_OFFERS : URBAN_OFFERS,
  );
}
