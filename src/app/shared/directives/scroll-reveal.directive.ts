import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  /** Délai en ms avant l'animation */
  readonly revealDelay = input(0);
  /** fade-up | fade-in | scale | slide-left | slide-right */
  readonly revealAnimation = input('fade-up');

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add('scroll-reveal--visible');
      return;
    }

    const node = this.el.nativeElement;
    node.classList.add('scroll-reveal', `scroll-reveal--${this.revealAnimation()}`);

    const delay = this.revealDelay();
    if (delay > 0) {
      node.style.transitionDelay = `${delay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('scroll-reveal--visible');
          this.observer?.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
