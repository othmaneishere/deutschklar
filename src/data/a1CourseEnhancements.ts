import { ContentSection, CoursePage } from '../types';

const text = (de: string, en: string, ar: string, fr: string) => ({ de, en, ar, fr });

const section = (page: number, id: string, title: ReturnType<typeof text>, type: ContentSection['type'], details: Partial<ContentSection>): ContentSection => ({
  id: `a1-bridge-${page}-${id}`,
  titleDe: title.de,
  titleEn: title.en,
  titleAr: title.ar,
  titleFr: title.fr,
  type,
  ...details,
});

const additions: Record<number, ContentSection[]> = {
  7: [section(7, 'restaurant-flow', text('Im Restaurant: vom Platz bis zur Rechnung', 'At the restaurant: from taking a seat to paying', 'في المطعم: من الجلوس إلى دفع الحساب', 'Au restaurant : de la place à l’addition'), 'dialogue', {
    descriptionDe: 'Ein vollständiger Mini-Dialog verbindet Begrüßung, Bestellung, Rückfrage und Bezahlen.',
    descriptionEn: 'A complete mini-dialogue connects greeting, ordering, clarifying and paying.',
    descriptionAr: 'حوار قصير كامل يربط التحية والطلب والاستفسار والدفع.',
    descriptionFr: 'Un mini-dialogue complet relie l’accueil, la commande, la précision et le paiement.',
    dialogueLines: [
      { speaker: 'Kellnerin', textDe: 'Guten Abend. Möchten Sie schon bestellen?', textEn: 'Good evening. Would you like to order now?', textAr: 'مساء الخير. هل تريدون الطلب الآن؟', textFr: 'Bonsoir. Voulez-vous déjà commander ?' },
      { speaker: 'Gast', textDe: 'Ja, bitte. Für mich eine Suppe und ein Wasser ohne Gas.', textEn: 'Yes, please. A soup and still water for me.', textAr: 'نعم من فضلك. أريد حساءً وماءً بدون غاز.', textFr: 'Oui, s’il vous plaît. Pour moi, une soupe et une eau plate.' },
      { speaker: 'Kellnerin', textDe: 'Möchten Sie noch etwas? Einen Nachtisch vielleicht?', textEn: 'Would you like anything else? A dessert perhaps?', textAr: 'هل تريدون شيئاً آخر؟ حلوى مثلاً؟', textFr: 'Vous désirez autre chose ? Un dessert peut-être ?' },
      { speaker: 'Gast', textDe: 'Nein, danke. Die Rechnung, bitte.', textEn: 'No, thank you. The bill, please.', textAr: 'لا، شكراً. الحساب من فضلك.', textFr: 'Non, merci. L’addition, s’il vous plaît.' },
    ],
  })],
  8: [section(8, 'location-grammar', text('Wo? Wohin? – Orte klar unterscheiden', 'Wo? Wohin? – Distinguishing location and direction', 'أين؟ إلى أين؟ – التمييز بين المكان والاتجاه', 'Wo ? Wohin ? – Distinguer le lieu et la direction'), 'rule_card', {
    descriptionDe: 'Mit wo steht der Ort im Dativ; mit wohin beschreibt man eine Richtung.',
    descriptionEn: 'Wo asks about location and takes the dative; wohin asks about direction.',
    descriptionAr: 'يسأل wo عن المكان مع حالة Dativ، بينما يسأل wohin عن الاتجاه.',
    descriptionFr: 'Wo demande le lieu avec le datif ; wohin demande la direction.',
    rulePoints: [
      text('Wo? – Ich bin in der Küche. / Die Schlüssel liegen auf dem Tisch.', 'Where? – I am in the kitchen. / The keys are on the table.', 'أين؟ – أنا في المطبخ. / المفاتيح على الطاولة.', 'Où ? – Je suis dans la cuisine. / Les clés sont sur la table.'),
      text('Wohin? – Ich gehe in die Küche. / Ich lege die Schlüssel auf den Tisch.', 'Where to? – I go into the kitchen. / I put the keys onto the table.', 'إلى أين؟ – أذهب إلى المطبخ. / أضع المفاتيح على الطاولة.', 'Où ? (direction) – Je vais dans la cuisine. / Je pose les clés sur la table.'),
      text('Merke: ruhiger Ort = Dativ, Bewegung zu einem Ziel = Akkusativ.', 'Remember: a fixed location uses the dative; movement toward a goal uses the accusative.', 'تذكّر: المكان الثابت مع Dativ، والحركة نحو هدف مع Akkusativ.', 'À retenir : lieu fixe = datif, mouvement vers un but = accusatif.'),
    ],
  })],
  9: [section(9, 'imperative', text('Wegbeschreibung mit dem Imperativ', 'Giving directions with the imperative', 'وصف الطريق بصيغة الأمر', 'Indiquer le chemin à l’impératif'), 'table', {
    descriptionDe: 'Höfliche Wegbeschreibungen brauchen klare Verben und passende Richtungswörter.',
    descriptionEn: 'Clear verbs and direction words make a route easy to follow.',
    descriptionAr: 'الأفعال الواضحة وكلمات الاتجاه تجعل وصف الطريق سهل المتابعة.',
    descriptionFr: 'Des verbes clairs et des mots de direction rendent un itinéraire facile à suivre.',
    tableData: { headersDe: ['Imperativ', 'Bedeutung', 'Beispiel'], headersEn: ['Imperative', 'Meaning', 'Example'], headersAr: ['الأمر', 'المعنى', 'مثال'], headersFr: ['Impératif', 'Sens', 'Exemple'], rows: [
      { de: ['Gehen Sie geradeaus.', 'Go straight ahead.', 'Gehen Sie bis zur Kreuzung.'], en: ['Go straight ahead.', 'Direction', 'Go to the intersection.'], ar: ['اذهب إلى الأمام مباشرة.', 'الاتجاه', 'اذهب حتى التقاطع.'], fr: ['Allez tout droit.', 'Direction', 'Allez jusqu’au carrefour.'] },
      { de: ['Nehmen Sie die erste Straße links.', 'Take the first street on the left.', 'Nehmen Sie die U-Bahn.'], en: ['Take the first street on the left.', 'Choose / take', 'Take the subway.'], ar: ['خذ أول شارع على اليسار.', 'خذ / اختر', 'استقل المترو.'], fr: ['Prenez la première rue à gauche.', 'Prendre', 'Prenez le métro.'] },
    ] },
  })],
  11: [section(11, 'negation', text('Einkaufen: kein oder nicht?', 'Shopping: kein or nicht?', 'التسوق: kein أم nicht؟', 'Faire les courses : kein ou nicht ?'), 'rule_card', {
    descriptionDe: 'Mit kein verneinst du ein Nomen; mit nicht verneinst du ein Verb, Adjektiv oder eine bestimmte Information.',
    descriptionEn: 'Use kein to negate a noun and nicht to negate a verb, adjective or specific information.',
    descriptionAr: 'نستخدم kein لنفي الاسم، وnicht لنفي الفعل أو الصفة أو معلومة محددة.',
    descriptionFr: 'Kein nie un nom ; nicht nie un verbe, un adjectif ou une information précise.',
    rulePoints: [
      text('Ich habe keine passende Größe. / Das ist kein Baumwollhemd.', 'I do not have a suitable size. / That is not a cotton shirt.', 'ليس لدي مقاس مناسب. / هذا ليس قميصاً قطنياً.', 'Je n’ai pas la bonne taille. / Ce n’est pas une chemise en coton.'),
      text('Die Jacke ist nicht zu teuer. / Ich kaufe sie heute nicht.', 'The jacket is not too expensive. / I am not buying it today.', 'السترة ليست غالية جداً. / لن أشتريها اليوم.', 'La veste n’est pas trop chère. / Je ne l’achète pas aujourd’hui.'),
    ],
  })],
  14: [section(14, 'appointments', text('Reisen und Termine planen', 'Planning travel and appointments', 'التخطيط للسفر والمواعيد', 'Organiser un voyage et un rendez-vous'), 'dialogue', {
    descriptionDe: 'Du verbindest Uhrzeit, Datum, höfliche Fragen und Reiseinformationen.',
    descriptionEn: 'Combine time, dates, polite questions and travel information.',
    descriptionAr: 'اربط الوقت والتاريخ والأسئلة المهذبة ومعلومات السفر.',
    descriptionFr: 'Reliez l’heure, la date, les questions polies et les informations de voyage.',
    dialogueLines: [
      { speaker: 'A', textDe: 'Guten Tag, ich möchte einen Termin für Dienstag vereinbaren.', textEn: 'Good afternoon, I would like to make an appointment for Tuesday.', textAr: 'مرحباً، أريد تحديد موعد ليوم الثلاثاء.', textFr: 'Bonjour, je voudrais prendre rendez-vous pour mardi.' },
      { speaker: 'B', textDe: 'Um zehn Uhr hätte ich noch einen Termin frei.', textEn: 'I still have an appointment available at ten o’clock.', textAr: 'لدي موعد شاغر في الساعة العاشرة.', textFr: 'J’ai encore un créneau libre à dix heures.' },
      { speaker: 'A', textDe: 'Das passt gut. Können Sie mir die Adresse bitte noch einmal sagen?', textEn: 'That works well. Could you please tell me the address again?', textAr: 'هذا مناسب. هل يمكنك قول العنوان مرة أخرى من فضلك؟', textFr: 'Cela me convient. Pouvez-vous me redire l’adresse, s’il vous plaît ?' },
    ],
  })],
  16: [section(16, 'polite-requests', text('Höflich kommunizieren', 'Communicating politely', 'التواصل بأدب', 'Communiquer poliment'), 'rule_card', {
    descriptionDe: 'Diese Redemittel helfen dir am Telefon, per E-Mail und am Schalter.',
    descriptionEn: 'These phrases help you on the phone, in emails and at service counters.',
    descriptionAr: 'هذه العبارات تساعدك في الهاتف والبريد الإلكتروني وعند المكاتب.',
    descriptionFr: 'Ces formules sont utiles au téléphone, par e-mail et au guichet.',
    rulePoints: [
      text('Könnten Sie das bitte wiederholen?', 'Could you please repeat that?', 'هل يمكنك تكرار ذلك من فضلك؟', 'Pourriez-vous répéter, s’il vous plaît ?'),
      text('Würden Sie mir bitte helfen?', 'Would you please help me?', 'هل يمكنك مساعدتي من فضلك؟', 'Pourriez-vous m’aider, s’il vous plaît ?'),
      text('Entschuldigung, ich habe das nicht verstanden. Können Sie langsamer sprechen?', 'Sorry, I did not understand that. Can you speak more slowly?', 'عذراً، لم أفهم ذلك. هل يمكنك التحدث ببطء أكثر؟', 'Excusez-moi, je n’ai pas compris. Pouvez-vous parler plus lentement ?'),
    ],
  })],
  17: [section(17, 'connectors', text('Sätze verbinden: und, aber, denn, weil', 'Connecting sentences: und, aber, denn, weil', 'ربط الجمل: und وaber وdenn وweil', 'Relier les phrases : und, aber, denn, weil'), 'rule_card', {
    descriptionDe: 'Mit Konnektoren werden aus einzelnen Sätzen verständliche kleine Texte.',
    descriptionEn: 'Connectors turn separate sentences into clear short texts.',
    descriptionAr: 'تجعل أدوات الربط الجمل المنفصلة نصوصاً قصيرة مفهومة.',
    descriptionFr: 'Les connecteurs transforment des phrases séparées en petits textes clairs.',
    rulePoints: [
      text('Ich lerne Deutsch und ich übe jeden Tag. / Ich möchte kommen, aber ich muss arbeiten.', 'I learn German and practise every day. / I would like to come, but I have to work.', 'أتعلم الألمانية وأتدرب كل يوم. / أريد أن آتي، لكن يجب أن أعمل.', 'J’apprends l’allemand et je m’entraîne chaque jour. / Je voudrais venir, mais je dois travailler.'),
      text('Ich bleibe zu Hause, denn es regnet. / Ich bleibe zu Hause, weil es regnet.', 'I stay at home because it is raining. / I stay at home because it is raining.', 'أبقى في البيت لأن الجو ممطر. / أبقى في البيت لأن الجو ممطر.', 'Je reste à la maison car il pleut. / Je reste à la maison parce qu’il pleut.'),
      text('Nach weil steht das konjugierte Verb am Ende: weil es regnet.', 'With weil, the conjugated verb goes to the end: weil es regnet.', 'مع weil يأتي الفعل المصرف في نهاية الجملة: weil es regnet.', 'Avec weil, le verbe conjugué va à la fin : weil es regnet.'),
    ],
  })],
  20: [section(20, 'survival', text('Überlebensdeutsch: Wenn du Hilfe brauchst', 'Survival German: when you need help', 'ألمانية النجاة: عندما تحتاج إلى المساعدة', 'Allemand de survie : demander de l’aide'), 'vocabulary', {
    descriptionDe: 'Diese Sätze geben dir Sicherheit in einer unbekannten Alltagssituation.',
    descriptionEn: 'These sentences give you confidence in unfamiliar everyday situations.',
    descriptionAr: 'هذه العبارات تمنحك الثقة في مواقف الحياة اليومية غير المألوفة.',
    descriptionFr: 'Ces phrases donnent de l’assurance dans les situations quotidiennes inconnues.',
    vocabItems: [
      { de: 'Ich spreche nur ein bisschen Deutsch.', en: 'I only speak a little German.', ar: 'أتحدث الألمانية قليلاً فقط.', fr: 'Je parle seulement un peu allemand.' },
      { de: 'Können Sie bitte langsamer sprechen?', en: 'Could you speak more slowly, please?', ar: 'هل يمكنك التحدث ببطء أكثر من فضلك؟', fr: 'Pouvez-vous parler plus lentement, s’il vous plaît ?' },
      { de: 'Wie sagt man das auf Deutsch?', en: 'How do you say that in German?', ar: 'كيف نقول ذلك بالألمانية؟', fr: 'Comment dit-on cela en allemand ?' },
      { de: 'Ich brauche Hilfe.', en: 'I need help.', ar: 'أحتاج إلى المساعدة.', fr: 'J’ai besoin d’aide.' },
      { de: 'Können Sie das bitte aufschreiben?', en: 'Could you write that down, please?', ar: 'هل يمكنك كتابة ذلك من فضلك؟', fr: 'Pouvez-vous l’écrire, s’il vous plaît ?' },
    ],
  })],
};

export const enhanceA1Pages = (pages: CoursePage[]): CoursePage[] => pages.map((page) => {
  const pageAdditions = additions[page.chapterNumber] || [];
  if (!pageAdditions.length) return page;
  return {
    ...page,
    sections: [...page.sections, ...pageAdditions],
    objectivesEn: [...(page.objectivesEn || []), 'Apply the lesson language in a realistic everyday situation'],
  };
});
