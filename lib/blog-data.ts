export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  author: string;
  authorRole: string;
  date: string; // ISO
  dateDisplay: string;
  category: string;
  readingTime: string;
  tags: string[];
  faqs?: { q: string; a: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "tuev-vorbereitung-tipps",
    title: "TÜV-Termin: So bereiten Sie Ihr Fahrzeug optimal vor",
    excerpt: "Die Hauptuntersuchung steht an? Mit diesen 10 Tipps vermeiden Sie teure Nachprüfungen und bestehen den TÜV beim ersten Versuch.",
    image: "/assets/images/blog-tuev-vorbereitung.png",
    imageAlt: "Mechaniker prüft Fahrzeug vor TÜV-Hauptuntersuchung",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-06-25",
    dateDisplay: "25. Juni 2026",
    category: "TÜV & Hauptuntersuchung",
    readingTime: "5 Min. Lesezeit",
    tags: ["TÜV", "HU", "AU", "Hauptuntersuchung", "Reutlingen"],
    content: `
<h2>Warum eine gute Vorbereitung so wichtig ist</h2>
<p>Die Hauptuntersuchung (HU) ist in Deutschland alle zwei Jahre Pflicht. Wer unvorbereitet kommt, riskiert eine Mängelliste – und einen zweiten Termin. Dabei lassen sich die häufigsten Beanstandungen mit einfachen Handgriffen vermeiden.</p>

<h2>Die 10 wichtigsten Punkte vor dem TÜV</h2>
<ul>
  <li><strong>Beleuchtung prüfen:</strong> Alle Lichter testen – Abblendlicht, Fernlicht, Blinker, Brems- und Rückleuchten, Nebelschlussleuchte. Defekte Glühlampen sind einer der häufigsten Mängel.</li>
  <li><strong>Reifenprofil messen:</strong> Mindestens 1,6 mm Restprofil ist gesetzlich vorgeschrieben – wir empfehlen 3 mm. 1-Cent-Stück in die Profilrille halten: Wenn der Silberring vollständig sichtbar ist, sind die Reifen zu abgefahren.</li>
  <li><strong>Reifendruck kontrollieren:</strong> Steht im Tankdeckel oder der Fahrertür. Falsch aufgepumpte Reifen führen zu vorzeitigem Verschleiß.</li>
  <li><strong>Scheibenwischer testen:</strong> Streifen, quietschen oder wischen sie ungleichmäßig? Wischblätter sind günstig und schnell gewechselt.</li>
  <li><strong>Bremswirkung prüfen:</strong> Schleifgeräusche, Vibrationen oder längerer Bremsweg? Das muss vor dem TÜV behoben sein.</li>
  <li><strong>Ölstand und Flüssigkeiten:</strong> Motor- und Bremsflüssigkeit kontrollieren. Niedriger Bremsflüssigkeitsstand kann auf verschlissene Beläge hinweisen.</li>
  <li><strong>Kennzeichen reinigen:</strong> Unleserliche Kennzeichen führen direkt zu einem Mangel.</li>
  <li><strong>Warndreieck, Verbandskasten und Warnweste:</strong> Alle drei müssen vorhanden und in einwandfreiem Zustand sein.</li>
  <li><strong>Fahrzeugpapiere vollständig:</strong> Zulassungsbescheinigung Teil I (Fahrzeugschein) muss mitgebracht werden.</li>
  <li><strong>Sichtfeld frei:</strong> Keine Aufkleber auf der Windschutzscheibe im Sichtbereich des Fahrers.</li>
</ul>

<h2>Was kostet die Hauptuntersuchung in Reutlingen?</h2>
<p>Bei der Autoklinik Reutlingen kostet die HU inkl. AU <strong>165,00 € (Festpreis, keine MwSt.)</strong> Darin enthalten sind die vollständige Hauptuntersuchung durch unsere Experten sowie der Abgastest. Bei bestandener Prüfung erhalten Sie direkt die neue Prüfplakette.</p>

<h2>Was passiert bei Mängeln?</h2>
<p>Werden Mängel festgestellt, unterscheidet der TÜV zwischen geringen, erheblichen und gefährlichen Mängeln. Geringe Mängel müssen behoben werden, erlauben aber die weitere Nutzung. Bei erheblichen Mängeln haben Sie 4 Wochen Zeit zur Nachbesserung. Gefährliche Mängel bedeuten sofortiges Fahrverbot.</p>

<h2>Unser Tipp: TÜV-Vorcheck</h2>
<p>Unsicher, ob Ihr Fahrzeug den TÜV besteht? Buchen Sie unseren <strong>TÜV-Vorcheck ab 30,00 €</strong>. Wir prüfen alle relevanten Punkte und beheben festgestellte Mängel direkt – so kommen Sie beim echten TÜV-Termin ohne Überraschungen durch.</p>
    `,
    faqs: [
      { q: "Wie oft muss ich zur Hauptuntersuchung?", a: "In Deutschland ist die HU alle 24 Monate fällig. Bei Neuwagen erst nach 3 Jahren beim ersten Mal." },
      { q: "Kann ich den TÜV-Termin bei der Autoklinik buchen?", a: "Ja, wir führen die HU+AU direkt bei uns durch. Termin einfach online oder telefonisch vereinbaren." },
      { q: "Was kostet der TÜV-Vorcheck?", a: "Der TÜV-Vorcheck kostet bei uns ab 30,00 € (Festpreis, keine MwSt.) und gibt Ihnen Sicherheit vor dem echten Prüftermin." },
    ],
  },
  {
    slug: "klimaanlage-warten-reinigen",
    title: "Klimaanlage im Auto: Wann warten, wann befüllen, wann desinfizieren?",
    excerpt: "Schlechter Geruch aus der Lüftung, weniger Kühlleistung oder höherer Verbrauch – Ihr Auto sendet klare Signale. Wir erklären, was wann zu tun ist.",
    image: "/assets/images/blog-klimaanlage-warten.png",
    imageAlt: "Mechaniker wartet Klimaanlage eines Autos",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-05-20",
    dateDisplay: "20. Mai 2026",
    category: "Klimaservice",
    readingTime: "6 Min. Lesezeit",
    tags: ["Klimaanlage", "Klimaservice", "Kältemittel", "R1234yf", "Reutlingen"],
    content: `
<h2>Warum die Klimaanlage regelmäßig gewartet werden muss</h2>
<p>Die Klimaanlage Ihres Fahrzeugs verliert jährlich bis zu 10–15% ihres Kältemittels – allein durch Diffusion über Dichtungen und Schläuche. Wer das ignoriert, riskiert nicht nur schwächere Kühlleistung, sondern auch teure Kompressorschäden.</p>

<h2>Anzeichen, dass Ihre Klimaanlage Pflege braucht</h2>
<ul>
  <li>Die Luft aus den Düsen riecht muffig oder schimmelig</li>
  <li>Die Kühlung ist merklich schwächer als im Vorjahr</li>
  <li>Das Gebläse läuft, aber es wird nicht kalt</li>
  <li>Der Kraftstoffverbrauch ist ohne ersichtlichen Grund gestiegen</li>
  <li>Das Fahrzeug beschlägt innen schneller als früher</li>
</ul>

<h2>Klimaservice: Was genau passiert dabei?</h2>
<p>Beim professionellen Klimaservice wird das alte Kältemittel vollständig abgesaugt und recycelt, das System auf Lecks geprüft, mit frischem Kältemittel (R134a oder R1234yf je nach Fahrzeug) befüllt und das Klimaöl für den Kompressor ergänzt. Das dauert bei uns ca. 30–45 Minuten.</p>

<h2>Desinfektion des Klimasystems</h2>
<p>Bakterien und Schimmelpilze siedeln sich bevorzugt am Verdampfer hinter dem Armaturenbrett an. Eine spezielle Desinfektion mit bioziden Mitteln neutralisiert diese Keime und beseitigt den unangenehmen Geruch. Empfehlenswert alle 2 Jahre oder bei merklichem Geruch.</p>

<h2>Pollenfilter nicht vergessen</h2>
<p>Der Innenraumfilter (Pollenfilter) sollte spätestens alle 15.000 km oder einmal jährlich gewechselt werden. Ein verstopfter Filter reduziert die Luftmenge und fördert Keimwachstum. Den Wechsel führen wir bei jedem Klimaservice standardmäßig durch.</p>

<h2>Kosten bei der Autoklinik Reutlingen</h2>
<p>Der vollständige Klimaservice inklusive Kältemittelbefüllung kostet bei uns <strong>ab 115,00 € zzgl. 19% MwSt.</strong> Fahrzeuge mit neuem Kältemittel R1234yf (Baujahr ab 2017 meist) können je nach Füllmenge etwas mehr kosten – wir nennen Ihnen vorher den genauen Preis.</p>
    `,
    faqs: [
      { q: "Wie oft sollte die Klimaanlage gewartet werden?", a: "Wir empfehlen einen Klimaservice alle 2 Jahre, auch wenn keine Probleme erkennbar sind, da Kältemittel kontinuierlich verloren geht." },
      { q: "Was kostet der Klimaservice?", a: "Bei der Autoklinik Reutlingen ab 115,00 € zzgl. 19% MwSt. inklusive Kältemittelbefüllung und Dichtigkeitsprüfung." },
      { q: "Mein Auto hat R1234yf – ist das teurer?", a: "Das neuere Kältemittel R1234yf ist etwas teurer als das ältere R134a. Wir informieren Sie vorab über den genauen Preis für Ihr Fahrzeug." },
    ],
  },
  {
    slug: "reifenprofil-reifenwechsel-tipps",
    title: "Reifenprofil, Reifenwechsel & Lagerung: Alles was Autofahrer wissen müssen",
    excerpt: "Wann ist der Reifen wirklich verschlissen? Wie lagere ich Sommer- und Winterreifen richtig? Und wann ist der richtige Zeitpunkt zum Wechseln?",
    image: "/assets/images/blog-reifen-profil.png",
    imageAlt: "Mechaniker misst Reifenprofiltiefe mit Tiefenmesser",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-04-10",
    dateDisplay: "10. April 2026",
    category: "Reifenservice",
    readingTime: "7 Min. Lesezeit",
    tags: ["Reifen", "Reifenwechsel", "Winterreifen", "Sommerreifen", "Profiltiefe", "Reutlingen"],
    content: `
<h2>Gesetzliche Mindestprofiltiefe vs. empfohlene Profiltiefe</h2>
<p>In Deutschland schreibt das Gesetz eine Mindestprofiltiefe von <strong>1,6 mm</strong> vor – das gilt für alle Reifen. In der Praxis ist das jedoch viel zu wenig. Bei Nässe verlängert sich der Bremsweg mit fast abgefahrenen Reifen erheblich. Der ADAC empfiehlt mindestens <strong>3 mm Profiltiefe</strong> für Sommerreifen und mindestens <strong>4 mm</strong> für Winterreifen.</p>

<h2>So prüfen Sie die Profiltiefe selbst</h2>
<p>Der einfachste Test: Ein 1-Euro-Stück in die Profilrille halten. Ist der goldene Rand des Euros vollständig sichtbar, sind Sie gefährlich nahe an der Verschleißgrenze. Alternativ haben fast alle Reifen eingearbeitete Verschleißanzeiger (TWI – Tread Wear Indicator) im Profil, die bei Erreichen der 1,6 mm sichtbar werden.</p>

<h2>Wann Sommer-, wann Winterreifen?</h2>
<p>Die Faustregel "O bis O" (Oktober bis Ostern) ist ein guter Anhaltspunkt, aber die Temperatur ist entscheidender als das Datum. Winterreifen sind unter 7 °C deutlich sicherer – ihre weichere Gummimischung bleibt auch bei Kälte geschmeidig. Sommerreifen verhärten bei niedrigen Temperaturen und verlieren Haftung.</p>

<h2>Richtiges Lagern der saisonalen Reifen</h2>
<ul>
  <li>Reifen auf Felgen stehend lagern (hochkant), ohne Felgen hängend</li>
  <li>Kühl, trocken und dunkel – kein direktes Sonnenlicht</li>
  <li>Weg von Benzin, Öl und Lösungsmitteln</li>
  <li>Luftdruck für die Lagerung auf ca. 0,5 bar reduzieren (bei Reifen ohne Felge)</li>
  <li>Jährlich auf Risse, Ozonrisse und Verformungen prüfen</li>
</ul>

<h2>Reifendienst bei der Autoklinik Reutlingen</h2>
<p>Wir führen den Reifenwechsel inkl. Auswuchten <strong>ab 20,00 € pro Satz</strong> zzgl. 19% MwSt. durch. Lagerung Ihrer Saisonreifen bieten wir auf Anfrage an. Termin am besten frühzeitig buchen – zu Beginn der Saison sind die Wartezeiten erfahrungsgemäß länger.</p>
    `,
    faqs: [
      { q: "Ab wann sind Winterreifen Pflicht?", a: "In Deutschland gibt es keine Winterreifenpflicht per Datum, aber eine situative Winterreifenpflicht bei Schnee, Eis und Reifglätte." },
      { q: "Wie lange halten Reifen?", a: "Als Faustregel gilt: Reifen, die älter als 6 Jahre sind, sollten geprüft und ab 10 Jahren grundsätzlich ersetzt werden – unabhängig vom Profil." },
      { q: "Was kostet der Reifenwechsel bei der Autoklinik?", a: "Der Reifenwechsel inkl. Wuchten kostet ab 20,00 € pro Satz zzgl. 19% MwSt." },
    ],
  },
  {
    slug: "oelwechsel-wie-oft-welches-oel",
    title: "Ölwechsel: Wie oft, welches Öl und was passiert bei zu langem Warten?",
    excerpt: "Motoröl ist das Blut Ihres Motors. Wir erklären, welches Öl Ihr Auto wirklich braucht, warum die Intervalle des Herstellers eingehalten werden sollten und was ein vernachlässigter Ölwechsel kostet.",
    image: "/assets/images/blog-oelwechsel.png",
    imageAlt: "Mechaniker führt Ölwechsel am Fahrzeug durch",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-03-18",
    dateDisplay: "18. März 2026",
    category: "Motor & Wartung",
    readingTime: "6 Min. Lesezeit",
    tags: ["Ölwechsel", "Motoröl", "Wartung", "Motorschutz", "Reutlingen"],
    content: `
<h2>Warum Motoröl so wichtig ist</h2>
<p>Motoröl erfüllt mehrere lebenswichtige Funktionen: Es schmiert bewegliche Teile, kühlt den Motor (zusammen mit dem Kühlmittel), reinigt den Motor von Verbrennungsrückständen und schützt vor Korrosion. Dabei altert es – durch Hitze, Feuchtigkeit und Schmutz verliert es seine Eigenschaften.</p>

<h2>Wann muss das Öl gewechselt werden?</h2>
<p>Die Empfehlung des Fahrzeugherstellers steht im Serviceheft oder im Bordcomputer. Als Richtwert gilt:</p>
<ul>
  <li>Benziner: alle 10.000–20.000 km oder einmal jährlich</li>
  <li>Diesel: alle 10.000–15.000 km oder einmal jährlich</li>
  <li>Fahrzeuge mit "Longlife"-Service: bis zu 30.000 km – aber nur mit dem dafür freigegebenen Öl</li>
</ul>
<p>Wer viele Kurzstrecken fährt, sollte häufiger wechseln – bei weniger als 15 km pro Fahrt kommt der Motor kaum auf Betriebstemperatur, was das Öl stärker belastet.</p>

<h2>Welches Motoröl ist das richtige?</h2>
<p>Das richtige Öl steht im Handbuch Ihres Fahrzeugs. Wichtig sind Viskositätsklasse (z.B. 5W-40) und die Freigabe des Herstellers (z.B. VW 504.00, BMW Longlife-04, Mercedes 229.5). Ein falsches Öl kann Dichtungen beschädigen, den Kraftstoffverbrauch erhöhen und im schlimmsten Fall den Motorschaden beschleunigen.</p>

<h2>Was passiert, wenn das Öl zu lange nicht gewechselt wird?</h2>
<ul>
  <li>Das Öl verdickt und schmiert nicht mehr ausreichend</li>
  <li>Es bilden sich Schlamm und Ablagerungen im Motor</li>
  <li>Hydraulische Steuerketten- und Nockenwellensysteme versagen</li>
  <li>Im schlimmsten Fall: <strong>Motorschaden</strong> mit Reparaturkosten im vierstelligen Bereich</li>
</ul>

<h2>Ölwechsel bei der Autoklinik Reutlingen</h2>
<p>Wir verwenden ausschließlich geprüfte Markenöle der Spezifikation Ihres Fahrzeugs. Ein Ölwechsel inkl. Ölfilter und Sichtcheck kostet <strong>ab 90,00 € zzgl. 19% MwSt.</strong></p>
    `,
    faqs: [
      { q: "Kann ich auch ein günstigeres Öl verwenden?", a: "Nein. Verwenden Sie immer das im Handbuch freigegebene Öl. Falsches Öl kann die Garantie erlöschen lassen und im schlimmsten Fall den Motor beschädigen." },
      { q: "Wie erkenne ich, dass der Ölstand zu niedrig ist?", a: "Die Ölstandslampe leuchtet auf, oder Sie messen mit dem Ölmessstab. Unter dem Minimum sollte sofort Öl nachgefüllt werden – nie ohne Prüfung der Ursache." },
      { q: "Was kostet ein Ölwechsel bei der Autoklinik?", a: "Ab 90,00 € zzgl. 19% MwSt. inklusive Markenöl, Ölfilter und Sichtcheck des Fahrzeugs." },
    ],
  },
  {
    slug: "bremsen-pruefen-wechseln",
    title: "Bremsen prüfen: Diese Warnsignale sollten Sie nie ignorieren",
    excerpt: "Quietschen, Vibrieren, längerer Bremsweg – Ihre Bremsen senden klare Warnsignale. Wir erklären, was dahintersteckt und wann es gefährlich wird.",
    image: "/assets/images/blog-bremsen-pruefen.png",
    imageAlt: "Mechaniker prüft Bremsscheibe und Bremsbeläge",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-06-02",
    dateDisplay: "2. Juni 2026",
    category: "Sicherheit & Bremsen",
    readingTime: "5 Min. Lesezeit",
    tags: ["Bremsen", "Bremsbeläge", "Bremsscheiben", "Sicherheit", "Reutlingen"],
    content: `
<h2>Woran erkennt man verschlissene Bremsen?</h2>
<p>Die Bremsanlage ist das wichtigste Sicherheitssystem Ihres Fahrzeugs. Folgende Anzeichen deuten auf Verschleiß oder Defekte hin:</p>
<ul>
  <li><strong>Quietschen:</strong> Die Verschleißwarner haben die Bremsbeläge bereits fast vollständig abgenutzt. Sofort prüfen lassen!</li>
  <li><strong>Metallisches Schleifen:</strong> Die Beläge sind aufgebraucht – Metall reibt auf Metall. Sicherheitsrisiko und teuer, da auch die Scheibe beschädigt wird.</li>
  <li><strong>Vibrieren beim Bremsen:</strong> Verzogene Bremsscheiben, z.B. nach Überhitzung durch häufiges Bremsen am Berg.</li>
  <li><strong>Fahrzeug zieht beim Bremsen:</strong> Einseitig verschlissene Beläge oder ein klemmendes Bremssattel.</li>
  <li><strong>Weiches oder tiefes Bremspedal:</strong> Luft im Bremssystem oder Bremsflüssigkeitsverlust – sofort Werkstatt aufsuchen.</li>
  <li><strong>ABS-Lampe leuchtet dauerhaft:</strong> Sensor- oder Systemfehler, der die ABS-Funktion beeinträchtigt.</li>
</ul>

<h2>Wie lange halten Bremsbeläge?</h2>
<p>Das hängt stark vom Fahrstil, der Bremsanlage und dem Fahrzeuggewicht ab. Als Richtwert gilt:</p>
<ul>
  <li>Vordere Bremsbeläge: 30.000–70.000 km</li>
  <li>Hintere Bremsbeläge: 60.000–100.000 km</li>
  <li>Bremsscheiben: 80.000–120.000 km</li>
</ul>

<h2>Bremsflüssigkeit – der unterschätzte Faktor</h2>
<p>Bremsflüssigkeit ist hygroskopisch – sie zieht Wasser aus der Luft. Mit steigendem Wassergehalt sinkt der Siedepunkt. Im schlimmsten Fall verdampft die Flüssigkeit unter starker Belastung (z.B. Bergabfahrten) – das Bremspedal geht plötzlich durch: Bremsversagen. Wir empfehlen den Wechsel alle 2 Jahre.</p>

<h2>Bremsservice bei der Autoklinik Reutlingen</h2>
<p>Wir prüfen Ihre Bremsanlage kostenlos im Rahmen jeder Inspektion. Bei festgestellten Mängeln nennen wir Ihnen sofort einen Festpreis. Rufen Sie uns an oder buchen Sie online einen Termin.</p>
    `,
    faqs: [
      { q: "Muss ich bei Bremsenproblemen sofort zur Werkstatt?", a: "Bei metallischem Schleifen, einem weichen Pedal oder starkem Ziehen: Ja, sofort. Diese Symptome sind ein direktes Sicherheitsrisiko." },
      { q: "Müssen Bremsscheiben immer zusammen mit Belägen gewechselt werden?", a: "Nicht zwingend, aber empfehlenswert wenn die Scheiben die Mindestdicke unterschreiten oder sichtbar verrostet und verformt sind." },
      { q: "Was kostet ein Bremsenwechsel?", a: "Das hängt vom Fahrzeug und Umfang ab. Wir erstellen Ihnen vor jeder Arbeit einen verbindlichen Kostenvoranschlag." },
    ],
  },
  {
    slug: "wintercheck-fahrzeug-vorbereitung",
    title: "Wintercheck: So machen Sie Ihr Auto fit für Eis und Schnee",
    excerpt: "Plötzlicher Kälteeinbruch, leere Batterie, kaputte Wischer. Wer seinen Wintercheck rechtzeitig macht, spart Ärger und vermeidet gefährliche Situationen.",
    image: "/assets/images/blog-wintercheck.png",
    imageAlt: "Mechanikerteam bereitet Fahrzeug für den Winter vor",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-05-28",
    dateDisplay: "28. Mai 2026",
    category: "Saisonaler Service",
    readingTime: "6 Min. Lesezeit",
    tags: ["Wintercheck", "Batterie", "Winterreifen", "Frostschutz", "Reutlingen"],
    content: `
<h2>Warum der Wintercheck so wichtig ist</h2>
<p>Der Winter stellt besondere Anforderungen an Fahrzeug und Fahrer. Kälte schwächt die Batterie, Frost macht das Motoröl zähflüssiger, und Eis und Schnee erfordern funktionsfähige Reifen und Scheibenwischer. Ein rechtzeitiger Wintercheck verhindert Pannen in den ungünstigsten Situationen.</p>

<h2>Die wichtigsten Punkte beim Wintercheck</h2>
<ul>
  <li><strong>Batterie prüfen:</strong> Batterien versagen am häufigsten bei Kälte. Ein Kapazitätstest zeigt, ob die Batterie die nächste Kältewelle übersteht. Batterien über 4–5 Jahre sollten ersetzt werden.</li>
  <li><strong>Winterreifen montieren:</strong> Rechtzeitig vor dem Kälteeinbruch – nicht erst wenn Schnee liegt. Die Werkstätten sind dann überfüllt.</li>
  <li><strong>Frostschutz im Kühlmittel prüfen:</strong> Ausreichender Frostschutz bis mindestens -25°C schützt vor Motorschäden durch eingefrierenes Kühlwasser.</li>
  <li><strong>Scheibenwaschanlage:</strong> Sommer-Scheibenreiniger bei Frost einfrieren zu lassen, kann teure Schäden verursachen. Winterfrost bis -20°C einfüllen.</li>
  <li><strong>Scheibenwischer:</strong> Sommerwischer gehören ausgetauscht – Winterwischer mit Schutzkappe für Schnee und Eis.</li>
  <li><strong>Beleuchtung:</strong> Im Winter ist gute Sicht besonders wichtig. Alle Lichter prüfen und ggf. auf LED-Tagfahrlicht umrüsten.</li>
  <li><strong>Bremsflüssigkeit:</strong> Hoher Wassergehalt in der Bremsflüssigkeit ist im Winter noch gefährlicher. Wechsel alle 2 Jahre.</li>
</ul>

<h2>Notfallausrüstung für den Winter</h2>
<p>Stets an Bord haben: Eiskratzer mit Handbesen, Starthilfekabel, Warndreieck und Warnweste, kleinen Spaten, Schneeketten (je nach Region), Decke und warme Kleidung für den Pannenfall.</p>

<h2>Wintercheck bei der Autoklinik Reutlingen</h2>
<p>Unser Wintercheck umfasst alle sicherheitsrelevanten Punkte: Batterietest, Reifenwechsel, Frostschutzkontrolle, Beleuchtungs- und Bremscheck. Termin jetzt online buchen – idealerweise schon im Oktober.</p>
    `,
    faqs: [
      { q: "Wann ist der beste Zeitpunkt für den Wintercheck?", a: "Oktober ist ideal – bevor der erste Frost kommt und die Werkstätten voll sind. Auf jeden Fall vor der ersten Kältewelle." },
      { q: "Wie lange hält eine Autobatterie?", a: "Durchschnittlich 4–6 Jahre. Im Winter fällt die Kapazität auf bis zu 50% – eine schwache Batterie sollte daher vor dem Winter getauscht werden." },
      { q: "Muss ich Winterreifen haben?", a: "Es gibt in Deutschland eine situative Winterreifenpflicht. Bei Schnee, Eis oder Reifglätte müssen wintertaugliche Reifen montiert sein. Sommere-Reifen auf Schnee können auch ohne Unfall zu einem Bußgeld führen." },
    ],
  },
  {
    slug: "unfallschaden-richtig-vorgehen",
    title: "Nach dem Unfall: Was tun? Schritt-für-Schritt-Anleitung für Autofahrer",
    excerpt: "Unfall passiert – und plötzlich weiß man nicht, was zuerst. Wir erklären, was unmittelbar nach einem Unfall zu tun ist und wie Sie Ihre Ansprüche richtig geltend machen.",
    image: "/assets/images/blog-unfallschaden.png",
    imageAlt: "Schadensbegutachtung nach Autounfall in der Werkstatt",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-05-14",
    dateDisplay: "14. Mai 2026",
    category: "Unfall & Karosserie",
    readingTime: "8 Min. Lesezeit",
    tags: ["Unfall", "Unfallschaden", "Versicherung", "Gutachter", "Reutlingen"],
    content: `
<h2>Direkt nach dem Unfall: Die ersten Minuten</h2>
<ol>
  <li><strong>Sicherheit herstellen:</strong> Warnblinkanlage an, Warnweste anlegen, Warndreieck aufstellen (mind. 100 m vor der Unfallstelle auf der Autobahn, mind. 50 m innerorts).</li>
  <li><strong>Verletzte versorgen:</strong> Erste Hilfe leisten, Notruf 112 wählen.</li>
  <li><strong>Polizei rufen:</strong> Bei Sachschäden über ca. 1.500 € sollte die Polizei gerufen werden. Bei Personenschäden immer.</li>
  <li><strong>Beweise sichern:</strong> Fotos von Fahrzeugschäden, Kennzeichen, Unfallstelle, Straßenverhältnissen und Zeugen machen.</li>
  <li><strong>Daten austauschen:</strong> Name, Adresse, Versicherung und Kennzeichen des Unfallgegners notieren. Europäisches Unfallprotokoll ausfüllen.</li>
</ol>

<h2>Wer haftet – und was bedeutet das für die Reparatur?</h2>
<p>Bei eindeutiger Fremdverschuldung trägt die gegnerische Haftpflichtversicherung alle Kosten: Reparatur, Mietwagen, Wertminderung und Gutachterkosten. Sie haben das Recht auf Reparatur in einer Werkstatt Ihrer Wahl – nicht der der Versicherung!</p>

<h2>Gutachter oder Kostenvoranschlag?</h2>
<p>Bei Schäden über ca. 750 € empfiehlt sich ein unabhängiges Kfz-Gutachten. Der Gutachter ermittelt den tatsächlichen Schaden und schützt Sie vor einer Unterbewertung durch die gegnerische Versicherung. Die Kosten des Gutachtens trägt bei Fremdverschulden ebenfalls der Verursacher.</p>

<h2>Freie Werkstatt vs. Vertragswerkstatt nach Unfall</h2>
<p>Sie sind nicht verpflichtet, in einer Partnerwerkstatt der Versicherung zu reparieren. Als freie Fachwerkstatt rechnen wir direkt mit der Versicherung ab und vertreten Ihre Interessen – nicht die der Versicherung.</p>

<h2>Unfallinstandsetzung bei der Autoklinik Reutlingen</h2>
<p>Wir übernehmen die komplette Abwicklung mit der Kfz-Versicherung, stellen bei Bedarf einen Leihwagen zur Verfügung und reparieren Ihr Fahrzeug nach Herstellerstandard. Jetzt Termin vereinbaren.</p>
    `,
    faqs: [
      { q: "Darf ich nach einem Unfall die Werkstatt frei wählen?", a: "Ja. Sie haben das Recht auf freie Werkstattwahl – auch wenn die Versicherung eine Partnerwerkstatt empfiehlt." },
      { q: "Wann brauche ich einen Kfz-Gutachter?", a: "Ab einem Schaden von ca. 750 € empfiehlt sich ein unabhängiges Gutachten. Bei Totalschaden oder Personenschäden immer." },
      { q: "Was ist eine Wertminderung?", a: "Nach einem Unfall hat das Fahrzeug auch nach perfekter Reparatur einen geringeren Wiederverkaufswert. Diese merkantile Wertminderung ist bei Fremdverschulden erstattungsfähig." },
    ],
  },
  {
    slug: "garantie-freie-werkstatt",
    title: "Herstellergarantie und freie Werkstatt: Was viele Autofahrer nicht wissen",
    excerpt: "Viele glauben, sie müssen für die Inspektion zur Vertragswerkstatt – sonst verlieren sie die Garantie. Das stimmt nicht. Wir erklären die Rechtslage klar und verständlich.",
    image: "/assets/images/blog-garantie-werkstatt.png",
    imageAlt: "Mechaniker stempelt Serviceheft in der freien Werkstatt",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-05-05",
    dateDisplay: "5. Mai 2026",
    category: "Recht & Garantie",
    readingTime: "5 Min. Lesezeit",
    tags: ["Garantie", "Freie Werkstatt", "GVO", "Herstellergarantie", "Reutlingen"],
    content: `
<h2>Das Wichtigste vorab</h2>
<p>Die Herstellergarantie bleibt erhalten, wenn Sie Ihr Fahrzeug in einer qualifizierten freien Werkstatt inspizieren lassen – sofern Original- oder gleichwertige Teile verbaut werden und die Serviceintervalle eingehalten werden. Das ist durch die EU-Gruppenfreistellungsverordnung (GVO) geregelt.</p>

<h2>Was sagt die EU-GVO?</h2>
<p>Die Gruppenfreistellungsverordnung der EU untersagt es Fahrzeugherstellern, Kunden zur Wartung an Vertragswerkstätten zu zwingen. Konkret bedeutet das: Hersteller dürfen die Garantie nicht verweigern, nur weil die Wartung bei einer freien Werkstatt durchgeführt wurde. Bedingung: Die Arbeit muss fachgerecht sein und mit gleichwertigen Teilen erfolgen.</p>

<h2>Was müssen Sie beachten?</h2>
<ul>
  <li>Serviceintervalle des Herstellers einhalten</li>
  <li>Original- oder gleichwertige Teile (OEM-Qualität) verwenden</li>
  <li>Alle durchgeführten Arbeiten im Serviceheft dokumentieren</li>
  <li>Rechnungen und Nachweise aufbewahren</li>
</ul>

<h2>Was wenn der Hersteller die Garantie verweigert?</h2>
<p>Verweigert ein Hersteller die Garantieleistung mit dem Hinweis auf eine freie Werkstatt, liegt in den meisten Fällen ein Rechtsverstoß vor. Wenden Sie sich an einen Rechtsanwalt für Kfz-Recht oder den ADAC.</p>

<h2>Unser Service</h2>
<p>Bei der Autoklinik Reutlingen dokumentieren wir alle Arbeiten lückenlos im Serviceheft und verwenden ausschließlich Original- oder gleichwertige Teile. Ihre Garantie bleibt zu 100% erhalten.</p>
    `,
    faqs: [
      { q: "Verliere ich meine Garantie bei einer freien Werkstatt?", a: "Nein. Die EU-GVO schützt Sie. Garantieverlust durch freie Werkstatt ist in der Regel rechtswidrig, sofern gleichwertige Teile verwendet werden." },
      { q: "Was sind gleichwertige Teile?", a: "Teile, die die gleichen oder bessere Qualitätsstandards erfüllen wie Originalteile – meist von denselben Zulieferern wie OEM-Teile hergestellt." },
      { q: "Muss ich die Rechnung der freien Werkstatt dem Hersteller vorlegen?", a: "Im Garantiefall ja. Heben Sie alle Rechnungen und das Serviceheft gut auf – sie sind Ihr Nachweis für ordnungsgemäße Wartung." },
    ],
  },
  {
    slug: "windschutzscheibe-chip-reparatur",
    title: "Steinschlag in der Windschutzscheibe: Reparieren oder Austauschen?",
    excerpt: "Ein Steinschlag ist ärgerlich, aber oft günstiger zu beheben als gedacht. Wann sich eine Reparatur lohnt und wann ein Austausch nötig ist – wir erklären es.",
    image: "/assets/images/blog-windschutzscheibe.png",
    imageAlt: "Steinschlag-Reparatur an der Windschutzscheibe",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-04-28",
    dateDisplay: "28. April 2026",
    category: "Glasservice",
    readingTime: "4 Min. Lesezeit",
    tags: ["Windschutzscheibe", "Steinschlag", "Glasservice", "Reparatur", "Reutlingen"],
    content: `
<h2>Steinschlag: Sofort handeln lohnt sich</h2>
<p>Ein kleiner Stein, ein lautes Knacken – und plötzlich ist ein Chip in der Scheibe. Was viele nicht wissen: Ein Steinschlag, der heute klein ist, kann morgen durch Temperaturschwankungen oder Erschütterungen zu einem Riss quer über die gesamte Scheibe werden. Schnelles Handeln spart Geld.</p>

<h2>Wann lässt sich eine Scheibe reparieren?</h2>
<p>Eine Steinschlagreparatur ist möglich, wenn:</p>
<ul>
  <li>Der Chip kleiner als eine 2-Euro-Münze ist (ca. 30 mm)</li>
  <li>Kein Riss vom Chip ausgeht</li>
  <li>Der Schaden nicht im direkten Sichtfeld des Fahrers liegt (ca. 29x21 cm nach StVZO)</li>
  <li>Die Innenscheibe des Verbundglases nicht beschädigt ist</li>
</ul>

<h2>Die Reparatur – wie funktioniert das?</h2>
<p>Spezialharz wird unter Vakuum in den Chip injiziert und mit UV-Licht ausgehärtet. Die Reparatur ist in ca. 30–45 Minuten abgeschlossen und macht den Chip optisch kaum noch sichtbar. Strukturell wird die Scheibe nahezu vollständig wiederhergestellt.</p>

<h2>Wann muss die Scheibe getauscht werden?</h2>
<p>Ein Austausch ist nötig bei langen Rissen (über 40 cm), bei Schäden im Sichtfeld oder Beschädigungen der inneren Scheibe des Verbundglases. Auch bei älteren Fahrzeugen, bei denen die Scheibe bereits stark gesprungen ist, empfiehlt sich der Austausch.</p>

<h2>Versicherung zahlt oft</h2>
<p>Die Teilkaskoversicherung übernimmt in der Regel die Kosten für Steinschlagreparatur und Scheibenaustausch ohne Anrechnung auf den Schadenfreiheitsrabatt. Wir helfen bei der Schadensmeldung.</p>
    `,
    faqs: [
      { q: "Zahlt die Versicherung den Steinschlag?", a: "Die Teilkaskoversicherung übernimmt in der Regel Steinschlagreparaturen. Kein Einfluss auf den Schadenfreiheitsrabatt." },
      { q: "Wie lange dauert eine Steinschlagreparatur?", a: "Ca. 30–45 Minuten. Danach ist das Fahrzeug sofort wieder fahrbereit." },
      { q: "Wie schnell sollte ich einen Steinschlag reparieren lassen?", a: "So schnell wie möglich. Durch Temperaturschwankungen und Vibrationen können sich Chips zu langen Rissen entwickeln, die einen teureren Scheibenaustausch erfordern." },
    ],
  },
  {
    slug: "fehlerdiagnose-motorlampe",
    title: "Motorlampe leuchtet: Was bedeutet das – und was tun?",
    excerpt: "Die Motorkontrollleuchte (MKL) geht an und sofort meldet sich die Panik. Wir erklären, was die verschiedenen Signale bedeuten und wann es wirklich ernst wird.",
    image: "/assets/images/blog-fehlerdiagnose.png",
    imageAlt: "Kfz-Mechaniker schließt OBD-Diagnosegerät an Fahrzeug an",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-04-22",
    dateDisplay: "22. April 2026",
    category: "Diagnose & Technik",
    readingTime: "5 Min. Lesezeit",
    tags: ["Motorlampe", "MKL", "OBD", "Fehlerdiagnose", "Reutlingen"],
    content: `
<h2>Was ist die Motorkontrollleuchte?</h2>
<p>Die Motorkontrollleuchte (auch MKL oder Check Engine Light) ist eine gelb-orange leuchtende Motorsilhouette im Armaturenbrett. Sie wird vom Motorsteuergerät aktiviert, wenn ein Fehler im Motor- oder Abgassystem festgestellt wird und als Fehlercode gespeichert.</p>

<h2>Dauerleuchten vs. Blinken</h2>
<ul>
  <li><strong>Dauerhaft leuchtend:</strong> Ein Fehler wurde erkannt, der aktuell keine Fahruntauglichkeit darstellt. Jedoch sollte ein Werkstattbesuch zeitnah erfolgen.</li>
  <li><strong>Blinkend oder blinkend + Drehmomentverlust:</strong> Fehlzündungen (Missfire) – sofort langsamer fahren und Werkstatt aufsuchen! Fehlzündungen können den Katalysator innerhalb von Minuten zerstören.</li>
</ul>

<h2>Häufige Ursachen der Motorlampe</h2>
<ul>
  <li>Lambdasonde defekt (häufigste Ursache)</li>
  <li>Zündkerze oder Zündspule defekt</li>
  <li>Tankdeckel nicht richtig geschlossen (Verdunstungsanlage)</li>
  <li>AGR-Ventil (Abgasrückführung) verklebt</li>
  <li>Partikelfilter (DPF) zugesetzt</li>
  <li>Luftmassenmesser verschmutzt</li>
  <li>AdBlue-Füllstand zu niedrig (SCR-System)</li>
</ul>

<h2>OBD-Fehlerauslesung bei der Autoklinik</h2>
<p>Mit modernen Diagnosegeräten lesen wir alle gespeicherten Fehlercodes aus und können die Ursache eingrenzen. Die Fehlerauslesung kostet bei uns <strong>ab 20,00 € zzgl. 19% MwSt.</strong> und wird bei nachfolgender Reparatur auf die Kosten angerechnet.</p>
    `,
    faqs: [
      { q: "Darf ich noch fahren, wenn die Motorlampe leuchtet?", a: "Bei dauerhaftem Leuchten: ja, zeitnah Werkstatt aufsuchen. Bei Blinken oder zusätzlichem Leistungsverlust: sofort runter vom Gas und Werkstatt anfahren." },
      { q: "Kann ich den Fehler selbst löschen?", a: "Technisch ja, mit einem OBD-Lesegerät. Aber der Fehler kommt wieder, wenn die Ursache nicht behoben wurde. Das Löschen ohne Reparatur bringt nichts." },
      { q: "Was kostet die Fehlerdiagnose?", a: "Die OBD-Fehlerauslesung kostet ab 20,00 € zzgl. MwSt. Bei anschließender Reparatur wird dieser Betrag angerechnet." },
    ],
  },
  {
    slug: "zahnriemen-wechsel-wichtigkeit",
    title: "Zahnriemenwechsel: Warum dieser Service Leben rettet",
    excerpt: "Der Zahnriemen ist eines der am stärksten unterschätzten Verschleißteile am Auto. Ein Riss bedeutet meist Totalschaden des Motors – und der kommt ohne Vorwarnung.",
    image: "/assets/images/blog-zahnriemen.png",
    imageAlt: "Mechaniker prüft Zahnriemen eines Fahrzeugmotors",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-04-14",
    dateDisplay: "14. April 2026",
    category: "Motor & Wartung",
    readingTime: "6 Min. Lesezeit",
    tags: ["Zahnriemen", "Zahnkette", "Motor", "Wartung", "Motorschaden", "Reutlingen"],
    content: `
<h2>Was macht der Zahnriemen?</h2>
<p>Der Zahnriemen synchronisiert die Kurbelwelle und Nockenwelle des Motors. Er steuert, wann die Einlass- und Auslassventile öffnen und schließen – und zwar im exakten Takt des Kolbens. Läuft alles synchron, arbeitet der Motor perfekt. Reißt der Zahnriemen, stoppen die Nockenwellen abrupt, während sich Kolben und Ventile noch im gleichen Raum befinden.</p>

<h2>Was passiert, wenn der Zahnriemen reißt?</h2>
<p>Bei sogenannten "Interferenzmotoren" – das sind die meisten modernen Motoren – treffen Kolben auf Ventile. Die Folge: verbogene Ventile, beschädigte Kolben, im schlimmsten Fall ein kompletter Motorschaden. Reparaturkosten: oft 3.000–8.000 €. In manchen Fällen ist das Fahrzeug ein Totalschaden.</p>

<h2>Wann muss der Zahnriemen gewechselt werden?</h2>
<p>Das Wechselintervall ist herstellerabhängig und steht im Serviceheft. Als Richtwert gilt:</p>
<ul>
  <li>Alle 60.000–120.000 km oder</li>
  <li>Alle 4–7 Jahre (je nachdem was zuerst erreicht wird)</li>
</ul>
<p>Wichtig: Beim Zahnriemenwechsel sollten immer auch Spannrolle, Umlenkrolle und Wasserpumpe (wenn zahnriemengetrieben) erneuert werden – die Arbeitskosten fallen sowieso an.</p>

<h2>Zahnkette statt Zahnriemen</h2>
<p>Viele neuere Fahrzeuge haben statt eines Zahnriemens eine Steuerkette. Diese ist wartungsärmer, aber nicht wartungsfrei. Rasseln beim Kaltstart, Motorlampe oder laut klackernde Geräusche können auf eine gestreckte Kette hinweisen.</p>

<h2>Zahnriemenwechsel bei der Autoklinik Reutlingen</h2>
<p>Wir führen den Zahnriemenwechsel für alle gängigen Fahrzeugmarken durch. Preis auf Anfrage – bitte Fahrzeugtyp und Motorisierung angeben. Termin jetzt buchen.</p>
    `,
    faqs: [
      { q: "Gibt es ein Anzeichen für einen bald reißenden Zahnriemen?", a: "Nein – das ist das Tückische. Ein Zahnriemen reißt in der Regel ohne Vorwarnung. Nur das Einhalten des Wechselintervalls schützt effektiv." },
      { q: "Muss ich auch Spannrolle und Wasserpumpe gleichzeitig wechseln?", a: "Ja, das ist dringend empfohlen. Diese Teile kosten wenig und müssen beim Zahnriemenwechsel sowieso ausgebaut werden. Ein späterer Ausfall würde erneut die vollständigen Arbeitskosten anfallen lassen." },
      { q: "Wie erkenne ich, ob mein Motor einen Zahnriemen oder eine Kette hat?", a: "Im Serviceheft steht der Wechselintervall. Ist keiner angegeben, handelt es sich wahrscheinlich um eine Kette. Wir prüfen das kostenlos bei Ihrem nächsten Besuch." },
    ],
  },
  {
    slug: "elektroauto-werkstatt-wartung",
    title: "Elektroauto in der Werkstatt: Was wird gewartet, was nicht?",
    excerpt: "E-Autos gelten als wartungsärmer. Aber wartungsfrei sind sie nicht. Wir erklären, was bei der Inspektion eines Elektrofahrzeugs zu tun ist – und was entfällt.",
    image: "/assets/images/blog-elektroauto.png",
    imageAlt: "Elektroauto bei der Werkstattinspektion",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-04-07",
    dateDisplay: "7. April 2026",
    category: "Diagnose & Technik",
    readingTime: "7 Min. Lesezeit",
    tags: ["Elektroauto", "EV", "Wartung", "Inspektion", "Bremsen", "Reutlingen"],
    content: `
<h2>Was entfällt beim Elektroauto?</h2>
<p>Die gute Nachricht zuerst: Zahlreiche Wartungsarbeiten, die beim Verbrenner regelmäßig anfallen, entfallen beim Elektrofahrzeug vollständig:</p>
<ul>
  <li>Kein Ölwechsel (kein Verbrennungsmotor)</li>
  <li>Kein Zahnriemen- oder Zahnkettenwechsel</li>
  <li>Kein Filterwechsel für Kraftstoff oder Luft</li>
  <li>Kein Auspuff, kein Katalysator</li>
  <li>Keine Zündkerzen</li>
  <li>Kupplung entfällt bei den meisten E-Fahrzeugen</li>
</ul>

<h2>Was muss trotzdem gewartet werden?</h2>
<ul>
  <li><strong>Bremsen:</strong> Durch Rekuperation werden die Bremsen weniger beansprucht, können aber schneller korrodieren da sie seltener genutzt werden. Regelmäßige Prüfung nötig.</li>
  <li><strong>Bremsflüssigkeit:</strong> Auch beim E-Auto hygroskopisch und muss alle 2 Jahre gewechselt werden.</li>
  <li><strong>Klimaanlage:</strong> Identisch zum Verbrenner – Kältemittelbefüllung, Pollenfilter, Desinfektion.</li>
  <li><strong>Reifen:</strong> E-Autos sind schwerer und beschleunigen schärfer – Reifen verschleißen schneller als beim Verbrenner.</li>
  <li><strong>Kühlsystem für Batterie und Elektronik:</strong> Das Thermomanagement der Hochvoltbatterie braucht gepflegte Kühlung.</li>
  <li><strong>12V-Bordnetz-Batterie:</strong> Auch E-Autos haben eine normale 12V-Batterie für Steuergeräte und Beleuchtung.</li>
  <li><strong>HU+AU:</strong> Pflicht bleibt Pflicht – die Hauptuntersuchung gilt auch für E-Fahrzeuge.</li>
</ul>

<h2>Werkstattkompetenz bei E-Fahrzeugen</h2>
<p>Hochvoltkomponenten der Traktionsbatterie dürfen nur von spezifisch geschultem Personal gewartet werden. Bei der Autoklinik Reutlingen sind wir für gängige Elektro- und Hybridfahrzeuge ausgestattet.</p>
    `,
    faqs: [
      { q: "Muss mein E-Auto auch zum TÜV?", a: "Ja, die Hauptuntersuchungspflicht gilt unabhängig vom Antrieb. Intervalle sind identisch." },
      { q: "Wechseln E-Autos öfter Reifen?", a: "Tendenziell ja. Das höhere Gewicht und die stärkere Beschleunigung erhöhen den Reifenverschleiß. Außerdem sind für E-Fahrzeuge spezielle EV-Reifen empfehlenswert." },
      { q: "Kann die Autoklinik auch an E-Autos arbeiten?", a: "Ja, für alle Arbeiten außerhalb der Hochvoltkomponenten. Bitte fragen Sie bei spezifischen HV-Arbeiten vorab an." },
    ],
  },
  {
    slug: "fruehjahrscheck-auto",
    title: "Frühjahrscheck: Jetzt das Auto fit für die warme Saison machen",
    excerpt: "Winterreifen raus, Sommerreifen rein – aber das ist nicht alles. Ein guter Frühjahrscheck holt das letzte aus Ihrem Auto und deckt Winterschäden frühzeitig auf.",
    image: "/assets/images/blog-fruehjahrscheck.png",
    imageAlt: "Fahrzeugcheck im Frühling in der Werkstatt",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-03-25",
    dateDisplay: "25. März 2026",
    category: "Saisonaler Service",
    readingTime: "5 Min. Lesezeit",
    tags: ["Frühjahrscheck", "Sommerreifen", "Fahrzeugcheck", "Wartung", "Reutlingen"],
    content: `
<h2>Was der Winter mit dem Auto macht</h2>
<p>Kälte, Streusalz, nasse Straßen – der Winter hinterlässt Spuren. Streusalz greift die Karosserie, Gummidichtungen und die Bremsanlage an. Schlaglöcher belasten Fahrwerk und Reifendrucksensoren. Ein Frühjahrscheck deckt Schäden früh auf – bevor sie teuer werden.</p>

<h2>Die wichtigsten Punkte beim Frühjahrscheck</h2>
<ul>
  <li><strong>Reifenwechsel auf Sommerreifen:</strong> Ab dauerhaft über 7°C Tagestemperatur. Sommerreifen bieten dann deutlich bessere Bremsleistung und Kraftstoffeffizienz.</li>
  <li><strong>Karosserie auf Salzschäden prüfen:</strong> Besonders Schweller, Radläufe und der Unterboden. Rost früh behandelt – kein Problem. Später – teuer.</li>
  <li><strong>Bremsanlage nach dem Winter:</strong> Streusalz greift Bremsscheiben an. Nach dem Winter empfiehlt sich eine Sichtprüfung auf Rost und Verschleiß.</li>
  <li><strong>Scheinwerfer und Licht prüfen:</strong> In der Winterdunkelheit gehen Birnen öfter kaputt. Jetzt vor dem Sommer prüfen.</li>
  <li><strong>Scheibenwischer tauschen:</strong> Winterwischer sind für den Sommer weniger geeignet. Jetzt Sommerwischer oder Universalwischer montieren.</li>
  <li><strong>Klimaanlage einschalten:</strong> Kühlung testen – Kältemittel geht auch im Winter verloren. Besser jetzt prüfen als im ersten Sommerhitze-Stau.</li>
  <li><strong>Unterboden reinigen:</strong> Streusalz und Schmutz mit einem Hochdruckreiniger entfernen. Schützt langfristig vor Korrosion.</li>
</ul>

<h2>Frühjahrscheck bei der Autoklinik Reutlingen</h2>
<p>Unser Frühjahrscheck umfasst alle sicherheitsrelevanten Punkte auf einen Blick. Termin jetzt buchen – bevor die Werkstätten voll sind.</p>
    `,
    faqs: [
      { q: "Wann sollte ich auf Sommerreifen wechseln?", a: "Wenn die Tagestemperaturen dauerhaft über 7°C liegen. Sommerreifen bieten unter diesen Bedingungen erheblich bessere Grip- und Bremseigenschaften." },
      { q: "Was kostet ein Frühjahrscheck?", a: "Das hängt vom Umfang ab. Reifenwechsel ab 20,00 € zzgl. MwSt. Umfassenderen Fahrzeugcheck gerne auf Anfrage." },
      { q: "Muss ich nach dem Winter immer zur Werkstatt?", a: "Nicht zwingend, aber empfehlenswert. Besonders bei älteren Fahrzeugen oder wenn Sie viel Salzstraßen gefahren sind." },
    ],
  },
  {
    slug: "kfz-gutachten-wann-notwendig",
    title: "Kfz-Gutachten: Wann brauche ich einen Sachverständigen?",
    excerpt: "Unfall, Gebrauchtwagenkauf oder Versicherungsstreit – ein unabhängiges Kfz-Gutachten schützt Ihre Interessen und verhindert, dass Sie zu wenig Geld bekommen.",
    image: "/assets/images/blog-kfz-gutachter.png",
    imageAlt: "Kfz-Sachverständiger begutachtet Fahrzeugschaden",
    author: "Alessio Piccione",
    authorRole: "Werkstattleiter",
    date: "2026-03-31",
    dateDisplay: "31. März 2026",
    category: "Gutachten & Bewertung",
    readingTime: "6 Min. Lesezeit",
    tags: ["Gutachten", "KFZ-Gutachter", "Unfallschaden", "Wertgutachten", "Reutlingen"],
    content: `
<h2>Wann ist ein Kfz-Gutachten sinnvoll?</h2>
<ul>
  <li><strong>Nach einem Unfall:</strong> Bei Fremdverschulden sichert ein unabhängiges Gutachten den vollen Schadensersatz – inklusive Wertminderung.</li>
  <li><strong>Beim Gebrauchtwagenkauf:</strong> Ein Gebrauchtwagengutachten schützt vor versteckten Mängeln und überhöhten Preisen.</li>
  <li><strong>Versicherungsstreit:</strong> Wenn die Versicherung den Schaden zu niedrig bewertet, schafft ein Gutachter Klarheit.</li>
  <li><strong>Oldtimer und Liebhaberfahrzeuge:</strong> Für Versicherung, Erbschaft oder Verkauf wird ein Wertgutachten benötigt.</li>
</ul>

<h2>Unabhängig vs. Versicherungsgutachter</h2>
<p>Viele Versicherungen bieten eigene Gutachter oder Partnerbüros an. Diese arbeiten oft günstiger – für die Versicherung, nicht für Sie. Ein unabhängiger Gutachter arbeitet ausschließlich in Ihrem Interesse.</p>

<h2>Was kostet ein Kfz-Gutachten?</h2>
<p>Die Kosten eines Gutachtens nach Unfall trägt bei Fremdverschulden die gegnerische Haftpflichtversicherung – das ist gesetzlich geregelt. Beim Gebrauchtwagencheck entstehen je nach Umfang Kosten ab ca. 120 €, die Sie selbst tragen.</p>

<h2>Kfz-Gutachter in Reutlingen</h2>
<p>Die Autoklinik Reutlingen bietet professionelle Kfz-Gutachten und Fahrzeugbewertungen direkt vor Ort. Unabhängig, fachkundig und transparent. Jetzt Termin anfragen.</p>
    `,
    faqs: [
      { q: "Wer bezahlt das Gutachten nach einem Unfall?", a: "Bei Fremdverschulden zahlt die gegnerische Haftpflichtversicherung. Das ist in der Rechtsprechung klar geregelt." },
      { q: "Wie lange dauert ein Kfz-Gutachten?", a: "Ein Unfallschadengutachten dauert ca. 45–90 Minuten. Ein vollständiger Fahrzeuggutachten für Kauf oder Erbschaft 1–2 Stunden." },
      { q: "Muss ich für ein Gutachten in eine spezielle Werkstatt?", a: "Nein. Als qualifizierte Kfz-Fachwerkstatt können wir fundierte Gutachten erstellen. Für gerichtsverwertbare Gutachten wenden wir uns an öffentlich bestellte Sachverständige." },
    ],
  },
  {
    slug: "fahrzeugcheck-gebrauchtwagen",
    title: "Gebrauchtwagencheck: Wie Sie beim Kauf böse Überraschungen vermeiden",
    excerpt: "Ein Gebrauchtwagen ist oft ein gutes Geschäft – wenn man weiß, worauf man achten muss. Unser Ratgeber erklärt die häufigsten Verstecke für Mängel und warum ein Werkstattcheck Gold wert ist.",
    image: "/assets/images/blog-fahrzeugcheck.png",
    imageAlt: "Mechaniker führt Gebrauchtwagenkontrolle durch",
    author: "Marco Elia",
    authorRole: "Geschäftsführer",
    date: "2026-03-17",
    dateDisplay: "17. März 2026",
    category: "Ratgeber",
    readingTime: "8 Min. Lesezeit",
    tags: ["Gebrauchtwagen", "Fahrzeugcheck", "Kaufberatung", "Inspektion", "Reutlingen"],
    content: `
<h2>Warum ein Gebrauchtwagenkauf ohne Check riskant ist</h2>
<p>Tausende Euro für ein Fahrzeug ausgeben – und dann stellt sich heraus, dass der Motor stirbt oder der Rahmen rostig ist. Ein professioneller Gebrauchtwagen-Check kostet einen Bruchteil und kann teure Fehlkäufe verhindern.</p>

<h2>Was prüfen Experten beim Gebrauchtwagen?</h2>
<ul>
  <li><strong>Karosserie:</strong> Unfallschäden, Nachlackierungen, Spaltmaße, Roststellen unter Türen und Schwellern</li>
  <li><strong>Motor und Getriebe:</strong> Ölstand und -qualität, Kühlmittelstand, Undichtigkeiten, Geräusche</li>
  <li><strong>Fahrwerk und Bremsen:</strong> Verschleiß an Stoßdämpfern, Bremsbelägen, Lenkung</li>
  <li><strong>Elektronik:</strong> Fehlercodespeicher auslesen – gespeicherte Fehler verraten viel über die Fahrzeughistorie</li>
  <li><strong>Reifen:</strong> Gleichmäßiger Verschleiß? Ungleichmäßiges Profil deutet auf Fahrwerksprobleme hin</li>
  <li><strong>Innenraum:</strong> Polster, Klimaanlage, Infotainment, elektrische Fensterheber</li>
  <li><strong>Serviceheft:</strong> Wurden Intervalle eingehalten? Liegt das Originalscheckheft vor?</li>
</ul>

<h2>Typische versteckte Mängel</h2>
<ul>
  <li>Unfallschäden unter Farbe (Spachtelstellen mit Magneten ertasten)</li>
  <li>Manipulierter Kilometerstand (Serviceheft-Einträge passen nicht zusammen)</li>
  <li>Wasserschäden (muffiger Geruch, Rost unter Teppichen)</li>
  <li>Ausgelöster und gestellter Airbag (Airbag-Lampe prüfen)</li>
</ul>

<h2>Gebrauchtwagen-Check bei der Autoklinik Reutlingen</h2>
<p>Wir bieten professionelle Gebrauchtwagenchecks an. Bringen Sie das Fahrzeug einfach zu uns – wir prüfen es auf Herz und Nieren und geben Ihnen eine ehrliche Einschätzung. Termin unter 07121 988 6660 oder online buchen.</p>
    `,
    faqs: [
      { q: "Lohnt sich ein professioneller Gebrauchtwagencheck?", a: "Fast immer. Ein Check kostet ca. 100–200 €. Er kann Sie vor Käufen schützen, die später tausende Euro Reparaturkosten verursachen." },
      { q: "Kann der Verkäufer einen Check ablehnen?", a: "Ja. Aber ein seriöser Verkäufer mit einem einwandfreien Fahrzeug hat nichts zu verbergen. Ablehnung ist ein Warnsignal." },
      { q: "Wie lange dauert ein Gebrauchtwagenkauf-Check?", a: "Bei uns ca. 45–90 Minuten. Sie bekommen danach eine schriftliche Bewertung der festgestellten Mängel." },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}
