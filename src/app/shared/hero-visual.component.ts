import { Component, signal } from '@angular/core';
import { PEPT_IMAGES } from '../core/data/pept-images';

@Component({
  selector: 'app-hero-visual',
  template: `
    <div class="hero-visual relative mx-auto w-full max-w-lg lg:max-w-none">
      <div class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#e85d04]/25 via-transparent to-[#2d6a4f]/25 blur-3xl"></div>

      <!-- Photo principale PEPT -->
      <div class="relative overflow-hidden rounded-[2rem] border border-[#e8edf2] shadow-2xl shadow-[#0a2e36]/15">
        <img
          [src]="heroSrc()"
          alt="Programme Électricité Pour Tous — CIE"
          class="hero-photo block aspect-[4/3] w-full object-cover"
          (error)="onHeroError()"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a2e36]/80 via-[#0a2e36]/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span class="inline-block rounded-full bg-[#e85d04] px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Souscription gratuite
          </span>
          <p class="mt-2 text-lg font-bold leading-tight">Programme Électricité Pour Tous</p>
        </div>
      </div>

      <!-- Miniature brochure -->
      <div
        class="absolute -bottom-5 -left-4 z-10 w-[42%] overflow-hidden rounded-2xl border-2 border-white shadow-xl sm:-left-8 sm:w-[38%]"
      >
        <img
          [src]="brochureSrc()"
          alt="Brochure PEPT"
          class="hero-photo block aspect-[4/3] w-full object-cover"
          (error)="onBrochureError()"
        />
      </div>

      <!-- Carte suivi flottante -->
      <div
        class="absolute -right-3 top-6 z-20 w-[58%] rounded-2xl border border-[#e8edf2] bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:-right-6 sm:w-[52%] sm:p-5"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="truncate text-[10px] font-medium text-slate-500">Suivi de demande</p>
            <p class="font-mono text-sm font-bold text-[#e85d04] sm:text-base">CIE-DEMO01</p>
          </div>
          <span class="shrink-0 rounded-full bg-[#2d6a4f]/10 px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">En analyse</span>
        </div>
        <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f4f7f9]">
          <div class="h-full w-2/5 rounded-full bg-gradient-to-r from-[#e85d04] to-[#2d6a4f]"></div>
        </div>
        <p class="mt-3 text-[10px] text-slate-500 sm:text-xs">Kit B5 · Zone urbaine</p>
      </div>

      <!-- Badge kWh -->
      <div
        class="absolute -top-3 right-8 z-20 rounded-2xl bg-[#e85d04] px-3 py-2 text-xs font-bold text-white shadow-lg sm:right-12"
      >
        + 2 kWh offerts
      </div>
    </div>
  `,
})
export class HeroVisualComponent {
  readonly images = PEPT_IMAGES;

  private readonly heroUseFallback = signal(false);
  private readonly brochureUseFallback = signal(false);

  heroSrc = () =>
    this.heroUseFallback() ? this.images.heroFallback : this.images.hero;

  brochureSrc = () =>
    this.brochureUseFallback() ? this.images.brochureFallback : this.images.brochure;

  onHeroError(): void {
    if (!this.heroUseFallback()) {
      this.heroUseFallback.set(true);
    }
  }

  onBrochureError(): void {
    if (!this.brochureUseFallback()) {
      this.brochureUseFallback.set(true);
    }
  }
}
