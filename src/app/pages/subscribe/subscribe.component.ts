import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RURAL_OFFERS, URBAN_OFFERS } from '../../core/data/pept-offers';
import {
  ID_DOCUMENT_LABELS,
  IdDocumentType,
  LocationType,
  SubscriptionRequest,
} from '../../core/models/subscription.model';
import { SubscriptionService } from '../../core/services/subscription.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  template: `
    <div class="cie-page-hero">
      <div class="cie-container max-w-3xl">
        <span class="cie-section-label">Adhésion</span>
        <h1 class="cie-page-title mt-3">Formulaire de souscription</h1>
        <p class="mt-3 text-lg text-slate-600">Souscription gratuite — recevez votre code de suivi à la validation.</p>
      </div>
    </div>

    <div class="cie-container max-w-3xl pb-20 pt-10">
      @if (submitted()) {
        <div class="cie-card border-2 border-[#2d6a4f]/30 bg-gradient-to-b from-[#f4f7f9] to-white p-10 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2d6a4f] text-3xl text-white shadow-lg shadow-[#2d6a4f]/30">✓</div>
          <h2 class="mt-5 text-2xl font-bold text-[#0a2e36]">Demande enregistrée !</h2>
          <p class="mt-2 text-slate-600">Conservez précieusement votre code :</p>
          <p class="mt-5 font-mono text-4xl font-extrabold tracking-wider text-[#e85d04]">{{ result()?.trackingCode }}</p>
          <p class="mt-4 text-sm text-slate-500">Utilisez ce code sur la page de suivi.</p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a [routerLink]="['/suivi']" [queryParams]="{ code: result()?.trackingCode }" class="cie-btn-primary">Voir le suivi</a>
            <a routerLink="/" class="cie-btn-secondary">Retour à l'accueil</a>
          </div>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <fieldset class="cie-card">
            <legend class="text-lg font-bold text-[#0a2e36]">Identité du demandeur</legend>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-slate-700" for="nom">Nom *</label>
                <input id="nom" formControlName="nom" class="cie-input" placeholder="Kouassi" />
                @if (form.controls.nom.touched && form.controls.nom.invalid) {
                  <p class="mt-1 text-xs text-red-600">Le nom est requis</p>
                }
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="prenoms">Prénoms *</label>
                <input id="prenoms" formControlName="prenoms" class="cie-input" placeholder="Aya Marie" />
              </div>
            </div>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="telephone">Téléphone *</label>
                <input id="telephone" formControlName="telephone" type="tel" class="cie-input" placeholder="+225 07 00 00 00 00" />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="email">E-mail (optionnel)</label>
                <input id="email" formControlName="email" type="email" class="cie-input" placeholder="exemple@email.ci" />
              </div>
            </div>
          </fieldset>

          <!-- Localisation -->
          <fieldset class="cie-card">
            <legend class="text-lg font-bold text-[#0a2e36]">Localisation du logement</legend>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="commune">Commune *</label>
                <input id="commune" formControlName="commune" class="cie-input" placeholder="Yopougon" />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="quartier">Quartier *</label>
                <input id="quartier" formControlName="quartier" class="cie-input" placeholder="Siporex" />
              </div>
            </div>
          </fieldset>

          <!-- Pièce d'identité -->
          <fieldset class="cie-card">
            <legend class="text-lg font-bold text-[#0a2e36]">Pièce d'identité</legend>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="typePiece">Type de pièce *</label>
                <select id="typePiece" formControlName="typePiece" class="cie-input">
                  @for (entry of idDocEntries; track entry[0]) {
                    <option [value]="entry[0]">{{ entry[1] }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700" for="numeroPiece">Numéro *</label>
                <input id="numeroPiece" formControlName="numeroPiece" class="cie-input" />
              </div>
            </div>
          </fieldset>

          <!-- Offre -->
          <fieldset class="cie-card">
            <legend class="text-lg font-bold text-[#0a2e36]">Offre PEPT</legend>
            <div class="mt-4">
              <label class="mb-2 block text-sm font-medium text-gray-700">Zone *</label>
              <div class="flex gap-3">
                <label class="flex flex-1 cursor-pointer items-center gap-2 rounded-2xl border border-[#e8edf2] px-4 py-3 has-[:checked]:border-[#e85d04] has-[:checked]:bg-orange-50">
                  <input type="radio" formControlName="locationType" value="rural" />
                  <span class="text-sm">Rural / petit centre</span>
                </label>
                <label class="flex flex-1 cursor-pointer items-center gap-2 rounded-2xl border border-[#e8edf2] px-4 py-3 has-[:checked]:border-[#2d6a4f] has-[:checked]:bg-green-50">
                  <input type="radio" formControlName="locationType" value="urbain" />
                  <span class="text-sm">Grand centre urbain</span>
                </label>
              </div>
            </div>
            <div class="mt-4">
              <label class="mb-1 block text-sm font-medium text-gray-700" for="offreKit">Kit choisi *</label>
              <select id="offreKit" formControlName="offreKit" class="cie-input">
                @for (offer of availableOffers(); track offer.kit) {
                  <option [value]="offer.kit">
                    Kit {{ offer.kit }} — {{ offer.priceTtc | number }} FCFA ({{ offer.monthlyPayment | number }} F/mois)
                  </option>
                }
              </select>
            </div>
            <label class="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/80 p-4">
              <input type="checkbox" formControlName="paiementComptant" class="mt-1" />
              <span class="text-sm text-gray-700">
                Je souhaite payer l'intégralité de l'offre à la souscription (sans intérêts de crédit)
              </span>
            </label>
          </fieldset>

          <fieldset class="cie-card">
            <label class="mb-1 block text-sm font-medium text-gray-700" for="message">Message complémentaire</label>
            <textarea id="message" formControlName="message" rows="3" class="cie-input" placeholder="Informations utiles pour l'équipe..."></textarea>
          </fieldset>

          <label class="flex items-start gap-3 rounded-2xl bg-[#f4f7f9] p-4 text-sm text-slate-600">
            <input type="checkbox" formControlName="consent" class="mt-1 rounded" />
            <span>
              J'accepte le traitement de mes données pour ma demande PEPT.
              <em class="text-slate-400">(Démo — stockage local)</em>
            </span>
          </label>

          @if (error()) {
            <p class="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{{ error() }}</p>
          }

          <button
            type="submit"
            [disabled]="form.invalid || loading()"
            class="cie-btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ loading() ? 'Envoi en cours...' : 'Soumettre ma demande' }}
          </button>
        </form>
      }
    </div>
  `,
})
export class SubscribeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly subscriptionService = inject(SubscriptionService);

  readonly submitted = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly result = signal<SubscriptionRequest | null>(null);

  readonly idDocEntries = Object.entries(ID_DOCUMENT_LABELS) as [IdDocumentType, string][];

  readonly form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenoms: ['', Validators.required],
    telephone: ['', [Validators.required, Validators.minLength(8)]],
    email: [''],
    commune: ['', Validators.required],
    quartier: ['', Validators.required],
    typePiece: ['cni' as IdDocumentType, Validators.required],
    numeroPiece: ['', Validators.required],
    locationType: ['rural' as LocationType, Validators.required],
    offreKit: ['A1', Validators.required],
    paiementComptant: [false],
    message: [''],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    this.form.controls.locationType.valueChanges.subscribe((zone) => {
      const offers = zone === 'rural' ? RURAL_OFFERS : URBAN_OFFERS;
      this.form.controls.offreKit.setValue(offers[0].kit);
    });
  }

  availableOffers() {
    return this.form.controls.locationType.value === 'rural' ? RURAL_OFFERS : URBAN_OFFERS;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    const v = this.form.getRawValue();
    try {
      const request = this.subscriptionService.submit({
        nom: v.nom,
        prenoms: v.prenoms,
        telephone: v.telephone,
        email: v.email || undefined,
        commune: v.commune,
        quartier: v.quartier,
        typePiece: v.typePiece,
        numeroPiece: v.numeroPiece,
        locationType: v.locationType,
        offreKit: v.offreKit,
        paiementComptant: v.paiementComptant,
        message: v.message || undefined,
      });
      this.result.set(request);
      this.submitted.set(true);
    } catch {
      this.error.set('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      this.loading.set(false);
    }
  }
}
