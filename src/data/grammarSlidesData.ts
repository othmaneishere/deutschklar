export interface GrammarSlide {
  id: string;
  topicDe: string;
  topicAr: string;
  topicEn: string;
  topicFr: string;
  level: 'A1' | 'A2';
  tag: string;
  summaryDe: string;
  summaryAr: string;
  summaryEn: string;
  summaryFr: string;
  keyRuleDe: string;
  keyRuleAr: string;
  keyRuleEn: string;
  keyRuleFr: string;
  examples: {
    de: string;
    ar: string;
    en: string;
    fr: string;
    highlight?: string;
  }[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export const GRAMMAR_SLIDES: GrammarSlide[] = [
  {
    id: 'artikel-genus',
    topicDe: 'Die 3 Artikel (der, die, das)',
    topicAr: 'أدوات التعريف الثلاث (المذكر، المؤنث، المحايد)',
    topicEn: 'The 3 Genders (der, die, das)',
    topicFr: 'Les 3 Genres (der, die, das)',
    level: 'A1',
    tag: 'Grundlagen',
    summaryDe: 'Jedes deutsche Nomen hat ein grammatikalisches Geschlecht: maskulin, feminin oder neutral.',
    summaryAr: 'كل اسم ألماني يمتلك جنساً قواعدياً: مذكر (der)، مؤنث (die) أو محايد (das).',
    summaryEn: 'Every German noun has a grammatical gender: masculine, feminine, or neuter.',
    summaryFr: 'Chaque nom allemand possède un genre grammatical : masculin, féminin ou neutre.',
    keyRuleDe: 'Signalendungen helfen: -ung, -heit, -keit sind IMMER feminin (die). -chen, -lein sind IMMER neutral (das). -ling, -or sind oft maskulin (der).',
    keyRuleAr: 'نهايات دلالية ذهبية: الكلمات المنتهية بـ ung, heit, keit هي دائماً مؤنثة (die). والمنتهية بـ chen هي محايدة (das).',
    keyRuleEn: 'Signaling endings: -ung, -heit, -keit are always feminine (die). -chen, -lein are always neuter (das).',
    keyRuleFr: 'Terminaisons repères : -ung, -heit, -keit sont toujours féminins (die). -chen est toujours neutre (das).',
    examples: [
      { de: 'der Tisch (maskulin)', ar: 'الطاولة (مذكر قواعدياً)', en: 'the table (masculine)', fr: 'la table (masculin en all.)', highlight: 'der' },
      { de: 'die Zeitung (feminin: -ung)', ar: 'الجريدة (مؤنث: تنتهي بـ ung)', en: 'the newspaper (fem.)', fr: 'le journal (fém.)', highlight: 'die' },
      { de: 'das Mädchen (neutral: -chen)', ar: 'الفتاة (محايد: تنتهي بـ chen)', en: 'the girl (neuter)', fr: 'la jeune fille (neutre)', highlight: 'das' },
    ],
    tableData: {
      headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutral', 'Plural'],
      rows: [
        ['Nominativ (Wer?)', 'der / ein', 'die / eine', 'das / ein', 'die / -'],
        ['Akkusativ (Wen?)', 'den / einen', 'die / eine', 'das / ein', 'die / -'],
        ['Dativ (Wem?)', 'dem / einem', 'der / einer', 'dem / einem', 'den / -n'],
      ],
    },
  },
  {
    id: 'akkusativ-objekt',
    topicDe: 'Der Akkusativ (Wen-Fall)',
    topicAr: 'حالة النصب (Akkusativ) مع المفعول به المباشر',
    topicEn: 'The Accusative Case (Direct Object)',
    topicFr: 'L’accusatif (Complément d’objet direct)',
    level: 'A1',
    tag: 'Kasus',
    summaryDe: 'Das direkte Objekt eines Satzes steht im Akkusativ. Nur der maskuline Artikel verändert sich!',
    summaryAr: 'المفعول به المباشر يأتي في حالة النصب Akkusativ. التغيير يطرأ فقط على المذكر (der يتحول إلى den)!',
    summaryEn: 'The direct object is in accusative. Only the masculine article changes (der → den, ein → einen)!',
    summaryFr: 'Le COD se met à l’accusatif. Seul le masculin change (der → den, ein → einen) !',
    keyRuleDe: 'Faustformel: der → DEN | ein → EINEN | kein → KEINEN. Die, Das und Plural bleiben unverändert.',
    keyRuleAr: 'القاعدة: der ← DEN | ein ← EINEN. باقي الأدوات die, das, die الجمع تبقى كما هي دون تغيير.',
    keyRuleEn: 'Formula: der → DEN | ein → EINEN. Feminine, neuter and plural do not change at all.',
    keyRuleFr: 'Formule : der → DEN | ein → EINEN. Féminin, neutre et pluriel restent inchangés.',
    examples: [
      { de: 'Ich kaufe DEN Kaffee.', ar: 'أنا أشتري القهوة (der أصبح den).', en: 'I buy the coffee.', fr: 'J’achète le café.', highlight: 'DEN' },
      { de: 'Sie liest DAS Buch.', ar: 'هي تقرأ الكتاب (das لم يتغير).', en: 'She reads the book.', fr: 'Elle lit le livre.', highlight: 'DAS' },
      { de: 'Wir trinken EINEN Saft.', ar: 'نحن نشرب عصيراً (ein أصبح einen).', en: 'We drink a juice.', fr: 'Nous buvons un jus.', highlight: 'EINEN' },
    ],
  },
  {
    id: 'dativ-verben',
    topicDe: 'Der Dativ & Dativ-Verben (helfen, danken)',
    topicAr: 'حالة المجرور Dativ والأفعال التي تأخذ Dativ',
    topicEn: 'The Dative Case & Dative Verbs',
    topicFr: 'Le datif & les verbes régissant le datif',
    level: 'A1',
    tag: 'Kasus',
    summaryDe: 'Bestimmte Verben verlangen immer den Dativ: helfen, danken, gefallen, gehören, schmecken.',
    summaryAr: 'أفعال مميزة تتطلب دائماً مجرور Dativ: يساعد (helfen)، يشكر (danken)، يعجب (gefallen).',
    summaryEn: 'Specific verbs always govern the dative case: help, thank, please, belong to, taste.',
    summaryFr: 'Certains verbes exigent toujours le datif : aider, remercier, plaire, appartenir.',
    keyRuleDe: 'der/das → DEM | die → DER | Plural → DEN + n am Nomenende.',
    keyRuleAr: 'تحولات الأدوات في الداتيف: der/das ← DEM | die ← DER | والجمع ← DEN مع إضافة n لاسم الجمع.',
    keyRuleEn: 'Dative changes: der/das → DEM | die → DER | plural → DEN (+n on noun).',
    keyRuleFr: 'Changements au datif : der/das → DEM | die → DER | pluriel → DEN (+n).',
    examples: [
      { de: 'Ich helfe DEM Mann.', ar: 'أنا أساعد الرجل (der أصبح dem).', en: 'I help the man.', fr: 'J’aide l’homme.', highlight: 'DEM' },
      { de: 'Wir danken DER Lehrerin.', ar: 'نحن نشكر المعلمة (die أصبحت der).', en: 'We thank the teacher.', fr: 'Nous remercions l’enseignante.', highlight: 'DER' },
      { de: 'Das Essen schmeckt DEN Kindern.', ar: 'الطعام يعجب الأطفال (den + n).', en: 'The food tastes good to the children.', fr: 'Le repas plaît aux enfants.', highlight: 'DEN' },
    ],
  },
  {
    id: 'nebensaetze-weil-dass',
    topicDe: 'Nebensätze mit „weil“ und „dass“',
    topicAr: 'الجمل التابعة مع weil و dass (الفعل في النهاية)',
    topicEn: 'Subordinate Clauses with "weil" and "dass"',
    topicFr: 'Propositions subordonnées avec « weil » et « dass »',
    level: 'A2',
    tag: 'Satzbau',
    summaryDe: 'In Nebensätzen mit Konjunktionen (weil, dass, wenn, ob) wandert das konjugierte Verb ganz ans Ende.',
    summaryAr: 'في الجمل التابعة التي تبدأ بروابط مثل weil, dass, wenn, ob ينتقل الفعل المصرف إلى نهاية الجملة تماماً.',
    summaryEn: 'In subordinate clauses introduced by weil, dass, wenn, ob, the conjugated verb moves to the very end.',
    summaryFr: 'Dans les subordonnées introduites par weil, dass, wenn, ob, le verbe conjugué va tout à la fin.',
    keyRuleDe: 'Hauptsatz, [Komma!] + weil/dass + Subjekt + ... + KONJUGIERTES VERB.',
    keyRuleAr: 'الصياغة: جملة رئيسية، [فاصلة] + الرابط + الفاعل + باقي الجملة + الفعل المصرف في النهاية.',
    keyRuleEn: 'Structure: Main clause, [comma!] + connector + subject + ... + CONJUGATED VERB.',
    keyRuleFr: 'Structure : Principale, [virgule] + conjonction + sujet + ... + VERBE CONJUGUÉ.',
    examples: [
      { de: 'Ich lerne Deutsch, WEIL ich in Berlin studieren MÖCHTE.', ar: 'أتعلم الألمانية لأنني أريد الدراسة في برلين.', en: 'I learn German because I want to study in Berlin.', fr: 'J’apprends l’allemand parce que j’aimerais étudier à Berlin.', highlight: 'MÖCHTE' },
      { de: 'Er sagt, DASS er morgen keine Zeit HAT.', ar: 'هو يقول إنه لا يملك وقتاً غداً.', en: 'He says that he has no time tomorrow.', fr: 'Il dit qu’il n’a pas de temps demain.', highlight: 'HAT' },
    ],
  },
  {
    id: 'wechselpraepositionen',
    topicDe: 'Wechselpräpositionen: Wo? vs. Wohin?',
    topicAr: 'حروف الجر المكانية المتغيرة: الحركة (Akk) والسكون (Dat)',
    topicEn: 'Two-Way Prepositions: Static (Dat) vs. Motion (Acc)',
    topicFr: 'Prépositions mixtes : Localisation (Dat) vs. Direction (Acc)',
    level: 'A2',
    tag: 'Präpositionen',
    summaryDe: '9 Präpositionen können Dativ oder Akkusativ verlangen: in, an, auf, neben, hinter, über, unter, vor, zwischen.',
    summaryAr: 'تسعة حروف جر تأخذ Dativ عند السكون والمكان الثابت (Wo)، وتأخذ Akkusativ عند الحركة والانتقال (Wohin).',
    summaryEn: '9 dual prepositions take Dative for static location (Wo?), and Accusative for motion towards a goal (Wohin?).',
    summaryFr: '9 prépositions prennent le datif pour le lieu fixe (Wo?), et l’accusatif pour le mouvement (Wohin?).',
    keyRuleDe: 'WO? = Dativ (stehen, liegen, hängen) | WOHIN? = Akkusativ (stellen, legen, hängen).',
    keyRuleAr: 'سؤال أين Wo؟ ← مجرور Dativ | سؤال إلى أين Wohin؟ ← منصوب Akkusativ.',
    keyRuleEn: 'WHERE? = Dative | WHERE TO? = Accusative.',
    keyRuleFr: 'OÙ ? = Datif | VERS OÙ ? = Accusatif.',
    examples: [
      { de: 'Das Buch liegt auf DEM Tisch. (Wo? -> Dativ)', ar: 'الكتاب موضوع على الطاولة (حالة ثبات: dem).', en: 'The book lies on the table.', fr: 'Le livre est sur la table.', highlight: 'DEM' },
      { de: 'Ich lege das Buch auf DEN Tisch. (Wohin? -> Akkusativ)', ar: 'أنا أضع الكتاب على الطاولة (حالة حركة: den).', en: 'I put the book on the table.', fr: 'Je pose le livre sur la table.', highlight: 'DEN' },
    ],
  },
];
