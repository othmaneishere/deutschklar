export type A1ActivityKind = 'dialogue' | 'story' | 'audio' | 'vocabulary' | 'grammar' | 'exercise' | 'speaking' | 'writing' | 'situation';

export interface A1SubLesson {
  id: string;
  title: string;
  kind: A1ActivityKind;
  duration: string;
  description: string;
}

export interface A1Lesson {
  number: number;
  title: string;
  subtitle: string;
  unit: string;
  color: string;
  goals: string[];
  subLessons: A1SubLesson[];
}

const kinds: A1ActivityKind[] = ['dialogue', 'vocabulary', 'grammar', 'audio', 'exercise'];

const lesson = (number: number, title: string, subtitle: string, unit: string, goals: string[], topics: string[], color: string): A1Lesson => ({
  number, title, subtitle, unit, color, goals,
  subLessons: topics.map((topic, index) => ({
    id: `a1-${number}-${index + 1}`,
    title: topic,
    kind: kinds[index % kinds.length],
    duration: `${8 + (index % 3) * 4} Min.`,
    description: [
      'Entdecke die Sprache in einer echten Alltagssituation.',
      'Sammle die wichtigsten Wörter und Wendungen.',
      'Verstehe die Struktur Schritt für Schritt.',
      'Höre zu, sprich nach und trainiere dein Ohr.',
      'Wende das Gelernte interaktiv an.',
    ][index % kinds.length],
  })),
});

