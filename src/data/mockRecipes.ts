import type { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Klassischer Lachschinken',
    description: 'Ein zarter, mild gesalzener Schinken aus dem Schweinerücken. Perfekt für das Frühstück.',
    baseWeightGrams: 1000,
    ingredients: [
      { id: 'i1', name: 'Schweinerücken', amount: 1000, unit: 'g', isScalable: true },
      { id: 'i2', name: 'Nitritpökelsalz', amount: 35, unit: 'g', isScalable: true },
      { id: 'i3', name: 'Zucker', amount: 5, unit: 'g', isScalable: true },
      { id: 'i4', name: 'Wacholderbeeren (zerstoßen)', amount: 4, unit: 'Stk', isScalable: true },
      { id: 'i5', name: 'Pfefferkörner (schwarz)', amount: 5, unit: 'g', isScalable: true },
    ],
    phases: [
      {
        id: 'p1',
        title: 'Pökeln',
        description: 'Das Fleisch im Vakuumbeutel oder Gefäß im Kühlschrank pökeln.',
        durationMinutes: 7 * 24 * 60, // 7 Tage
        order: 1
      },
      {
        id: 'p2',
        title: 'Durchbrennen',
        description: 'Fleisch abwaschen, abtrocknen und offen im Kühlschrank hängen oder legen.',
        durationMinutes: 2 * 24 * 60, // 2 Tage
        order: 2
      },
      {
        id: 'p3',
        title: 'Räuchern',
        description: 'Kaltgeräuchert bei max. 20°C in mehreren Gängen.',
        durationMinutes: 12 * 60, // 12 Stunden
        order: 3
      }
    ]
  }
];
