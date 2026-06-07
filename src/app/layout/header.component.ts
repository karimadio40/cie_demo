import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-[#e8edf2]/80 bg-white/90 backdrop-blur-xl">
      <div class="cie-container">
        <div class="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[4.5rem]">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2.5 no-underline">
            <img src="logo1.webp" alt="CIE" width="120" height="50" />
            <!-- <img src="logo.jpeg" alt="CIE" width="120" height="50" /> -->
          </a>

          <!-- Nav centre (desktop) -->
          <nav class="hidden items-center justify-center gap-1 md:flex" aria-label="Navigation principale">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="bg-[#f4f7f9] text-[#0a2e36] font-semibold"
                [routerLinkActiveOptions]="{ exact: link.exact }"
                class="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 no-underline hover:bg-[#f4f7f9] hover:text-[#0a2e36]"
              >
                {{ link.label }}
              </a>
            }
          </nav>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-2">
            <a
              routerLink="/agent/demandes"
              routerLinkActive="!bg-[#0a2e36] !text-white"
              class="hidden items-center gap-1.5 rounded-xl border border-[#0a2e36]/15 bg-[#0a2e36]/5 px-3 py-2 text-xs font-semibold text-[#0a2e36] no-underline transition hover:bg-[#0a2e36]/10 lg:inline-flex"
              title="Espace agent CIE"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Agent
            </a>
            <a routerLink="/suivi" class="cie-btn-ghost hidden sm:inline-flex">Suivi</a>
            <a routerLink="/souscription" class="cie-btn-primary hidden px-5 py-2.5 sm:inline-flex">
              Souscrire
            </a>
            <button
              type="button"
              class="inline-flex rounded-xl p-2.5 text-slate-600 hover:bg-[#f4f7f9] md:hidden"
              (click)="menuOpen = !menuOpen"
              [attr.aria-expanded]="menuOpen"
              aria-label="Menu"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                @if (menuOpen) {
                  <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
                } @else {
                  <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      @if (menuOpen) {
        <nav class="border-t border-[#e8edf2] bg-white px-4 py-4 md:hidden" aria-label="Navigation mobile">
          @for (link of navLinks; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="font-semibold text-[#e85d04]"
              [routerLinkActiveOptions]="{ exact: link.exact }"
              class="block rounded-xl px-4 py-3 text-sm text-slate-700 no-underline hover:bg-[#f4f7f9]"
              (click)="menuOpen = false"
            >
              {{ link.label }}
            </a>
          }
          <div class="mt-3 flex flex-col gap-2 border-t border-[#e8edf2] pt-3">
            <a routerLink="/agent/demandes" class="cie-btn-secondary text-center !border-[#0a2e36]/20 !text-[#0a2e36]" (click)="menuOpen = false">
              Espace agent CIE
            </a>
            <a routerLink="/suivi" class="cie-btn-secondary text-center" (click)="menuOpen = false">Suivre ma demande</a>
            <a routerLink="/souscription" class="cie-btn-primary text-center" (click)="menuOpen = false">Souscrire</a>
          </div>
        </nav>
      }
    </header>
  `,
})
export class HeaderComponent {
  menuOpen = false;

  readonly navLinks = [
    { path: '/', label: 'Accueil', exact: true },
    { path: '/services', label: 'Services', exact: false },
    { path: '/pept', label: 'PEPT', exact: false },
  ];
}
