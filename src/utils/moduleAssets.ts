// Clean minimalist vector-style illustrations mapped to each chapter title & theme
import imgHeroBanner from '../assets/images/german_hero_banner_1789293488824.jpg';
import imgFamily from '../assets/images/german_family_1789293843957.jpg';
import imgDailyRoutine from '../assets/images/german_daily_routine_1789293858783.jpg';
import imgHomeLiving from '../assets/images/german_home_living_1789293528851.jpg';
import imgCafeScene from '../assets/images/german_cafe_scene_1789293504756.jpg';
import imgCityTransit from '../assets/images/german_city_transit_1789293515695.jpg';
import imgClothesWeather from '../assets/images/german_clothes_weather_1789293883130.jpg';
import imgMarketScene from '../assets/images/german_market_scene_1789293564702.jpg';
import imgProfessions from '../assets/images/german_professions_1789293830175.jpg';
import imgDoctorHealth from '../assets/images/german_doctor_health_1789293897419.jpg';
import imgAppointmentsBanner from '../assets/images/german_appointments_banner_1789294929967.jpg';
import imgTravelMemories from '../assets/images/german_travel_memories_1789294943615.jpg';
import imgExamReview from '../assets/images/german_exam_review_1789294956634.jpg';

export interface ModuleVisualScene {
  imageSrc: string;
  alt: string;
  badgeDe: string;
  badgeAr: string;
  badgeEn: string;
  badgeFr: string;
  scenarioDe: string;
  scenarioAr: string;
  scenarioEn: string;
  scenarioFr: string;
}