export const A1_LESSONS: A1Lesson[] = [
  lesson(1, 'Hallo! Ich bin …', 'Ankommen, begrüßen und sich vorstellen', 'Startklar', ['Du kannst dich vorstellen.', 'Du stellst einfache Fragen.', 'Du verwendest sein und Personalpronomen.'], ['Dialog: Im Sprachkurs', 'Wortschatz: Namen, Länder, Sprachen', 'Grammatik: sein und Pronomen', 'Hören: Begrüßungen erkennen', 'Übung: Fragen und Antworten'], 'from-indigo-600 to-violet-600'),
  lesson(2, 'Alphabet & Aussprache', 'Buchstabieren und deutsche Laute sicher sprechen', 'Startklar', ['Du buchstabierst Namen.', 'Du unterscheidest ä, ö, ü und ß.', 'Du sprichst wichtige Lautverbindungen.'], ['Dialog: Wie schreibt man das?', 'Entdecken: Alphabet und Buchstaben', 'Aussprache: ä, ö, ü, ß', 'Audio: Namen und Telefonnummern', 'Sprechübung: Buchstabieren'], 'from-violet-600 to-fuchsia-600'),
  lesson(3, 'Zahlen, Zeit & Datum', 'Uhrzeiten, Kalender und Termine im Alltag', 'Im Alltag', ['Du nennst Zahlen und Uhrzeiten.', 'Du sagst Datum und Geburtstag.', 'Du vereinbarst einen Termin.'], ['Situation: Ein Termin am Telefon', 'Wortschatz: Wochentage und Monate', 'Grammatik: am, um und im', 'Hören: Uhrzeiten verstehen', 'Übung: Kalender und Termine'], 'from-cyan-600 to-blue-600'),
  lesson(4, 'Meine Familie', 'Über Menschen sprechen, die dir wichtig sind', 'Im Alltag', ['Du stellst deine Familie vor.', 'Du benutzt haben und Possessivartikel.', 'Du beschreibst Personen einfach.'], ['Dialog: Das ist meine Familie', 'Wortschatz: Familienmitglieder', 'Grammatik: haben und mein/dein', 'Mini-Story: Ein Familienfoto', 'Sprechaufgabe: Meine Familie'], 'from-blue-600 to-sky-600'),
  lesson(5, 'Freunde & Personen', 'Aussehen, Charakter, Berufe und Herkunft', 'Im Alltag', ['Du beschreibst Personen.', 'Du sprichst über Berufe und Nationalitäten.', 'Du bildest einfache Aussagesätze.'], ['Dialog: Neue Freunde', 'Entdecken: Aussehen und Charakter', 'Grammatik: regelmäßige Verben', 'Audio: Wer ist das?', 'Übung: Satzbau'], 'from-emerald-600 to-teal-600'),
  lesson(6, 'Mein Alltag', 'Tagesablauf, Gewohnheiten und Satzstellung', 'Mein Tag', ['Du erzählst von deinem Tagesablauf.', 'Du verwendest häufige Alltagsverben.', 'Du setzt trennbare Verben richtig ein.'], ['Mini-Story: Ein ganz normaler Tag', 'Wortschatz: Tagesablauf', 'Grammatik: Satzstellung und trennbare Verben', 'Hören: Von morgens bis abends', 'Übung: Ordne den Tagesablauf'], 'from-teal-600 to-emerald-600'),
  lesson(7, 'Wohnen', 'Wohnung, Zimmer, Möbel und Beschreibungen', 'Mein Tag', ['Du benennst Räume und Möbel.', 'Du erkennst Artikel und Plural.', 'Du beschreibst deine Wohnung.'], ['Dialog: Meine neue Wohnung', 'Wortschatz: Zimmer und Möbel', 'Grammatik: der, die, das und Plural', 'Audio: Eine Wohnungsführung', 'Schreibaufgabe: Meine Wohnung'], 'from-amber-500 to-orange-600'),
  lesson(8, 'In der Stadt', 'Orte finden, Wege erklären und unterwegs sein', 'Unterwegs', ['Du fragst nach dem Weg.', 'Du gibst eine kurze Wegbeschreibung.', 'Du unterscheidest wo und wohin.'], ['Situation: Wo ist der Bahnhof?', 'Wortschatz: Orte und Verkehrsmittel', 'Grammatik: wichtige Präpositionen', 'Hören: Eine Wegbeschreibung', 'Übung: Finde den Weg'], 'from-orange-600 to-red-600'),
  lesson(9, 'Essen & Trinken', 'Lebensmittel, Mahlzeiten und im Restaurant', 'Unterwegs', ['Du bestellst höflich.', 'Du sagst, was du magst oder möchtest.', 'Du sprichst über Mahlzeiten.'], ['Dialog: Im Café', 'Wortschatz: Lebensmittel und Getränke', 'Grammatik: mögen und möchten', 'Audio: Die Bestellung', 'Rollenspiel: Im Restaurant'], 'from-rose-600 to-pink-600'),
  lesson(10, 'Einkaufen', 'Geschäfte, Kleidung, Preise, Größen und Farben', 'Unterwegs', ['Du fragst nach Preis und Größe.', 'Du kaufst Produkte und Kleidung.', 'Du verwendest Akkusativ und Negation.'], ['Dialog: Im Kleidungsgeschäft', 'Entdecken: Farben und Größen', 'Grammatik: Akkusativ, kein und nicht', 'Hören: Preise verstehen', 'Übung: Das passt / passt nicht'], 'from-pink-600 to-fuchsia-600'),
  lesson(11, 'Freizeit & Hobbys', 'Über Interessen sprechen und Verabredungen treffen', 'Freie Zeit', ['Du sprichst über Hobbys.', 'Du machst Vorschläge.', 'Du verwendest können und wollen.'], ['Dialog: Hast du am Samstag Zeit?', 'Wortschatz: Sport, Musik und Filme', 'Grammatik: Modalverben', 'Audio: Freizeitpläne', 'Sprechaufgabe: Meine Woche'], 'from-purple-600 to-indigo-600'),
  lesson(12, 'Wetter & Jahreszeiten', 'Wettergespräche und Pläne für jede Jahreszeit', 'Freie Zeit', ['Du beschreibst das Wetter.', 'Du nennst Temperaturen und Jahreszeiten.', 'Du sprichst über passende Aktivitäten.'], ['Dialog: Wie ist das Wetter?', 'Wortschatz: Wetter und Temperaturen', 'Grammatik: es ist und Adjektive', 'Mini-Story: Ein Tag im Herbst', 'Übung: Wettervorhersage'], 'from-sky-600 to-cyan-600'),
  lesson(13, 'Arbeit & Beruf', 'Arbeitsplatz, Arbeitsalltag und Arbeitszeiten', 'Beruf & Alltag', ['Du sprichst über deinen Beruf.', 'Du beschreibst deinen Arbeitstag.', 'Du verwendest müssen, dürfen und sollen.'], ['Dialog: Mein erster Arbeitstag', 'Wortschatz: Berufe und Arbeitsplätze', 'Grammatik: Modalverben im Beruf', 'Hören: Arbeitszeiten', 'Sprechaufgabe: Mein Beruf'], 'from-slate-700 to-slate-900'),
  lesson(14, 'Gesundheit', 'Körper, Symptome, Arztbesuch und Apotheke', 'Beruf & Alltag', ['Du beschreibst Beschwerden.', 'Du vereinbarst einen Arzttermin.', 'Du gibst und verstehst einfache Ratschläge.'], ['Situation: Beim Arzt', 'Wortschatz: Körper und Symptome', 'Grammatik: müssen und sollen', 'Audio: In der Apotheke', 'Rollenspiel: Ich brauche Hilfe'], 'from-red-600 to-rose-600'),
  lesson(15, 'Reisen', 'Bahnhof, Flughafen, Hotel und Reiseplanung', 'Reisen & Service', ['Du kaufst eine Fahrkarte.', 'Du buchst ein Zimmer.', 'Du führst typische Reisedialoge.'], ['Dialog: Am Bahnhof', 'Wortschatz: Reise und Unterkunft', 'Grammatik: Fragen unterwegs', 'Hören: Ansagen verstehen', 'Übung: Eine Reise planen'], 'from-blue-700 to-indigo-700'),
  lesson(16, 'Post, Bank & Alltag', 'Pakete, Geld, Formulare und höfliche Fragen', 'Reisen & Service', ['Du erledigst wichtige Alltagssituationen.', 'Du füllst einfache Formulare aus.', 'Du fragst höflich nach Informationen.'], ['Situation: Ein Paket abholen', 'Wortschatz: Post, Bank und Adressen', 'Grammatik: höfliche Fragen', 'Audio: Am Schalter', 'Schreibaufgabe: Ein Formular'], 'from-emerald-700 to-green-600'),
  lesson(17, 'Vergangenheit', 'Gestern, letzte Woche und erste Erlebnisse', 'Sicher werden', ['Du erzählst, was du gemacht hast.', 'Du bildest das Perfekt mit haben und sein.', 'Du verwendest häufige Partizipien.'], ['Mini-Story: Mein Wochenende', 'Wortschatz: Zeitangaben', 'Grammatik: Perfekt mit haben', 'Audio: Was ist passiert?', 'Übung: Erlebnisse erzählen'], 'from-amber-600 to-yellow-600'),
  lesson(18, 'A1 Grammatik kompakt', 'Die wichtigsten Strukturen sicher verbinden', 'Sicher werden', ['Du wiederholst zentrale A1-Grammatik.', 'Du erkennst Satzmuster.', 'Du korrigierst typische Fehler.'], ['Werkzeug: sein, haben und Konjugation', 'Werkzeug: Artikel und Plural', 'Werkzeug: Akkusativ und Dativ', 'Audio: Fragen und Antworten', 'Grammatik-Check: A1'], 'from-indigo-700 to-blue-700'),
  lesson(19, 'A1 Wortschatz & Alltagssprache', 'Redemittel für echte Gespräche', 'Sicher werden', ['Du aktivierst die wichtigsten A1-Wörter.', 'Du nutzt häufige Redemittel.', 'Du kommst in Alltagssituationen zurecht.'], ['Entdecken: Häufige Verben und Adjektive', 'Wortschatz: Überlebensdeutsch', 'Redemittel: Bitten und Reagieren', 'Hören: Kurze Alltagsdialoge', 'Sprechtraining: Sofort antworten'], 'from-fuchsia-600 to-purple-700'),
  lesson(20, 'A1 Abschlussprüfung', 'Lesen, Hören, Schreiben und Sprechen in einer Prüfung', 'Sicher werden', ['Du kennst alle Prüfungsteile.', 'Du trainierst mit realistischen Aufgaben.', 'Du gehst sicher in die A1-Prüfung.'], ['Lesen: Informationen finden', 'Hören: Hauptinformationen verstehen', 'Grammatik und Wortschatz', 'Schreiben: Eine kurze Nachricht', 'Sprechen: Die komplette Prüfung'], 'from-slate-800 to-indigo-900'),
];
