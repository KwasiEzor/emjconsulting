import { db } from './client.js';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...\n');

  try {
    // Get or create services table data using raw SQL
    console.log('📋 Seeding services...');
    await db.execute(sql`
      INSERT INTO services (id, title, description, icon, featured, created_at)
      VALUES
        (gen_random_uuid(), 'Visa Tourisme', 'Assistance complète pour l''obtention de visas touristiques vers plus de 30 destinations. Préparation du dossier, prise de rendez-vous et suivi personnalisé.', 'plane', 'true', now()),
        (gen_random_uuid(), 'Visa Étudiant', 'Accompagnement des étudiants dans leurs démarches de visa pour études à l''étranger. Conseils sur les universités, bourses et procédures d''admission.', 'graduation-cap', 'true', now()),
        (gen_random_uuid(), 'Visa Affaires', 'Solutions rapides pour professionnels : visa d''affaires, missions commerciales et déplacements corporate. Service premium disponible.', 'briefcase', 'true', now()),
        (gen_random_uuid(), 'Regroupement Familial', 'Expertise en procédures de regroupement familial et visa conjoint. Dossiers complexes traités avec soin et confidentialité.', 'users', 'false', now()),
        (gen_random_uuid(), 'Billets d''Avion', 'Réservation de billets d''avion aux meilleurs tarifs. Partenariats avec 50+ compagnies aériennes internationales.', 'ticket', 'false', now()),
        (gen_random_uuid(), 'Assurance Voyage', 'Assurances voyage adaptées aux exigences consulaires. Couverture médicale, rapatriement et annulation.', 'shield-check', 'false', now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('🌍 Seeding destinations...');
    await db.execute(sql`
      INSERT INTO destinations (id, name, description, image_url, featured, created_at)
      VALUES
        (gen_random_uuid(), 'Canada', 'Visa touristique, études et résidence permanente. Procédure en ligne simplifiée via AVE ou permis d''études.', '/images/dest-canada.jpg', 'true', now()),
        (gen_random_uuid(), 'France', 'Visa Schengen court séjour (90 jours) et long séjour. Expertise sur visas étudiants et professionnels.', '/images/dest-france.jpg', 'true', now()),
        (gen_random_uuid(), 'États-Unis', 'Visa B1/B2 tourisme et affaires, visa F1 étudiant. Préparation à l''entretien consulaire incluse.', '/images/dest-usa.jpg', 'true', now()),
        (gen_random_uuid(), 'Royaume-Uni', 'Standard Visitor Visa et Student Visa. Accompagnement post-Brexit et nouveaux systèmes en ligne.', '/images/dest-uk.jpg', 'true', now()),
        (gen_random_uuid(), 'Dubaï (EAU)', 'Visa touristique 30/90 jours, visa investisseur et Golden Visa. Traitement rapide en 48-72h.', '/images/dest-dubai.jpg', 'false', now()),
        (gen_random_uuid(), 'Australie', 'eVisitor et visa Working Holiday. Services pour étudiants internationaux et skilled migration.', '/images/dest-canada.jpg', 'false', now()),
        (gen_random_uuid(), 'Allemagne', 'Visa Schengen et permis de résidence. Spécialisation visa job seeker et Blue Card EU.', '/images/dest-allemagne.jpg', 'false', now()),
        (gen_random_uuid(), 'Espagne', 'Visa Schengen et visa non-lucratif. Accompagnement pour Golden Visa investisseur.', '/images/dest-espagne.jpg', 'false', now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('💬 Seeding testimonials...');
    await db.execute(sql`
      INSERT INTO testimonials (id, name, role, content, image_url, rating, created_at)
      VALUES
        (gen_random_uuid(), 'Amadou Diallo', 'Entrepreneur, Dakar', 'EMJ-Consulting m''a aidé à obtenir mon visa d''affaires pour la France en moins de 15 jours. Service professionnel et réactif. Je recommande vivement !', '/images/avatar-1.jpg', '5', now()),
        (gen_random_uuid(), 'Fatou Ndiaye', 'Étudiante, destination Canada', 'Grâce à leur expertise, j''ai obtenu mon visa étudiant pour le Canada du premier coup. L''équipe m''a guidée à chaque étape. Merci infiniment !', '/images/avatar-2.jpg', '5', now()),
        (gen_random_uuid(), 'Jean-Marc Kouassi', 'Cadre bancaire, Abidjan', 'Excellent service ! Mon visa Schengen a été approuvé rapidement. L''équipe connaît parfaitement les procédures consulaires.', '/images/avatar-3.jpg', '5', now()),
        (gen_random_uuid(), 'Aïcha Bamba', 'Médecin, destination Allemagne', 'EMJ-Consulting a traité mon dossier de visa professionnel avec beaucoup de soin. Communication claire et délais respectés.', '/images/avatar-4.jpg', '5', now()),
        (gen_random_uuid(), 'Moussa Traoré', 'Commerçant, destination Dubaï', 'Service impeccable ! Visa obtenu en 3 jours pour Dubaï. Prix transparent et équipe très disponible.', '/images/avatar-5.jpg', '5', now()),
        (gen_random_uuid(), 'Sophie Mensah', 'Enseignante, destination UK', 'Après un premier refus, EMJ-Consulting a repris mon dossier et j''ai obtenu mon visa UK. Professionnalisme remarquable.', '/images/avatar-5.jpg', '5', now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('📝 Seeding blog posts...');
    await db.execute(sql`
      INSERT INTO blog_posts (id, title, slug, excerpt, content, author, image_url, published, created_at)
      VALUES
        (gen_random_uuid(),
         'Comment préparer son dossier de visa Schengen en 2026',
         'preparer-dossier-visa-schengen-2026',
         'Guide complet pour constituer un dossier de visa Schengen solide et augmenter vos chances d''approbation.',
         '<h2>Documents requis</h2><p>Pour un visa Schengen, vous devez fournir : passeport valide 3 mois après le retour, photos d''identité récentes, attestation d''assurance voyage, justificatifs financiers, réservation d''hébergement et billet d''avion.</p><h2>Conseils pratiques</h2><p>Anticipez votre demande 3 mois avant le départ. Vérifiez que tous les documents sont traduits si nécessaire. Préparez une lettre de motivation claire expliquant l''objet de votre voyage.</p>',
         'Marie Kouadio',
         '/images/blog-1.jpg',
         'true',
         now()),
        (gen_random_uuid(),
         'Visa étudiant Canada : Les 5 erreurs à éviter',
         'visa-etudiant-canada-erreurs',
         'Découvrez les erreurs fréquentes qui causent le refus de visa étudiant canadien et comment les éviter.',
         '<h2>Erreur #1 : Preuve de fonds insuffisante</h2><p>Le Canada exige la preuve de 10 000 CAD + frais de scolarité pour la première année.</p><h2>Erreur #2 : Lettre de motivation générique</h2><p>Votre lettre doit être personnalisée et expliquer votre projet d''études de manière convaincante.</p>',
         'Kofi Mensah',
         '/images/blog-2.jpg',
         'true',
         now()),
        (gen_random_uuid(),
         'Visa USA : Réussir son entretien à l''ambassade',
         'reussir-entretien-ambassade-usa',
         'Conseils pratiques pour aborder sereinement votre entretien consulaire américain et maximiser vos chances.',
         '<h2>Avant l''entretien</h2><p>Arrivez 30 minutes à l''avance. Apportez tous vos documents originaux. Habillez-vous de manière professionnelle.</p><h2>Pendant l''entretien</h2><p>Répondez de manière concise et honnête. Démontrez vos attaches avec votre pays d''origine. Restez calme et courtois.</p>',
         'Aminata Sow',
         '/images/blog-3.jpg',
         'true',
         now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('❓ Seeding FAQs...');
    await db.execute(sql`
      INSERT INTO faqs (id, question, answer, category, "order", created_at)
      VALUES
        (gen_random_uuid(), 'Combien de temps faut-il pour obtenir un visa ?', 'Les délais varient selon la destination : 15-20 jours pour le visa Schengen, 4-6 semaines pour le Canada, 3-5 jours pour Dubaï. Nous vous informons des délais précis lors de la consultation.', 'Délais', '1', now()),
        (gen_random_uuid(), 'Quels sont vos tarifs ?', 'Nos tarifs dépendent du type de visa et de la destination. Consultation initiale : 50€. Forfaits visa à partir de 200€ (hors frais consulaires). Devis personnalisé gratuit.', 'Tarifs', '2', now()),
        (gen_random_uuid(), 'Puis-je obtenir un remboursement en cas de refus ?', 'Les frais consulaires ne sont jamais remboursables. Nos honoraires sont remboursables à 50% si le refus est dû à une erreur de notre part (conditions détaillées dans le contrat).', 'Remboursement', '3', now()),
        (gen_random_uuid(), 'Dois-je venir en personne à votre bureau ?', 'Non, nous offrons des consultations en ligne via Zoom ou WhatsApp. Vous pouvez nous envoyer vos documents par email sécurisé. Les rendez-vous physiques sont possibles sur demande.', 'Consultation', '4', now()),
        (gen_random_uuid(), 'Acceptez-vous les paiements échelonnés ?', 'Oui, nous proposons des facilités de paiement en 2 ou 3 fois sans frais pour les dossiers supérieurs à 500€. Paiement par virement, Mobile Money ou carte bancaire.', 'Paiement', '5', now()),
        (gen_random_uuid(), 'Quelle est votre garantie de succès ?', 'Nous avons un taux de réussite de 98% sur l''ensemble de nos dossiers. Nous évaluons gratuitement votre profil avant tout engagement. Si votre dossier est trop risqué, nous vous le signalons honnêtement.', 'Garantie', '6', now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('📧 Seeding subscribers...');
    await db.execute(sql`
      INSERT INTO subscribers (id, email, status, created_at)
      VALUES
        (gen_random_uuid(), 'amadou.fall@example.com', 'active', now()),
        (gen_random_uuid(), 'fatima.diop@example.com', 'active', now()),
        (gen_random_uuid(), 'youssef.kane@example.com', 'active', now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('💼 Seeding sample messages...');
    await db.execute(sql`
      INSERT INTO messages (id, name, email, subject, message, status, created_at)
      VALUES
        (gen_random_uuid(),
         'Ibrahim Touré',
         'ibrahim.toure@example.com',
         'Demande de visa étudiant pour la France',
         'Bonjour, je souhaite obtenir un visa étudiant pour la France. J''ai été accepté à l''Université de Lyon. Pouvez-vous m''aider avec le dossier ?',
         'unread',
         now()),
        (gen_random_uuid(),
         'Mariam Coulibaly',
         'mariam.c@example.com',
         'Visa tourisme Canada - famille',
         'Nous sommes une famille de 4 personnes souhaitant visiter le Canada cet été. Quel est le processus et les tarifs ?',
         'unread',
         now())
      ON CONFLICT DO NOTHING;
    `);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSummary:');
    console.log('  • 6 services');
    console.log('  • 8 destinations');
    console.log('  • 6 testimonials');
    console.log('  • 3 blog posts');
    console.log('  • 6 FAQs');
    console.log('  • 3 subscribers');
    console.log('  • 2 sample messages');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
