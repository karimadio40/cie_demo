import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_BENEFIT_CARDS, HOME_SERVICE_CARDS } from '../../core/data/home-sections.data';
import { PROGRAM_BENEFITS, RURAL_OFFERS, URBAN_OFFERS } from '../../core/data/pept-offers';
import { SubscriptionService } from '../../core/services/subscription.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { HeroVisualComponent } from '../../shared/hero-visual.component';
import { SectionCardImageComponent } from '../../shared/section-card-image.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeroVisualComponent, DecimalPipe, ScrollRevealDirective, SectionCardImageComponent],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div class="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-[#2d6a4f]/5 blur-3xl"></div>
      <div class="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#e85d04]/5 blur-3xl"></div>

      <div class="cie-container relative">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div appScrollReveal revealAnimation="slide-left">
            <span class="cie-section-label">Programme PEPT</span>
            <h1 class="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0a2e36] sm:text-5xl lg:text-[3.25rem]">
              L'électricité<br />
              <span class="text-[#e85d04]">pour tous</span>
            </h1>
            <p class="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              Souscrivez en ligne, recevez un code de suivi et accédez à l'électricité avec des facilités de paiement sur 3 à 10 ans.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div class="flex flex-1 flex-col gap-2 sm:flex-row sm:rounded-2xl sm:border sm:border-[#e8edf2] sm:bg-[#f4f7f9] sm:p-1.5 sm:shadow-sm">
                <input
                  type="tel"
                  readonly
                  value="+225 07 00 00 00 00"
                  class="rounded-2xl border border-[#e8edf2] bg-white px-4 py-3 text-sm text-slate-500 sm:flex-1 sm:border-0 sm:bg-transparent sm:shadow-none"
                  aria-label="Exemple de téléphone"
                />
                <a routerLink="/souscription" class="cie-btn-primary shrink-0 text-center sm:rounded-xl">
                  Commencer
                </a>
              </div>
            </div>
            <a routerLink="/suivi" class="mt-4 inline-block text-sm font-medium text-[#2d6a4f] no-underline hover:underline">
              J'ai déjà un code de suivi →
            </a>
          </div>

          <div class="lg:pl-8" appScrollReveal revealAnimation="slide-right" [revealDelay]="150">
            <app-hero-visual />
          </div>
        </div>

        <div class="mt-16 border-t border-[#e8edf2] pt-10" appScrollReveal revealAnimation="fade-in" [revealDelay]="200">
          <p class="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">Canaux de paiement & partenaires</p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
            @for (partner of partners; track partner) {
              <span class="text-sm font-bold tracking-tight text-slate-600">{{ partner }}</span>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Bénéfices -->
    <section class="bg-[#f4f7f9] py-16 sm:py-20">
      <div class="cie-container">
        <div class="mx-auto max-w-2xl text-center" appScrollReveal>
          <span class="cie-section-label">Bénéfices</span>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-[#0a2e36] sm:text-4xl">Tout pour votre foyer</h2>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-3">
          @for (card of benefitCards; track card.title; let i = $index) {
            <article
              class="cie-card group !p-0 overflow-hidden"
              appScrollReveal
              revealAnimation="fade-up"
              [revealDelay]="i * 100"
            >
              <app-section-card-image
                [image]="card.image"
                [fallback]="card.fallback"
                [alt]="card.alt"
                [embedded]="true"
              />
              <p class="px-6 pb-6 font-semibold leading-relaxed text-[#0a2e36]">{{ card.title }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Bento -->
    <section class="py-16 sm:py-20">
      <div class="cie-container">
        <div class="grid gap-6 lg:grid-cols-12">
          <div class="cie-card lg:col-span-5 lg:flex lg:flex-col lg:justify-between" appScrollReveal revealAnimation="slide-left">
            <div>
              <p class="text-5xl font-extrabold text-[#e85d04]">10 ans</p>
              <p class="mt-2 text-lg font-semibold text-[#0a2e36]">de remboursement flexible</p>
              <p class="mt-3 text-sm leading-relaxed text-slate-600">
                Facilités de paiement adaptées aux zones rurales et urbaines, sans caution à l'abonnement.
              </p>
            </div>
            <a routerLink="/pept" class="mt-6 inline-flex text-sm font-semibold text-[#e85d04] no-underline hover:underline">
              Voir les offres →
            </a>
          </div>

          <div class="cie-card relative overflow-hidden lg:col-span-4" appScrollReveal revealAnimation="scale" [revealDelay]="100">
            <p class="text-sm font-semibold text-slate-500">Couverture nationale</p>
            <p class="mt-1 text-2xl font-bold text-[#0a2e36]">Côte d'Ivoire</p>
            <div class="mt-6 flex h-24 items-end gap-2">
              @for (bar of chartBars; track bar; let i = $index) {
                <div
                  class="flex-1 rounded-t-lg transition-all duration-700"
                  [style.height.%]="bar"
                  [class]="i === 3 ? 'bg-[#e85d04]' : 'bg-[#2d6a4f]/30'"
                ></div>
              }
            </div>
            <p class="mt-3 text-xs text-slate-500">Progression des branchements PEPT</p>
          </div>

          <div class="cie-card lg:col-span-3" appScrollReveal revealAnimation="slide-right" [revealDelay]="200">
            <p class="text-sm font-bold text-[#0a2e36]">Avantages clés</p>
            <ul class="mt-4 space-y-3">
              @for (benefit of benefits; track benefit) {
                <li class="flex items-start gap-2 text-sm text-slate-600">
                  <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2d6a4f] text-[10px] text-white">✓</span>
                  {{ benefit }}
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Comment ça marche -->
    <section class="bg-[#0a2e36] py-16 text-white sm:py-20">
      <div class="cie-container">
        <div class="mx-auto max-w-2xl text-center" appScrollReveal revealAnimation="fade-up">
          <span class="text-xs font-bold uppercase tracking-[0.15em] text-[#52b788]">Simple et rapide</span>
          <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Comment ça marche ?</h2>
        </div>
        <div class="mt-14 grid gap-8 sm:grid-cols-3">
          @for (step of steps; track step.num; let i = $index) {
            <div
              class="text-center sm:text-left"
              appScrollReveal
              revealAnimation="fade-up"
              [revealDelay]="i * 120"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-[#e85d04] sm:mx-0">
                {{ step.num }}
              </div>
              <h3 class="mt-5 text-lg font-bold">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ step.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Offres -->
    <section class="bg-[#f4f7f9] py-16 sm:py-20">
      <div class="cie-container">
        <div class="mx-auto max-w-2xl text-center" appScrollReveal>
          <span class="cie-section-label">Tarification</span>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-[#0a2e36]">Choisissez votre offre</h2>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <div class="cie-card flex flex-col" appScrollReveal revealAnimation="slide-left">
            <p class="text-sm font-semibold text-slate-500">Milieu rural & petits centres</p>
            <p class="mt-2 text-3xl font-extrabold text-[#0a2e36]">
              dès <span class="text-[#e85d04]">{{ ruralMin | number }} F</span>
            </p>
            <p class="mt-1 text-sm text-slate-500">/ mois sur 10 ans</p>
            <ul class="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
              <li class="flex gap-2"><span class="text-[#2d6a4f]">✓</span> Kits A0 à A3</li>
              <li class="flex gap-2"><span class="text-[#2d6a4f]">✓</span> Monophasé 5A</li>
              <li class="flex gap-2"><span class="text-[#2d6a4f]">✓</span> Kit installation 1-3 pièces</li>
            </ul>
            <a routerLink="/souscription" class="cie-btn-secondary mt-8 w-full text-center">Souscrire</a>
          </div>

          <div
            class="relative overflow-hidden rounded-3xl bg-[#0a2e36] p-6 text-white shadow-xl shadow-[#0a2e36]/30 sm:p-8"
            appScrollReveal
            revealAnimation="slide-right"
            [revealDelay]="120"
          >
            <div class="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#e85d04]/20 blur-2xl"></div>
            <span class="relative inline-block rounded-full bg-[#e85d04] px-3 py-1 text-xs font-bold">Populaire</span>
            <p class="relative mt-4 text-sm font-semibold text-slate-400">Grands centres urbains</p>
            <p class="relative mt-2 text-3xl font-extrabold">
              {{ urbanPrice | number }} <span class="text-lg font-medium text-slate-400">FCFA TTC</span>
            </p>
            <p class="relative mt-1 text-sm text-[#52b788]">{{ urbanMonthly | number }} F / mois · 5 ans</p>
            <ul class="relative mt-6 space-y-2.5 text-sm text-slate-300">
              <li class="flex gap-2"><span class="text-[#52b788]">✓</span> Kits B00, B5, B10</li>
              <li class="flex gap-2"><span class="text-[#52b788]">✓</span> Installations existantes</li>
              <li class="flex gap-2"><span class="text-[#52b788]">✓</span> 2 kWh gratuits</li>
            </ul>
            <a routerLink="/souscription" class="relative mt-8 flex w-full items-center justify-center rounded-2xl bg-[#e85d04] py-3 text-sm font-semibold text-white no-underline hover:bg-[#d45303]">
              Souscrire maintenant
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 sm:py-20">
      <div class="cie-container">
        <h2 class="text-center text-3xl font-bold tracking-tight text-[#0a2e36]" appScrollReveal> Nos services </h2>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          @for (card of serviceCards; track card.title; let i = $index) {
            <a
              [routerLink]="card.link!"
              class="cie-card group block !p-0 overflow-hidden no-underline"
              appScrollReveal
              revealAnimation="fade-up"
              [revealDelay]="i * 80"
            >
              <app-section-card-image
                [image]="card.image"
                [fallback]="card.fallback"
                [alt]="card.alt"
                [embedded]="true"
              />
              <div class="px-6 pb-6">
                <h3 class="text-lg font-bold text-[#0a2e36]">{{ card.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ card.description }}</p>
                <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#e85d04]">
                  En savoir plus
                  <svg class="h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pb-16 sm:pb-24">
      <div class="cie-container">
        <div
          class="relative overflow-hidden rounded-[2rem] bg-[#0a2e36] px-8 py-14 text-center text-white sm:px-16 sm:py-16"
          appScrollReveal
          revealAnimation="scale"
        >
          <div class="pointer-events-none absolute inset-0 opacity-30" style="background: radial-gradient(circle at 80% 20%, #e85d04 0%, transparent 50%);"></div>
          <div class="relative">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Prêt à vous connecter ?</h2>
            <p class="mx-auto mt-4 max-w-lg text-slate-400">
              Souscription gratuite. Code démo :
              <code class="rounded-lg bg-white/10 px-2 py-0.5 font-mono text-[#52b788]">CIE-DEMO01</code>
            </p>
            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <a routerLink="/souscription" class="cie-btn-primary">Commencer ma souscription</a>
              <a routerLink="/suivi" class="cie-btn-secondary !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">Suivre ma demande</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);

  readonly benefitCards = HOME_BENEFIT_CARDS;
  readonly serviceCards = HOME_SERVICE_CARDS;
  readonly benefits = PROGRAM_BENEFITS;
  readonly chartBars = [45, 62, 55, 88, 70, 78];
  readonly partners = ['Orange Money', 'Moov Money', 'PEPT', 'Agences CIE', 'Ma CIE'];

  readonly ruralMin = RURAL_OFFERS[0].monthlyPayment;
  readonly urbanPrice = URBAN_OFFERS[0].priceTtc;
  readonly urbanMonthly = URBAN_OFFERS[0].monthlyPayment;

  readonly steps = [
    { num: 1, title: 'Souscrivez en ligne', desc: "Remplissez le formulaire d'adhésion avec vos informations et l'offre choisie." },
    { num: 2, title: 'Recevez votre code', desc: 'Un code unique CIE-XXXXXX vous est attribué immédiatement après validation.' },
    { num: 3, title: 'Suivez votre demande', desc: "Consultez l'avancement en temps réel sur la plateforme de suivi." },
  ];

  ngOnInit(): void {
    this.subscriptionService.seedDemoRequest();
  }
}
