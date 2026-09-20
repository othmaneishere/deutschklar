import { LanguageMode } from '../types';

export interface StorySentence {
  id: string;
  de: string;
  en: string;
  fr: string;
  ar: string;
}

export interface GermanStory {
  id: string;
  titleDe: string;
  titleEn: string;
  titleFr: string;
  titleAr: string;
  level: 'A1' | 'A2';
  duration: string;
  category: 'Alltag' | 'Reise' | 'Freunde & Familie' | 'Einkaufen & Essen' | 'Beruf & Stadt';
  summaryDe: string;
  summaryEn: string;
  summaryFr: string;
  summaryAr: string;
  fullStoryDe: string;
  fullStoryEn: string;
  fullStoryFr: string;
  fullStoryAr: string;
  sentences: StorySentence[];
  keyVocabulary: {
    de: string;
    en: string;
    fr: string;
    ar: string;
  }[];
}

export const GERMAN_STORIES: GermanStory[] = [
  {
    id: 'story-1',
    titleDe: 'Ein Tag in Berlin',
    titleEn: 'A Day in Berlin',
    titleFr: 'Une journée à Berlin',
    titleAr: 'يوم في برلين',
    level: 'A1',
    duration: '2 Min.',
    category: 'Reise',
    summaryDe: 'Lukas steht früh auf, frühstückt im Café und spaziert zum Brandenburger Tor.',
    summaryEn: 'Lukas gets up early, eats breakfast in a café, and walks to the Brandenburg Gate.',
    summaryFr: 'Lukas se lève tôt, prend son petit-déjeuner dans un café et marche vers la porte de Brandebourg.',
    summaryAr: 'يستيقظ لوكاس مبكراً، ويتناول الإفطار في المقهى، ثم يسير إلى بوابة براندنبورغ.',
    fullStoryDe:
      'Lukas wacht um sieben Uhr auf. Die Sonne scheint über Berlin. Er geht in eine kleine Bäckerei und kauft zwei frische Brötchen und einen heißen Kaffee. Die Verkäuferin lächelt und sagt: „Guten Morgen! Einen schönen Tag noch!“ Danach nimmt Lukas die U-Bahn zum Brandenburger Tor. Viele Menschen aus der ganzen Welt machen dort Fotos. Lukas setzt sich auf eine Bank, trinkt seinen Kaffee und genießt den Morgen in der Hauptstadt.',
    fullStoryEn:
      'Lukas wakes up at seven o’clock. The sun is shining over Berlin. He goes to a small bakery and buys two fresh bread rolls and a hot coffee. The saleswoman smiles and says: "Good morning! Have a nice day!" Afterwards, Lukas takes the subway to the Brandenburg Gate. Many people from all over the world take photos there. Lukas sits down on a bench, drinks his coffee, and enjoys the morning in the capital city.',
    fullStoryFr:
      'Lukas se réveille à sept heures. Le soleil brille sur Berlin. Il va dans une petite boulangerie et achète deux petits pains frais et un café chaud. La vendeuse sourit et dit : « Bonjour ! Bonne journée ! » Ensuite, Lukas prend le métro jusqu’à la porte de Brandebourg. Beaucoup de gens du monde entier y prennent des photos. Lukas s’assoit sur un banc, boit son café et profite du matin dans la capitale.',
    fullStoryAr:
      'يستيقظ لوكاس في الساعة السابعة صباحاً. تشرق الشمس فوق برلين. يذهب إلى مخبز صغير ويشتري قطعتين من الخبز الطازج وفنجاناً من القهوة الساخنة. تبتسم البائعة وتقول: "صباح الخير! أتمنى لك يوماً جميلاً!" بعد ذلك يستقل لوكاس قطار الأنفاق إلى بوابة براندنبورغ. يلتقط العديد من الناس من جميع أنحاء العالم صوراً هناك. يجلس لوكاس على مقعد في الحديقة، ويشرب قهوته، ويستمتع بصباح جميل في العاصمة.',
    sentences: [
      {
        id: 's1-1',
        de: 'Lukas wacht um sieben Uhr auf.',
        en: 'Lukas wakes up at seven o’clock.',
        fr: 'Lukas se réveille à sept heures.',
        ar: 'يستيقظ لوكاس في تمام الساعة السابعة.',
      },
      {
        id: 's1-2',
        de: 'Die Sonne scheint über Berlin.',
        en: 'The sun is shining over Berlin.',
        fr: 'Le soleil brille sur Berlin.',
        ar: 'تشرق الشمس فوق برلين.',
      },
      {
        id: 's1-3',
        de: 'Er geht in eine kleine Bäckerei und kauft zwei frische Brötchen und einen heißen Kaffee.',
        en: 'He goes to a small bakery and buys two fresh bread rolls and a hot coffee.',
        fr: 'Il va dans une petite boulangerie et achète deux petits pains frais et un café chaud.',
        ar: 'يذهب إلى مخبز صغير ويشتري قطعتين من الخبز الطازج وقهوة ساخنة.',
      },
      {
        id: 's1-4',
        de: 'Die Verkäuferin lächelt und sagt: „Guten Morgen! Einen schönen Tag noch!“',
        en: 'The saleswoman smiles and says: "Good morning! Have a nice day!"',
        fr: 'La vendeuse sourit et dit : « Bonjour ! Bonne journée ! »',
        ar: 'تبتسم البائعة وتقول: "صباح الخير! يوماً سعيداً!"',
      },
      {
        id: 's1-5',
        de: 'Danach nimmt Lukas die U-Bahn zum Brandenburger Tor.',
        en: 'Afterwards, Lukas takes the subway to the Brandenburg Gate.',
        fr: 'Ensuite, Lukas prend le métro jusqu’à la porte de Brandebourg.',
        ar: 'بعد ذلك، يستقل لوكاس المترو إلى بوابة براندنبورغ.',
      },
      {
        id: 's1-6',
        de: 'Viele Menschen aus der ganzen Welt machen dort Fotos.',
        en: 'Many people from all over the world take photos there.',
        fr: 'Beaucoup de gens du monde entier y prennent des photos.',
        ar: 'يلتقط العديد من الأشخاص من جميع أنحاء العالم الصور هناك.',
      },
      {
        id: 's1-7',
        de: 'Lukas setzt sich auf eine Bank, trinkt seinen Kaffee und genießt den Morgen in der Hauptstadt.',
        en: 'Lukas sits down on a bench, drinks his coffee, and enjoys the morning in the capital.',
        fr: 'Lukas s’assoit sur un banc, boit son café et profite du matin dans la capitale.',
        ar: 'يجلس لوكاس على مقعد، ويشرب قهوته، ويستمتع بالصباح في العاصمة.',
      },
    ],
    keyVocabulary: [
      { de: 'aufwachen', en: 'to wake up', fr: 'se réveiller', ar: 'يستيقظ' },
      { de: 'die Bäckerei', en: 'bakery', fr: 'la boulangerie', ar: 'المخبز' },
      { de: 'das Brötchen', en: 'bread roll', fr: 'le petit pain', ar: 'قطعة الخبز الصغيرة' },
      { de: 'die U-Bahn', en: 'subway / metro', fr: 'le métro', ar: 'مترو الأنفاق' },
      { de: 'genießen', en: 'to enjoy', fr: 'profiter / savourer', ar: 'يستمتع' },
    ],
  },
  {
    id: 'story-2',
    titleDe: 'Im Supermarkt um die Ecke',
    titleEn: 'At the Corner Supermarket',
    titleFr: 'Au supermarché du coin',
    titleAr: 'في السوبرماركت عند زاوية الشارع',
    level: 'A1',
    duration: '2 Min.',
    category: 'Einkaufen & Essen',
    summaryDe: 'Sarah schreibt eine Einkaufsliste und kauft Obst, Gemüse und Milch für das Abendessen.',
    summaryEn: 'Sarah writes a grocery list and buys fruit, vegetables, and milk for dinner.',
    summaryFr: 'Sarah écrit une liste de courses et achète des fruits, des légumes et du lait pour le dîner.',
    summaryAr: 'تكتب سارة قائمة المشتريات وتشتري الفواكه والخضار والحليب لتحضير العشاء.',
    fullStoryDe:
      'Heute kocht Sarah für ihre Freunde. Sie nimmt einen Stift und schreibt einen Einkaufszettel: Äpfel, Bananen, Tomaten, Käse und Milch. Im Supermarkt nimmt sie einen Einkaufswagen. Sie sucht nach reifen Tomaten und frischem Basilikum. An der Kasse bezahlt sie mit ihrer Karte. Der Kassierer fragt: „Brauchen Sie den Beleg?“ Sarah antwortet freundlich: „Nein, danke. Schönen Feierabend!“ Sie packt alles in ihre Tasche und geht fröhlich nach Hause.',
    fullStoryEn:
      'Today Sarah is cooking for her friends. She takes a pen and writes a shopping list: apples, bananas, tomatoes, cheese, and milk. At the supermarket, she takes a shopping cart. She looks for ripe tomatoes and fresh basil. At the checkout, she pays with her card. The cashier asks: "Do you need the receipt?" Sarah replies kindly: "No, thank you. Have a nice evening!" She packs everything into her bag and walks home happily.',
    fullStoryFr:
      'Aujourd’hui, Sarah cuisine pour ses amis. Elle prend un stylo et rédige une liste de courses : pommes, bananes, tomates, fromage et lait. Au supermarché, elle prend un chariot. Elle cherche des tomates mûres et du basilic frais. À la caisse, elle paie avec sa carte. Le caissier demande : « Avez-vous besoin du ticket ? » Sarah répond gentiment : « Non, merci. Bonne soirée ! » Elle range tout dans son sac et rentre joyeusement chez elle.',
    fullStoryAr:
      'اليوم تطبخ سارة لأصدقائها. تأخذ قلماً وتكتب قائمة التسوق: تفاح، موز، طماطم، جبن وحليب. في السوبرماركت تأخذ عربة التسوق. تبحث عن طماطم ناضجة وريحان طازج. عند صندوق الدفع، تدفع ببطاقتها المصرفية. يسألها المحاسب: "هل تحتاجين إلى الإيصال؟" تجيب سارة بلطف: "لا، شكراً لك. أتمنى لك نهاية يوم عمل سعيدة!" تضع كل شيء في حقيبتها وتعود إلى منزلها مسرورة.',
    sentences: [
      {
        id: 's2-1',
        de: 'Heute kocht Sarah für ihre Freunde.',
        en: 'Today Sarah is cooking for her friends.',
        fr: 'Aujourd’hui, Sarah cuisine pour ses amis.',
        ar: 'اليوم تطبخ سارة لأصدقائها.',
      },
      {
        id: 's2-2',
        de: 'Sie nimmt einen Stift und schreibt einen Einkaufszettel: Äpfel, Bananen, Tomaten, Käse und Milch.',
        en: 'She takes a pen and writes a shopping list: apples, bananas, tomatoes, cheese, and milk.',
        fr: 'Elle prend un stylo et écrit une liste de courses : pommes, bananes, tomates, fromage et lait.',
        ar: 'تأخذ قلماً وتكتب قائمة مشتريات: تفاح، موز، طماطم، جبن وحليب.',
      },
      {
        id: 's2-3',
        de: 'Im Supermarkt nimmt sie einen Einkaufswagen.',
        en: 'At the supermarket, she takes a shopping cart.',
        fr: 'Au supermarché, elle prend un chariot.',
        ar: 'في السوبرماركت تأخذ عربة تسوق.',
      },
      {
        id: 's2-4',
        de: 'Sie sucht nach reifen Tomaten und frischem Basilikum.',
        en: 'She looks for ripe tomatoes and fresh basil.',
        fr: 'Elle cherche des tomates mûres et du basilic frais.',
        ar: 'تبحث عن طماطم ناضجة وريحان طازج.',
      },
      {
        id: 's2-5',
        de: 'An der Kasse bezahlt sie mit ihrer Karte.',
        en: 'At the checkout, she pays with her card.',
        fr: 'À la caisse, elle paie avec sa carte.',
        ar: 'عند الصندوق تدفع ببطاقتها.',
      },
      {
        id: 's2-6',
        de: 'Der Kassierer fragt: „Brauchen Sie den Beleg?“ Sarah antwortet freundlich: „Nein, danke. Schönen Feierabend!“',
        en: 'The cashier asks: "Do you need the receipt?" Sarah replies kindly: "No, thank you. Have a good evening!"',
        fr: 'Le caissier demande : « Avez-vous besoin du ticket ? » Sarah répond gentiment : « Non, merci. Bonne soirée ! »',
        ar: 'يسأل المحاسب: "هل تحتاجين إلى الإيصال؟" تجيب سارة بلطف: "لا، شكراً لك. أتمنى لك نهاية دوام سعيدة!"',
      },
      {
        id: 's2-7',
        de: 'Sie packt alles in ihre Tasche und geht fröhlich nach Hause.',
        en: 'She packs everything into her bag and goes home happily.',
        fr: 'Elle range tout dans son sac et rentre joyeusement chez elle.',
        ar: 'تضع كل شيء في حقيبتها وتذهب إلى المنزل بكل بهجة.',
      },
    ],
    keyVocabulary: [
      { de: 'der Einkaufszettel', en: 'shopping list', fr: 'la liste de courses', ar: 'قائمة التسوق' },
      { de: 'der Einkaufswagen', en: 'shopping cart', fr: 'le chariot', ar: 'عربة التسوق' },
      { de: 'die Kasse', en: 'checkout / cash register', fr: 'la caisse', ar: 'الصندوق / الكاشير' },
      { de: 'der Beleg / Kassenbon', en: 'receipt', fr: 'le ticket de caisse', ar: 'إيصال الشراء' },
      { de: 'der Feierabend', en: 'end of work / evening off', fr: 'la fin de journée de travail', ar: 'وقت الراحة بعد العمل' },
    ],
  },
  {
    id: 'story-3',
    titleDe: 'Ein gemütlicher Sonntag',
    titleEn: 'A Cozy Sunday',
    titleFr: 'Un dimanche agréable',
    titleAr: 'يوم أحد مريح ودافئ',
    level: 'A1',
    duration: '2 Min.',
    category: 'Alltag',
    summaryDe: 'Familie Weber frühstückt gemeinsam, liest Zeitung und macht einen Waldspaziergang.',
    summaryEn: 'The Weber family has breakfast together, reads the newspaper, and takes a walk in the woods.',
    summaryFr: 'La famille Weber prend son petit-déjeuner ensemble, lit le journal et fait une promenade en forêt.',
    summaryAr: 'تتناول عائلة فيبر الإفطار معاً، وتقرأ الصحيفة، وتخرج في نزهة لطيفة في الغابة.',
    fullStoryDe:
      'Am Sonntag klingelt kein Wecker. Familie Weber schläft lange. Um halb zehn decken die Kinder Mia und Paul den Tisch. Es gibt Orangensaft, gekochte Eier, Käse und Erdbeermarmelade. Vater Thomas liest ein Buch, und Mutter Julia hört leise Klaviermusik. Nach dem Frühstück zieht die Familie warme Jacken an. Sie machen einen langen Spaziergang im bunten Herbstwald. Die Luft ist frisch und sauber. Am Nachmittag trinken alle heißen Kakao zu Hause.',
    fullStoryEn:
      'On Sunday, no alarm clock rings. The Weber family sleeps in. At half past nine, the children Mia and Paul set the table. There is orange juice, boiled eggs, cheese, and strawberry jam. Father Thomas reads a book, and mother Julia listens to soft piano music. After breakfast, the family puts on warm jackets. They take a long walk in the colorful autumn forest. The air is fresh and clean. In the afternoon, everyone drinks hot cocoa at home.',
    fullStoryFr:
      'Le dimanche, aucun réveil ne sonne. La famille Weber fait la grasse matinée. À neuf heures et demie, les enfants Mia et Paul mettent la table. Il y a du jus d’orange, des œufs durs, du fromage et de la confiture de fraises. Le père Thomas lit un livre et la mère Julia écoute une douce musique au piano. Après le petit-déjeuner, la famille enfile des vestes chaudes. Ils font une longue promenade dans la forêt automnale colorée. L’air est frais et pur. L’après-midi, tout le monde boit du chocolat chaud à la maison.',
    fullStoryAr:
      'يوم الأحد لا يرن أي منبه. تنام عائلة فيبر حتى وقت متأخر. في التاسعة والنصف يرتب الطفلان ميا وباول مائدة الطعام. يوجد عصير برتقال، وبيض مسلوق، وجبن، ومربى فراولة. يقرأ الأب توماس كتاباً، وتستمع الأم يوليا إلى موسيقى بيانو هادئة. بعد الإفطار، ترتدي العائلة معاطف دافئة. يذهبون في نزهة طويلة في غابة الخريف الملونة. الهواء نقي وعليل. وفي فترة بعد الظهر يشربون جميعاً الشوكولاتة الساخنة في البيت.',
    sentences: [
      {
        id: 's3-1',
        de: 'Am Sonntag klingelt kein Wecker. Familie Weber schläft lange.',
        en: 'On Sunday no alarm rings. The Weber family sleeps late.',
        fr: 'Le dimanche, aucun réveil ne sonne. La famille Weber dort longtemps.',
        ar: 'يوم الأحد لا يرن أي منبه. تنام عائلة فيبر وقتاً طويلاً.',
      },
      {
        id: 's3-2',
        de: 'Um halb zehn decken die Kinder Mia und Paul den Tisch.',
        en: 'At half past nine, the children Mia and Paul set the table.',
        fr: 'À neuf heures et demie, les enfants Mia et Paul mettent la table.',
        ar: 'في تمام التاسعة والنصف يُعِدُّ الطفلان ميا وباول طاولة الطعام.',
      },
      {
        id: 's3-3',
        de: 'Es gibt Orangensaft, gekochte Eier, Käse und Erdbeermarmelade.',
        en: 'There is orange juice, boiled eggs, cheese, and strawberry jam.',
        fr: 'Il y a du jus d’orange, des œufs durs, du fromage et de la confiture de fraises.',
        ar: 'يوجد عصير برتقال، بيض مسلوق، جبن ومربى فراولة.',
      },
      {
        id: 's3-4',
        de: 'Vater Thomas liest ein Buch, und Mutter Julia hört leise Klaviermusik.',
        en: 'Father Thomas reads a book, and mother Julia listens to soft piano music.',
        fr: 'Le père Thomas lit un livre, et la mère Julia écoute une musique de piano douce.',
        ar: 'يقرأ الأب توماس كتاباً، وتستمع الأم يوليا لموسيقى بيانو هادئة.',
      },
      {
        id: 's3-5',
        de: 'Nach dem Frühstück zieht die Familie warme Jacken an.',
        en: 'After breakfast, the family puts on warm jackets.',
        fr: 'Après le petit-déjeuner, la famille met des vestes chaudes.',
        ar: 'بعد الإفطار ترتدي العائلة معاطف دافئة.',
      },
      {
        id: 's3-6',
        de: 'Sie machen einen langen Spaziergang im bunten Herbstwald.',
        en: 'They take a long walk in the colorful autumn forest.',
        fr: 'Ils font une longue promenade dans la forêt d’automne colorée.',
        ar: 'يخرجون في نزهة مشي طويلة في غابة الخريف الزاهية بالألوان.',
      },
      {
        id: 's3-7',
        de: 'Am Nachmittag trinken alle heißen Kakao zu Hause.',
        en: 'In the afternoon, everyone drinks hot cocoa at home.',
        fr: 'L’après-midi, tout le monde boit du chocolat chaud à la maison.',
        ar: 'وفي فترة بعد الظهر يشرب الجميع الكاكاو الساخن في المنزل.',
      },
    ],
    keyVocabulary: [
      { de: 'der Wecker', en: 'alarm clock', fr: 'le réveil', ar: 'المنبه' },
      { de: 'den Tisch decken', en: 'to set the table', fr: 'mettre la table', ar: 'يرتب طاولة الطعام' },
      { de: 'die Marmelade', en: 'jam / marmalade', fr: 'la confiture', ar: 'المربى' },
      { de: 'der Spaziergang', en: 'walk / stroll', fr: 'la promenade', ar: 'نزهة المشي' },
      { de: 'der Herbst', en: 'autumn / fall', fr: 'l’automne', ar: 'فصل الخريف' },
    ],
  },
  {
    id: 'story-4',
    titleDe: 'Im Café am Marktplatz',
    titleEn: 'At the Market Square Café',
    titleFr: 'Au café de la place du marché',
    titleAr: 'في المقهى عند ساحة السوق',
    level: 'A1',
    duration: '2 Min.',
    category: 'Einkaufen & Essen',
    summaryDe: 'Zwei Freunde treffen sich, bestellen Kaffee und Kuchen und unterhalten sich über das Wochenende.',
    summaryEn: 'Two friends meet, order coffee and cake, and chat about the weekend.',
    summaryFr: 'Deux amis se retrouvent, commandent du café et du gâteau, et discutent du week-end.',
    summaryAr: 'يلتقي صديقان، ويطلبان القهوة والكعك، ويتحدثان عن عطلة نهاية الأسبوع.',
    fullStoryDe:
      'Lena und Jonas verabreden sich um fünfzehn Uhr vor dem Café Schiller. Das Wetter ist angenehm, also sitzen sie draußen auf der Terrasse. Ein freundlicher Kellner kommt und bringt die Speisekarte: „Was darf es für Sie sein?“ Lena bestellt einen Cappuccino und ein Stück Apfelkuchen mit Sahne. Jonas nimmt ein Mineralwasser ohne Kohlensäure und ein Stück Schokoladentorte. Sie sprechen über ihre Deutschkurse und die Arbeit. Zum Schluss sagt Jonas: „Ich lade dich heute ein!“ Lena bedankt sich herzlich.',
    fullStoryEn:
      'Lena and Jonas arrange to meet at 3:00 PM in front of Café Schiller. The weather is pleasant, so they sit outside on the terrace. A friendly waiter arrives and brings the menu: "What can I get for you?" Lena orders a cappuccino and a slice of apple cake with cream. Jonas orders still mineral water and a piece of chocolate cake. They talk about their German classes and work. Finally, Jonas says: "It’s my treat today!" Lena thanks him warmly.',
    fullStoryFr:
      'Lena et Jonas se donnent rendez-vous à quinze heures devant le Café Schiller. Il fait bon, ils s’assoient donc dehors en terrasse. Un serveur aimable arrive avec le menu : « Que désirez-vous ? » Lena commande un cappuccino et une part de gâteau aux pommes avec de la crème. Jonas prend de l’eau minérale plate et une part de gâteau au chocolat. Ils parlent de leurs cours d’allemand et de leur travail. Pour finir, Jonas dit : « C’est moi qui t’invite aujourd’hui ! » Lena le remercie chaleureusement.',
    fullStoryAr:
      'يتفق لينا ويوناس على اللقاء في الساعة الثالثة بعد الظهر أمام مقهى شيلر. الطقس لطيف، ولذلك يجلسان بالخارج على الشرفة. يأتي نادل ودود ويحضر قائمة الطعام: "ماذا تحبان أن تطلبا؟" تطلب لينا كابتشينو وقطعة من فطيرة التفاح مع الكريمة. يطلب يوناس ماءً معدنياً بدون غازات وقطعة من كعكة الشوكولاتة. يتحدثان عن دروس اللغة الألمانية والعمل. في النهاية يقول يوناس: "أنا سأعزمك اليوم!" فتشكره لينا من كل قلبها.',
    sentences: [
      {
        id: 's4-1',
        de: 'Lena und Jonas verabreden sich um fünfzehn Uhr vor dem Café Schiller.',
        en: 'Lena and Jonas arrange to meet at 3:00 PM in front of Café Schiller.',
        fr: 'Lena et Jonas se donnent rendez-vous à 15h devant le Café Schiller.',
        ar: 'يلتقي لينا ويوناس في الساعة الثالثة بعد الظهر أمام مقهى شيلر.',
      },
      {
        id: 's4-2',
        de: 'Das Wetter ist angenehm, also sitzen sie draußen auf der Terrasse.',
        en: 'The weather is pleasant, so they sit outside on the terrace.',
        fr: 'Le temps est agréable, ils s’assoient donc dehors sur la terrasse.',
        ar: 'الطقس لطيف، ولذلك يجلسان في الخارج على الشرفة.',
      },
      {
        id: 's4-3',
        de: 'Ein freundlicher Kellner kommt und bringt die Speisekarte: „Was darf es für Sie sein?“',
        en: 'A friendly waiter comes and brings the menu: "What can I get for you?"',
        fr: 'Un serveur aimable arrive et apporte le menu : « Que désirez-vous ? »',
        ar: 'يأتي نادل ودود ويحضر قائمة الطعام قائلاً: "ماذا تودون أن تطلبوا؟"',
      },
      {
        id: 's4-4',
        de: 'Lena bestellt einen Cappuccino und ein Stück Apfelkuchen mit Sahne.',
        en: 'Lena orders a cappuccino and a slice of apple pie with cream.',
        fr: 'Lena commande un cappuccino et une part de gâteau aux pommes avec de la crème.',
        ar: 'تطلب لينا كابتشينو وقطعة من كعكة التفاح مع الكريمة.',
      },
      {
        id: 's4-5',
        de: 'Jonas nimmt ein Mineralwasser ohne Kohlensäure und ein Stück Schokoladentorte.',
        en: 'Jonas has still mineral water and a piece of chocolate cake.',
        fr: 'Jonas prend une eau minérale sans gaz et une part de gâteau au chocolat.',
        ar: 'يأخذ يوناس ماءً معدنياً بلا غازات وقطعة من تورتة الشوكولاتة.',
      },
      {
        id: 's4-6',
        de: 'Sie sprechen über ihre Deutschkurse und die Arbeit.',
        en: 'They talk about their German courses and work.',
        fr: 'Ils parlent de leurs cours d’allemand et de leur travail.',
        ar: 'يتحدثان عن دورات اللغة الألمانية والعمل.',
      },
      {
        id: 's4-7',
        de: 'Zum Schluss sagt Jonas: „Ich lade dich heute ein!“ Lena bedankt sich herzlich.',
        en: 'At the end Jonas says: "It’s my treat today!" Lena thanks him warmly.',
        fr: 'À la fin, Jonas dit : « C’est moi qui t’invite aujourd’hui ! » Lena le remercie chaleureusement.',
        ar: 'في النهاية يقول يوناس: "أنا أعزمكِ اليوم!" فتشكره لينا بحرارة.',
      },
    ],
    keyVocabulary: [
      { de: 'sich verabreden', en: 'to make an appointment / arrange to meet', fr: 'se donner rendez-vous', ar: 'يتواعد على لقاء' },
      { de: 'die Speisekarte', en: 'the menu', fr: 'la carte / le menu', ar: 'قائمة الطعام' },
      { de: 'bestellen', en: 'to order', fr: 'commander', ar: 'يطلب' },
      { de: 'ohne Kohlensäure', en: 'still (water) / non-carbonated', fr: 'sans gaz / plat', ar: 'بدون غازات (ماء هادئ)' },
      { de: 'einladen', en: 'to invite / treat someone', fr: 'inviter', ar: 'يعزم / يدعو' },
    ],
  },
  {
    id: 'story-5',
    titleDe: 'Die erste eigene Wohnung',
    titleEn: 'The First Own Apartment',
    titleFr: 'Le premier appartement personnel',
    titleAr: 'الشقة الأولى المستقلة',
    level: 'A2',
    duration: '3 Min.',
    category: 'Beruf & Stadt',
    summaryDe: 'Maxim zieht nach München und richtet mit Freunden sein neues Zimmer mit Möbeln ein.',
    summaryEn: 'Maxim moves to Munich and sets up his new room with furniture together with friends.',
    summaryFr: 'Maxim déménage à Munich et aménage sa nouvelle chambre avec des meubles grâce à ses amis.',
    summaryAr: 'ينتقل مكسيم إلى ميونيخ ويفرش غرفته الجديدة بالأثاث بمساعدة أصدقائه.',
    fullStoryDe:
      'Für sein Studium zieht Maxim von Hamburg nach München. Seine neue Wohnung liegt im zweiten Stock eines Altbaus. Das Wohnzimmer ist hell und hat zwei große Fenster. Am Samstag helfen ihm seine Freunde David und Anna beim Umzug. Sie tragen schwere Kartons die Treppe hoch. Zusammen bauen sie das Bett und einen großen Schreibtisch auf. Am Abend sitzen alle glücklich auf dem Teppich und essen Pizza aus dem Karton. Maxim sagt: „Vielen Dank für eure Hilfe! Jetzt fühle ich mich hier zu Hause.“',
    fullStoryEn:
      'For his studies, Maxim moves from Hamburg to Munich. His new apartment is on the second floor of an older building. The living room is bright and has two large windows. On Saturday, his friends David and Anna help him with the move. They carry heavy boxes up the stairs. Together they assemble the bed and a large desk. In the evening, everyone sits happily on the rug and eats pizza from the box. Maxim says: "Thank you so much for your help! Now I feel at home here."',
    fullStoryFr:
      'Pour ses études, Maxim déménage de Hambourg à Munich. Son nouvel appartement est situé au deuxième étage d’un vieil immeuble de charme. Le salon est lumineux et possède deux grandes fenêtres. Samedi, ses amis David et Anna l’aident à déménager. Ils montent de lourds cartons par les escaliers. Ensemble, ils montent le lit et un grand bureau. Le soir, tout le monde s’assoit joyeusement sur le tapis et mange une pizza dans sa boîte. Maxim dit : « Merci beaucoup pour votre aide ! Maintenant, je me sens chez moi ici. »',
    fullStoryAr:
      'من أجل دراسته الجامعية ينتقل مكسيم من هامبورغ إلى ميونيخ. تقع شقته الجديدة في الطابق الثاني من مبنى قديم ذي طراز جميل. غرفة المعيشة مضيئة وبها نافذتان كبيرتان. يوم السبت يساعده صديقاه دافيد وآنا في الانتقال. يحملون صناديق ثقيلة عبر الدرج. يركبون معاً السرير ومكتباً كبيراً. في المساء يجلس الجميع بسعادة على السجادة ويأكلون البيتزا من العلبة. يقول مكسيم: "شكراً جزيلاً لمساعدتكم! الآن أشعر أنني في بيتي هنا."',
    sentences: [
      {
        id: 's5-1',
        de: 'Für sein Studium zieht Maxim von Hamburg nach München.',
        en: 'For his university studies, Maxim moves from Hamburg to Munich.',
        fr: 'Pour ses études, Maxim déménage de Hambourg à Munich.',
        ar: 'من أجل دراسته الجامعية، ينتقل مكسيم من هامبورغ إلى ميونيخ.',
      },
      {
        id: 's5-2',
        de: 'Seine neue Wohnung liegt im zweiten Stock eines Altbaus.',
        en: 'His new apartment is on the second floor of an old building.',
        fr: 'Son nouvel appartement se trouve au deuxième étage d’un bâtiment ancien.',
        ar: 'تقع شقته الجديدة في الطابق الثاني من مبنى عريق.',
      },
      {
        id: 's5-3',
        de: 'Das Wohnzimmer ist hell und hat zwei große Fenster.',
        en: 'The living room is bright and has two big windows.',
        fr: 'Le salon est lumineux et possède deux grandes fenêtres.',
        ar: 'غرفة المعيشة مضيئة ولها نافذتان كبيرتان.',
      },
      {
        id: 's5-4',
        de: 'Am Samstag helfen ihm seine Freunde David und Anna beim Umzug.',
        en: 'On Saturday his friends David and Anna help him move.',
        fr: 'Samedi, ses amis David et Anna l’aident pour le déménagement.',
        ar: 'يوم السبت يساعده صديقاه دافيد وآنا في الانتقال.',
      },
      {
        id: 's5-5',
        de: 'Sie tragen schwere Kartons die Treppe hoch und bauen das Bett auf.',
        en: 'They carry heavy cardboard boxes up the stairs and assemble the bed.',
        fr: 'Ils portent de lourds cartons dans les escaliers et montent le lit.',
        ar: 'يحملون كراتين ثقيلة في الدرج ويركبون السرير.',
      },
      {
        id: 's5-6',
        de: 'Am Abend sitzen alle glücklich auf dem Teppich und essen Pizza.',
        en: 'In the evening everyone sits happily on the rug and eats pizza.',
        fr: 'Le soir, tout le monde s’assoit joyeusement sur le tapis et mange une pizza.',
        ar: 'في المساء يجلس الجميع سعداء على السجادة ويأكلون البيتزا.',
      },
      {
        id: 's5-7',
        de: 'Maxim sagt: „Vielen Dank für eure Hilfe! Jetzt fühle ich mich hier zu Hause.“',
        en: 'Maxim says: "Thank you so much for your help! Now I feel at home here."',
        fr: 'Maxim dit : « Merci beaucoup pour votre aide ! Maintenant je me sens chez moi ici. »',
        ar: 'يقول مكسيم: "شكراً جزيلاً لمساعدتكم! الآن أشعر وكأنني في بيتي هنا."',
      },
    ],
    keyVocabulary: [
      { de: 'umziehen', en: 'to relocate / move home', fr: 'déménager', ar: 'ينتقل إلى مسكن آخر' },
      { de: 'der Altbau', en: 'old-style vintage building', fr: 'bâtiment ancien', ar: 'مبنى كلاسيكي عريق' },
      { de: 'der Karton', en: 'cardboard moving box', fr: 'le carton', ar: 'صندوق كرتوني' },
      { de: 'aufbauen', en: 'to assemble / build up', fr: 'monter / assembler', ar: 'يركب / يجمع قطع الأثاث' },
      { de: 'sich zu Hause fühlen', en: 'to feel at home', fr: 'se sentir chez soi', ar: 'يشعر وكأنه في بيته' },
    ],
  },
  {
    id: 'story-6',
    titleDe: 'Die Zugreise in die Berge',
    titleEn: 'Train Journey into the Mountains',
    titleFr: 'Voyage en train dans les montagnes',
    titleAr: 'رحلة بالقطار إلى الجبال',
    level: 'A2',
    duration: '3 Min.',
    category: 'Reise',
    summaryDe: 'Miriam nimmt den Zug in die Alpen, genießt die Aussicht und wandert zu einer Berghütte.',
    summaryEn: 'Miriam takes the train to the Alps, enjoys the scenic view, and hikes to a mountain hut.',
    summaryFr: 'Miriam prend le train pour les Alpes, admire la vue panoramique et monte vers un refuge.',
    summaryAr: 'تستقل ميريام القطار إلى جبال الألب، وتستمتع بالمناظر الطبيعية الخلابة وتتنزه حتى كوخ جبلي.',
    fullStoryDe:
      'Am Freitagnachmittag packt Miriam ihren Rucksack. Sie reist für das Wochenende in die bayerischen Alpen. Am Hauptbahnhof steigt sie in den Regionalexpress ein. Der Zug fährt pünktlich ab. Während der Fahrt schaut Miriam aus dem Fenster: Zuerst sieht sie weite grüne Wiesen, später mächtige Berge mit Schnee auf den Gipfeln. Als der Zug im Dorf ankommt, atmet sie die klare Bergluft ein. Sie wandert zwei Stunden hinauf zu einer kleinen Hütte. Dort trinkt sie warme Milch und blickt über das ganze Tal.',
    fullStoryEn:
      'On Friday afternoon Miriam packs her backpack. She travels to the Bavarian Alps for the weekend. At the central station she boards the regional express train. The train departs right on time. During the ride Miriam looks out the window: first she sees wide green meadows, later mighty mountains with snow on their peaks. When the train arrives in the village, she breathes in the crisp mountain air. She hikes for two hours up to a small alpine cabin. There she drinks warm milk and gazes over the entire valley.',
    fullStoryFr:
      'Vendredi après-midi, Miriam prépare son sac à dos. Elle part pour le week-end dans les Alpes bavaroises. À la gare centrale, elle monte dans le train régional express. Le train part à l’heure précise. Pendant le trajet, Miriam regarde par la fenêtre : elle voit d’abord de vastes prairies verdoyantes, puis d’imposantes montagnes aux sommets enneigés. Lorsque le train arrive au village, elle respire l’air pur des montagnes. Elle marche deux heures jusqu’à un petit refuge. Là-bas, elle boit du lait chaud et contemple toute la vallée.',
    fullStoryAr:
      'بعد ظهر يوم الجمعة، تحزم ميريام حقيبة ظهرها. تسافر لقضاء عطلة نهاية الأسبوع في جبال الألب البافارية. في محطة القطار الرئيسية، تصعد إلى القطار الإقليمي السريع. ينطلق القطار في موعده بدقة. أثناء الرحلة، تنظر ميريام من النافذة: ترى أولاً مروجاً خضراء واسعة، ثم جبالاً مهيبة يعلو قممها الثلج. عندما يصل القطار إلى القرية، تتنفس هواء الجبل النقي. تصعد مشياً لمدة ساعتين حتى كوخ ريفي صغير. هناك تشرب حليباً دافئاً وتطل على الوادي بأكمله.',
    sentences: [
      {
        id: 's6-1',
        de: 'Am Freitagnachmittag packt Miriam ihren Rucksack für die Reise.',
        en: 'On Friday afternoon Miriam packs her backpack for the trip.',
        fr: 'Vendredi après-midi, Miriam prépare son sac à dos pour le voyage.',
        ar: 'بعد ظهر يوم الجمعة تحزم ميريام حقيبة ظهرها للرحلة.',
      },
      {
        id: 's6-2',
        de: 'Am Hauptbahnhof steigt sie in den Regionalexpress ein. Der Zug fährt pünktlich ab.',
        en: 'At the central station she boards the regional express. The train leaves on time.',
        fr: 'À la gare centrale, elle monte dans le train express régional. Le train part à l’heure.',
        ar: 'في محطة القطار المركزية تصعد إلى القطار السريع، وينطلق في موعده تماماً.',
      },
      {
        id: 's6-3',
        de: 'Während der Fahrt sieht sie weite grüne Wiesen und hohe Berge mit Schnee.',
        en: 'During the journey she sees wide green meadows and tall snowy mountains.',
        fr: 'Pendant le trajet, elle aperçoit de vastes prairies vertes et de hautes montagnes enneigées.',
        ar: 'أثناء الرحلة تشاهد مروجاً خضراء فسيحة وجبالاً شاهقة مكسوة بالثلج.',
      },
      {
        id: 's6-4',
        de: 'Als der Zug im Bergdorf ankommt, atmet sie die klare Bergluft ein.',
        en: 'When the train arrives in the mountain village, she breathes in the clean mountain air.',
        fr: 'Lorsque le train arrive dans le village de montagne, elle respire l’air pur des sommets.',
        ar: 'عندما يصل القطار إلى القرية الجبلية، تستنشق هواء الجبل العليل.',
      },
      {
        id: 's6-5',
        de: 'Sie wandert zwei Stunden hinauf zu einer kleinen Hütte.',
        en: 'She hikes for two hours up to a small cabin.',
        fr: 'Elle fait deux heures de randonnée jusqu’à un petit chalet.',
        ar: 'تمشي صعوداً لمدة ساعتين وصولاً إلى كوخ جبلي صغير.',
      },
      {
        id: 's6-6',
        de: 'Dort trinkt sie warme Milch und blickt über das ganze Tal.',
        en: 'There she drinks warm milk and looks over the whole valley.',
        fr: 'Là, elle boit du lait chaud et regarde toute la vallée.',
        ar: 'هناك تشرب حليباً دافئاً وتتأمل الوادي بأكمله.',
      },
    ],
    keyVocabulary: [
      { de: 'der Rucksack', en: 'backpack', fr: 'le sac à dos', ar: 'حقيبة الظهر' },
      { de: 'der Hauptbahnhof', en: 'central train station', fr: 'la gare centrale', ar: 'محطة القطار الرئيسية' },
      { de: 'pünktlich', en: 'punctual / on time', fr: 'ponctuel / à l’heure', ar: 'في الموعد المحدد' },
      { de: 'wandern', en: 'to hike', fr: 'faire de la randonnée', ar: 'يتنزه سيراً على الأقدام' },
      { de: 'die Hütte', en: 'cabin / lodge / hut', fr: 'le refuge / la cabane', ar: 'الكوخ الجبلي' },
    ],
  },
];