export const moduleScenes: Record<number, ModuleVisualScene> = {
  // Kapitel 1: Hallo! Ich bin …
  1: {
    imageSrc: imgHeroBanner,
    alt: 'Erstes Kennenlernen & Begrüßung',
    badgeDe: 'Kennenlernen & Begrüßung',
    badgeAr: 'التعارف والتحية',
    badgeEn: 'Introductions & Greetings',
    badgeFr: 'Présentations & Salutations',
    scenarioDe: 'Begrüße andere Menschen höflich, stelle dich auf Deutsch vor und stelle erste Fragen.',
    scenarioAr: 'حيّ الآخرين بلباقة، قدّم نفسك باللغة الألمانية واطرح أسئلتك الأولى.',
    scenarioEn: 'Greet others politely, introduce yourself in German, and ask basic questions.',
    scenarioFr: 'Saluez poliment, présentez-vous en allemand et posez vos premières questions.',
  },
  // Kapitel 2: Alphabet & Aussprache
  2: {
    imageSrc: imgHeroBanner,
    alt: 'Phonetik & Buchstabieren',
    badgeDe: 'Alphabet & Phonetik',
    badgeAr: 'الأبجدية والنطق الصوتي',
    badgeEn: 'Alphabet & Phonetics',
    badgeFr: 'Alphabet & Phonétique',
    scenarioDe: 'Umlaute (ä, ö, ü), ß und typische Lautverbindungen (ch, sch, ei, eu) sicher beherrschen.',
    scenarioAr: 'إتقان نطق الحروف الممالة ä, ö, ü والحرف ß ومجموعات الحروف الألمانية.',
    scenarioEn: 'Master umlauts (ä, ö, ü), ß, and essential German sound blends (ch, sch, ei, eu).',
    scenarioFr: 'Maîtrisez les trémas (ä, ö, ü), ß et les combinaisons phonétiques allemandes.',
  },
  // Kapitel 3: Zahlen, Zeit & Datum
  3: {
    imageSrc: imgAppointmentsBanner,
    alt: 'Zahlen, Uhrzeit und Kalender',
    badgeDe: 'Zahlen & Uhrzeit',
    badgeAr: 'الأرقام والساعة والتقويم',
    badgeEn: 'Numbers & Clock Time',
    badgeFr: 'Nombres & Heure',
    scenarioDe: 'Zahlen 0–1000, offizielle und inoffizielle Uhrzeit sowie Wochentage und Monate beherrschen.',
    scenarioAr: 'إتقان الأرقام حتى 1000، قراءة الساعة الرسمية والعادية وأيام الأسبوع والأشهر.',
    scenarioEn: 'Master numbers 0–1000, official and casual clock times, days, and calendar months.',
    scenarioFr: 'Maîtriser les nombres de 0 à 1000, l’heure officielle/courante et le calendrier.',
  },
  // Kapitel 4: Meine Familie
  4: {
    imageSrc: imgFamily,
    alt: 'Familie & Possessivartikel',
    badgeDe: 'Familie & Verwandte',
    badgeAr: 'العائلة والأقارب',
    badgeEn: 'Family & Relatives',
    badgeFr: 'Famille & Proches',
    scenarioDe: 'Familienmitglieder benennen, Verwandtschaftsverhältnisse schildern und mein/dein anwenden.',
    scenarioAr: 'تسمية أفراد العائلة وشرح صلة القرابة واستخدام ضمائر الملكية بثقة.',
    scenarioEn: 'Name family members, describe relatives, and master possessive articles mein/dein.',
    scenarioFr: 'Nommer les membres de la famille et manier les adjectifs possessifs mein/dein.',
  },
  // Kapitel 5: Freunde & Personen
  5: {
    imageSrc: imgProfessions,
    alt: 'Freunde, Personen und Berufe',
    badgeDe: 'Personen & Berufe',
    badgeAr: 'الأشخاص والمهن',
    badgeEn: 'People & Professions',
    badgeFr: 'Personnes & Métiers',
    scenarioDe: 'Aussehen und Charakter beschreiben, Berufsbezeichnungen (m/f) und Herkunftsländer nennen.',
    scenarioAr: 'وصف المظهر والسمات الشخصية، المهن للمذكر والمؤنث والدول والجنسيات.',
    scenarioEn: 'Describe physical traits, personality, professions (m/f), and countries of origin.',
    scenarioFr: 'Décrire l’allure, le caractère, les métiers (m/f) et les pays d’origine.',
  },
  // Kapitel 6: Mein Alltag
  6: {
    imageSrc: imgDailyRoutine,
    alt: 'Tagesablauf & trennbare Verben',
    badgeDe: 'Alltag & Routine',
    badgeAr: 'الروتين اليومي',
    badgeEn: 'Daily Routine',
    badgeFr: 'Quotidien & Routine',
    scenarioDe: 'Den persönlichen Tagesablauf strukturieren und trennbare Verben (aufstehen, anrufen) anwenden.',
    scenarioAr: 'ترتيب وتفصيل الروتين اليومي واستخدام الأفعال المنفصلة في الجملة.',
    scenarioEn: 'Structure your daily schedule and apply separable verbs in conversational German.',
    scenarioFr: 'Structurer sa journée et employer les verbes à particule séparable.',
  },
  // Kapitel 7: Essen & Trinken
  7: {
    imageSrc: imgCafeScene,
    alt: 'Essen, Trinken und Restaurant',
    badgeDe: 'Essen & Restaurant',
    badgeAr: 'الطعام والمطعم',
    badgeEn: 'Dining & Food',
    badgeFr: 'Repas & Restaurant',
    scenarioDe: 'Lebensmittel einkaufen, im Restaurant bestellen und den Akkusativ (den/einen) sicher beherrschen.',
    scenarioAr: 'شراء المواد الغذائية والطلب في المطعم وتطبيق حالة المفعول به Akkusativ.',
    scenarioEn: 'Buy food items, order at restaurants, and apply the accusative case (den/einen).',
    scenarioFr: 'Acheter des vivres, commander au restaurant et manier l’accusatif (den/einen).',
  },
  // Kapitel 8: Meine Wohnung
  8: {
    imageSrc: imgHomeLiving,
    alt: 'Wohnung, Zimmer und Möbel',
    badgeDe: 'Wohnung & Möbel',
    badgeAr: 'المنزل والأثاث',
    badgeEn: 'Home & Furniture',
    badgeFr: 'Logement & Mobilier',
    scenarioDe: 'Wohnungsräume, Möbel und Einrichtungsgegenstände mit lokalen Präpositionen beschreiben.',
    scenarioAr: 'وصف غرف المنزل وقطع الأثاث والأجهزة باستخدام حروف الجر المكانية.',
    scenarioEn: 'Describe apartment rooms, furnishings, and appliances using spatial prepositions.',
    scenarioFr: 'Décrire les pièces, le mobilier et la disposition avec les prépositions de lieu.',
  },
  // Kapitel 9: Unterwegs in der Stadt
  9: {
    imageSrc: imgCityTransit,
    alt: 'Stadtplan & Wegbeschreibung',
    badgeDe: 'Stadt & Orientierung',
    badgeAr: 'المدينة والاتجاهات',
    badgeEn: 'City & Directions',
    badgeFr: 'Ville & Itinéraires',
    scenarioDe: 'Nach dem Weg fragen, Richtungen verstehen und Wegbeschreibungen mit dem Imperativ geben.',
    scenarioAr: 'السؤال عن الطريق وفهم الاتجاهات ووصف المسارات باستخدام صيغة الأمر.',
    scenarioEn: 'Ask for directions, navigate German streets, and give directions using the imperative.',
    scenarioFr: 'Demander son chemin, s’orienter et donner des indications à l’impératif.',
  },
  // Kapitel 10: Freizeit & Hobbys
  10: {
    imageSrc: imgTravelMemories,
    alt: 'Freizeitaktivitäten & Sport',
    badgeDe: 'Freizeit & Sport',
    badgeAr: 'أوقات الفراغ والرياضة',
    badgeEn: 'Leisure & Hobbies',
    badgeFr: 'Loisirs & Sport',
    scenarioDe: 'Über Hobbys, Sport und Musik sprechen und Treffen mit dem Modalverb „können“ planen.',
    scenarioAr: 'التحدث عن الهوايات والرياضة والموسيقى والتخطيط للقاء الأصدقاء بفعل können.',
    scenarioEn: 'Discuss hobbies, sports, and music, and arrange meetups using modal verb können.',
    scenarioFr: 'Parler de ses loisirs et convenir de rendez-vous avec le verbe modal können.',
  },
  // Kapitel 11: Kleidung & Einkaufen
  11: {
    imageSrc: imgClothesWeather,
    alt: 'Kleidung, Mode und Größen',
    badgeDe: 'Mode & Einkaufen',
    badgeAr: 'الأزياء والتسوق',
    badgeEn: 'Fashion & Shopping',
    badgeFr: 'Mode & Shopping',
    scenarioDe: 'Kleidungsstücke auswählen, nach Farben und Größen fragen und mit „möchten“ einkaufen.',
    scenarioAr: 'اختيار الملابس والسؤال عن الألوان والمقاسات والتسوق بأدب باستخدام möchten.',
    scenarioEn: 'Select clothes, inquire about colors and sizes, and make purchases with möchten.',
    scenarioFr: 'Choisir des vêtements, s’informer sur les tailles et acheter avec möchten.',
  },
  // Kapitel 12: Körper & Gesundheit
  12: {
    imageSrc: imgDoctorHealth,
    alt: 'Gesundheit, Körperteile und Arztpraxis',
    badgeDe: 'Körper & Arztpraxis',
    badgeAr: 'الجسم وعيادة الطبيب',
    badgeEn: 'Body & Clinic',
    badgeFr: 'Corps & Santé',
    scenarioDe: 'Körperteile benennen, Schmerzen und Symptome schildern und Arztanweisungen mit müssen verstehen.',
    scenarioAr: 'تسمية أجزاء الجسم ووصف الأعراض والآلام وفهم تعليمات الطبيب مع müssen.',
    scenarioEn: 'Name body parts, describe symptoms and ailments, and follow medical instructions with müssen.',
    scenarioFr: 'Nommer les parties du corps, décrire ses maux et suivre les consignes médicales.',
  },
  // Kapitel 13: Arbeit & Berufswelt
  13: {
    imageSrc: imgProfessions,
    alt: 'Büro, Arbeitsplatz und Vorstellungsgespräch',
    badgeDe: 'Arbeit & Karriere',
    badgeAr: 'العمل والوظائف',
    badgeEn: 'Work & Careers',
    badgeFr: 'Travail & Carrière',
    scenarioDe: 'Arbeitsaufgaben und Büroalltag schildern, Vorstellungsgespräche führen und Regeln mit dürfen verstehen.',
    scenarioAr: 'توضيح مهام العمل والروتين المكتبي، خوض مقابلة التوظيف وفهم القواعد مع dürfen.',
    scenarioEn: 'Explain job responsibilities, navigate interviews, and comprehend workplace rules with dürfen.',
    scenarioFr: 'Décrire ses tâches professionnelles, passer un entretien et comprendre les règles avec dürfen.',
  },
  // Kapitel 14: Reisen, Urlaub & Verkehr
  14: {
    imageSrc: imgCityTransit,
    alt: 'Bahnhof, Zugreisen und Hotel',
    badgeDe: 'Reisen & Verkehr',
    badgeAr: 'السفر والمواصلات',
    badgeEn: 'Travel & Transit',
    badgeFr: 'Voyages & Transports',
    scenarioDe: 'Fahrkarten am Bahnhof kaufen, Bahnverbindungen erfragen und Hotels mit Dativ-Präpositionen buchen.',
    scenarioAr: 'شراء تذاكر القطار والاستعلام عن الرحلات وحجز الفنادق مع حروف جر Dativ.',
    scenarioEn: 'Buy train tickets, query connections, and book hotels using dative prepositions.',
    scenarioFr: 'Acheter des billets de train, demander des horaires et réserver un hôtel avec le datif.',
  },
  // Kapitel 15: Post, Bank & Behörden
  15: {
    imageSrc: imgMarketScene,
    alt: 'Postamt, Bankomat und Bürgeramt',
    badgeDe: 'Post, Bank & Ämter',
    badgeAr: 'البريد والبنك والبلدية',
    badgeEn: 'Post, Bank & Offices',
    badgeFr: 'Poste, Banque & Mairie',
    scenarioDe: 'Pakete versenden, Bankgeschäfte am Schalter/Automaten tätigen und Meldeformulare ausfüllen.',
    scenarioAr: 'إرسال الطرود، إجراء المعاملات البنكية وملء استمارة تسجيل السكن الرسمية.',
    scenarioEn: 'Send parcels, manage bank transactions, and complete official registration forms.',
    scenarioFr: 'Expédier des colis, gérer ses opérations bancaires et remplir des formulaires officiels.',
  },
  // Kapitel 16: Medien, Technik & Kommunikation
  16: {
    imageSrc: imgAppointmentsBanner,
    alt: 'Computer, Internet und E-Mails',
    badgeDe: 'Medien & IT',
    badgeAr: 'التقنية والتواصل الرقمي',
    badgeEn: 'Tech & Digital Media',
    badgeFr: 'Médias & Numérique',
    scenarioDe: 'Digitale Geräte bedienen, E-Mails und SMS verfassen und höfliche Bitten mit dem Konjunktiv II formulieren.',
    scenarioAr: 'التعامل مع الأجهزة والتقنية، كتابة الرسائل والإيميلات والطلب المهذب مع könnten/würden.',
    scenarioEn: 'Operate digital tools, draft emails and texts, and formulate polite requests with Konjunktiv II.',
    scenarioFr: 'Utiliser les outils numériques, rédiger courriels & SMS et formuler des demandes polies.',
  },
  // Kapitel 17: Natur, Wetter & Jahreszeiten
  17: {
    imageSrc: imgClothesWeather,
    alt: 'Wetterbericht und die 4 Jahreszeiten',
    badgeDe: 'Wetter & Natur',
    badgeAr: 'الطقس وفصول السنة',
    badgeEn: 'Weather & Seasons',
    badgeFr: 'Météo & Saisons',
    scenarioDe: 'Wetterberichte und Temperaturen verstehen, Jahreszeiten benennen und Kausalsätze mit „weil“ bilden.',
    scenarioAr: 'فهم النشرة الجوية ودرجات الحرارة، تسمية فصول السنة وبناء جمل التعليل بـ weil.',
    scenarioEn: 'Interpret weather forecasts and temperatures, name seasons, and build causal clauses with "weil".',
    scenarioFr: 'Comprendre la météo et les températures, nommer les saisons et former des causes avec « weil ».',
  },
  // Kapitel 18: Feste, Feiertage & Kultur
  18: {
    imageSrc: imgHeroBanner,
    alt: 'Feste, Feiertage und Bräuche',
    badgeDe: 'Feste & Traditionen',
    badgeAr: 'الأعياد والتقاليد',
    badgeEn: 'Holidays & Culture',
    badgeFr: 'Fêtes & Traditions',
    scenarioDe: 'Wichtige Feiertage in DACH kennen, Glückwünsche aussprechen und Einladungen schreiben.',
    scenarioAr: 'معرفة الأعياد في ألمانيا والنمسا وسويسرا، تقديم التهاني وكتابة بطاقات الدعوة.',
    scenarioEn: 'Recognize major DACH holidays, offer tailored congratulations, and write invitations.',
    scenarioFr: 'Connaître les grandes fêtes, formuler des vœux adaptés et rédiger des invitations.',
  },
  // Kapitel 19: Vergangenheit (Perfekt-Einführung)
  19: {
    imageSrc: imgTravelMemories,
    alt: 'Das deutsche Perfekt im Alltag',
    badgeDe: 'Vergangenheit (Perfekt)',
    badgeAr: 'الماضي التام Perfekt',
    badgeEn: 'Past Tense (Perfekt)',
    badgeFr: 'Passé Composé (Perfekt)',
    scenarioDe: 'Das Perfekt mit haben und sein bilden und lebendig über vergangene Erlebnisse berichten.',
    scenarioAr: 'صياغة الماضي التام مع haben و sein والتحدث بطلاقة عن أحداث وتجارب الماضي.',
    scenarioEn: 'Construct conversational past tense with haben/sein and narrate past experiences.',
    scenarioFr: 'Former le Perfekt avec haben et sein et raconter ses souvenirs au passé.',
  },
  // Kapitel 20: Zusammenfassung & A1-Abschluss
  20: {
    imageSrc: imgExamReview,
    alt: 'A1-Abschlussprüfung und Zertifikat',
    badgeDe: 'A1-Abschluss & Prüfung',
    badgeAr: 'امتحان التخرج A1',
    badgeEn: 'A1 Certification Exam',
    badgeFr: 'Examen Certifiant A1',
    scenarioDe: 'Das offizielle Goethe- und telc-Prüfungsformat meistern, alle Grammatikpfeiler prüfen und das A1-Zertifikat erlangen.',
    scenarioAr: 'إتقان هيكلية امتحانات معهد غوته وتلك، مراجعة ركائز القواعد والحصول على شهادة A1 بجدارة.',
    scenarioEn: 'Master the Goethe & telc A1 exam format, review all grammar pillars, and earn your A1 certification.',
    scenarioFr: 'Maîtriser le format d’examen Goethe/telc, valider la grammaire et obtenir le diplôme A1.',
  },
};
