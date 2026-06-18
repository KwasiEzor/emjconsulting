import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });
const sql = postgres(process.env.DATABASE_URL, { ssl: 'prefer' });

async function seed() {
  console.log('🌱 Seeding database with realistic data...\n');

  try {
    // Services
    console.log('📋 Seeding services...');
    await sql`
      INSERT INTO services (id, title_fr, title_en, description_fr, description_en, icon, slug, benefits, process, price, duration, featured, "order", created_at)
      VALUES
        (gen_random_uuid(), 'Visa Tourisme', 'Tourist Visa',
         'Assistance complète pour l''obtention de visas touristiques vers plus de 30 destinations. Préparation du dossier, prise de rendez-vous et suivi personnalisé.',
         'Complete assistance for obtaining tourist visas to over 30 destinations. File preparation, appointment booking, and personalized follow-up.',
         'plane', 'visa-tourisme',
         '["Préparation complète du dossier", "Prise de rendez-vous consulaire", "Suivi en temps réel", "Taux de réussite 98%"]'::jsonb,
         '["Consultation initiale", "Constitution du dossier", "Dépôt consulaire", "Réception du visa"]'::jsonb,
         'À partir de 250€', '15-20 jours ouvrés', true, 1, now()),

        (gen_random_uuid(), 'Visa Étudiant', 'Student Visa',
         'Accompagnement complet des étudiants pour leurs démarches de visa d''études. Conseils sur les universités, bourses et procédures d''admission.',
         'Complete support for students in their study visa procedures. Advice on universities, scholarships, and admission procedures.',
         'graduation-cap', 'visa-etudiant',
         '["Aide au choix d''université", "Dossier de bourses", "Lettre de motivation", "Préparation entretien"]'::jsonb,
         '["Évaluation du profil", "Recherche d''université", "Constitution dossier", "Suivi admission"]'::jsonb,
         'À partir de 400€', '4-6 semaines', true, 2, now()),

        (gen_random_uuid(), 'Visa Affaires', 'Business Visa',
         'Solutions rapides pour professionnels : visa d''affaires, missions commerciales et déplacements corporate. Service premium disponible.',
         'Quick solutions for professionals: business visas, trade missions, and corporate travel. Premium service available.',
         'briefcase', 'visa-affaires',
         '["Traitement prioritaire", "Service express 72h", "Assistance aéroport", "Garantie satisfait"]'::jsonb,
         '["Analyse besoin", "Lettre d''invitation", "Dépôt express", "Suivi prioritaire"]'::jsonb,
         'À partir de 350€', '5-10 jours ouvrés', true, 3, now()),

        (gen_random_uuid(), 'Regroupement Familial', 'Family Reunification',
         'Expertise en procédures de regroupement familial et visa conjoint. Dossiers complexes traités avec soin et confidentialité.',
         'Expertise in family reunification and spouse visa procedures. Complex cases handled with care and confidentiality.',
         'users', 'regroupement-familial',
         '["Étude juridique complète", "Traduction documents", "Accompagnement OFII", "Assistance intégration"]'::jsonb,
         '["Audit de situation", "Constitution dossier", "Dépôt préfecture", "Suivi OFII"]'::jsonb,
         'Sur devis', '2-6 mois', false, 4, now()),

        (gen_random_uuid(), 'Billets d''Avion', 'Flight Tickets',
         'Réservation de billets d''avion aux meilleurs tarifs. Partenariats avec 50+ compagnies aériennes internationales.',
         'Flight ticket booking at the best rates. Partnerships with 50+ international airlines.',
         'plane-departure', 'billets-avion',
         '["Tarifs négociés", "Modifications flexibles", "Assurance annulation", "Support 24/7"]'::jsonb,
         '["Recherche", "Réservation", "Paiement", "Émission billet"]'::jsonb,
         'Prix selon destination', 'Immédiat', false, 5, now()),

        (gen_random_uuid(), 'Assurance Voyage', 'Travel Insurance',
         'Assurances voyage conformes aux exigences consulaires. Couverture médicale, rapatriement et annulation.',
         'Travel insurance compliant with consular requirements. Medical coverage, repatriation, and cancellation.',
         'shield-check', 'assurance-voyage',
         '["Couverture Schengen", "Rapatriement médical", "Assistance juridique", "Sans franchise"]'::jsonb,
         '["Choix formule", "Souscription", "Attestation", "Activation"]'::jsonb,
         'Dès 2€/jour', 'Immédiat', false, 6, now())
      ON CONFLICT DO NOTHING;
    `;

    // Destinations
    console.log('🌍 Seeding destinations...');
    await sql`
      INSERT INTO destinations (id, name_fr, name_en, slug, flag_emoji, image_url, description_fr, description_en, visa_duration, requirements, featured, continent, "order", created_at)
      VALUES
        (gen_random_uuid(), 'Canada', 'Canada', 'canada', '🇨🇦', '/images/destinations/canada.jpg',
         'Visa touristique, études et résidence permanente. Procédure en ligne simplifiée via AVE ou permis d''études. Taux d''approbation élevé.',
         'Tourist visa, studies, and permanent residence. Simplified online procedure via ETA or study permit. High approval rate.',
         '6 mois renouvelable',
         '{"documents": ["Passeport valide", "Preuve financière 10000 CAD", "Lettre invitation", "Assurance santé"], "processing": "4-6 semaines"}'::jsonb,
         true, 'Amérique du Nord', 1, now()),

        (gen_random_uuid(), 'France', 'France', 'france', '🇫🇷', '/images/destinations/france.jpg',
         'Visa Schengen court séjour (90 jours) et long séjour. Expertise sur visas étudiants, VLS-TS et titres de séjour.',
         'Schengen short-stay visa (90 days) and long-stay visa. Expertise in student visas, VLS-TS, and residence permits.',
         '90 jours (court séjour)',
         '{"documents": ["Passeport valide 3 mois", "Justificatifs financiers", "Réservation hôtel", "Assurance voyage 30000€"], "processing": "15-20 jours"}'::jsonb,
         true, 'Europe', 2, now()),

        (gen_random_uuid(), 'États-Unis', 'United States', 'etats-unis', '🇺🇸', '/images/destinations/usa.jpg',
         'Visa B1/B2 tourisme et affaires, visa F1 étudiant. Préparation intensive à l''entretien consulaire incluse.',
         'B1/B2 tourist and business visa, F1 student visa. Intensive preparation for consular interview included.',
         '180 jours maximum',
         '{"documents": ["Formulaire DS-160", "Photo identité", "Preuve attaches pays", "Relevés bancaires"], "processing": "3-5 semaines"}'::jsonb,
         true, 'Amérique du Nord', 3, now()),

        (gen_random_uuid(), 'Royaume-Uni', 'United Kingdom', 'royaume-uni', '🇬🇧', '/images/destinations/uk.jpg',
         'Standard Visitor Visa et Student Visa post-Brexit. Accompagnement sur les nouveaux systèmes en ligne.',
         'Standard Visitor Visa and Student Visa post-Brexit. Support with new online systems.',
         '6 mois (tourisme)',
         '{"documents": ["Passeport biométrique", "Preuve financière", "Lettre employeur", "Hébergement"], "processing": "3 semaines"}'::jsonb,
         true, 'Europe', 4, now()),

        (gen_random_uuid(), 'Dubaï (EAU)', 'Dubai (UAE)', 'dubai', '🇦🇪', '/images/destinations/dubai.jpg',
         'Visa touristique 30/90 jours, visa investisseur et Golden Visa. Traitement ultra-rapide en 48-72h disponible.',
         '30/90 day tourist visa, investor visa, and Golden Visa. Ultra-fast 48-72h processing available.',
         '30 ou 90 jours',
         '{"documents": ["Copie passeport", "Photo", "Réservation vol", "Réservation hôtel"], "processing": "2-3 jours"}'::jsonb,
         false, 'Moyen-Orient', 5, now()),

        (gen_random_uuid(), 'Allemagne', 'Germany', 'allemagne', '🇩🇪', '/images/destinations/germany.jpg',
         'Visa Schengen et permis de résidence. Spécialisation visa job seeker et Blue Card EU pour professionnels qualifiés.',
         'Schengen visa and residence permit. Specialization in job seeker visa and EU Blue Card for skilled professionals.',
         '90 jours (Schengen)',
         '{"documents": ["Passeport valide", "Assurance voyage", "Ressources financières", "Justificatif hébergement"], "processing": "15 jours"}'::jsonb,
         false, 'Europe', 6, now())
      ON CONFLICT DO NOTHING;
    `;

    // Blog Categories
    console.log('📚 Seeding blog categories...');
    await sql`
      INSERT INTO blog_categories (id, name_fr, name_en, slug, created_at)
      VALUES
        (gen_random_uuid(), 'Conseils Visa', 'Visa Tips', 'conseils-visa', now()),
        (gen_random_uuid(), 'Guides Destination', 'Destination Guides', 'guides-destination', now()),
        (gen_random_uuid(), 'Actualités', 'News', 'actualites', now()),
        (gen_random_uuid(), 'Témoignages', 'Testimonials', 'temoignages', now())
      ON CONFLICT DO NOTHING;
    `;

    const categories = await sql`SELECT id, slug FROM blog_categories WHERE slug = 'conseils-visa' LIMIT 1`;
    const catVisaId = categories[0]?.id || null;

    // Blog Posts
    console.log('📝 Seeding blog posts...');
    await sql`
      INSERT INTO blog_posts (id, title_fr, title_en, slug, excerpt_fr, excerpt_en, content_fr, content_en, author, image_url, category_id, status, reading_time, published_at, created_at, updated_at)
      VALUES
        (gen_random_uuid(),
         'Comment préparer son dossier de visa Schengen en 2026',
         'How to Prepare Your Schengen Visa Application in 2026',
         'preparer-dossier-visa-schengen-2026',
         'Guide complet pour constituer un dossier de visa Schengen solide et augmenter vos chances d''approbation dès la première demande.',
         'Complete guide to building a strong Schengen visa application and increasing your chances of approval from the first attempt.',
         '<h2>Documents requis</h2><p>Pour un visa Schengen, vous devez fournir : passeport valide 3 mois après le retour, 2 photos d''identité récentes aux normes, attestation d''assurance voyage minimum 30 000€, justificatifs financiers (3 derniers relevés bancaires), réservation d''hébergement confirmée et billet d''avion aller-retour.</p><h2>Conseils pratiques</h2><p>Anticipez votre demande 3 mois avant le départ. Vérifiez que tous les documents sont traduits en français ou anglais si nécessaire. Préparez une lettre de motivation claire expliquant l''objet de votre voyage et vos attaches dans votre pays d''origine.</p><h2>Erreurs à éviter</h2><p>Ne jamais mentir sur vos revenus, ne pas oublier l''assurance voyage, éviter les incohérences entre vos documents. Un dossier incomplet est systématiquement refusé.</p>',
         '<h2>Required Documents</h2><p>For a Schengen visa, you must provide: valid passport for 3 months after return, 2 recent compliant ID photos, travel insurance certificate minimum €30,000, financial proof (last 3 bank statements), confirmed accommodation booking, and round-trip flight ticket.</p><h2>Practical Tips</h2><p>Submit your application 3 months before departure. Ensure all documents are translated into French or English if necessary. Prepare a clear cover letter explaining the purpose of your trip and your ties to your home country.</p><h2>Common Mistakes</h2><p>Never lie about your income, don''t forget travel insurance, avoid inconsistencies between documents. An incomplete application is systematically rejected.</p>',
         'Marie Kouadio', '/images/blog/visa-schengen.jpg', ${catVisaId}, 'published', 8, now() - interval '5 days', now() - interval '5 days', now()),

        (gen_random_uuid(),
         'Visa étudiant Canada : Les 5 erreurs fatales à éviter',
         'Canada Student Visa: 5 Fatal Mistakes to Avoid',
         'visa-etudiant-canada-erreurs',
         'Découvrez les erreurs fréquentes qui causent le refus de visa étudiant canadien et comment les éviter absolument.',
         'Discover common mistakes that cause Canadian student visa refusals and how to avoid them.',
         '<h2>Erreur #1 : Preuve de fonds insuffisante</h2><p>Le Canada exige 10 000 CAD + frais de scolarité pour la première année. Montrez 6 mois d''historique bancaire stable.</p><h2>Erreur #2 : Lettre de motivation générique</h2><p>Personnalisez votre lettre : expliquez pourquoi ce programme, cette université, et comment cela s''inscrit dans votre projet professionnel.</p><h2>Erreur #3 : Manque de preuve d''attaches</h2><p>Démontrez que vous reviendrez : emploi garanti, famille, propriété dans votre pays.</p><h2>Erreur #4 : Incohérence du parcours</h2><p>Votre projet d''études doit être cohérent avec votre parcours académique et professionnel antérieur.</p><h2>Erreur #5 : Documents non traduits</h2><p>Tous les documents doivent être traduits par un traducteur assermenté.</p>',
         '<h2>Mistake #1: Insufficient Proof of Funds</h2><p>Canada requires CAD 10,000 + tuition fees for the first year. Show 6 months of stable banking history.</p><h2>Mistake #2: Generic Motivation Letter</h2><p>Personalize your letter: explain why this program, this university, and how it fits your career plan.</p><h2>Mistake #3: Lack of Proof of Ties</h2><p>Demonstrate you will return: guaranteed job, family, property in your country.</p><h2>Mistake #4: Inconsistent Background</h2><p>Your study plan must be consistent with your previous academic and professional background.</p><h2>Mistake #5: Untranslated Documents</h2><p>All documents must be translated by a certified translator.</p>',
         'Kofi Mensah', '/images/blog/visa-canada.jpg', ${catVisaId}, 'published', 6, now() - interval '10 days', now() - interval '10 days', now()),

        (gen_random_uuid(),
         'Réussir son entretien consulaire pour le visa USA',
         'Acing Your US Visa Consular Interview',
         'reussir-entretien-visa-usa',
         'Conseils d''expert pour aborder sereinement votre entretien à l''ambassade américaine et maximiser vos chances d''obtention.',
         'Expert tips to confidently approach your interview at the US embassy and maximize your chances of approval.',
         '<h2>Avant l''entretien</h2><p>Arrivez 30 minutes à l''avance. Apportez TOUS vos documents originaux (pas de copies). Habillez-vous de manière professionnelle mais sobre. Éteignez votre téléphone.</p><h2>Questions fréquentes</h2><p>"Pourquoi voulez-vous aller aux USA ?" - Soyez précis et honnête. "Qui financera votre voyage ?" - Montrez vos relevés bancaires. "Que faites-vous dans la vie ?" - Prouvez vos attaches professionnelles.</p><h2>Pendant l''entretien</h2><p>Regardez l''agent dans les yeux. Répondez de manière concise (30 secondes max). Ne mentez JAMAIS. Restez calme même si les questions sont directes.</p><h2>Après l''entretien</h2><p>Si approuvé, on garde votre passeport. Si refusé, demandez la raison (section 214b la plus courante). Vous pouvez repostuler après avoir corrigé les points faibles.</p>',
         '<h2>Before the Interview</h2><p>Arrive 30 minutes early. Bring ALL original documents (no copies). Dress professionally but conservatively. Turn off your phone.</p><h2>Common Questions</h2><p>"Why do you want to go to the USA?" - Be specific and honest. "Who will finance your trip?" - Show your bank statements. "What do you do for a living?" - Prove your professional ties.</p><h2>During the Interview</h2><p>Make eye contact with the officer. Answer concisely (30 seconds max). NEVER lie. Stay calm even if questions are direct.</p><h2>After the Interview</h2><p>If approved, they keep your passport. If refused, ask for the reason (section 214b most common). You can reapply after addressing weaknesses.</p>',
         'Aminata Sow', '/images/blog/visa-usa.jpg', ${catVisaId}, 'published', 7, now() - interval '3 days', now() - interval '3 days', now())
      ON CONFLICT DO NOTHING;
    `;

    // FAQs
    console.log('❓ Seeding FAQs...');
    await sql`
      INSERT INTO faq (id, question_fr, question_en, answer_fr, answer_en, "order", created_at)
      VALUES
        (gen_random_uuid(),
         'Combien de temps faut-il pour obtenir un visa ?',
         'How long does it take to get a visa?',
         'Les délais varient selon la destination : 15-20 jours pour le visa Schengen, 4-6 semaines pour le Canada, 3-5 jours pour Dubaï, 3-5 semaines pour les États-Unis. Nous vous informons des délais précis lors de la consultation initiale et suivons votre dossier en temps réel.',
         'Processing times vary by destination: 15-20 days for Schengen visa, 4-6 weeks for Canada, 3-5 days for Dubai, 3-5 weeks for United States. We inform you of precise timelines during initial consultation and track your application in real-time.',
         1, now()),

        (gen_random_uuid(),
         'Quels sont vos tarifs ?',
         'What are your fees?',
         'Nos tarifs dépendent du type de visa et de la destination. Consultation initiale : 50€ (remboursable si vous continuez avec nous). Forfaits visa à partir de 200€ pour visa tourisme, 400€ pour visa étudiant (hors frais consulaires). Devis personnalisé gratuit sous 24h.',
         'Our fees depend on visa type and destination. Initial consultation: €50 (refundable if you proceed). Visa packages from €200 for tourist visa, €400 for student visa (excluding consular fees). Free personalized quote within 24h.',
         2, now()),

        (gen_random_uuid(),
         'Puis-je obtenir un remboursement en cas de refus ?',
         'Can I get a refund if my visa is refused?',
         'Les frais consulaires ne sont jamais remboursables (politique gouvernementale). Nos honoraires sont remboursables à 50% si le refus est dû à une erreur de notre part dans la constitution du dossier. Conditions détaillées dans le contrat de service signé avant le début de la prestation.',
         'Consular fees are never refundable (government policy). Our fees are 50% refundable if refusal is due to an error on our part in file preparation. Detailed conditions in service contract signed before starting.',
         3, now()),

        (gen_random_uuid(),
         'Dois-je venir en personne à votre bureau ?',
         'Do I need to come to your office in person?',
         'Non, 90% de nos clients sont suivis à distance. Nous offrons des consultations en ligne via Zoom, Google Meet ou WhatsApp vidéo. Vous pouvez nous envoyer vos documents par email sécurisé ou via notre portail client. Rendez-vous physiques possibles à Paris sur demande.',
         'No, 90% of our clients are served remotely. We offer online consultations via Zoom, Google Meet, or WhatsApp video. You can send documents via secure email or our client portal. In-person appointments available in Paris upon request.',
         4, now()),

        (gen_random_uuid(),
         'Acceptez-vous les paiements échelonnés ?',
         'Do you accept installment payments?',
         'Oui, nous proposons des facilités de paiement en 2 ou 3 fois sans frais pour les dossiers supérieurs à 500€. Paiement accepté par : virement bancaire SEPA, Mobile Money (Orange Money, MTN, Moov), carte bancaire, Western Union. Premier versement de 30% requis pour démarrer le dossier.',
         'Yes, we offer installment payments in 2 or 3 times without fees for files over €500. Payment accepted by: SEPA bank transfer, Mobile Money (Orange Money, MTN, Moov), credit card, Western Union. 30% down payment required to start file.',
         5, now()),

        (gen_random_uuid(),
         'Quelle est votre garantie de succès ?',
         'What is your success guarantee?',
         'Nous avons un taux de réussite de 98% sur l''ensemble de nos dossiers traités depuis 2019. Nous évaluons GRATUITEMENT votre profil avant tout engagement. Si votre dossier présente trop de risques (refus antérieurs multiples, situation irrégulière), nous vous le signalons honnêtement et vous orientons vers les démarches appropriées.',
         'We have a 98% success rate on all files processed since 2019. We evaluate your profile FREE before any commitment. If your file presents too many risks (multiple previous refusals, irregular situation), we inform you honestly and guide you to appropriate steps.',
         6, now())
      ON CONFLICT DO NOTHING;
    `;

    // Newsletter Subscribers
    console.log('📧 Seeding newsletter subscribers...');
    const existingEmails = await sql`SELECT email FROM newsletter_subscribers`;
    const existingEmailSet = new Set(existingEmails.map(e => e.email));

    const subscribers = [
      { email: 'amadou.fall@example.com', days: 30 },
      { email: 'fatima.diop@example.com', days: 15 },
      { email: 'youssef.kane@example.com', days: 7 },
      { email: 'mariam.coulibaly@example.com', days: 2 }
    ];

    for (const sub of subscribers) {
      if (!existingEmailSet.has(sub.email)) {
        await sql`
          INSERT INTO newsletter_subscribers (id, email, subscribed_at)
          VALUES (gen_random_uuid(), ${sub.email}, now() - interval '${sql.unsafe(sub.days + " days")}');
        `;
      }
    }

    // Messages
    console.log('💼 Seeding contact messages...');
    await sql`
      INSERT INTO messages (id, name, email, phone, country, message, is_read, created_at)
      VALUES
        (gen_random_uuid(),
         'Ibrahim Touré',
         'ibrahim.toure@example.com',
         '+221 77 123 45 67',
         'Sénégal',
         'Bonjour, je souhaite obtenir un visa étudiant pour la France. J''ai été accepté à l''Université de Lyon pour un Master en Informatique. Pouvez-vous m''aider avec la constitution du dossier ? Mon départ est prévu en septembre 2026.',
         false,
         now() - interval '2 hours'),

        (gen_random_uuid(),
         'Mariam Coulibaly',
         'mariam.c@example.com',
         '+225 07 89 45 12',
         'Côte d''Ivoire',
         'Nous sommes une famille de 4 personnes (2 adultes, 2 enfants de 8 et 12 ans) souhaitant visiter le Canada cet été pour des vacances. Quel est le processus et quels sont vos tarifs pour une famille ? Merci.',
         false,
         now() - interval '5 hours'),

        (gen_random_uuid(),
         'Abdoulaye Ba',
         'abdoulaye.ba@example.com',
         '+223 76 54 32 10',
         'Mali',
         'J''ai besoin d''un visa d''affaires pour les États-Unis pour participer à un salon professionnel à New York le mois prochain. Est-ce que c''est possible dans ces délais ? J''ai une invitation officielle de l''organisateur.',
         true,
         now() - interval '1 day')
      ON CONFLICT DO NOTHING;
    `;

    // Clients
    console.log('👥 Seeding clients...');
    const existingClients = await sql`SELECT email FROM clients`;
    const existingClientEmails = new Set(existingClients.map(c => c.email));

    const clients = [
      { name: 'Amadou Diallo', email: 'amadou.diallo@example.com', phone: '+221 77 234 56 78', country: 'Sénégal', notes: 'Visa tourisme France approuvé. Client satisfait, recommande nos services.', days: 45 },
      { name: 'Fatou Ndiaye', email: 'fatou.ndiaye@example.com', phone: '+221 76 345 67 89', country: 'Sénégal', notes: 'Visa étudiant Canada obtenu. Départ prévu septembre 2026. Demande suivi pour permis travail post-diplôme.', days: 30 },
      { name: 'Jean-Marc Kouassi', email: 'jm.kouassi@example.com', phone: '+225 07 12 34 56', country: 'Côte d\'Ivoire', notes: 'Visa Schengen multi-entrées 5 ans. VIP client, voyage fréquent pour affaires.', days: 60 }
    ];

    for (const client of clients) {
      if (!existingClientEmails.has(client.email)) {
        await sql`
          INSERT INTO clients (id, name, email, phone, country, status, notes, created_at, updated_at)
          VALUES (gen_random_uuid(), ${client.name}, ${client.email}, ${client.phone}, ${client.country}, 'active',
                  ${client.notes}, now() - interval '${sql.unsafe(client.days + " days")}', now());
        `;
      }
    }

    console.log('\n✅ Database seeded successfully!\n');
    console.log('Summary:');
    console.log('  • 6 services (bilingual)');
    console.log('  • 6 destinations (bilingual)');
    console.log('  • 4 blog categories');
    console.log('  • 3 blog posts (bilingual)');
    console.log('  • 6 FAQs (bilingual)');
    console.log('  • 4 newsletter subscribers');
    console.log('  • 3 contact messages');
    console.log('  • 3 clients');
    console.log('\n🎉 Your database is now populated with realistic French/African travel agency data!');

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await sql.end();
    process.exit(1);
  }
}

seed();
