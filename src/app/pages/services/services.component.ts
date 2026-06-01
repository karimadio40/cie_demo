import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RECHARGE_STEPS } from '../../core/data/pept-offers';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  template: `
    <div class="cie-page-hero">
      <div class="cie-container">
        <span class="cie-section-label">Usagers</span>
        <h1 class="cie-page-title mt-3">Nos services</h1>
        <p class="mt-3 max-w-xl text-lg text-slate-600">
          Recharge prépayée, crédit branchement et accompagnement pour gérer votre énergie au quotidien.
        </p>
      </div>
    </div>

    <div class="cie-container space-y-16 py-14 sm:py-20">
      <section id="recharge">
        <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 class="text-2xl font-bold tracking-tight text-[#0a2e36]">Recharge d'énergie prépayée</h2>
            <p class="mt-3 text-slate-600">Disponible en agence CIE, chez les tiers et par mobile.</p>

            <div class="mt-8 space-y-3">
              <div class="flex items-center justify-between rounded-2xl border border-[#e8edf2] bg-white px-5 py-4 shadow-sm">
                <span class="font-semibold text-[#0a2e36]">Orange</span>
                <span class="font-mono text-lg font-bold text-[#e85d04]">#144*418#</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-[#e8edf2] bg-white px-5 py-4 shadow-sm">
                <span class="font-semibold text-[#0a2e36]">Moov</span>
                <span class="font-mono text-lg font-bold text-[#2d6a4f]">*155*4*1*2#</span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            @for (step of rechargeSteps; track step; let i = $index) {
              <div class="flex gap-4 rounded-2xl border border-[#e8edf2] bg-[#f4f7f9] p-4">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0a2e36] text-sm font-bold text-white">{{ i + 1 }}</span>
                <span class="pt-1.5 text-sm text-slate-700">{{ step }}</span>
              </div>
            }
          </div>
        </div>
      </section>

      <section id="credit" class="scroll-mt-24">
        <div class="rounded-[2rem] bg-[#0a2e36] p-8 text-white sm:p-10">
          <span class="text-xs font-bold uppercase tracking-widest text-[#52b788]">Financement</span>
          <h2 class="mt-2 text-2xl font-bold sm:text-3xl">Le crédit branchement</h2>
          <p class="mt-4 max-w-2xl leading-relaxed text-slate-400">
            Solde entre l'acompte et le montant total du branchement, remboursable sur <strong class="text-white">3 à 10 ans</strong>.
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-white/5 p-5">
              <h3 class="font-bold text-[#52b788]">Modes de règlement</h3>
              <ul class="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Déductions sur achats d'énergie</li>
                <li>• Paiements progressifs</li>
              </ul>
            </div>
            <div class="rounded-2xl bg-white/5 p-5">
              <h3 class="font-bold text-[#52b788]">Mobile Money</h3>
              <ul class="mt-3 space-y-2 text-sm">
                <li class="flex justify-between"><span class="text-slate-400">Orange</span><span class="font-mono font-bold">#144*418*2#</span></li>
                <li class="flex justify-between"><span class="text-slate-400">Moov</span><span class="font-mono font-bold">*155*4*1*3#</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div class="text-center">
        <a routerLink="/souscription" class="cie-btn-primary">Souscrire au programme PEPT</a>
      </div>
    </div>
  `,
})
export class ServicesComponent {
  readonly rechargeSteps = RECHARGE_STEPS;
}
