import type { VocabCard, VocabTheme } from '../vocabThemesData';

// Explicitly authored lexical entries and examples. The decoder only unpacks
// fields; it never generates words, translations, inflections or sentences.
// kind | German | plural/principal parts | EN | AR | FR | example DE | EN | AR | FR
const kinds = { n: 'noun', v: 'verb', a: 'adjective', d: 'adverb', p: 'phrase' } as const;
function cards(theme: string, category: string, data: string): VocabCard[] {
  return data.trim().split('\n').map((line) => {
    const fields = line.trim().split('|');
    if (fields.length !== 10) throw new Error(`Invalid vocabulary row: ${line}`);
    const [type, de, inflection, en, ar, fr, exampleDe, exampleEn, exampleAr, exampleFr] = fields;
    const kind = kinds[type as keyof typeof kinds];
    if (!kind) throw new Error(`Unknown vocabulary type: ${type}`);
    const article = kind === 'noun' ? de.match(/^(der|die|das) /)?.[1] as VocabCard['article'] : undefined;
    if (kind === 'noun' && (!article || !inflection)) throw new Error(`Missing noun forms: ${de}`);
    return {
      id: `cx-${theme}-${encodeURIComponent(de)}`, kind, de, en, ar, fr,
      exampleDe, exampleEn, exampleAr, exampleFr, category,
      ...(article ? { article, plural: inflection } : {}),
      ...(kind === 'verb' ? { forms: inflection } : {}),
    };
  });
}

export const additions: Record<string, VocabCard[]> = {
  'essen-trinken': cards('essen', 'Lebensmittel & Geschmack', `
n|das Gemüse|kein Plural / nur Singular|vegetables|الخضروات|les légumes|Das Gemüse kommt frisch vom Markt.|The vegetables come fresh from the market.|الخضروات طازجة من السوق.|Les légumes viennent directement du marché.
n|das Obst|kein Plural / nur Singular|fruit|الفاكهة|les fruits|Wasch das Obst vor dem Essen.|Wash the fruit before eating it.|اغسل الفاكهة قبل أكلها.|Lave les fruits avant de les manger.
n|das Hähnchen|die Hähnchen|chicken|الدجاج|le poulet|Das Hähnchen ist noch im Ofen.|The chicken is still in the oven.|الدجاج لا يزال في الفرن.|Le poulet est encore au four.
n|die Gurke|die Gurken|cucumber|الخيار|le concombre|Für den Salat fehlt eine Gurke.|We need a cucumber for the salad.|تنقصنا خيارة للسلطة.|Il manque un concombre pour la salade.
n|die Karotte|die Karotten|carrot|الجزرة|la carotte|Ich schneide die Karotten in Scheiben.|I cut the carrots into slices.|أقطع الجزر إلى شرائح.|Je coupe les carottes en rondelles.
n|die Erdbeere|die Erdbeeren|strawberry|الفراولة|la fraise|Im Juni kaufen wir frische Erdbeeren.|In June we buy fresh strawberries.|في يونيو نشتري الفراولة الطازجة.|En juin, nous achetons des fraises fraîches.
n|der Reis|kein Plural / nur Singular|rice|الأرز|le riz|Der Reis braucht noch fünf Minuten.|The rice needs another five minutes.|يحتاج الأرز إلى خمس دقائق أخرى.|Le riz a besoin de cinq minutes de plus.
n|das Öl|die Öle|oil|الزيت|l’huile|Ein Löffel Öl reicht für die Pfanne.|One spoonful of oil is enough for the pan.|تكفي ملعقة زيت للمقلاة.|Une cuillère d’huile suffit pour la poêle.
a|scharf||spicy|حار المذاق|épicé|Die Soße ist mir zu scharf.|The sauce is too spicy for me.|الصلصة حارة أكثر مما أتحمل.|La sauce est trop épicée pour moi.
a|süß||sweet|حلو|sucré|Dieser Apfel schmeckt sehr süß.|This apple tastes very sweet.|طعم هذه التفاحة حلو جداً.|Cette pomme est très sucrée.
a|sauer||sour|حامض|acide|Die Zitrone ist wirklich sauer.|The lemon is really sour.|الليمونة حامضة حقاً.|Le citron est vraiment acide.
a|frisch||fresh|طازج|frais|Ist das Brot von heute und noch frisch?|Is the bread from today and still fresh?|هل الخبز من اليوم وما زال طازجاً؟|Le pain est-il d’aujourd’hui et encore frais ?
`),
  'wohnen-haushalt': cards('wohnen', 'Wohnen & Mieten', `
n|die Lampe|die Lampen|lamp|المصباح|la lampe|Neben meinem Bett steht eine Lampe.|There is a lamp beside my bed.|يوجد مصباح بجانب سريري.|Une lampe se trouve à côté de mon lit.
n|das Fenster|die Fenster|window|النافذة|la fenêtre|Mach bitte das Fenster zu.|Please close the window.|أغلق النافذة من فضلك.|Ferme la fenêtre, s’il te plaît.
n|die Tür|die Türen|door|الباب|la porte|Die Tür zum Keller ist abgeschlossen.|The door to the cellar is locked.|باب القبو مقفل.|La porte de la cave est fermée à clé.
n|der Mietvertrag|die Mietverträge|tenancy agreement|عقد الإيجار|le bail|Lies den Mietvertrag vor der Unterschrift.|Read the tenancy agreement before signing.|اقرأ عقد الإيجار قبل التوقيع.|Lis le bail avant de le signer.
n|die Hausordnung|die Hausordnungen|house rules|النظام الداخلي للمبنى|le règlement de l’immeuble|Die Hausordnung hängt im Treppenhaus.|The house rules are posted in the stairwell.|النظام الداخلي للمبنى معلق في الدرج.|Le règlement de l’immeuble est affiché dans l’escalier.
n|die Wohnungsbesichtigung|die Wohnungsbesichtigungen|apartment viewing|زيارة لمعاينة شقة|la visite d’appartement|Die Wohnungsbesichtigung dauert etwa zwanzig Minuten.|The apartment viewing takes about twenty minutes.|تستغرق معاينة الشقة حوالي عشرين دقيقة.|La visite d’appartement dure environ vingt minutes.
n|die Heizung|die Heizungen|heating system|التدفئة|le chauffage|Im Schlafzimmer funktioniert die Heizung nicht.|The heating is not working in the bedroom.|التدفئة لا تعمل في غرفة النوم.|Le chauffage ne fonctionne pas dans la chambre.
n|der Umzug|die Umzüge|move to another home|الانتقال إلى منزل آخر|le déménagement|Beim Umzug helfen uns drei Freunde.|Three friends are helping us with the move.|يساعدنا ثلاثة أصدقاء في الانتقال.|Trois amis nous aident pour le déménagement.
v|renovieren|renoviert · renovierte · hat renoviert|to renovate|يرمم|rénover|Wir renovieren die Küche im Sommer.|We are renovating the kitchen in summer.|نرمم المطبخ في الصيف.|Nous rénovons la cuisine en été.
v|umziehen|zieht um · zog um · ist umgezogen|to move home|ينتقل إلى منزل آخر|déménager|Nächsten Monat ziehen wir nach Köln um.|Next month we are moving to Cologne.|ننتقل الشهر المقبل إلى كولونيا.|Le mois prochain, nous déménageons à Cologne.
a|möbliert||furnished|مفروش|meublé|Das Zimmer wird möbliert vermietet.|The room is rented furnished.|تؤجر الغرفة مفروشة.|La chambre est louée meublée.
a|geräumig||spacious|واسع|spacieux|Die Wohnung ist klein, aber die Küche ist geräumig.|The apartment is small, but the kitchen is spacious.|الشقة صغيرة لكن المطبخ واسع.|L’appartement est petit, mais la cuisine est spacieuse.
`),
  'arbeit-beruf': cards('arbeit', 'Ausbildung & Arbeitsalltag', `
n|die Abteilung|die Abteilungen|department|القسم|le service|In welcher Abteilung arbeiten Sie?|Which department do you work in?|في أي قسم تعمل؟|Dans quel service travaillez-vous ?
n|die Berufsausbildung|die Berufsausbildungen|vocational training|التكوين المهني|la formation professionnelle|Meine Berufsausbildung beginnt im September.|My vocational training starts in September.|يبدأ تكويني المهني في سبتمبر.|Ma formation professionnelle commence en septembre.
n|das Praktikum|die Praktika|internship|التدريب العملي|le stage|Im Praktikum lerne ich die Abläufe kennen.|During the internship, I learn how things work.|أتعرف خلال التدريب العملي على سير العمل.|Pendant le stage, je découvre les procédures.
n|das Anschreiben|die Anschreiben|cover letter|رسالة التقدم لوظيفة|la lettre de motivation|Das Anschreiben sollte zur Stelle passen.|The cover letter should fit the position.|ينبغي أن تناسب رسالة التقدم الوظيفة.|La lettre de motivation doit correspondre au poste.
n|die Stellenanzeige|die Stellenanzeigen|job advertisement|إعلان وظيفة|l’offre d’emploi|Ich habe Ihre Stellenanzeige im Internet gefunden.|I found your job advertisement online.|وجدت إعلان وظيفتكم على الإنترنت.|J’ai trouvé votre offre d’emploi sur Internet.
n|das Arbeitszeugnis|die Arbeitszeugnisse|employment reference|شهادة تقييم العمل|le certificat de travail|Mein früherer Arbeitgeber schickt mir das Arbeitszeugnis.|My former employer is sending me my employment reference.|يرسل لي صاحب عملي السابق شهادة تقييم العمل.|Mon ancien employeur m’envoie mon certificat de travail.
n|die Schicht|die Schichten|work shift|وردية العمل|l’équipe de travail|Meine Schicht endet um zehn Uhr.|My shift ends at ten o’clock.|تنتهي ورديتي في العاشرة.|Mon service se termine à dix heures.
n|die Weiterbildung|die Weiterbildungen|further training|التدريب المستمر|la formation continue|Die Firma bezahlt meine Weiterbildung.|The company pays for my further training.|تدفع الشركة تكاليف تدريبي المستمر.|L’entreprise finance ma formation continue.
v|sich bewerben|bewirbt sich · bewarb sich · hat sich beworben|to apply for a job|يتقدم لوظيفة|postuler|Ich bewerbe mich um eine Ausbildungsstelle.|I am applying for a vocational training position.|أتقدم للحصول على مكان للتكوين المهني.|Je postule pour une place en apprentissage.
v|erledigen|erledigt · erledigte · hat erledigt|to take care of a task|ينجز|effectuer|Ich erledige diese Aufgabe noch heute.|I will finish this task today.|أنجز هذه المهمة اليوم.|Je termine cette tâche aujourd’hui.
a|zuständig||responsible for an area|مسؤول عن مجال معين|compétent|Wer ist für die Bestellungen zuständig?|Who is responsible for orders?|من المسؤول عن الطلبات؟|Qui s’occupe des commandes ?
p|Bescheid geben||to let someone know|يخبر شخصاً|prévenir|Gib mir bitte Bescheid, wenn du fertig bist.|Please let me know when you are finished.|أخبرني من فضلك عندما تنتهي.|Préviens-moi quand tu as terminé, s’il te plaît.
`),
  'gesundheit-medizin': cards('gesundheit', 'Körper & Behandlung', `
n|die Nase|die Nasen|nose|الأنف|le nez|Meine Nase ist seit gestern verstopft.|My nose has been blocked since yesterday.|أنفي مسدود منذ أمس.|J’ai le nez bouché depuis hier.
n|der Mund|die Münder|mouth|الفم|la bouche|Öffnen Sie bitte den Mund.|Please open your mouth.|افتح فمك من فضلك.|Ouvrez la bouche, s’il vous plaît.
n|der Arm|die Arme|arm|الذراع|le bras|Nach dem Sturz tut mein linker Arm weh.|My left arm hurts after the fall.|تؤلمني ذراعي اليسرى بعد السقوط.|Mon bras gauche me fait mal après la chute.
n|der Fuß|die Füße|foot|القدم|le pied|Ich kann den rechten Fuß kaum bewegen.|I can barely move my right foot.|بالكاد أستطيع تحريك قدمي اليمنى.|Je peux à peine bouger le pied droit.
n|die Salbe|die Salben|ointment|المرهم|la pommade|Die Apothekerin erklärt mir, wie ich die Salbe anwende.|The pharmacist explains how to use the ointment.|تشرح لي الصيدلانية كيفية استعمال المرهم.|La pharmacienne m’explique comment utiliser la pommade.
n|die Nebenwirkung|die Nebenwirkungen|side effect|الأثر الجانبي|l’effet secondaire|In der Packungsbeilage stehen mögliche Nebenwirkungen.|Possible side effects are listed in the leaflet.|الآثار الجانبية المحتملة مذكورة في النشرة.|Les effets secondaires possibles figurent dans la notice.
n|die Packungsbeilage|die Packungsbeilagen|package leaflet|النشرة الدوائية|la notice|Lesen Sie vor der Einnahme die Packungsbeilage.|Read the leaflet before taking the medicine.|اقرأ النشرة الدوائية قبل تناول الدواء.|Lisez la notice avant de prendre le médicament.
n|die Allergie|die Allergien|allergy|الحساسية|l’allergie|Haben Sie eine Allergie gegen bestimmte Medikamente?|Are you allergic to any medicines?|هل لديك حساسية تجاه أدوية معينة؟|Avez-vous une allergie à certains médicaments ?
n|der Verband|die Verbände|bandage|الضماد|le pansement|Die Ärztin wechselt den Verband.|The doctor changes the bandage.|تغير الطبيبة الضماد.|La médecin change le pansement.
a|rezeptfrei||available without a prescription|متاح دون وصفة طبية|sans ordonnance|Ist dieses Medikament rezeptfrei erhältlich?|Is this medicine available without a prescription?|هل هذا الدواء متاح دون وصفة طبية؟|Ce médicament est-il disponible sans ordonnance ?
a|rezeptpflichtig||requiring a prescription|يتطلب وصفة طبية|sur ordonnance|Diese Tabletten sind rezeptpflichtig.|These tablets require a prescription.|تتطلب هذه الأقراص وصفة طبية.|Ces comprimés nécessitent une ordonnance.
p|Gute Besserung!||Get well soon!|أتمنى لك الشفاء العاجل!|Bon rétablissement !|Du bist krank? Gute Besserung!|You are ill? Get well soon!|أنت مريض؟ أتمنى لك الشفاء العاجل!|Tu es malade ? Bon rétablissement !
`),
  'stadt-verkehr': cards('verkehr', 'Unterwegs', `
n|der Bahnsteig|die Bahnsteige|platform|رصيف المحطة|le quai|Der Zug hält am gegenüberliegenden Bahnsteig.|The train stops at the opposite platform.|يتوقف القطار عند الرصيف المقابل.|Le train s’arrête au quai d’en face.
n|der Fahrkartenautomat|die Fahrkartenautomaten|ticket machine|آلة بيع التذاكر|le distributeur de billets|Der Fahrkartenautomat nimmt keine Münzen an.|The ticket machine does not accept coins.|آلة بيع التذاكر لا تقبل العملات المعدنية.|Le distributeur de billets n’accepte pas les pièces.
n|die Durchsage|die Durchsagen|announcement|الإعلان عبر مكبر الصوت|l’annonce|Wegen des Lärms habe ich die Durchsage nicht verstanden.|I did not understand the announcement because of the noise.|لم أفهم الإعلان بسبب الضجيج.|Je n’ai pas compris l’annonce à cause du bruit.
n|der Anschluss|die Anschlüsse|connecting service|وسيلة النقل التالية في الرحلة|la correspondance|In Mannheim haben wir nur fünf Minuten für den Anschluss.|In Mannheim we have only five minutes to make our connection.|لدينا في مانهايم خمس دقائق فقط للحاق بوسيلة النقل التالية.|À Mannheim, nous avons seulement cinq minutes pour la correspondance.
n|die Brücke|die Brücken|bridge|الجسر|le pont|Über diese Brücke kommen Sie zum Bahnhof.|Cross this bridge to get to the station.|اعبر هذا الجسر للوصول إلى المحطة.|Traversez ce pont pour rejoindre la gare.
n|der Radweg|die Radwege|cycle path|مسار الدراجات|la piste cyclable|Der Radweg führt direkt zum See.|The cycle path leads straight to the lake.|يؤدي مسار الدراجات مباشرة إلى البحيرة.|La piste cyclable mène directement au lac.
n|die Umleitung|die Umleitungen|diversion|الطريق البديل|la déviation|Wegen der Baustelle gibt es eine Umleitung.|There is a diversion because of the construction site.|هناك طريق بديل بسبب الأشغال.|Il y a une déviation à cause du chantier.
n|die Einbahnstraße|die Einbahnstraßen|one-way street|شارع باتجاه واحد|la rue à sens unique|Hier darfst du nicht abbiegen, das ist eine Einbahnstraße.|You cannot turn here; it is a one-way street.|لا يمكنك الانعطاف هنا، فهذا شارع باتجاه واحد.|Tu ne peux pas tourner ici, c’est une rue à sens unique.
v|umsteigen|steigt um · stieg um · ist umgestiegen|to change trains or buses|يبدل وسيلة النقل|changer de train ou de bus|In Frankfurt müssen wir umsteigen.|We have to change in Frankfurt.|علينا تبديل وسيلة النقل في فرانكفورت.|Nous devons changer à Francfort.
v|abbiegen|biegt ab · bog ab · ist abgebogen|to turn|ينعطف|tourner|Biegen Sie an der nächsten Ampel links ab.|Turn left at the next traffic light.|انعطف يساراً عند الإشارة الضوئية التالية.|Tournez à gauche au prochain feu.
d|geradeaus||straight ahead|إلى الأمام مباشرة|tout droit|Gehen Sie zweihundert Meter geradeaus.|Go straight ahead for two hundred metres.|سر إلى الأمام مباشرة لمسافة مئتي متر.|Allez tout droit sur deux cents mètres.
p|im Stau stehen||to be stuck in traffic|يكون عالقاً في ازدحام مروري|être coincé dans les embouteillages|Wir stehen seit einer halben Stunde im Stau.|We have been stuck in traffic for half an hour.|نحن عالقون في الازدحام منذ نصف ساعة.|Nous sommes coincés dans les embouteillages depuis une demi-heure.
`),
  'einkaufen-kleidung': cards('einkaufen', 'Kleidung & Bestellungen', `
n|die Baumwolle|kein Plural / nur Singular|cotton|القطن|le coton|Das Hemd besteht aus reiner Baumwolle.|The shirt is made of pure cotton.|القميص مصنوع من القطن الخالص.|La chemise est en coton pur.
n|die Wolle|kein Plural / nur Singular|wool|الصوف|la laine|Diese Wolle fühlt sich weich an.|This wool feels soft.|هذا الصوف ناعم الملمس.|Cette laine est douce au toucher.
n|der Reißverschluss|die Reißverschlüsse|zipper|السحاب|la fermeture éclair|Der Reißverschluss meiner Jacke klemmt.|The zipper on my jacket is stuck.|سحاب سترتي عالق.|La fermeture éclair de ma veste est coincée.
n|der Warenkorb|die Warenkörbe|shopping basket|سلة المشتريات|le panier|Im Warenkorb liegen noch zwei Artikel.|There are still two items in the basket.|لا يزال في سلة المشتريات منتجان.|Il reste deux articles dans le panier.
n|die Lieferadresse|die Lieferadressen|delivery address|عنوان التوصيل|l’adresse de livraison|Bitte prüfen Sie Ihre Lieferadresse.|Please check your delivery address.|تحقق من عنوان التوصيل من فضلك.|Veuillez vérifier votre adresse de livraison.
n|die Rückgabe|die Rückgaben|return of goods|إرجاع المشتريات|le retour|Für die Rückgabe brauche ich den Kassenbon.|I need the receipt to return the goods.|أحتاج إلى الإيصال لإرجاع المشتريات.|J’ai besoin du ticket de caisse pour le retour.
v|anprobieren|probiert an · probierte an · hat anprobiert|to try on|يجرب ملابس|essayer|Darf ich den Mantel anprobieren?|May I try on the coat?|هل يمكنني تجربة المعطف؟|Puis-je essayer le manteau ?
v|umtauschen|tauscht um · tauschte um · hat umgetauscht|to exchange goods|يستبدل المشتريات|échanger|Ich möchte diese Hose gegen eine größere umtauschen.|I would like to exchange these trousers for a larger pair.|أود استبدال هذا السروال بآخر أكبر.|Je voudrais échanger ce pantalon contre une taille plus grande.
a|gestreift||striped|مخطط|rayé|Das gestreifte Hemd gefällt mir.|I like the striped shirt.|يعجبني القميص المخطط.|La chemise rayée me plaît.
a|kariert||checked|ذو نقشة مربعات|à carreaux|Sie trägt einen karierten Schal.|She is wearing a checked scarf.|ترتدي وشاحاً ذا نقشة مربعات.|Elle porte une écharpe à carreaux.
a|preiswert||good value|بسعر مناسب|abordable|Die Schuhe sind bequem und preiswert.|The shoes are comfortable and good value.|الحذاء مريح وبسعر مناسب.|Les chaussures sont confortables et abordables.
a|beschädigt||damaged|تالف|endommagé|Das Paket ist beschädigt angekommen.|The parcel arrived damaged.|وصل الطرد تالفاً.|Le colis est arrivé endommagé.
`),
};

