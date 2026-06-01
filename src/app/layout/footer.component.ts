import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="mt-auto border-t border-[#e8edf2] bg-white">
      <div class="cie-container py-14">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-4">
            <a routerLink="/" class="inline-flex items-center gap-2.5 no-underline">
              <div class="flex h-9 w-9 overflow-hidden rounded-xl shadow-md">
                <span class="flex w-1/2 items-center justify-center bg-[#e85d04] text-xs font-extrabold text-white">C</span>
                <span class="flex w-1/2 items-center justify-center bg-[#2d6a4f] text-xs font-extrabold text-white">IE</span>
              </div>
              <span class="text-base font-bold text-[#0a2e36]">CIE</span>
            </a>
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              L'énergie au service du développement. Plateforme usagers — démonstration.
            </p>
          </div>

          <div class="lg:col-span-2">
            <h3 class="text-sm font-bold text-[#0a2e36]">Services</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a routerLink="/pept" class="text-slate-500 no-underline hover:text-[#e85d04]">Programme PEPT</a></li>
              <li><a routerLink="/services" class="text-slate-500 no-underline hover:text-[#e85d04]">Recharge prépayée</a></li>
              <li><a routerLink="/services" fragment="credit" class="text-slate-500 no-underline hover:text-[#e85d04]">Crédit branchement</a></li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <h3 class="text-sm font-bold text-[#0a2e36]">Usagers</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li><a routerLink="/souscription" class="text-slate-500 no-underline hover:text-[#e85d04]">Souscription</a></li>
              <li><a routerLink="/suivi" class="text-slate-500 no-underline hover:text-[#e85d04]">Suivi de demande</a></li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <h3 class="text-sm font-bold text-[#0a2e36]">Entreprise</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="https://www.cie.ci/" target="_blank" rel="noopener" class="text-slate-500 no-underline hover:text-[#e85d04]">Site officiel</a>
              </li>
              <li><span class="text-slate-400">Mentions légales</span></li>
              <li><span class="text-slate-400">Données personnelles</span></li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <h3 class="text-sm font-bold text-[#0a2e36]">Contact</h3>
            <p class="mt-4 text-sm leading-relaxed text-slate-500">
              1, Av. Christiani<br />Treichville, Abidjan
            </p>
            <a href="tel:+2252721233300" class="mt-2 inline-block text-sm font-semibold text-[#e85d04] no-underline">
              (+225) 27 21 23 33 00
            </a>
          </div>
        </div>

        <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e8edf2] pt-8 sm:flex-row">
          <p class="text-xs text-slate-400">© {{ year }} CIE — Démonstration technique</p>
          <p class="rounded-full bg-[#f4f7f9] px-4 py-1.5 text-xs text-slate-500">Prototype · données locales</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
