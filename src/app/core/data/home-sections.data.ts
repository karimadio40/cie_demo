import { PEPT_HIGHLIGHTS } from './pept-offers';

export interface SectionCard {
  title: string;
  description?: string;
  image: string;
  fallback: string;
  alt: string;
  link?: string;
}

/** Section « Tout pour votre foyer » */
export const HOME_BENEFIT_CARDS: SectionCard[] = [
  {
    title: PEPT_HIGHLIGHTS[0],
    image: 'https://tse1.explicit.bing.net/th/id/OIF.bQy3WqVjAlCcld91KMl0RA?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    fallback: '/assets/images/benefit-kit.svg',
    alt: 'Kit d\'installation intérieure pour appartements 1, 2 et 3 pièces',
  },
  {
    title: PEPT_HIGHLIGHTS[1],
    image: 'https://tse2.mm.bing.net/th/id/OIP.haezXaioRZJE4v2mIYf5oAHaEi?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    fallback: '/assets/images/benefit-branchement.svg',
    alt: 'Branchement et abonnement au réseau CIE',
  },
  {
    title: PEPT_HIGHLIGHTS[2],
    image: 'https://tse4.mm.bing.net/th/id/OIP.FJXjVPqLnnyLY8MQzjbWrwHaE6?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    fallback: '/assets/images/benefit-kwh.svg',
    alt: '2 kilowattheures offerts à l\'activation',
  },
];

/** Section « Nos services » */
export const HOME_SERVICE_CARDS: SectionCard[] = [
  {
    title: 'Programme PEPT',
    description: 'Branchement et abonnement avec facilités de paiement sur plusieurs années.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.FJXjVPqLnnyLY8MQzjbWrwHaE6?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    fallback: '/assets/images/service-pept.svg',
    alt: 'Programme Électricité Pour Tous — CIE',
    link: '/pept',
  },
  {
    title: 'Recharge prépayée',
    description: 'Orange, Moov ou agences CIE — codes USSD intégrés.',
    image: 'https://www.orange.ci/particuliers/resources/img/VisuelPromoFactures.png',
    fallback: '/assets/images/service-recharge.svg',
    alt: 'Achat de recharge d\'énergie prépayée',
    link: '/services',
  },
  {
    title: 'Crédit branchement',
    description: 'Remboursement par déduction ou paiement progressif.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.oYjoUhoGwGHR_hWI4ZaWRgHaE8?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    fallback: '/assets/images/service-credit.svg',
    alt: 'Remboursement du crédit branchement',
    link: '/services',
  },
];