Object.assign(additions, {
  'behoerden-alltag': cards('behoerden', 'Dokumente & Verwaltung', `
n|das Bürgeramt|die Bürgerämter|citizens’ registration office|مكتب شؤون المواطنين|le bureau des citoyens|Für die Anmeldung brauche ich einen Termin beim Bürgeramt.|I need an appointment at the citizens’ office to register.|أحتاج إلى موعد في مكتب شؤون المواطنين للتسجيل.|J’ai besoin d’un rendez-vous au bureau des citoyens pour m’inscrire.
n|die Vollmacht|die Vollmachten|power of attorney|التوكيل|la procuration|Mit dieser Vollmacht darf meine Schwester das Dokument abholen.|With this power of attorney, my sister may collect the document.|يحق لأختي استلام الوثيقة بموجب هذا التوكيل.|Avec cette procuration, ma sœur peut retirer le document.
n|das Aktenzeichen|die Aktenzeichen|file reference number|رقم الملف|le numéro de dossier|Geben Sie bei Rückfragen bitte das Aktenzeichen an.|Please quote the file reference number when making enquiries.|اذكر رقم الملف عند الاستفسار من فضلك.|Veuillez indiquer le numéro de dossier pour toute question.
n|der Bescheid|die Bescheide|official decision notice|الإشعار بالقرار الرسمي|la notification de décision|Der Bescheid kommt nächste Woche mit der Post.|The decision notice will arrive by post next week.|يصل الإشعار بالقرار بالبريد الأسبوع المقبل.|La notification de décision arrivera par courrier la semaine prochaine.
n|die Kopie|die Kopien|copy|النسخة|la copie|Bitte bringen Sie eine Kopie Ihres Ausweises mit.|Please bring a copy of your ID.|أحضر نسخة من وثيقة هويتك من فضلك.|Veuillez apporter une copie de votre pièce d’identité.
n|das Original|die Originale|original document|الوثيقة الأصلية|l’original|Das Original bekommen Sie sofort zurück.|You will get the original back immediately.|ستسترجع الوثيقة الأصلية فوراً.|Vous récupérerez l’original immédiatement.
n|die Anlage|die Anlagen|attachment to a document|المرفق|la pièce jointe|Die fehlende Anlage sende ich Ihnen morgen.|I will send you the missing attachment tomorrow.|أرسل لكم المرفق الناقص غداً.|Je vous enverrai la pièce jointe manquante demain.
n|die Bearbeitungszeit|die Bearbeitungszeiten|processing time|مدة معالجة الطلب|le délai de traitement|Die Bearbeitungszeit beträgt etwa zwei Wochen.|The processing time is about two weeks.|تبلغ مدة معالجة الطلب حوالي أسبوعين.|Le délai de traitement est d’environ deux semaines.
v|unterschreiben|unterschreibt · unterschrieb · hat unterschrieben|to sign|يوقع|signer|Bitte unterschreiben Sie unten rechts.|Please sign at the bottom right.|وقع أسفل اليمين من فضلك.|Veuillez signer en bas à droite.
v|ausfüllen|füllt aus · füllte aus · hat ausgefüllt|to fill in|يملأ استمارة|remplir|Füllen Sie bitte alle Felder aus.|Please fill in every field.|املأ جميع الخانات من فضلك.|Veuillez remplir tous les champs.
`),
  'familie-beziehungen': cards('familie', 'Familie & Miteinander', `
n|die Freundschaft|die Freundschaften|friendship|الصداقة|l’amitié|Unsere Freundschaft besteht seit der Schulzeit.|Our friendship dates back to our school days.|تعود صداقتنا إلى أيام المدرسة.|Notre amitié remonte à l’école.
n|die Beziehung|die Beziehungen|relationship|العلاقة|la relation|Eine gute Beziehung braucht Vertrauen.|A good relationship needs trust.|تحتاج العلاقة الجيدة إلى الثقة.|Une bonne relation a besoin de confiance.
n|der Kompromiss|die Kompromisse|compromise|الحل الوسط|le compromis|Wir haben einen Kompromiss für die Ferien gefunden.|We have found a compromise for the holidays.|توصلنا إلى حل وسط بشأن العطلة.|Nous avons trouvé un compromis pour les vacances.
n|die Erinnerung|die Erinnerungen|memory|الذكرى|le souvenir|Dieses Foto weckt schöne Erinnerungen.|This photo brings back happy memories.|تثير هذه الصورة ذكريات جميلة.|Cette photo rappelle de beaux souvenirs.
n|die Kindheit|kein Plural / nur Singular|childhood|الطفولة|l’enfance|Meine Kindheit habe ich auf dem Land verbracht.|I spent my childhood in the countryside.|قضيت طفولتي في الريف.|J’ai passé mon enfance à la campagne.
n|der Cousin|die Cousins|male cousin|ابن العم أو الخال|le cousin|Mein Cousin besucht uns am Sonntag.|My cousin is visiting us on Sunday.|يزورنا ابن عمي يوم الأحد.|Mon cousin nous rend visite dimanche.
n|die Tante|die Tanten|aunt|العمة أو الخالة|la tante|Meine Tante wohnt in derselben Straße.|My aunt lives on the same street.|تسكن خالتي في الشارع نفسه.|Ma tante habite dans la même rue.
n|der Onkel|die Onkel|uncle|العم أو الخال|l’oncle|Mein Onkel holt die Kinder von der Schule ab.|My uncle picks up the children from school.|يصطحب خالي الأطفال من المدرسة.|Mon oncle va chercher les enfants à l’école.
v|aufwachsen|wächst auf · wuchs auf · ist aufgewachsen|to grow up|ينشأ|grandir|Ich bin mit zwei Geschwistern aufgewachsen.|I grew up with two siblings.|نشأت مع اثنين من إخوتي.|J’ai grandi avec deux frères et sœurs.
v|vermissen|vermisst · vermisste · hat vermisst|to miss someone|يشتاق إلى|manquer de quelqu’un|Seit meinem Umzug vermisse ich meine Familie.|I have missed my family since moving.|أشتاق إلى عائلتي منذ انتقالي.|Ma famille me manque depuis mon déménagement.
`),
  'freizeit-hobbys': cards('freizeit', 'Aktivitäten & Kultur', `
n|der Verein|die Vereine|club or association|النادي أو الجمعية|l’association|Ich möchte einem Sportverein beitreten.|I would like to join a sports club.|أود الانضمام إلى ناد رياضي.|Je voudrais rejoindre un club de sport.
n|der Mitgliedsbeitrag|die Mitgliedsbeiträge|membership fee|رسوم العضوية|la cotisation|Den Mitgliedsbeitrag bezahlen wir einmal im Jahr.|We pay the membership fee once a year.|ندفع رسوم العضوية مرة في السنة.|Nous payons la cotisation une fois par an.
n|die Ausstellung|die Ausstellungen|exhibition|المعرض|l’exposition|Die Ausstellung zeigt Fotos aus unserer Stadt.|The exhibition shows photos of our city.|يعرض المعرض صوراً لمدينتنا.|L’exposition présente des photos de notre ville.
n|die Bühne|die Bühnen|stage|خشبة المسرح|la scène|Die Musiker kommen jetzt auf die Bühne.|The musicians are coming onto the stage now.|يصعد الموسيقيون الآن إلى خشبة المسرح.|Les musiciens montent maintenant sur scène.
n|die Eintrittskarte|die Eintrittskarten|admission ticket|تذكرة الدخول|le billet d’entrée|Die Eintrittskarten liegen schon bereit.|The tickets are already ready.|تذاكر الدخول جاهزة بالفعل.|Les billets d’entrée sont déjà prêts.
n|das Gemälde|die Gemälde|painting|اللوحة الفنية|le tableau|Dieses Gemälde zeigt einen Hafen im Winter.|This painting shows a harbour in winter.|تصور هذه اللوحة ميناء في الشتاء.|Ce tableau représente un port en hiver.
v|wandern|wandert · wanderte · ist gewandert|to hike|يمارس المشي في الطبيعة|faire de la randonnée|Am Wochenende wandern wir durch den Wald.|At the weekend we hike through the forest.|في عطلة نهاية الأسبوع نمشي عبر الغابة.|Le week-end, nous faisons une randonnée dans la forêt.
v|fotografieren|fotografiert · fotografierte · hat fotografiert|to take photographs|يصور|photographier|Im Urlaub fotografiere ich gern alte Gebäude.|On holiday I enjoy photographing old buildings.|أحب تصوير المباني القديمة في العطلة.|En vacances, j’aime photographier les vieux bâtiments.
v|joggen|joggt · joggte · ist gejoggt|to jog|يمارس الجري الخفيف|faire du jogging|Vor der Arbeit jogge ich eine halbe Stunde.|Before work I jog for half an hour.|أمارس الجري الخفيف نصف ساعة قبل العمل.|Avant le travail, je fais une demi-heure de jogging.
p|ausverkauft sein||to be sold out|يكون قد نفد بالكامل|être complet|Das Konzert ist leider schon ausverkauft.|Unfortunately, the concert is already sold out.|للأسف نفدت تذاكر الحفل بالفعل.|Malheureusement, le concert est déjà complet.
`),
  'reisen-urlaub': cards('reisen', 'Reiseplanung & Unterkunft', `
n|die Buchungsbestätigung|die Buchungsbestätigungen|booking confirmation|تأكيد الحجز|la confirmation de réservation|Die Buchungsbestätigung habe ich auf meinem Handy.|I have the booking confirmation on my phone.|لدي تأكيد الحجز على هاتفي.|J’ai la confirmation de réservation sur mon téléphone.
n|die Übernachtung|die Übernachtungen|overnight stay|المبيت|la nuitée|Eine Übernachtung kostet hier achtzig Euro.|An overnight stay costs eighty euros here.|يكلف المبيت هنا ثمانين يورو.|Une nuitée coûte ici quatre-vingts euros.
n|die Touristeninformation|die Touristeninformationen|tourist information office|مكتب المعلومات السياحية|l’office de tourisme|Bei der Touristeninformation bekommen wir einen Stadtplan.|We can get a city map at the tourist information office.|نحصل على خريطة المدينة من مكتب المعلومات السياحية.|Nous obtenons un plan de la ville à l’office de tourisme.
n|der Mietwagen|die Mietwagen|rental car|سيارة للإيجار|la voiture de location|Den Mietwagen geben wir am Flughafen zurück.|We return the rental car at the airport.|نعيد سيارة الإيجار في المطار.|Nous rendons la voiture de location à l’aéroport.
n|die Sicherheitskontrolle|die Sicherheitskontrollen|security check|التفتيش الأمني|le contrôle de sécurité|Vor der Sicherheitskontrolle trinken wir das Wasser aus.|We finish our water before the security check.|نشرب ما تبقى من الماء قبل التفتيش الأمني.|Nous finissons notre eau avant le contrôle de sécurité.
n|die Fluggesellschaft|die Fluggesellschaften|airline|شركة الطيران|la compagnie aérienne|Die Fluggesellschaft hat unsere Abflugzeit geändert.|The airline has changed our departure time.|غيرت شركة الطيران وقت إقلاعنا.|La compagnie aérienne a changé notre heure de départ.
n|das Fundbüro|die Fundbüros|lost property office|مكتب المفقودات|le bureau des objets trouvés|Frag im Fundbüro nach deinem Rucksack.|Ask at the lost property office about your backpack.|اسأل عن حقيبتك في مكتب المفقودات.|Renseigne-toi au bureau des objets trouvés pour ton sac à dos.
v|stornieren|storniert · stornierte · hat storniert|to cancel a booking|يلغي حجزاً|annuler une réservation|Bis Freitag können Sie kostenlos stornieren.|You can cancel free of charge until Friday.|يمكنك إلغاء الحجز مجاناً حتى الجمعة.|Vous pouvez annuler gratuitement jusqu’à vendredi.
v|umbuchen|bucht um · buchte um · hat umgebucht|to change a booking|يعدل الحجز|modifier une réservation|Wir müssen den Flug auf Montag umbuchen.|We have to change our flight to Monday.|علينا تعديل حجز الرحلة إلى الاثنين.|Nous devons reporter notre vol à lundi.
p|das Gepäck aufgeben||to check in luggage|يسلم الأمتعة للشحن|enregistrer les bagages|Zuerst geben wir das Gepäck auf.|First we check in our luggage.|نسلم الأمتعة للشحن أولاً.|Nous enregistrons d’abord nos bagages.
`),
  'natur-wetter': cards('natur', 'Wetter & Umwelt', `
n|das Gewitter|die Gewitter|thunderstorm|العاصفة الرعدية|l’orage|Wegen des Gewitters bleiben wir zu Hause.|We are staying home because of the thunderstorm.|نبقى في المنزل بسبب العاصفة الرعدية.|Nous restons à la maison à cause de l’orage.
n|der Nebel|kein Plural / nur Singular|fog|الضباب|le brouillard|Im dichten Nebel fahren wir langsam.|We drive slowly in the thick fog.|نسير ببطء في الضباب الكثيف.|Nous roulons lentement dans le brouillard épais.
n|der Blitz|die Blitze|lightning bolt|البرق|l’éclair|Ein heller Blitz erleuchtet den Himmel.|A bright lightning bolt lights up the sky.|تضيء السماء ومضة برق ساطعة.|Un éclair lumineux illumine le ciel.
n|die Wettervorhersage|die Wettervorhersagen|weather forecast|توقعات الطقس|les prévisions météo|Laut Wettervorhersage wird es morgen sonnig.|According to the forecast, it will be sunny tomorrow.|بحسب توقعات الطقس سيكون الجو مشمساً غداً.|Selon les prévisions météo, il fera beau demain.
n|die Hitzewelle|die Hitzewellen|heatwave|موجة الحر|la vague de chaleur|Während der Hitzewelle sind die Nächte sehr warm.|The nights are very warm during the heatwave.|الليالي دافئة جداً خلال موجة الحر.|Les nuits sont très chaudes pendant la vague de chaleur.
n|der Restmüll|kein Plural / nur Singular|residual household waste|النفايات المنزلية غير القابلة لإعادة التدوير|les déchets résiduels|Der Restmüll kommt in die graue Tonne.|Residual waste goes in the grey bin.|توضع النفايات غير القابلة لإعادة التدوير في الحاوية الرمادية.|Les déchets résiduels vont dans la poubelle grise.
n|das Altpapier|kein Plural / nur Singular|waste paper for recycling|الورق المستعمل لإعادة التدوير|le papier à recycler|Wir sammeln das Altpapier in einer Kiste.|We collect waste paper in a box.|نجمع الورق المستعمل في صندوق.|Nous collectons le papier à recycler dans une caisse.
n|der Wertstoffhof|die Wertstoffhöfe|recycling centre|مركز إعادة التدوير|la déchèterie|Den kaputten Stuhl bringen wir zum Wertstoffhof.|We take the broken chair to the recycling centre.|نأخذ الكرسي المكسور إلى مركز إعادة التدوير.|Nous apportons la chaise cassée à la déchèterie.
a|bewölkt||cloudy|غائم|nuageux|Heute ist es bewölkt, aber trocken.|Today it is cloudy but dry.|الجو اليوم غائم لكنه جاف.|Aujourd’hui, le temps est nuageux mais sec.
a|wechselhaft||changeable|متقلب|variable|Im April ist das Wetter oft wechselhaft.|The weather is often changeable in April.|غالباً ما يكون الطقس متقلباً في أبريل.|En avril, le temps est souvent variable.
`),
  'gefuehle-charakter': cards('gefuehle', 'Eigenschaften & Verhalten', `
n|die Eigenschaft|die Eigenschaften|character trait|الصفة الشخصية|le trait de caractère|Geduld ist eine wichtige Eigenschaft für diesen Beruf.|Patience is an important quality for this job.|الصبر صفة مهمة لهذه المهنة.|La patience est une qualité importante pour ce métier.
n|das Vorbild|die Vorbilder|role model|القدوة|le modèle|Meine ältere Schwester ist mein Vorbild.|My older sister is my role model.|أختي الكبرى هي قدوتي.|Ma grande sœur est mon modèle.
a|zuverlässig||reliable|موثوق به|fiable|Auf meinen zuverlässigen Kollegen kann ich mich verlassen.|I can depend on my reliable colleague.|يمكنني الاعتماد على زميلي الموثوق به.|Je peux compter sur mon collègue fiable.
a|hilfsbereit||helpful|متعاون|serviable|Unsere Nachbarin ist sehr hilfsbereit.|Our neighbour is very helpful.|جارتنا متعاونة جداً.|Notre voisine est très serviable.
a|ehrgeizig||ambitious|طموح|ambitieux|Sie ist ehrgeizig und möchte sich weiterbilden.|She is ambitious and wants further training.|هي طموحة وتريد مواصلة تدريبها.|Elle est ambitieuse et veut se former davantage.
a|geduldig||patient|صبور|patient|Der Lehrer erklärt alles noch einmal geduldig.|The teacher patiently explains everything again.|يشرح المعلم كل شيء مرة أخرى بصبر.|Le professeur explique patiemment tout encore une fois.
a|großzügig||generous|كريم|généreux|Mein großzügiger Onkel lädt uns zum Essen ein.|My generous uncle invites us to dinner.|يدعونا عمي الكريم إلى العشاء.|Mon oncle généreux nous invite à dîner.
a|schüchtern||shy|خجول|timide|Als Kind war ich sehr schüchtern.|I was very shy as a child.|كنت خجولاً جداً في طفولتي.|J’étais très timide quand j’étais enfant.
a|selbstbewusst||self-confident|واثق من نفسه|sûr de soi|Beim Gespräch wirkt sie ruhig und selbstbewusst.|During the conversation she seems calm and confident.|تبدو هادئة وواثقة من نفسها أثناء الحديث.|Pendant la conversation, elle semble calme et sûre d’elle.
a|rücksichtsvoll||considerate|مراع لمشاعر الآخرين|attentionné|Sei bitte rücksichtsvoll, die Kinder schlafen schon.|Please be considerate; the children are already asleep.|راع الآخرين من فضلك، فالأطفال نائمون بالفعل.|Sois attentionné, les enfants dorment déjà.
`),
  'kommunikation-medien': cards('medien', 'Technik & Nachrichten', `
n|das Tablet|die Tablets|tablet computer|الحاسوب اللوحي|la tablette|Auf dem Tablet lese ich die Zeitung.|I read the newspaper on the tablet.|أقرأ الصحيفة على الحاسوب اللوحي.|Je lis le journal sur la tablette.
n|der Drucker|die Drucker|printer|الطابعة|l’imprimante|Dem Drucker fehlt Papier.|The printer is out of paper.|نفد الورق من الطابعة.|L’imprimante n’a plus de papier.
n|der Akku|die Akkus|rechargeable battery|البطارية القابلة للشحن|la batterie|Mein Akku ist fast leer.|My battery is almost empty.|بطاريتي شبه فارغة.|Ma batterie est presque vide.
n|die Datei|die Dateien|file|الملف|le fichier|Speichere die Datei unter einem neuen Namen.|Save the file under a new name.|احفظ الملف باسم جديد.|Enregistre le fichier sous un nouveau nom.
n|die Benachrichtigung|die Benachrichtigungen|notification|الإشعار|la notification|Ich habe die Benachrichtigungen ausgeschaltet.|I have turned off notifications.|أوقفت الإشعارات.|J’ai désactivé les notifications.
n|der Podcast|die Podcasts|podcast|البودكاست|le podcast|Auf dem Weg zur Arbeit höre ich einen Podcast.|On my way to work I listen to a podcast.|أستمع إلى بودكاست في طريقي إلى العمل.|Sur le chemin du travail, j’écoute un podcast.
n|die Schlagzeile|die Schlagzeilen|headline|العنوان الرئيسي للخبر|le titre de presse|Die Schlagzeile macht mich neugierig.|The headline makes me curious.|يثير عنوان الخبر فضولي.|Le titre de presse éveille ma curiosité.
n|der Kommentar|die Kommentare|comment|التعليق|le commentaire|Unter dem Artikel stehen viele Kommentare.|There are many comments below the article.|هناك تعليقات كثيرة أسفل المقال.|Il y a de nombreux commentaires sous l’article.
v|herunterladen|lädt herunter · lud herunter · hat heruntergeladen|to download|ينزل ملفاً|télécharger|Du kannst das Formular kostenlos herunterladen.|You can download the form for free.|يمكنك تنزيل الاستمارة مجاناً.|Tu peux télécharger le formulaire gratuitement.
v|überprüfen|überprüft · überprüfte · hat überprüft|to check|يتحقق من|vérifier|Überprüfe die Quelle, bevor du die Nachricht teilst.|Check the source before sharing the news.|تحقق من المصدر قبل مشاركة الخبر.|Vérifie la source avant de partager la nouvelle.
`),
  'bildung-lernen': cards('bildung', 'Studium & Deutschlernen', `
n|die Vorlesung|die Vorlesungen|university lecture|المحاضرة الجامعية|le cours magistral|Die Vorlesung beginnt um neun Uhr.|The lecture starts at nine o’clock.|تبدأ المحاضرة في التاسعة.|Le cours magistral commence à neuf heures.
n|das Seminar|die Seminare|seminar|الحلقة الدراسية|le séminaire|Im Seminar diskutieren wir den Text.|We discuss the text in the seminar.|نناقش النص في الحلقة الدراسية.|Nous discutons du texte pendant le séminaire.
n|das Stipendium|die Stipendien|scholarship|المنحة الدراسية|la bourse d’études|Mit dem Stipendium kann ich mein Studium finanzieren.|The scholarship allows me to finance my studies.|تتيح لي المنحة الدراسية تمويل دراستي.|La bourse me permet de financer mes études.
n|der Studiengang|die Studiengänge|degree programme|التخصص الجامعي|le cursus universitaire|Dieser Studiengang dauert sechs Semester.|This degree programme lasts six semesters.|يستغرق هذا التخصص الجامعي ستة فصول دراسية.|Ce cursus universitaire dure six semestres.
n|die Karteikarte|die Karteikarten|flashcard|بطاقة المراجعة|la fiche de révision|Auf jeder Karteikarte steht ein neues Wort.|Each flashcard has a new word on it.|تحتوي كل بطاقة مراجعة على كلمة جديدة.|Chaque fiche de révision contient un nouveau mot.
n|der Fehler|die Fehler|mistake|الخطأ|l’erreur|Aus diesem Fehler habe ich viel gelernt.|I learned a lot from this mistake.|تعلمت كثيراً من هذا الخطأ.|J’ai beaucoup appris de cette erreur.
n|die Aussprache|kein Plural / nur Singular|pronunciation|النطق|la prononciation|Ich übe die Aussprache mit kurzen Aufnahmen.|I practise pronunciation with short recordings.|أتدرب على النطق باستخدام تسجيلات قصيرة.|Je travaille la prononciation avec de courts enregistrements.
v|wiederholen|wiederholt · wiederholte · hat wiederholt|to repeat or revise|يكرر أو يراجع|répéter ou réviser|Abends wiederhole ich die neuen Wörter.|In the evening I revise the new words.|أراجع الكلمات الجديدة في المساء.|Le soir, je révise les nouveaux mots.
v|korrigieren|korrigiert · korrigierte · hat korrigiert|to correct|يصحح|corriger|Die Lehrerin korrigiert meinen Aufsatz.|The teacher corrects my essay.|تصحح المعلمة موضوعي الإنشائي.|La professeure corrige ma rédaction.
p|auswendig lernen||to learn by heart|يحفظ عن ظهر قلب|apprendre par cœur|Ich lerne das Gedicht auswendig.|I am learning the poem by heart.|أحفظ القصيدة عن ظهر قلب.|J’apprends le poème par cœur.
`),
  'zeit-kalender': cards('zeit', 'Wochentage & Zeitangaben', `
n|der Montag|die Montage|Monday|الاثنين|le lundi|Am Montag beginnt mein neuer Kurs.|My new course starts on Monday.|تبدأ دورتي الجديدة يوم الاثنين.|Mon nouveau cours commence lundi.
n|der Dienstag|die Dienstage|Tuesday|الثلاثاء|le mardi|Dienstag ist bei uns Markttag.|Tuesday is market day where we live.|الثلاثاء هو يوم السوق عندنا.|Le mardi est jour de marché chez nous.
n|der Mittwoch|die Mittwoche|Wednesday|الأربعاء|le mercredi|Die Praxis bleibt am Mittwoch geschlossen.|The practice is closed on Wednesday.|تبقى العيادة مغلقة يوم الأربعاء.|Le cabinet est fermé mercredi.
n|der Donnerstag|die Donnerstage|Thursday|الخميس|le jeudi|Bis Donnerstag muss der Bericht fertig sein.|The report must be finished by Thursday.|يجب أن يكون التقرير جاهزاً بحلول الخميس.|Le rapport doit être terminé pour jeudi.
n|der Freitag|die Freitage|Friday|الجمعة|le vendredi|Am Freitag fahre ich zu meinen Eltern.|On Friday I am going to my parents’ house.|أذهب إلى منزل والدي يوم الجمعة.|Vendredi, je vais chez mes parents.
n|der Samstag|die Samstage|Saturday|السبت|le samedi|Diesen Samstag haben wir nichts vor.|We have no plans this Saturday.|ليست لدينا خطط هذا السبت.|Nous n’avons rien de prévu ce samedi.
n|der Sonntag|die Sonntage|Sunday|الأحد|le dimanche|Am Sonntag schlafen wir etwas länger.|On Sunday we sleep a little longer.|ننام وقتاً أطول قليلاً يوم الأحد.|Le dimanche, nous dormons un peu plus longtemps.
d|damals||back then|آنذاك|à l’époque|Damals wohnte ich noch bei meinen Eltern.|Back then I still lived with my parents.|كنت آنذاك لا أزال أسكن مع والدي.|À l’époque, j’habitais encore chez mes parents.
d|plötzlich||suddenly|فجأة|soudain|Plötzlich ging das Licht aus.|Suddenly the light went out.|انطفأ الضوء فجأة.|Soudain, la lumière s’est éteinte.
d|anschließend||afterwards|بعد ذلك|ensuite|Wir essen zuerst und gehen anschließend spazieren.|We eat first and go for a walk afterwards.|نأكل أولاً ثم نذهب في نزهة.|Nous mangeons d’abord et nous nous promenons ensuite.
`),
  'post-finanzen': cards('post', 'Versand & Bezahlung', `
n|die Postleitzahl|die Postleitzahlen|postcode|الرمز البريدي|le code postal|Auf dem Umschlag fehlt die Postleitzahl.|The postcode is missing from the envelope.|الرمز البريدي غير موجود على الظرف.|Le code postal manque sur l’enveloppe.
n|der Umschlag|die Umschläge|envelope|الظرف|l’enveloppe|Die Unterlagen passen in diesen Umschlag.|The documents fit in this envelope.|تتسع هذه الوثائق في هذا الظرف.|Les documents tiennent dans cette enveloppe.
n|die Sendungsverfolgung|die Sendungsverfolgungen|shipment tracking|تتبع الشحنة|le suivi de colis|Mit der Sendungsverfolgung sehe ich, wo das Paket ist.|With shipment tracking I can see where the parcel is.|أستطيع معرفة مكان الطرد عبر تتبع الشحنة.|Le suivi me permet de voir où se trouve le colis.
n|die Packstation|die Packstationen|parcel locker station|محطة خزائن الطرود|la consigne à colis|Mein Paket liegt in der Packstation am Bahnhof.|My parcel is in the parcel locker at the station.|طردي في خزانة الطرود عند المحطة.|Mon colis se trouve dans la consigne à la gare.
n|die Quittung|die Quittungen|receipt|الإيصال|le reçu|Könnte ich bitte eine Quittung bekommen?|Could I have a receipt, please?|هل يمكنني الحصول على إيصال من فضلك؟|Puis-je avoir un reçu, s’il vous plaît ?
n|die Gutschrift|die Gutschriften|credit to an account|المبلغ المقيد لصالح الحساب|le crédit sur le compte|Die Gutschrift erscheint auf Ihrem nächsten Kontoauszug.|The credit will appear on your next bank statement.|يظهر المبلغ المقيد لصالحك في كشف حسابك التالي.|Le crédit apparaîtra sur votre prochain relevé bancaire.
n|der Kontoauszug|die Kontoauszüge|bank statement|كشف الحساب البنكي|le relevé bancaire|Ich prüfe jeden Monat meinen Kontoauszug.|I check my bank statement every month.|أراجع كشف حسابي البنكي كل شهر.|Je vérifie mon relevé bancaire chaque mois.
v|abheben|hebt ab · hob ab · hat abgehoben|to withdraw money|يسحب المال|retirer de l’argent|Ich möchte fünfzig Euro abheben.|I would like to withdraw fifty euros.|أود سحب خمسين يورو.|Je voudrais retirer cinquante euros.
v|überweisen|überweist · überwies · hat überwiesen|to transfer money|يحول المال|virer de l’argent|Bitte überweisen Sie den Betrag bis Freitag.|Please transfer the amount by Friday.|حول المبلغ بحلول الجمعة من فضلك.|Veuillez virer le montant avant vendredi.
p|mit Karte zahlen||to pay by card|يدفع بالبطاقة|payer par carte|Kann ich hier mit Karte zahlen?|Can I pay by card here?|هل يمكنني الدفع بالبطاقة هنا؟|Puis-je payer par carte ici ?
`),
  'tiere-haustiere': cards('tiere', 'Tiere & Tierpflege', `
n|das Kaninchen|die Kaninchen|rabbit|الأرنب|le lapin|Unser Kaninchen frisst gerade eine Karotte.|Our rabbit is eating a carrot.|أرنبنا يأكل جزرة الآن.|Notre lapin mange une carotte.
n|der Hamster|die Hamster|hamster|الهامستر|le hamster|Der Hamster schläft tagsüber.|The hamster sleeps during the day.|ينام الهامستر نهاراً.|Le hamster dort pendant la journée.
n|die Maus|die Mäuse|mouse|الفأر|la souris|Eine kleine Maus läuft durch den Garten.|A little mouse runs through the garden.|يجري فأر صغير في الحديقة.|Une petite souris traverse le jardin.
n|die Kuh|die Kühe|cow|البقرة|la vache|Die Kühe stehen auf der Weide.|The cows are in the pasture.|تقف الأبقار في المرعى.|Les vaches sont dans le pré.
n|das Schaf|die Schafe|sheep|الخروف|le mouton|Auf dem Hügel grasen Schafe.|Sheep are grazing on the hill.|ترعى الخراف على التل.|Des moutons paissent sur la colline.
n|die Ente|die Enten|duck|البطة|le canard|Die Enten schwimmen auf dem Teich.|The ducks are swimming on the pond.|يسبح البط في البركة.|Les canards nagent sur l’étang.
n|die Biene|die Bienen|bee|النحلة|l’abeille|Eine Biene fliegt von Blüte zu Blüte.|A bee flies from flower to flower.|تطير نحلة من زهرة إلى أخرى.|Une abeille vole de fleur en fleur.
n|die Leine|die Leinen|leash|مقود الحيوان|la laisse|Bitte halten Sie Ihren Hund an der Leine.|Please keep your dog on a leash.|أبق كلبك مربوطاً بالمقود من فضلك.|Veuillez tenir votre chien en laisse.
v|füttern|füttert · fütterte · hat gefüttert|to feed an animal|يطعم حيواناً|nourrir un animal|Ich füttere die Katze morgens und abends.|I feed the cat in the morning and evening.|أطعم القطة صباحاً ومساءً.|Je nourris le chat matin et soir.
p|Gassi gehen||to walk the dog|يخرج للتنزه مع الكلب|promener le chien|Nach der Arbeit gehe ich mit unserem Hund Gassi.|After work I take our dog for a walk.|أخرج للتنزه مع كلبنا بعد العمل.|Après le travail, je promène notre chien.
`),
});

