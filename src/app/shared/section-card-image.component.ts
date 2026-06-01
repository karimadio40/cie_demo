import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-section-card-image',
  template: `
    <div
      class="aspect-[16/10] overflow-hidden bg-[#f4f7f9]"
      [class]="embedded() ? '' : 'mb-5 rounded-2xl border border-[#e8edf2] shadow-sm'"
    >
      <img
        [src]="currentSrc()"
        [alt]="alt()"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
        (error)="onError()"
      />
    </div>
  `,
})
export class SectionCardImageComponent {
  readonly image = input.required<string>();
  readonly fallback = input.required<string>();
  readonly alt = input.required<string>();
  /** Image pleine largeur dans une carte (sans marge ni bordure) */
  readonly embedded = input(false);

  private readonly useFallback = signal(false);

  currentSrc = () => (this.useFallback() ? this.fallback() : this.image());

  onError(): void {
    if (!this.useFallback()) {
      this.useFallback.set(true);
    }
  }
}
