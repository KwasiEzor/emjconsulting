import { db, schema } from './api/db/client.js';
import { sql } from 'drizzle-orm';

// Delete all corrupted services
await db.delete(schema.services);
console.log('✓ Deleted corrupted services');

// Insert proper service data
const services = [
  {
    titleFr: 'Visa Touristique',
    titleEn: 'Tourist Visa',
    descriptionFr: 'Obtenez votre visa touristique rapidement et facilement pour découvrir le monde.',
    descriptionEn: 'Get your tourist visa quickly and easily to explore the world.',
    icon: '✈️',
    slug: 'visa-touristique',
    benefits: {
      fr: ['Traitement rapide', 'Accompagnement personnalisé', 'Taux de réussite élevé'],
      en: ['Fast processing', 'Personal support', 'High success rate']
    },
    process: [
      { titleFr: 'Consultation', titleEn: 'Consultation' },
      { titleFr: 'Préparation', titleEn: 'Preparation' },
      { titleFr: 'Soumission', titleEn: 'Submission' }
    ],
    featured: true,
    order: 1
  },
  {
    titleFr: 'Visa Étudiant',
    titleEn: 'Student Visa',
    descriptionFr: 'Poursuivez vos études à l\'étranger avec notre accompagnement complet pour l\'obtention de votre visa étudiant.',
    descriptionEn: 'Pursue your studies abroad with our comprehensive support for obtaining your student visa.',
    icon: '🎓',
    slug: 'visa-etudiant',
    benefits: {
      fr: ['Aide au choix de l\'établissement', 'Préparation du dossier académique', 'Suivi personnalisé'],
      en: ['Help choosing institution', 'Academic file preparation', 'Personal follow-up']
    },
    process: [
      { titleFr: 'Consultation', titleEn: 'Consultation' },
      { titleFr: 'Préparation', titleEn: 'Preparation' },
      { titleFr: 'Soumission', titleEn: 'Submission' }
    ],
    featured: true,
    order: 2
  },
  {
    titleFr: 'Visa Affaires',
    titleEn: 'Business Visa',
    descriptionFr: 'Développez vos activités professionnelles à l\'international avec notre service de visa d\'affaires.',
    descriptionEn: 'Develop your professional activities internationally with our business visa service.',
    icon: '💼',
    slug: 'visa-affaires',
    benefits: {
      fr: ['Traitement prioritaire', 'Support multilingue', 'Expertise sectorielle'],
      en: ['Priority processing', 'Multilingual support', 'Sector expertise']
    },
    process: [
      { titleFr: 'Consultation', titleEn: 'Consultation' },
      { titleFr: 'Préparation', titleEn: 'Preparation' },
      { titleFr: 'Soumission', titleEn: 'Submission' }
    ],
    featured: true,
    order: 3
  },
  {
    titleFr: 'Regroupement Familial',
    titleEn: 'Family Reunification',
    descriptionFr: 'Rejoignez vos proches à l\'étranger grâce à notre expertise en regroupement familial.',
    descriptionEn: 'Join your loved ones abroad with our family reunification expertise.',
    icon: '👨‍👩‍👧‍👦',
    slug: 'regroupement-familial',
    benefits: {
      fr: ['Accompagnement familial', 'Dossier complet', 'Conseil juridique'],
      en: ['Family support', 'Complete file', 'Legal advice']
    },
    process: [
      { titleFr: 'Consultation', titleEn: 'Consultation' },
      { titleFr: 'Préparation', titleEn: 'Preparation' },
      { titleFr: 'Soumission', titleEn: 'Submission' }
    ],
    featured: false,
    order: 4
  },
  {
    titleFr: 'Assistance Administrative',
    titleEn: 'Administrative Assistance',
    descriptionFr: 'Nous vous accompagnons dans toutes vos démarches administratives de voyage.',
    descriptionEn: 'We assist you with all your travel administrative procedures.',
    icon: '📋',
    slug: 'assistance-administrative',
    benefits: {
      fr: ['Gain de temps', 'Expertise administrative', 'Sécurité juridique'],
      en: ['Time saving', 'Administrative expertise', 'Legal security']
    },
    process: [
      { titleFr: 'Consultation', titleEn: 'Consultation' },
      { titleFr: 'Préparation', titleEn: 'Preparation' },
      { titleFr: 'Soumission', titleEn: 'Submission' }
    ],
    featured: false,
    order: 5
  },
  {
    titleFr: 'Billets d\'Avion',
    titleEn: 'Flight Tickets',
    descriptionFr: 'Réservez vos billets d\'avion aux meilleurs tarifs avec notre service de billetterie.',
    descriptionEn: 'Book your flight tickets at the best rates with our ticketing service.',
    icon: '🎫',
    slug: 'billets-avion',
    benefits: {
      fr: ['Meilleurs tarifs', 'Réservation flexible', 'Support 24/7'],
      en: ['Best rates', 'Flexible booking', '24/7 support']
    },
    process: [
      { titleFr: 'Consultation', titleEn: 'Consultation' },
      { titleFr: 'Réservation', titleEn: 'Booking' },
      { titleFr: 'Confirmation', titleEn: 'Confirmation' }
    ],
    featured: false,
    order: 6
  }
];

await db.insert(schema.services).values(services);
console.log('✓ Inserted 6 proper services');

// Verify
const count = await db.select({ count: sql`count(*)` }).from(schema.services);
console.log(`✓ Services table now has ${count[0].count} records`);

process.exit(0);