function theme(id: string, titleDe: string, titleEn: string, titleAr: string, titleFr: string, icon: string, data: string): VocabTheme {
  return { id, titleDe, titleEn, titleAr, titleFr, icon, level: 'A2',
    descriptionDe: titleDe, descriptionEn: titleEn, descriptionAr: titleAr, descriptionFr: titleFr,
    cards: cards(id, titleDe, data),
  };
}

export const newThemes: VocabTheme[] = [
  theme('kochen-putzen', 'Kochen, Küchenutensilien & Putzen', 'Cooking, kitchen utensils & cleaning', 'الطبخ وأدوات المطبخ والتنظيف', 'Cuisine, ustensiles & ménage', 'Utensils', `
n|der Kochtopf|die Kochtöpfe|cooking pot|قدر الطبخ|la casserole|Der große Kochtopf steht auf dem Herd.|The large pot is on the cooker.|قدر الطبخ الكبير على الموقد.|La grande casserole est sur la cuisinière.
n|die Pfanne|die Pfannen|frying pan|المقلاة|la poêle|Erhitze etwas Öl in der Pfanne.|Heat a little oil in the pan.|سخن قليلاً من الزيت في المقلاة.|Fais chauffer un peu d’huile dans la poêle.
n|der Deckel|die Deckel|lid|الغطاء|le couvercle|Setz den Deckel auf den Topf.|Put the lid on the pot.|ضع الغطاء على القدر.|Pose le couvercle sur la casserole.
n|das Messer|die Messer|knife|السكين|le couteau|Mit diesem Messer schneide ich Brot.|I cut bread with this knife.|أقطع الخبز بهذه السكين.|Je coupe le pain avec ce couteau.
n|die Gabel|die Gabeln|fork|الشوكة|la fourchette|Mir fehlt noch eine Gabel.|I still need a fork.|ما زلت أحتاج إلى شوكة.|Il me manque encore une fourchette.
n|der Löffel|die Löffel|spoon|الملعقة|la cuillère|Rühr den Joghurt mit einem Löffel um.|Stir the yoghurt with a spoon.|حرك الزبادي بملعقة.|Remue le yaourt avec une cuillère.
n|das Schneidebrett|die Schneidebretter|chopping board|لوح التقطيع|la planche à découper|Leg das Gemüse auf das Schneidebrett.|Put the vegetables on the chopping board.|ضع الخضروات على لوح التقطيع.|Pose les légumes sur la planche à découper.
n|das Sieb|die Siebe|sieve or colander|المصفاة|la passoire|Gieß die Nudeln in ein Sieb.|Drain the pasta into a colander.|صف المعكرونة في المصفاة.|Égoutte les pâtes dans une passoire.
n|die Schüssel|die Schüsseln|bowl|الوعاء|le saladier|Der Salat kommt in eine große Schüssel.|The salad goes in a large bowl.|توضع السلطة في وعاء كبير.|La salade va dans un grand saladier.
n|das Backblech|die Backbleche|baking tray|صينية الفرن|la plaque de cuisson|Die Kekse liegen auf dem Backblech.|The biscuits are on the baking tray.|قطع البسكويت على صينية الفرن.|Les biscuits sont sur la plaque de cuisson.
n|die Zutat|die Zutaten|ingredient|المكون|l’ingrédient|Hast du alle Zutaten für die Suppe?|Do you have all the ingredients for the soup?|هل لديك جميع مكونات الحساء؟|As-tu tous les ingrédients pour la soupe ?
n|der Schwamm|die Schwämme|sponge|الإسفنجة|l’éponge|Wisch den Tisch mit einem feuchten Schwamm ab.|Wipe the table with a damp sponge.|امسح الطاولة بإسفنجة رطبة.|Essuie la table avec une éponge humide.
n|der Besen|die Besen|broom|المكنسة|le balai|Der Besen steht hinter der Tür.|The broom is behind the door.|المكنسة خلف الباب.|Le balai est derrière la porte.
n|der Eimer|die Eimer|bucket|الدلو|le seau|Füll den Eimer mit warmem Wasser.|Fill the bucket with warm water.|املأ الدلو بماء دافئ.|Remplis le seau d’eau tiède.
n|der Staubsauger|die Staubsauger|vacuum cleaner|المكنسة الكهربائية|l’aspirateur|Der Staubsauger ist ziemlich laut.|The vacuum cleaner is quite loud.|المكنسة الكهربائية صاخبة إلى حد ما.|L’aspirateur est assez bruyant.
n|das Spülmittel|die Spülmittel|washing-up liquid|سائل غسل الأطباق|le liquide vaisselle|Wir brauchen neues Spülmittel.|We need more washing-up liquid.|نحتاج إلى سائل جديد لغسل الأطباق.|Nous avons besoin de liquide vaisselle.
v|kochen|kocht · kochte · hat gekocht|to cook|يطبخ|cuisiner|Heute koche ich für meine Freunde.|Today I am cooking for my friends.|أطبخ اليوم لأصدقائي.|Aujourd’hui, je cuisine pour mes amis.
v|schneiden|schneidet · schnitt · hat geschnitten|to cut|يقطع|couper|Schneide die Zwiebel in kleine Stücke.|Cut the onion into small pieces.|قطع البصلة إلى قطع صغيرة.|Coupe l’oignon en petits morceaux.
v|schälen|schält · schälte · hat geschält|to peel|يقشر|éplucher|Ich schäle die Kartoffeln vor dem Kochen.|I peel the potatoes before cooking them.|أقشر البطاطس قبل طبخها.|J’épluche les pommes de terre avant la cuisson.
v|anbraten|brät an · briet an · hat angebraten|to brown in a pan|يحمر في المقلاة|faire revenir|Brate zuerst die Zwiebeln kurz an.|First brown the onions briefly.|حمر البصل قليلاً أولاً.|Fais d’abord revenir brièvement les oignons.
v|umrühren|rührt um · rührte um · hat umgerührt|to stir|يحرك|remuer|Rühr die Suppe regelmäßig um.|Stir the soup regularly.|حرك الحساء بانتظام.|Remue la soupe régulièrement.
v|würzen|würzt · würzte · hat gewürzt|to season|يتبل|assaisonner|Ich würze das Gemüse mit etwas Salz.|I season the vegetables with a little salt.|أتبل الخضروات بقليل من الملح.|J’assaisonne les légumes avec un peu de sel.
v|abschmecken|schmeckt ab · schmeckte ab · hat abgeschmeckt|to taste and adjust seasoning|يتذوق لضبط التتبيل|rectifier l’assaisonnement|Vor dem Servieren schmecke ich die Soße ab.|Before serving, I taste the sauce and adjust the seasoning.|أتذوق الصلصة لضبط التتبيل قبل التقديم.|Avant de servir, je rectifie l’assaisonnement de la sauce.
v|spülen|spült · spülte · hat gespült|to wash dishes|يغسل الأطباق|faire la vaisselle|Nach dem Essen spüle ich die Teller.|After the meal I wash the plates.|أغسل الأطباق بعد الوجبة.|Après le repas, je lave les assiettes.
v|putzen|putzt · putzte · hat geputzt|to clean|ينظف|nettoyer|Am Samstag putzen wir das Bad.|On Saturday we clean the bathroom.|ننظف الحمام يوم السبت.|Le samedi, nous nettoyons la salle de bains.
v|aufräumen|räumt auf · räumte auf · hat aufgeräumt|to tidy up|يرتب|ranger|Räum bitte dein Zimmer auf.|Please tidy your room.|رتب غرفتك من فضلك.|Range ta chambre, s’il te plaît.
a|sauber||clean|نظيف|propre|Die Küche ist jetzt wieder sauber.|The kitchen is clean again now.|المطبخ نظيف مجدداً الآن.|La cuisine est de nouveau propre.
a|schmutzig||dirty|متسخ|sale|Die Schuhe sind vom Regen schmutzig.|The shoes are dirty from the rain.|الحذاء متسخ بسبب المطر.|Les chaussures sont sales à cause de la pluie.
a|lauwarm||lukewarm|فاتر|tiède|Mein Kaffee ist nur noch lauwarm.|My coffee is only lukewarm now.|أصبحت قهوتي فاترة.|Mon café est maintenant tiède.
a|versalzen||too salty|مفرط الملوحة|trop salé|Die Suppe ist leider versalzen.|Unfortunately, the soup is too salty.|للأسف الحساء مفرط الملوحة.|Malheureusement, la soupe est trop salée.
`),
  theme('alltag-verben', 'Häufige Verben im Alltag', 'Common everyday verbs', 'الأفعال اليومية الشائعة', 'Verbes courants du quotidien', 'Compass', `
v|aufwachen|wacht auf · wachte auf · ist aufgewacht|to wake up|يستيقظ|se réveiller|Ich wache meistens vor dem Wecker auf.|I usually wake up before the alarm.|أستيقظ غالباً قبل المنبه.|Je me réveille généralement avant le réveil.
v|aufstehen|steht auf · stand auf · ist aufgestanden|to get up|ينهض من السرير|se lever|Morgen muss ich um sechs Uhr aufstehen.|Tomorrow I have to get up at six.|علي أن أنهض غداً في السادسة.|Demain, je dois me lever à six heures.
v|duschen|duscht · duschte · hat geduscht|to shower|يستحم بالدش|prendre une douche|Nach dem Sport dusche ich kurz.|After exercise I take a quick shower.|أستحم سريعاً بعد الرياضة.|Après le sport, je prends une douche rapide.
v|frühstücken|frühstückt · frühstückte · hat gefrühstückt|to have breakfast|يتناول الفطور|prendre le petit-déjeuner|Sonntags frühstücken wir zusammen.|On Sundays we have breakfast together.|نتناول الفطور معاً أيام الأحد.|Le dimanche, nous prenons le petit-déjeuner ensemble.
v|arbeiten|arbeitet · arbeitete · hat gearbeitet|to work|يعمل|travailler|Diese Woche arbeite ich von zu Hause.|This week I am working from home.|أعمل من المنزل هذا الأسبوع.|Cette semaine, je travaille de chez moi.
v|einkaufen|kauft ein · kaufte ein · hat eingekauft|to do the shopping|يتسوق|faire les courses|Ich kaufe nach der Arbeit ein.|I do the shopping after work.|أتسوق بعد العمل.|Je fais les courses après le travail.
v|fernsehen|sieht fern · sah fern · hat ferngesehen|to watch television|يشاهد التلفاز|regarder la télévision|Abends sehen wir selten fern.|We rarely watch television in the evening.|نادراً ما نشاهد التلفاز مساءً.|Le soir, nous regardons rarement la télévision.
v|schlafen|schläft · schlief · hat geschlafen|to sleep|ينام|dormir|Letzte Nacht habe ich gut geschlafen.|I slept well last night.|نمت جيداً الليلة الماضية.|J’ai bien dormi la nuit dernière.
v|essen|isst · aß · hat gegessen|to eat|يأكل|manger|Wir essen heute etwas früher.|We are eating a little earlier today.|نأكل اليوم أبكر قليلاً.|Nous mangeons un peu plus tôt aujourd’hui.
v|trinken|trinkt · trank · hat getrunken|to drink|يشرب|boire|Möchtest du etwas trinken?|Would you like something to drink?|هل تريد أن تشرب شيئاً؟|Veux-tu boire quelque chose ?
v|gehen|geht · ging · ist gegangen|to go on foot|يذهب مشياً|aller à pied|Ich gehe zu Fuß zur Arbeit.|I walk to work.|أذهب إلى العمل مشياً.|Je vais au travail à pied.
v|kommen|kommt · kam · ist gekommen|to come|يأتي|venir|Kommst du morgen auch zum Kurs?|Are you coming to class tomorrow too?|هل تأتي أيضاً إلى الدرس غداً؟|Viens-tu aussi au cours demain ?
v|bleiben|bleibt · blieb · ist geblieben|to stay|يبقى|rester|Bei Regen bleiben wir zu Hause.|When it rains, we stay home.|نبقى في المنزل عندما تمطر.|Quand il pleut, nous restons à la maison.
v|finden|findet · fand · hat gefunden|to find|يجد|trouver|Ich finde meinen Schlüssel nicht.|I cannot find my key.|لا أجد مفتاحي.|Je ne trouve pas ma clé.
v|suchen|sucht · suchte · hat gesucht|to look for|يبحث عن|chercher|Wir suchen eine Wohnung mit Balkon.|We are looking for an apartment with a balcony.|نبحث عن شقة بشرفة.|Nous cherchons un appartement avec balcon.
v|brauchen|braucht · brauchte · hat gebraucht|to need|يحتاج|avoir besoin de|Brauchst du Hilfe mit dem Koffer?|Do you need help with the suitcase?|هل تحتاج إلى مساعدة في حمل الحقيبة؟|As-tu besoin d’aide avec la valise ?
v|helfen|hilft · half · hat geholfen|to help|يساعد|aider|Meine Nachbarin hilft mir beim Umzug.|My neighbour helps me with the move.|تساعدني جارتي في الانتقال.|Ma voisine m’aide à déménager.
v|fragen|fragt · fragte · hat gefragt|to ask|يسأل|demander|Frag bitte nach dem Preis.|Please ask about the price.|اسأل عن السعر من فضلك.|Demande le prix, s’il te plaît.
v|antworten|antwortet · antwortete · hat geantwortet|to answer|يجيب|répondre|Auf diese Frage kann ich noch nicht antworten.|I cannot answer that question yet.|لا أستطيع الإجابة عن هذا السؤال بعد.|Je ne peux pas encore répondre à cette question.
v|verstehen|versteht · verstand · hat verstanden|to understand|يفهم|comprendre|Ich verstehe das letzte Wort nicht.|I do not understand the last word.|لا أفهم الكلمة الأخيرة.|Je ne comprends pas le dernier mot.
v|lernen|lernt · lernte · hat gelernt|to learn|يتعلم|apprendre|Jeden Tag lerne ich etwas Neues.|Every day I learn something new.|أتعلم شيئاً جديداً كل يوم.|Chaque jour, j’apprends quelque chose de nouveau.
v|lesen|liest · las · hat gelesen|to read|يقرأ|lire|Lies die Nachricht bitte noch einmal.|Please read the message again.|اقرأ الرسالة مرة أخرى من فضلك.|Relis le message, s’il te plaît.
v|schreiben|schreibt · schrieb · hat geschrieben|to write|يكتب|écrire|Ich schreibe meiner Freundin eine Nachricht.|I am writing a message to my friend.|أكتب رسالة إلى صديقتي.|J’écris un message à mon amie.
v|sprechen|spricht · sprach · hat gesprochen|to speak|يتحدث|parler|Zu Hause sprechen wir zwei Sprachen.|We speak two languages at home.|نتحدث لغتين في المنزل.|Nous parlons deux langues à la maison.
v|hören|hört · hörte · hat gehört|to hear or listen|يسمع أو يستمع|entendre ou écouter|Im Bus höre ich Musik.|I listen to music on the bus.|أستمع إلى الموسيقى في الحافلة.|J’écoute de la musique dans le bus.
v|sehen|sieht · sah · hat gesehen|to see|يرى|voir|Von hier aus sieht man den Fluss.|You can see the river from here.|يمكن رؤية النهر من هنا.|D’ici, on voit la rivière.
v|warten|wartet · wartete · hat gewartet|to wait|ينتظر|attendre|Ich warte vor dem Eingang auf dich.|I will wait for you outside the entrance.|أنتظرك أمام المدخل.|Je t’attends devant l’entrée.
v|vergessen|vergisst · vergaß · hat vergessen|to forget|ينسى|oublier|Vergiss bitte deinen Ausweis nicht.|Please do not forget your ID.|لا تنس وثيقة هويتك من فضلك.|N’oublie pas ta pièce d’identité.
v|mitbringen|bringt mit · brachte mit · hat mitgebracht|to bring along|يحضر معه|apporter|Soll ich etwas zu essen mitbringen?|Should I bring something to eat?|هل أحضر معي شيئاً للأكل؟|Dois-je apporter quelque chose à manger ?
v|anrufen|ruft an · rief an · hat angerufen|to phone|يتصل هاتفياً|appeler|Ich rufe dich nach dem Termin an.|I will call you after the appointment.|أتصل بك بعد الموعد.|Je t’appelle après le rendez-vous.
`),
  theme('alltag-ausdruecke', 'Alltagssprache & Gespräch', 'Everyday expressions & conversation', 'تعابير الحياة اليومية والمحادثة', 'Expressions quotidiennes & conversation', 'Users', `
p|Hallo!||Hello!|مرحباً!|Bonjour !|Hallo! Schön, dich zu sehen.|Hello! Nice to see you.|مرحباً! يسعدني أن أراك.|Bonjour ! Heureux de te voir.
p|Guten Morgen!||Good morning!|صباح الخير!|Bonjour !|Guten Morgen! Hast du gut geschlafen?|Good morning! Did you sleep well?|صباح الخير! هل نمت جيداً؟|Bonjour ! As-tu bien dormi ?
p|Guten Tag!||Good day!|نهارك سعيد!|Bonjour !|Guten Tag! Ich habe einen Termin bei Frau Weber.|Good day! I have an appointment with Ms Weber.|نهارك سعيد! لدي موعد مع السيدة فيبر.|Bonjour ! J’ai rendez-vous avec Mme Weber.
p|Guten Abend!||Good evening!|مساء الخير!|Bonsoir !|Guten Abend! Ist dieser Platz noch frei?|Good evening! Is this seat still free?|مساء الخير! هل هذا المقعد شاغر؟|Bonsoir ! Cette place est-elle libre ?
p|Gute Nacht!||Good night!|تصبح على خير!|Bonne nuit !|Gute Nacht! Schlaf gut.|Good night! Sleep well.|تصبح على خير! نم جيداً.|Bonne nuit ! Dors bien.
p|Auf Wiedersehen!||Goodbye!|إلى اللقاء!|Au revoir !|Vielen Dank für das Gespräch. Auf Wiedersehen!|Thank you for the conversation. Goodbye!|شكراً على الحديث. إلى اللقاء!|Merci pour cet échange. Au revoir !
p|Bis bald!||See you soon!|إلى اللقاء قريباً!|À bientôt !|Ich freue mich auf unser Treffen. Bis bald!|I look forward to our meeting. See you soon!|أتطلع إلى لقائنا. إلى اللقاء قريباً!|Je me réjouis de notre rencontre. À bientôt !
p|Bis morgen!||See you tomorrow!|أراك غداً!|À demain !|Der Kurs ist zu Ende. Bis morgen!|Class is over. See you tomorrow!|انتهى الدرس. أراك غداً!|Le cours est terminé. À demain !
p|Wie geht es dir?||How are you? (informal)|كيف حالك؟|Comment vas-tu ?|Hallo Sara, wie geht es dir?|Hello Sara, how are you?|مرحباً سارة، كيف حالك؟|Bonjour Sara, comment vas-tu ?
p|Wie geht es Ihnen?||How are you? (formal)|كيف حال حضرتك؟|Comment allez-vous ?|Guten Morgen, Herr Braun. Wie geht es Ihnen?|Good morning, Mr Braun. How are you?|صباح الخير، سيد براون. كيف حال حضرتك؟|Bonjour, monsieur Braun. Comment allez-vous ?
p|Freut mich!||Nice to meet you!|تشرفت بمعرفتك!|Enchanté !|Du bist also unser neuer Kollege. Freut mich!|So you are our new colleague. Nice to meet you!|إذن أنت زميلنا الجديد. تشرفت بمعرفتك!|Tu es donc notre nouveau collègue. Enchanté !
p|Entschuldigung!||Excuse me!|عذراً!|Excusez-moi !|Entschuldigung! Wo ist der Ausgang?|Excuse me! Where is the exit?|عذراً! أين المخرج؟|Excusez-moi ! Où est la sortie ?
p|Es tut mir leid.||I am sorry.|أنا آسف.|Je suis désolé.|Es tut mir leid, ich habe den Termin vergessen.|I am sorry, I forgot the appointment.|أنا آسف، نسيت الموعد.|Je suis désolé, j’ai oublié le rendez-vous.
p|Kein Problem!||No problem!|لا مشكلة!|Pas de problème !|Du kommst etwas später? Kein Problem!|You are coming a little later? No problem!|ستأتي متأخراً قليلاً؟ لا مشكلة!|Tu arrives un peu plus tard ? Pas de problème !
p|Keine Ursache!||You are welcome!|لا شكر على واجب!|De rien !|Danke für deine Hilfe! – Keine Ursache!|Thanks for your help! – You are welcome!|شكراً على مساعدتك! – لا شكر على واجب!|Merci pour ton aide ! – De rien !
p|Wie bitte?||Pardon?|عفواً، ماذا قلت؟|Pardon ?|Wie bitte? Ich habe Sie nicht verstanden.|Pardon? I did not understand you.|عفواً، ماذا قلت؟ لم أفهمك.|Pardon ? Je ne vous ai pas compris.
p|Könnten Sie das bitte wiederholen?||Could you repeat that, please?|هل يمكنك تكرار ذلك من فضلك؟|Pourriez-vous répéter, s’il vous plaît ?|Könnten Sie das bitte wiederholen? Die Verbindung ist schlecht.|Could you repeat that, please? The connection is bad.|هل يمكنك تكرار ذلك من فضلك؟ الاتصال سيئ.|Pourriez-vous répéter ? La connexion est mauvaise.
p|Könnten Sie bitte etwas langsamer sprechen?||Could you speak a little more slowly?|هل يمكنك التحدث ببطء أكثر قليلاً؟|Pourriez-vous parler un peu plus lentement ?|Könnten Sie bitte etwas langsamer sprechen? Ich lerne noch Deutsch.|Could you speak a little more slowly? I am still learning German.|هل يمكنك التحدث ببطء أكثر قليلاً؟ ما زلت أتعلم الألمانية.|Pourriez-vous parler plus lentement ? J’apprends encore l’allemand.
p|Können Sie mir bitte helfen?||Could you help me, please?|هل يمكنك مساعدتي من فضلك؟|Pouvez-vous m’aider, s’il vous plaît ?|Können Sie mir bitte helfen? Der Automat funktioniert nicht.|Could you help me, please? The machine is not working.|هل يمكنك مساعدتي من فضلك؟ الآلة لا تعمل.|Pouvez-vous m’aider ? La machine ne fonctionne pas.
p|Vielen Dank für Ihre Hilfe!||Thank you very much for your help!|شكراً جزيلاً على مساعدتك!|Merci beaucoup pour votre aide !|Jetzt finde ich den Weg. Vielen Dank für Ihre Hilfe!|Now I can find my way. Thank you very much for your help!|الآن عرفت الطريق. شكراً جزيلاً على مساعدتك!|Je trouve mon chemin maintenant. Merci beaucoup pour votre aide !
p|Das macht nichts.||It does not matter.|لا بأس بذلك.|Ce n’est pas grave.|Du hast den Stift vergessen? Das macht nichts.|You forgot the pen? It does not matter.|نسيت القلم؟ لا بأس بذلك.|Tu as oublié le stylo ? Ce n’est pas grave.
p|Ich bin einverstanden.||I agree.|أنا موافق.|Je suis d’accord.|Wir treffen uns um sechs? Ich bin einverstanden.|Shall we meet at six? I agree.|هل نلتقي في السادسة؟ أنا موافق.|On se retrouve à six heures ? Je suis d’accord.
p|Meiner Meinung nach||in my opinion|في رأيي|à mon avis|Meiner Meinung nach ist dieser Vorschlag sinnvoll.|In my opinion, this proposal makes sense.|في رأيي، هذا الاقتراح معقول.|À mon avis, cette proposition est pertinente.
p|Das kommt darauf an.||It depends.|هذا يعتمد على الظروف.|Ça dépend.|Hast du morgen Zeit? – Das kommt darauf an.|Do you have time tomorrow? – It depends.|هل لديك وقت غداً؟ – هذا يعتمد على الظروف.|As-tu le temps demain ? – Ça dépend.
p|Einen Moment, bitte.||One moment, please.|لحظة من فضلك.|Un instant, s’il vous plaît.|Einen Moment, bitte. Ich suche die Nummer.|One moment, please. I am looking for the number.|لحظة من فضلك. أبحث عن الرقم.|Un instant, s’il vous plaît. Je cherche le numéro.
p|Das klingt gut.||That sounds good.|يبدو ذلك جيداً.|Ça semble bien.|Ein Picknick am See? Das klingt gut.|A picnic by the lake? That sounds good.|نزهة عند البحيرة؟ يبدو ذلك جيداً.|Un pique-nique au bord du lac ? Ça semble bien.
p|Keine Ahnung.||No idea.|لا فكرة لدي.|Aucune idée.|Wann kommt der Bus? – Keine Ahnung.|When is the bus coming? – No idea.|متى تأتي الحافلة؟ – لا فكرة لدي.|Quand arrive le bus ? – Aucune idée.
p|Da hast du recht.||You are right about that.|أنت محق في ذلك.|Tu as raison sur ce point.|Wir sollten früher losfahren. – Da hast du recht.|We should leave earlier. – You are right about that.|ينبغي أن ننطلق أبكر. – أنت محق في ذلك.|Nous devrions partir plus tôt. – Tu as raison.
p|Viel Erfolg!||Good luck! (with a task)|بالتوفيق!|Bonne réussite !|Du hast morgen ein Vorstellungsgespräch? Viel Erfolg!|You have a job interview tomorrow? Good luck!|لديك مقابلة عمل غداً؟ بالتوفيق!|Tu as un entretien demain ? Bonne réussite !
p|Herzlichen Glückwunsch!||Congratulations!|أحر التهاني!|Félicitations !|Du hast die Prüfung bestanden? Herzlichen Glückwunsch!|You passed the exam? Congratulations!|نجحت في الامتحان؟ أحر التهاني!|Tu as réussi l’examen ? Félicitations !
`),
  theme('adjektive-adverbien', 'Häufige Adjektive & Adverbien', 'Common adjectives & adverbs', 'الصفات والظروف الشائعة', 'Adjectifs & adverbes courants', 'Smile', `
a|groß||big or tall|كبير أو طويل القامة|grand|Der Koffer ist zu groß für das Fach.|The suitcase is too big for the compartment.|الحقيبة أكبر من أن تتسع لها الخانة.|La valise est trop grande pour le compartiment.
a|klein||small|صغير|petit|Wir wohnen in einem kleinen Dorf.|We live in a small village.|نسكن في قرية صغيرة.|Nous habitons dans un petit village.
a|ruhig||quiet or calm|هادئ|calme|Die Straße ist nachts sehr ruhig.|The street is very quiet at night.|الشارع هادئ جداً ليلاً.|La rue est très calme la nuit.
a|fleißig||hard-working|مجتهد|travailleur|Sie ist fleißig und übt jeden Tag.|She is hard-working and practises every day.|هي مجتهدة وتتدرب كل يوم.|Elle est travailleuse et s’exerce chaque jour.
a|freundlich||friendly|ودود|aimable|Der Empfang im Hotel war freundlich.|The welcome at the hotel was friendly.|كان الاستقبال في الفندق ودوداً.|L’accueil à l’hôtel était aimable.
a|wichtig||important|مهم|important|Diese Information ist für uns wichtig.|This information is important to us.|هذه المعلومة مهمة لنا.|Cette information est importante pour nous.
a|möglich||possible|ممكن|possible|Ist ein Termin am Nachmittag möglich?|Is an afternoon appointment possible?|هل يمكن الحصول على موعد بعد الظهر؟|Un rendez-vous l’après-midi est-il possible ?
a|notwendig||necessary|ضروري|nécessaire|Für diese Reise ist ein Reisepass notwendig.|A passport is necessary for this trip.|جواز السفر ضروري لهذه الرحلة.|Un passeport est nécessaire pour ce voyage.
a|einfach||easy|سهل|facile|Die erste Aufgabe ist ziemlich einfach.|The first task is quite easy.|المهمة الأولى سهلة إلى حد ما.|Le premier exercice est assez facile.
a|schwierig||difficult|صعب|difficile|Die Entscheidung war für mich schwierig.|The decision was difficult for me.|كان القرار صعباً علي.|La décision a été difficile pour moi.
a|bequem||comfortable|مريح|confortable|Diese Schuhe sind besonders bequem.|These shoes are especially comfortable.|هذا الحذاء مريح بشكل خاص.|Ces chaussures sont particulièrement confortables.
a|müde||tired|متعب|fatigué|Nach der langen Fahrt bin ich müde.|I am tired after the long journey.|أنا متعب بعد الرحلة الطويلة.|Je suis fatigué après le long trajet.
a|pünktlich||punctual|ملتزم بالموعد|ponctuel|Unser Bus ist heute pünktlich.|Our bus is on time today.|حافلتنا في الموعد اليوم.|Notre bus est à l’heure aujourd’hui.
a|kostenlos||free of charge|مجاني|gratuit|Der Eintritt ist für Kinder kostenlos.|Admission is free for children.|الدخول مجاني للأطفال.|L’entrée est gratuite pour les enfants.
a|fertig||finished or ready|منته أو جاهز|prêt|Das Essen ist fertig.|The food is ready.|الطعام جاهز.|Le repas est prêt.
d|heute||today|اليوم|aujourd’hui|Heute habe ich einen freien Nachmittag.|Today I have a free afternoon.|لدي وقت فراغ بعد ظهر اليوم.|Aujourd’hui, j’ai un après-midi libre.
d|morgen||tomorrow|غداً|demain|Wir sehen uns morgen im Büro.|We will see each other tomorrow at the office.|نلتقي غداً في المكتب.|Nous nous verrons demain au bureau.
d|gestern||yesterday|أمس|hier|Gestern hat es den ganzen Tag geregnet.|Yesterday it rained all day.|أمطرت طوال اليوم أمس.|Hier, il a plu toute la journée.
d|jetzt||now|الآن|maintenant|Jetzt können wir anfangen.|Now we can start.|يمكننا البدء الآن.|Nous pouvons commencer maintenant.
d|bald||soon|قريباً|bientôt|Der Zug müsste bald kommen.|The train should arrive soon.|يفترض أن يصل القطار قريباً.|Le train devrait bientôt arriver.
d|oft||often|غالباً|souvent|Wir kochen oft zusammen.|We often cook together.|غالباً ما نطبخ معاً.|Nous cuisinons souvent ensemble.
d|selten||rarely|نادراً|rarement|Ich fahre selten mit dem Taxi.|I rarely take a taxi.|نادراً ما أستقل سيارة أجرة.|Je prends rarement le taxi.
d|immer||always|دائماً|toujours|Sie kommt immer mit dem Fahrrad.|She always comes by bicycle.|تأتي دائماً بالدراجة.|Elle vient toujours à vélo.
d|nie||never|أبداً|jamais|Ich trinke abends nie Kaffee.|I never drink coffee in the evening.|لا أشرب القهوة مساءً أبداً.|Je ne bois jamais de café le soir.
d|manchmal||sometimes|أحياناً|parfois|Manchmal nehme ich einen anderen Weg.|Sometimes I take a different route.|أسلك أحياناً طريقاً آخر.|Parfois, je prends un autre chemin.
d|vielleicht||perhaps|ربما|peut-être|Vielleicht bleiben wir noch einen Tag.|Perhaps we will stay another day.|ربما نبقى يوماً آخر.|Nous resterons peut-être un jour de plus.
d|leider||unfortunately|للأسف|malheureusement|Leider ist der Laden schon geschlossen.|Unfortunately, the shop is already closed.|للأسف أغلق المتجر بالفعل.|Malheureusement, le magasin est déjà fermé.
d|ungefähr||approximately|تقريباً|environ|Die Fahrt dauert ungefähr eine Stunde.|The journey takes approximately one hour.|تستغرق الرحلة ساعة تقريباً.|Le trajet dure environ une heure.
d|gemeinsam||together|معاً|ensemble|Gemeinsam finden wir eine Lösung.|Together we will find a solution.|سنجد حلاً معاً.|Ensemble, nous trouverons une solution.
d|unterwegs||on the way|في الطريق|en route|Ich bin noch unterwegs und komme gleich.|I am still on the way and will arrive shortly.|ما زلت في الطريق وسأصل بعد قليل.|Je suis encore en route et j’arrive bientôt.
`),
  theme('satzverbindungen', 'Präpositionen & Satzverbindungen', 'Prepositions & sentence links', 'حروف الجر وروابط الجمل', 'Prépositions & liens entre phrases', 'GraduationCap', `
p|und||and|و|et|Ich nehme Brot und Käse.|I will have bread and cheese.|سآخذ الخبز والجبن.|Je prends du pain et du fromage.
p|oder||or|أو|ou|Möchtest du Tee oder Kaffee?|Would you like tea or coffee?|هل تريد شاياً أم قهوة؟|Veux-tu du thé ou du café ?
p|aber||but|لكن|mais|Ich möchte kommen, aber ich muss arbeiten.|I want to come, but I have to work.|أريد أن آتي، لكن علي أن أعمل.|Je veux venir, mais je dois travailler.
p|denn||because (main-clause word order)|لأن|car|Ich bleibe zu Hause, denn ich bin krank.|I am staying home because I am ill.|أبقى في المنزل لأنني مريض.|Je reste à la maison, car je suis malade.
p|weil||because|لأن|parce que|Ich lerne Deutsch, weil ich in Berlin wohne.|I am learning German because I live in Berlin.|أتعلم الألمانية لأنني أسكن في برلين.|J’apprends l’allemand parce que j’habite à Berlin.
p|dass||that|أن|que|Ich hoffe, dass du Zeit hast.|I hope that you have time.|آمل أن يكون لديك وقت.|J’espère que tu as le temps.
p|wenn||if or whenever|إذا أو كلما|si ou quand|Wenn es regnet, nehmen wir den Bus.|If it rains, we take the bus.|إذا أمطرت، نستقل الحافلة.|S’il pleut, nous prenons le bus.
p|obwohl||although|رغم أن|bien que|Ich gehe spazieren, obwohl es kalt ist.|I am going for a walk although it is cold.|أذهب في نزهة رغم أن الجو بارد.|Je me promène bien qu’il fasse froid.
p|bevor||before|قبل أن|avant que|Ruf mich an, bevor du losfährst.|Call me before you leave.|اتصل بي قبل أن تنطلق.|Appelle-moi avant de partir.
p|nachdem||after|بعد أن|après que|Nachdem wir gegessen hatten, gingen wir spazieren.|After we had eaten, we went for a walk.|بعد أن أكلنا ذهبنا في نزهة.|Après avoir mangé, nous sommes allés nous promener.
p|damit||so that|لكي|pour que|Ich spreche langsam, damit du mich verstehst.|I speak slowly so that you understand me.|أتحدث ببطء لكي تفهمني.|Je parle lentement pour que tu me comprennes.
p|ob||whether|ما إذا|si|Ich weiß nicht, ob der Laden offen ist.|I do not know whether the shop is open.|لا أعرف ما إذا كان المتجر مفتوحاً.|Je ne sais pas si le magasin est ouvert.
d|deshalb||therefore|لذلك|c’est pourquoi|Ich bin müde, deshalb gehe ich früh ins Bett.|I am tired, so I am going to bed early.|أنا متعب، لذلك أذهب إلى الفراش مبكراً.|Je suis fatigué, c’est pourquoi je me couche tôt.
d|trotzdem||nevertheless|مع ذلك|quand même|Es regnet, trotzdem gehen wir hinaus.|It is raining; nevertheless, we are going outside.|إنها تمطر، ومع ذلك نخرج.|Il pleut, mais nous sortons quand même.
d|außerdem||in addition|بالإضافة إلى ذلك|de plus|Die Wohnung ist hell. Außerdem hat sie einen Balkon.|The apartment is bright. It also has a balcony.|الشقة مضيئة، وبالإضافة إلى ذلك فيها شرفة.|L’appartement est lumineux. De plus, il a un balcon.
p|entweder … oder||either … or|إما … أو|soit … soit|Wir fahren entweder mit dem Bus oder mit dem Zug.|We will travel either by bus or by train.|سنسافر إما بالحافلة أو بالقطار.|Nous prendrons soit le bus, soit le train.
p|weder … noch||neither … nor|لا … ولا|ni … ni|Ich trinke weder Kaffee noch schwarzen Tee.|I drink neither coffee nor black tea.|لا أشرب القهوة ولا الشاي الأسود.|Je ne bois ni café ni thé noir.
p|sowohl … als auch||both … and|كل من … و|aussi bien … que|Sie spricht sowohl Deutsch als auch Arabisch.|She speaks both German and Arabic.|تتحدث كلاً من الألمانية والعربية.|Elle parle aussi bien allemand qu’arabe.
p|mit||with (+ dative)|مع|avec|Ich fahre mit meiner Schwester in die Stadt.|I am going into town with my sister.|أذهب إلى المدينة مع أختي.|Je vais en ville avec ma sœur.
p|ohne||without (+ accusative)|دون|sans|Ohne meine Brille kann ich das nicht lesen.|I cannot read that without my glasses.|لا أستطيع قراءة ذلك دون نظارتي.|Je ne peux pas lire cela sans mes lunettes.
p|für||for (+ accusative)|من أجل|pour|Dieses Geschenk ist für meinen Vater.|This gift is for my father.|هذه الهدية لوالدي.|Ce cadeau est pour mon père.
p|gegen||against (+ accusative)|ضد|contre|Wir sind gegen diesen Vorschlag.|We are against this proposal.|نحن ضد هذا الاقتراح.|Nous sommes contre cette proposition.
p|bei||at or with (+ dative)|عند أو لدى|chez|Heute esse ich bei meinen Eltern.|Today I am eating at my parents’ house.|آكل اليوم عند والدي.|Aujourd’hui, je mange chez mes parents.
p|seit||since or for (+ dative)|منذ|depuis|Ich lerne seit einem Jahr Deutsch.|I have been learning German for a year.|أتعلم الألمانية منذ سنة.|J’apprends l’allemand depuis un an.
p|aus||from or out of (+ dative)|من|de|Meine Nachbarin kommt aus Italien.|My neighbour comes from Italy.|جارتي من إيطاليا.|Ma voisine vient d’Italie.
p|zu||to (+ dative)|إلى|chez ou à|Ich gehe heute zum Arzt.|I am going to the doctor today.|أذهب إلى الطبيب اليوم.|Je vais chez le médecin aujourd’hui.
p|gegenüber||opposite (+ dative)|مقابل|en face de|Gegenüber dem Bahnhof ist ein Café.|There is a café opposite the station.|يوجد مقهى مقابل المحطة.|Il y a un café en face de la gare.
p|wegen||because of (+ genitive)|بسبب|à cause de|Wegen des Regens fällt das Fest aus.|The festival is cancelled because of the rain.|ألغي الاحتفال بسبب المطر.|La fête est annulée à cause de la pluie.
p|trotz||despite (+ genitive)|رغم|malgré|Trotz des Lärms konnte ich schlafen.|I was able to sleep despite the noise.|استطعت النوم رغم الضجيج.|J’ai pu dormir malgré le bruit.
p|während||during (+ genitive)|أثناء|pendant|Während des Unterrichts bleibt das Handy aus.|The phone stays off during class.|يبقى الهاتف مغلقاً أثناء الدرس.|Le téléphone reste éteint pendant le cours.
`),
  theme('feste-deutschland', 'Feste, Feiertage & Zusammenleben', 'Celebrations, holidays & community life', 'المناسبات والأعياد والحياة المشتركة', 'Fêtes, jours fériés & vie collective', 'Users', `
n|der Geburtstag|die Geburtstage|birthday|عيد الميلاد الشخصي|l’anniversaire|Meinen Geburtstag feiere ich dieses Jahr zu Hause.|I am celebrating my birthday at home this year.|أحتفل بعيد ميلادي في المنزل هذا العام.|Je fête mon anniversaire chez moi cette année.
n|das Geschenk|die Geschenke|gift|الهدية|le cadeau|Wir suchen ein Geschenk für unsere Freundin.|We are looking for a gift for our friend.|نبحث عن هدية لصديقتنا.|Nous cherchons un cadeau pour notre amie.
n|die Einladung|die Einladungen|invitation|الدعوة|l’invitation|Danke für die Einladung zu deiner Feier.|Thank you for inviting me to your celebration.|شكراً على دعوتك لي إلى حفلتك.|Merci pour l’invitation à ta fête.
n|der Feiertag|die Feiertage|public holiday|يوم العطلة الرسمية|le jour férié|Am Feiertag bleiben viele Geschäfte geschlossen.|Many shops are closed on the public holiday.|تبقى متاجر كثيرة مغلقة في يوم العطلة الرسمية.|Beaucoup de magasins sont fermés le jour férié.
n|der Weihnachtsmarkt|die Weihnachtsmärkte|Christmas market|سوق عيد الميلاد|le marché de Noël|Auf dem Weihnachtsmarkt kaufen wir gebrannte Mandeln.|We buy roasted candied almonds at the Christmas market.|نشتري اللوز المحمص بالسكر من سوق عيد الميلاد.|Nous achetons des amandes caramélisées au marché de Noël.
n|der Brückentag|die Brückentage|working day between a holiday and a weekend|يوم العمل بين عطلة رسمية ونهاية الأسبوع|le jour de pont|Für den Brückentag habe ich Urlaub beantragt.|I have requested leave for the day between the holiday and the weekend.|طلبت إجازة ليوم العمل الواقع بين العطلة ونهاية الأسبوع.|J’ai demandé un congé pour faire le pont.
n|der Brauch|die Bräuche|custom|العادة المتوارثة|la coutume|In jeder Region gibt es andere Bräuche.|Each region has different customs.|لكل منطقة عادات مختلفة.|Chaque région a ses propres coutumes.
n|die Tradition|die Traditionen|tradition|التقليد|la tradition|Gemeinsames Backen ist bei uns eine Tradition.|Baking together is a tradition in our family.|الخبز معاً تقليد في عائلتنا.|Faire des gâteaux ensemble est une tradition chez nous.
n|der Gastgeber|die Gastgeber|host|المضيف|l’hôte|Unser Gastgeber begrüßt uns an der Tür.|Our host welcomes us at the door.|يستقبلنا مضيفنا عند الباب.|Notre hôte nous accueille à la porte.
n|der Gast|die Gäste|guest|الضيف|l’invité|Die ersten Gäste kommen gegen sieben.|The first guests arrive around seven.|يصل أول الضيوف نحو السابعة.|Les premiers invités arrivent vers sept heures.
n|das Jubiläum|die Jubiläen|anniversary of an event|الذكرى السنوية لمناسبة|le jubilé|Der Verein feiert sein fünfzigjähriges Jubiläum.|The association is celebrating its fiftieth anniversary.|تحتفل الجمعية بذكراها السنوية الخمسين.|L’association fête son cinquantième anniversaire.
n|die Kerze|die Kerzen|candle|الشمعة|la bougie|Auf dem Tisch brennen zwei Kerzen.|Two candles are burning on the table.|تشتعل شمعتان على الطاولة.|Deux bougies brûlent sur la table.
n|der Blumenstrauß|die Blumensträuße|bouquet|باقة الزهور|le bouquet|Wir schenken ihr einen Blumenstrauß.|We give her a bouquet.|نقدم لها باقة زهور.|Nous lui offrons un bouquet.
n|die Glückwunschkarte|die Glückwunschkarten|greeting card|بطاقة التهنئة|la carte de vœux|Alle Kollegen unterschreiben die Glückwunschkarte.|All the colleagues sign the greeting card.|يوقع جميع الزملاء بطاقة التهنئة.|Tous les collègues signent la carte de vœux.
n|die Dekoration|die Dekorationen|decoration|الزينة|la décoration|Die Kinder helfen bei der Dekoration.|The children help with the decorations.|يساعد الأطفال في التزيين.|Les enfants participent à la décoration.
n|das Feuerwerk|die Feuerwerke|fireworks display|عرض الألعاب النارية|le feu d’artifice|Wir sehen das Feuerwerk vom Balkon aus.|We watch the fireworks from the balcony.|نشاهد الألعاب النارية من الشرفة.|Nous regardons le feu d’artifice depuis le balcon.
n|die Nachbarschaft|die Nachbarschaften|neighbourhood community|الجيرة|le voisinage|In unserer Nachbarschaft helfen wir einander.|We help one another in our neighbourhood.|نساعد بعضنا في جيرتنا.|Dans notre voisinage, nous nous entraidons.
n|die Ruhezeit|die Ruhezeiten|quiet period|فترة الهدوء|la période de repos|Bitte beachten Sie die Ruhezeiten im Haus.|Please respect the building’s quiet hours.|احترم فترات الهدوء في المبنى من فضلك.|Veuillez respecter les heures de repos dans l’immeuble.
n|das Ehrenamt|die Ehrenämter|voluntary role|العمل التطوعي|la fonction bénévole|Neben dem Beruf übernimmt sie ein Ehrenamt.|Alongside her job, she takes on a voluntary role.|تتولى عملاً تطوعياً إلى جانب وظيفتها.|En plus de son métier, elle exerce une fonction bénévole.
n|die Spende|die Spenden|donation|التبرع|le don|Mit einer kleinen Spende unterstützen wir den Verein.|We support the association with a small donation.|ندعم الجمعية بتبرع صغير.|Nous soutenons l’association par un petit don.
v|feiern|feiert · feierte · hat gefeiert|to celebrate|يحتفل|fêter|Wir feiern den Abschluss unserer Ausbildung.|We are celebrating the completion of our vocational training.|نحتفل بانتهاء تكويننا المهني.|Nous fêtons la fin de notre formation.
v|einladen|lädt ein · lud ein · hat eingeladen|to invite|يدعو|inviter|Ich lade meine Nachbarn zum Kaffee ein.|I invite my neighbours for coffee.|أدعو جيراني لشرب القهوة.|J’invite mes voisins à prendre un café.
v|zusagen|sagt zu · sagte zu · hat zugesagt|to accept an invitation|يوافق على دعوة|accepter une invitation|Fünf Freunde haben schon zugesagt.|Five friends have already accepted.|وافق خمسة أصدقاء بالفعل على الدعوة.|Cinq amis ont déjà accepté l’invitation.
v|absagen|sagt ab · sagte ab · hat abgesagt|to cancel or decline|يلغي أو يعتذر عن الحضور|annuler ou décliner|Leider muss ich das Treffen absagen.|Unfortunately, I have to cancel the meeting.|للأسف علي إلغاء اللقاء.|Malheureusement, je dois annuler la rencontre.
v|gratulieren|gratuliert · gratulierte · hat gratuliert|to congratulate|يهنئ|féliciter|Wir gratulieren dir zum neuen Job.|We congratulate you on your new job.|نهنئك بوظيفتك الجديدة.|Nous te félicitons pour ton nouvel emploi.
v|schenken|schenkt · schenkte · hat geschenkt|to give as a gift|يهدي|offrir|Ich schenke meinem Bruder ein Buch.|I am giving my brother a book.|أهدي أخي كتاباً.|J’offre un livre à mon frère.
v|anstoßen|stößt an · stieß an · hat angestoßen|to clink glasses or toast|يرفع كأسه احتفالاً|trinquer|Wir stoßen auf deinen Erfolg an.|We drink a toast to your success.|نرفع كؤوسنا احتفالاً بنجاحك.|Nous trinquons à ta réussite.
a|festlich||festive|احتفالي|festif|Der Saal ist festlich geschmückt.|The hall is decorated for the celebration.|القاعة مزينة للاحتفال.|La salle est décorée pour la fête.
a|ehrenamtlich||voluntary and unpaid|تطوعي دون أجر|bénévole|Sie arbeitet ehrenamtlich in einer Beratungsstelle.|She works as a volunteer at an advice centre.|تعمل تطوعياً في مركز استشارات.|Elle travaille bénévolement dans un centre de conseil.
p|Alles Gute!||All the best!|كل التوفيق!|Tous mes vœux !|Alles Gute für deinen Start in der neuen Stadt!|All the best for your start in the new city!|كل التوفيق لبدايتك في المدينة الجديدة!|Tous mes vœux pour tes débuts dans la nouvelle ville !
`),
  theme('versicherung-kundenservice', 'Versicherung, Verträge & Kundenservice', 'Insurance, contracts & customer service', 'التأمين والعقود وخدمة العملاء', 'Assurances, contrats & service client', 'Landmark', `
n|die Versicherung|die Versicherungen|insurance|التأمين|l’assurance|Welche Schäden deckt diese Versicherung ab?|Which losses does this insurance cover?|ما الأضرار التي يغطيها هذا التأمين؟|Quels dommages cette assurance couvre-t-elle ?
n|die Haftpflichtversicherung|die Haftpflichtversicherungen|liability insurance|تأمين المسؤولية المدنية|l’assurance responsabilité civile|Ich lese die Bedingungen meiner Haftpflichtversicherung.|I read the terms of my liability insurance.|أقرأ شروط تأمين المسؤولية المدنية الخاص بي.|Je lis les conditions de mon assurance responsabilité civile.
n|die Hausratversicherung|die Hausratversicherungen|household contents insurance|تأمين محتويات المنزل|l’assurance du mobilier|Wir vergleichen zwei Angebote für eine Hausratversicherung.|We compare two quotes for household contents insurance.|نقارن عرضين لتأمين محتويات المنزل.|Nous comparons deux offres d’assurance du mobilier.
n|der Beitrag|die Beiträge|contribution or premium|الاشتراك أو القسط|la cotisation|Der monatliche Beitrag wird vom Konto abgebucht.|The monthly premium is debited from the account.|يخصم القسط الشهري من الحساب.|La cotisation mensuelle est prélevée sur le compte.
n|die Selbstbeteiligung|die Selbstbeteiligungen|insurance excess or deductible|المبلغ الذي يتحمله المؤمن عليه|la franchise|Wie hoch ist die Selbstbeteiligung bei diesem Tarif?|How much is the deductible for this plan?|كم يبلغ المبلغ الذي أتحمله في هذه الباقة؟|Quel est le montant de la franchise pour ce tarif ?
n|der Schaden|die Schäden|damage or loss|الضرر|le dommage|Wir melden den Schaden bei der Versicherung.|We report the damage to the insurer.|نبلغ شركة التأمين بالضرر.|Nous déclarons le dommage à l’assurance.
n|der Vertrag|die Verträge|contract|العقد|le contrat|Lies den Vertrag bitte sorgfältig durch.|Please read the contract carefully.|اقرأ العقد بعناية من فضلك.|Lis attentivement le contrat, s’il te plaît.
n|die Vertragsnummer|die Vertragsnummern|contract number|رقم العقد|le numéro de contrat|Die Vertragsnummer steht oben auf dem Brief.|The contract number is at the top of the letter.|رقم العقد في أعلى الرسالة.|Le numéro de contrat figure en haut de la lettre.
n|die Kundennummer|die Kundennummern|customer number|رقم العميل|le numéro de client|Halten Sie beim Anruf Ihre Kundennummer bereit.|Have your customer number ready when calling.|جهز رقم العميل عند الاتصال.|Préparez votre numéro de client avant d’appeler.
n|die Kündigungsfrist|die Kündigungsfristen|notice period|مهلة إنهاء العقد|le délai de préavis|Die Kündigungsfrist steht im Vertrag.|The notice period is stated in the contract.|مهلة إنهاء العقد مذكورة في العقد.|Le délai de préavis figure dans le contrat.
n|die Laufzeit|die Laufzeiten|contract duration|مدة سريان العقد|la durée du contrat|Welche Laufzeit hat dieser Vertrag?|How long does this contract run?|ما مدة سريان هذا العقد؟|Quelle est la durée de ce contrat ?
n|die Verlängerung|die Verlängerungen|extension or renewal|التمديد أو التجديد|la prolongation|Ich möchte keine automatische Verlängerung.|I do not want automatic renewal.|لا أريد تجديداً تلقائياً.|Je ne souhaite pas de renouvellement automatique.
n|der Widerruf|die Widerrufe|withdrawal from an agreement|التراجع عن الاتفاق|la rétractation|Ich bitte um eine Bestätigung meines Widerrufs.|I request confirmation of my withdrawal.|أطلب تأكيد التراجع عن اتفاقي.|Je demande une confirmation de ma rétractation.
n|die Lastschrift|die Lastschriften|direct debit|الخصم المباشر|le prélèvement automatique|Die Zahlung erfolgt per Lastschrift.|Payment is made by direct debit.|يتم الدفع بالخصم المباشر.|Le paiement se fait par prélèvement automatique.
n|die Ratenzahlung|die Ratenzahlungen|payment in instalments|الدفع بالتقسيط|le paiement échelonné|Ist eine Ratenzahlung möglich?|Is payment in instalments possible?|هل الدفع بالتقسيط ممكن؟|Un paiement échelonné est-il possible ?
n|die Mahnung|die Mahnungen|payment reminder|التذكير بالدفع|le rappel de paiement|Ich habe eine Mahnung erhalten, obwohl ich bezahlt habe.|I received a payment reminder although I have paid.|تلقيت تذكيراً بالدفع رغم أنني دفعت.|J’ai reçu un rappel de paiement alors que j’ai payé.
n|die Beschwerde|die Beschwerden|complaint|الشكوى|la plainte|Ich möchte eine Beschwerde einreichen.|I would like to submit a complaint.|أود تقديم شكوى.|Je voudrais déposer une plainte.
n|die Erstattung|die Erstattungen|refund|استرداد المبلغ|le remboursement|Die Erstattung erfolgt auf Ihr Konto.|The refund will be paid into your account.|يعاد المبلغ إلى حسابك.|Le remboursement sera effectué sur votre compte.
n|die Garantie|die Garantien|guarantee|الضمان|la garantie|Gibt es auf dieses Gerät eine Garantie?|Does this appliance come with a guarantee?|هل يشمل هذا الجهاز ضمان؟|Cet appareil bénéficie-t-il d’une garantie ?
n|der Defekt|die Defekte|fault|العطل|le défaut|Der Techniker hat den Defekt gefunden.|The technician has found the fault.|وجد الفني العطل.|Le technicien a trouvé le défaut.
n|die Reparatur|die Reparaturen|repair|الإصلاح|la réparation|Wie lange dauert die Reparatur?|How long will the repair take?|كم يستغرق الإصلاح؟|Combien de temps prendra la réparation ?
n|der Kostenvoranschlag|die Kostenvoranschläge|cost estimate|التقدير المسبق للتكلفة|le devis|Bitte schicken Sie mir zuerst einen Kostenvoranschlag.|Please send me a cost estimate first.|أرسل لي تقديراً مسبقاً للتكلفة أولاً من فضلك.|Veuillez d’abord m’envoyer un devis.
v|kündigen|kündigt · kündigte · hat gekündigt|to terminate a contract|ينهي عقداً|résilier|Ich möchte meinen Handyvertrag kündigen.|I would like to terminate my mobile contract.|أود إنهاء عقد هاتفي المحمول.|Je voudrais résilier mon forfait mobile.
v|widerrufen|widerruft · widerrief · hat widerrufen|to revoke or withdraw|يتراجع عن موافقة أو اتفاق|révoquer|Ich möchte meine Zustimmung widerrufen.|I would like to withdraw my consent.|أود التراجع عن موافقتي.|Je voudrais retirer mon consentement.
v|bestätigen|bestätigt · bestätigte · hat bestätigt|to confirm|يؤكد|confirmer|Bestätigen Sie bitte den Eingang meiner Nachricht.|Please confirm receipt of my message.|أكد استلام رسالتي من فضلك.|Veuillez confirmer la réception de mon message.
v|reklamieren|reklamiert · reklamierte · hat reklamiert|to complain about faulty goods|يشتكي من عيب في منتج|réclamer pour un défaut|Ich möchte den beschädigten Artikel reklamieren.|I would like to complain about the damaged item.|أود تقديم شكوى بشأن المنتج التالف.|Je souhaite faire une réclamation pour l’article endommagé.
a|fristgerecht||within the deadline|ضمن المهلة المحددة|dans les délais|Meine Kündigung ist fristgerecht eingegangen.|My notice of termination arrived within the deadline.|وصل إشعاري بإنهاء العقد ضمن المهلة.|Ma résiliation est arrivée dans les délais.
a|verbindlich||binding|ملزم|contraignant|Ist dieses Angebot verbindlich?|Is this offer binding?|هل هذا العرض ملزم؟|Cette offre est-elle contraignante ?
a|schriftlich||in writing|كتابي|écrit|Ich brauche eine schriftliche Bestätigung.|I need written confirmation.|أحتاج إلى تأكيد كتابي.|J’ai besoin d’une confirmation écrite.
p|in Kraft treten||to come into effect|يدخل حيز التنفيذ|entrer en vigueur|Die Änderung tritt nächsten Monat in Kraft.|The change comes into effect next month.|يدخل التغيير حيز التنفيذ الشهر المقبل.|La modification entre en vigueur le mois prochain.
`),
];
