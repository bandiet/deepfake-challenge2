/* ------------------------------------------------------------
   Deepfake Challenge — alle Texte, Abläufe und Zahlen.
   Gesprochene Zeilen: `tts` ist exakt der Text, der bei
   ElevenLabs (eleven_v3) eingesprochen wurde; die Untertitel
   entstehen daraus, indem die [Regieanweisungen] wegfallen.
   Wer eine Zeile ändert, muss die Aufnahme neu erzeugen
   (gleicher Dateiname in assets/stem/).
   Videoanrufe: Bild in assets/video/<id>.mp4 (stumm), Ton in
   assets/stem/<id>.m4a; `tts` gibt dort wieder, was im Clip gesagt wird.
   ------------------------------------------------------------ */
window.CONTENT = {
  titel: 'Deepfake Challenge',
  untertitel: 'Mensch oder KI? Betrug per Anruf und Video erkennen',
  marke: 'Cyber Crime Time',

  start: {
    titel: 'Deepfake Challenge',
    akzent: 'Deepfake',            // dieses Wort bekommt den Verlauf
    knopf: 'Challenge starten',
    kern: 'Geklonte Stimmen, gefälschte Gesichter: Sprichst du mit einem echten Menschen – oder mit Betrügern, die dich mit KI hereinlegen wollen?',
    fakten: ['2 Levels', 'Mit Ton – am besten mit Kopfhörern', 'Fällst du rein, kassiert der Hacker']
  },

  /* Intro ohne Stimme, direkt nach dem Start: das Deepfake-Kit holt eine Stimme aus einem Online-Video und ein
     Gesicht aus einem Social-Media-Profil und scannt beides; danach kommt „Bereit für Level 1?“.
     Bei audio/gesicht läuft erst die Szene, dann erscheinen gross, klein und ergebnis. */
  intro: {
    kopf: 'deepfake-kit · bereit',
    beats: [
      { art: 'audio', gross: '3 Sekunden Audio.', klein: 'Mehr braucht es nicht.', ergebnis: 'Stimme geklont',
        quelle: { titel: 'Hafen-Vlog, Tag 3 – endlich Sonne! ☀️', kanal: 'Unterwegs mit Markus', aufrufe: '12.483 Aufrufe', schritte: ['Audio extrahieren …', 'Stimme analysieren …'] } },
      { art: 'gesicht', gross: 'Ein Foto.', klein: 'Mehr braucht es nicht.', ergebnis: 'Gesicht geklont',
        profil: { name: 'markus.unterwegs', zahlen: [['214', 'Beiträge'], ['1.208', 'Follower'], ['380', 'Gefolgt']], bio: 'Reisen · Kaffee · Hafenluft', schritte: ['Bild kopieren …', 'Gesicht vermessen …'] } },
      { art: 'frage', gross: 'Echt oder Fake?', klein: 'Hören und sehen kannst du den Unterschied fast nicht mehr.' }
    ],
    foto: 'assets/intro-gesicht.jpg',
    vlog: 'assets/intro-vlog.jpg',
    skip: 'Überspringen'
  },

  hud: {
    titel: 'Cyber Crime Awareness · Deepfake Challenge',
    level: 'Level',
    anruf: 'Anruf',
    beute: 'Hacker-Beute',
    ton: 'Ton'
  },

  telefon: {
    eingehend: 'Eingehender Anruf',
    eingehendVideo: 'Eingehender Videoanruf',
    instabil: 'Verbindung instabil',
    ausgehend: 'Ausgehender Anruf · Verbindung wird hergestellt …',
    annehmen: 'Annehmen',
    ablehnen: 'Ablehnen',
    ablehnenTipp: 'Heute gehst du ran – auflegen kannst du jederzeit.',
    auflegen: 'Auflegen',
    duSagst: 'Du sagst …',
    beendet: 'Anruf beendet',
    verbindungWeg: 'Verbindung unterbrochen',
    lage: 'Lage',
    weiterhoeren: 'Nochmal hören',
    untertitel: 'Live-Untertitel'
  },

  urteil: {
    frage: 'Was steckt hinter diesem Anruf?',
    echt: 'ECHT',
    fake: 'FAKE'
  },

  /* Feedback im Panel wie in der Phishing Challenge: titel (Ergebnis), text (allgemeine Rückmeldung;
     {beute} = beuteText, {schaden} = schadenText des Anrufs), darunter das Entscheidende (kern des Anrufs).
     „Details anzeigen“ geht die Signale einzeln durch, zum Schluss „Das schützt dich“ (tipp des Anrufs).
     stempel steht in der Auswertung neben jedem Anruf. */
  feedback: {
    entlarvt: { stempel: 'Entlarvt', titel: 'Entlarvt!', text: 'Das war ein Fake – und du hast es erkannt. Der Hacker geht leer aus.' },
    getaeuscht: { stempel: 'Getäuscht', titel: 'Getäuscht!', text: 'Das war ein Fake. Der Hacker kassiert: {beute}.' },
    echtErkannt: { stempel: 'Echt', titel: 'Echt erkannt!', text: 'Richtig – der Anruf war echt.' },
    fehlalarm: { stempel: 'Fehlalarm', titel: 'Fehlalarm!', text: 'Der Anruf war echt. Kein Schaden: Lieber einmal zu viel geprüft als einmal zu wenig. Aber hier sprach vieles für einen echten Anruf.' },
    zuSpaet: { stempel: 'Zu spät', titel: 'Zu spät!', text: 'Richtig erkannt – aber zu spät. {schaden} Der Hacker kassiert: {beute}.' },
    kern: 'Das Entscheidende',
    details: 'Details anzeigen',
    ueberspringen: 'Hinweise überspringen',
    zaehler: 'Hinweis {n} von {gesamt}',
    art: { rot: 'Warnsignal', gruen: 'Spricht für echt', info: 'Gut zu wissen', schutz: 'Zum Mitnehmen' },
    tipp: 'Das schützt dich',
    weiter: 'Weiter',
    naechsterAnruf: 'Nächster Anruf',
    zurLevelAuswertung: 'Zur Level-Auswertung'
  },

  /* Klick auf die Hacker-Beute oben: der Hacker fliegt herein und sagt, was er von seiner Kasse hält.
     vorStart = noch kein Anruf beendet, leer = 0 €, klein = bis 1.000 €, mittel = bis 100.000 €, gross = darüber; {beute} = der Stand. */
  hackerKasse: {
    vorStart: ['Ich hab noch gar nicht angefangen – wart’s ab! 😏', 'Geduld … mein erster Anruf kommt gleich. 📞', 'Noch leer. Aber nicht mehr lange! 😈'],
    leer: ['Leer. Komplett leer. 😤', 'Null Euro. Ich sollte umschulen …', 'In meiner Kasse liegt nur Staub. 🕸️', 'Hör auf zu klicken – da ist nichts drin! 😒'],
    klein: ['{beute}? Das reicht gerade für Pizza. 🍕', 'Kleingeld. Aber ich bin geduldig … 😏', 'Immerhin. Der Anfang ist gemacht. 💰'],
    mittel: ['{beute}! Das neue Gaming-Setup ist gesichert. 😎', 'Läuft bei mir! 💸', '{beute} – nicht schlecht für ein paar Anrufe. 😈'],
    gross: ['{beute}! Ich schau mir schon mal Jachten an. 🛥️', 'Danke! Mein Ruhestand rückt näher. 🏝️', 'Ich liebe KI! 🤑']
  },

  /* ---------------- die Anrufe (Reihenfolge = Spielreihenfolge; Level siehe unten) ----------------
     signale: nach Wichtigkeit sortiert. Im Feedback erscheinen die ersten zwei, die zum Gesprächsverlauf passen
     (wenn = nur nach dieser Antwort, wennNicht = nur ohne sie), danach „Das schützt dich“ (tipp).
     Jede Lehre steht nur bei einem Anruf (Rückruf abgeblockt: c5, „Extern“: c3, Stimme: c1, Gesicht: c5).
     zitat: Stelle(n) im Gespräch, die beim Hinweis im Transkript aufleuchten – exakt wie im Untertitel.
     geraet: was am Gerät mit aufleuchtet – anrufer (Nummer/Name), extern („Extern“ bei Teams), namensschild (Teams). */
  anrufe: [
    {
      id: 'c1',
      echt: false,
      kanal: 'whatsapp',           // WhatsApp-Audioanruf auf dem Handy
      geraet: 'phone',
      stimme: 'aTTiK3YzK3dXETpuDE2h', // Ben
      klang: 'messenger',           // leichte Telefonfärbung
      atmo: null,                   // auffällig still
      klingel: 'messenger',
      zeit: 'Samstag, 23:14',
      storyTitel: 'Jonas? Von dieser Nummer?',
      lage: 'Dein Bruder Jonas ist in Italien im Urlaub, sein Instagram ist voller Strandvideos. Kurz vor Mitternacht: ein WhatsApp-Anruf von einer unbekannten Nummer.',
      anrufer: { name: '+39 351 448 2097', zeile: 'WhatsApp-Audio · Italien', initialen: '?', farbe: '#5B6B8C' },
      start: { id: 'c1_0', tts: '[panicked] Hey, ich bin’s, Jonas! Bitte leg nicht auf! Mein Handy ist weg, ich ruf von ’nem fremden Handy an… [breathing heavily] Ich hatte ’nen Unfall mit dem Roller. Mir ist nichts passiert, aber das Auto von dem Mann ist total kaputt. Die Polizei ist hier und sagt, ich muss sofort achthundert Euro Kaution zahlen, sonst nehmen die mich mit. Kannst du mir das schicken? Bitte, jetzt gleich! [pause]' },
      runden: [
        [
          { text: 'Oh nein! Wohin soll ich das Geld schicken?', wert: 'riskant',
            antwort: { id: 'c1_1a', tts: '[relieved] Danke, danke! Der Polizist hier gibt mir gleich ’ne Kontonummer. Mach bitte ’ne Echtzeitüberweisung, dann ist das Geld sofort da. Aber beeil dich, die werden hier echt ungeduldig! [pause]' } },
          { text: 'Moment. Wie hieß Omas Katze?', wert: 'gut',
            antwort: { id: 'c1_1b', tts: '[frustrated] Was?! Ich steh hier mit der Polizei und du willst ein Quiz machen?! [sighs] Keine Ahnung, ich bin total durch… Bitte, ich brauch das Geld jetzt, nicht in ’ner Stunde! [pause]' } }
        ],
        [
          { text: 'Okay. Schick mir die Kontodaten.', wert: 'riskant',
            antwort: { id: 'c1_2a', tts: '[relieved] Danke! Ich schick dir alles per WhatsApp. Und… bitte sag Mama nichts, okay? Die flippt sonst total aus. Ich meld mich! [pause]' } },
          { text: 'Ich leg auf und ruf dich auf deiner normalen Nummer an.', wert: 'gut',
            antwort: { id: 'c1_2b', tts: '[panicked] Nein, nein, nicht auflegen! Mein Handy ist doch weg, da erreichst du mich nicht! Bitte, die nehmen mich sonst mit… [pause]' } }
        ]
      ],
      signale: [
        { art: 'rot', titel: 'Fremde Nummer, Panik, Geld sofort', geraet: 'anrufer', zitat: ['Mein Handy ist weg', 'sonst nehmen die mich mit', 'achthundert Euro Kaution'], text: '„Handy weg“ erklärt die fremde Nummer, „sonst nehmen die mich mit“ soll dich vom Nachdenken abhalten. Und keine Polizei kassiert Kaution per Überweisung auf ein Konto, das dir am Telefon genannt wird.' },
        { art: 'info', titel: 'Die Stimme klang echt', text: 'Jonas’ Strandvideos liefern genug Material für einen Stimmklon. Verlass dich nicht auf dein Ohr – sondern auf das Muster.' }
      ],
      kern: 'Unbekannte Nummer, Panik, Geld sofort – und ein Rückruf ist „nicht möglich“. Das ist das Muster des Schockanrufs, egal wie echt die Stimme klingt.',
      tipp: 'Vereinbart in der Familie ein Codewort für echte Notfälle. Und im Zweifel: auflegen und Jonas über seine bekannte Nummer anrufen.',
      hacker: { reingelegt: '800 € für ein paar Sekunden Instagram-Audio. Lohnt sich!', erwischt: 'Mist. Die Stimme war doch perfekt …' },
      beute: 800,
      beuteText: '800 € Kaution'
    },

    {
      id: 'c2',
      echt: true,
      kanal: 'telefon',
      geraet: 'phone',
      stimme: 'C4QktxZ39Uccr2xNdFHg', // Johanna
      klang: 'telefon',              // schmalbandig wie eine echte Telefonleitung
      atmo: 'callcenter',
      klingel: 'telefon',
      zeit: 'Montag, 19:12',
      storyTitel: 'Ist das wirklich die Bank?',
      lage: 'Mittags hat der Automat deine Karte geschluckt. Du hast die Bank angerufen und um Rückruf gebeten. Gestern warnte sie noch vor falschen Bankmitarbeitern. Jetzt: eine fremde Nummer.',
      anrufer: { name: '+49 69 2471 5583', zeile: 'Festnetz · Frankfurt am Main', initialen: '?', farbe: '#4F5B78' },
      start: { id: 'c2_0', tts: 'Guten Tag, hier ist Sabine Krüger von der Nordlicht Bank, Kartenservice. Sie hatten heute Mittag bei uns angerufen, weil der Automat Ihre Karte eingezogen hat, und um einen Rückruf gebeten. Passt es gerade kurz? [pause]' },
      runden: [
        [
          { text: 'Ja, passt. Ist die neue Karte schon unterwegs?', wert: 'neutral',
            antwort: { id: 'c2_1a', tts: 'Ja, die Ersatzkarte ist heute rausgegangen. Sie sollte in drei bis fünf Werktagen bei Ihnen sein, die PIN kommt wie immer separat per Post. Ihre alte Karte ist gesperrt, da kann also nichts passieren. [pause]' } },
          { text: 'Woher weiß ich, dass Sie wirklich von der Bank sind?', wert: 'gut',
            antwort: { id: 'c2_1b', tts: '[warmly] Gute Frage – genau richtig, dass Sie das fragen! Sie können gern auflegen und uns über die Nummer auf der Rückseite Ihrer Karte oder auf unserer Website zurückrufen. Kurz zur Info: Ihre Ersatzkarte ist heute rausgegangen, und die alte ist gesperrt. [pause]' } }
        ],
        [
          { text: 'Muss ich zur Freischaltung noch etwas bestätigen – PIN oder TAN?', wert: 'gut',
            antwort: { id: 'c2_2a', tts: '[surprised] Nein, auf keinen Fall! PIN und TAN fragen wir niemals ab – weder am Telefon noch per Mail. Wenn das jemals jemand von Ihnen will, legen Sie bitte sofort auf. Ansonsten: Einen schönen Tag noch! [pause]' } },
          { text: 'Super, danke. Dann warte ich auf die Post.', wert: 'neutral',
            antwort: { id: 'c2_2b', tts: 'Sehr gerne. Und falls die Karte bis nächste Woche nicht da ist, melden Sie sich einfach über die Hotline. Einen schönen Tag noch! [pause]' } }
        ]
      ],
      signale: [
        { art: 'gruen', titel: 'Du hast den Rückruf angefordert', zitat: 'um einen Rückruf gebeten', text: 'Anlass und Zeitpunkt passen genau zu dem, was du selbst ausgelöst hast. Callcenter rufen oft von Sammelnummern an – die fremde Nummer allein macht noch keinen Fake.' },
        { art: 'gruen', titel: 'PIN und TAN tabu', zitat: 'PIN und TAN fragen wir niemals ab', text: 'Auf deine Frage kam sofort: niemals am Telefon. Ein Betrüger hätte zugegriffen.', wenn: 'c2_2a' },
        { art: 'gruen', titel: 'Rückruf ausdrücklich erwünscht', zitat: 'über die Nummer auf der Rückseite Ihrer Karte', text: 'Sie bietet von sich aus an, dass du über die offizielle Nummer zurückrufst.', wenn: 'c2_1b' },
        { art: 'gruen', titel: 'Sie verlangt nichts', zitat: 'die PIN kommt wie immer separat per Post', text: 'Keine PIN, keine TAN, keine Freigabe in der App, kein Geld, kein „sofort“. Sie gibt nur Informationen – in ruhigem Ton.' }
      ],
      kern: 'Du hast den Rückruf selbst angefordert – und sie wollte nichts von dir. Eine fremde Nummer allein macht noch keinen Fake.',
      tipp: 'Echte Bankmitarbeitende fragen nie nach PIN, TAN oder Freigaben in der App. Im Zweifel: auflegen und die Nummer von der Kartenrückseite wählen.',
      hacker: { echt: 'Gähn. Das war wirklich nur die Bank.', fehlalarm: 'Hehe – jetzt traust du nicht mal mehr deiner Bank. Misstrauen macht müde …' },
      beute: 0
    },

    {
      // Level 1 vor c5: die echte Sofia kündigt die Bankänderung an (Teams-Video, Querformat). Clips und die beiden
      // Idle-Stücke aus Grok, alle mit dem Porträt als Start- und Endbild; nah gemessen mit tools/werk/idlefilm.swift.
      id: 'c8',
      echt: true,
      kanal: 'teams',
      geraet: 'teams',
      extern: true,
      video: {
        auslauf: true, poster: 'assets/video/laurent-poster.jpg', idle: 'assets/video/c8_idle.mp4',
        nah: [[0, 4.2], [7.7, 12.3], [18.6, 20.1]],
        clips: ['c8_0', 'c8_1a', 'c8_1b', 'c8_2a', 'c8_2b']
      },
      klang: 'teams',
      atmo: 'buero',
      klingel: 'teams',
      zeit: 'Mittwoch, 10:00',
      storyTitel: 'Neue Bankverbindung – ab Dezember?',
      lage: 'Du betreust die Rechnungen eines langjährigen Lieferanten. Euer monatlicher Abstimmungstermin mit Sofia Laurent steht im Kalender.',
      anrufer: { name: 'Sofia Laurent', zeile: 'Lieferant · Monatliche Abstimmung', initialen: 'SL', farbe: '#8A3C5A', badge: 'Extern' },
      start: { id: 'c8_0', tts: 'Guten Morgen! Wir wechseln zum ersten Dezember die Bank. Diese Woche kommt ein offizielles Schreiben. Bis dahin bleibt alles wie gehabt.' },
      runden: [
        [
          { text: 'Schicken Sie mir die neuen Daten doch gleich, dann trage ich sie ein.', wert: 'riskant',
            antwort: { id: 'c8_1a', tts: 'Das Schreiben kommt sowieso. Das alte Konto gilt noch bis Ende November. Keine Eile.' } },
          { text: 'Danke für den Hinweis. Bankdaten prüfen wir immer per Rückruf.', wert: 'gut',
            antwort: { id: 'c8_1b', tts: 'Klar, kenne ich ja von Ihnen. Rufen Sie einfach unsere Zentrale an oder Herrn Vogt.' } }
        ],
        [
          { text: 'Gut, dann gehen wir jetzt die offenen Posten durch.', wert: 'neutral',
            antwort: { id: 'c8_2a', tts: 'Gern. Offen ist nur die Rechnung vom September. Die bitte normal aufs alte Konto.' } },
          { text: 'Wen kann ich anrufen, falls am Schreiben etwas unklar ist?', wert: 'gut',
            antwort: { id: 'c8_2b', tts: 'Mich oder Herrn Vogt, über die Nummern in Ihrem System. Ich wollte es nur ankündigen.' } }
        ]
      ],
      signale: [
        { art: 'gruen', titel: 'Alles läuft über den normalen Weg', zitat: ['offizielles Schreiben', 'bleibt alles wie gehabt'], text: 'Geplanter Termin, offizielles Schreiben, das alte Konto gilt weiter – und ein Rückruf über bekannte Nummern ist ausdrücklich erwünscht.' },
        { art: 'info', titel: '„Extern“ ist hier normal', geraet: 'extern', text: 'Ein Lieferant sitzt nun mal nicht im eigenen Haus. „Extern“ ist ein Grund, genau hinzusehen – kein Beweis für einen Fake.' }
      ],
      kern: 'Eine Bankänderung ist nicht automatisch Betrug. Hier lief alles über den normalen Weg – und das alte Konto gilt weiter. Merk dir Sofia: Du hörst wieder von ihr.',
      tipp: 'Neue Bankdaten trägst du erst ein, wenn du sie über einen bekannten Kontakt bestätigt hast – auch wenn alles echt wirkt.',
      hacker: { echt: 'Gähn. Nur eine Ankündigung. Aber merk dir das gut … 😏', fehlalarm: 'Schon bei „neue Bank“ Alarm? Dann wird Level 2 lustig.' },
      beute: 0
    },

    {
      // CEO-Fraud als Deepfake-Videoanruf (Katrin Albers, mit Grok erzeugt, wie in v1). Bild und Ton aus assets/video;
      // c5_0 = Teil 1 und 1c hintereinander. c5_2b endet mit einem Verbindungsabbruch.
      id: 'c5',
      echt: false,
      kanal: 'whatsapp',
      geraet: 'phone',
      video: { poster: 'assets/video/albers-poster.jpg', idle: 'assets/video/c5_idle.mp4', clips: ['c5_0', 'c5_1a', 'c5_1b', 'c5_2a', 'c5_2b'] },
      klang: 'messenger',
      atmo: null,
      klingel: 'messenger',
      zeit: 'Donnerstag, 16:52',
      storyTitel: 'Die Chefin persönlich – am Handy?',
      lage: 'Du vertrittst deine Teamleitung und darfst Zahlungen freigeben. Die Chefin, Dr. Katrin Albers, kennst du aus Townhall-Videos. Jetzt: ein WhatsApp-Videoanruf mit ihrem Foto – von einer fremden Nummer.',
      anrufer: { name: '+49 157 3308 1146', videoName: '~Katrin Albers', zeile: 'WhatsApp-Video · ~Katrin Albers', initialen: 'KA', farbe: '#8A6A3C', foto: 'assets/albers-profil.jpg' },
      start: { id: 'c5_0', tts: 'Hallo! Gut, dass ich Sie erreiche. Katrin Albers hier. Ich sitze gerade in Zürich zwischen zwei Terminen, deshalb rufe ich vom privaten Handy an. Es geht um etwas sehr Vertrauliches: Wir stehen kurz vor einer Übernahme. Das darf noch niemand wissen, wirklich niemand. Ich brauche heute noch eine Anzahlung von achtundvierzigtausendfünfhundert Euro an die Kanzlei. Können Sie das für mich anstoßen? [pause]' },
      runden: [
        [
          { text: 'Natürlich. Wohin soll das Geld gehen?', wert: 'riskant',
            antwort: { id: 'c5_1a', tts: 'Wunderbar, ich wusste, dass ich mich auf Sie verlassen kann. Die Kanzlei schickt Ihnen gleich die Kontodaten per Mail. Bitte als Eilüberweisung, heute noch – und nicht über die normale Freigabe, sonst ist es morgen im ganzen Haus rum. [pause]' } },
          { text: 'Ich rufe Sie kurz auf Ihrer Büronummer zurück.', wert: 'gut',
            antwort: { id: 'c5_1b', tts: '[impatient] Dafür ist jetzt wirklich keine Zeit, ich gehe gleich in den nächsten Termin. Die Kanzlei schickt Ihnen gleich die Kontodaten. Bitte heute noch, und bitte diskret. [pause]' } }
        ],
        [
          { text: 'In Ordnung, ich kümmere mich darum.', wert: 'riskant',
            antwort: { id: 'c5_2a', tts: 'Danke. Ich verlasse mich auf Sie. Und denken Sie dran: Kein Wort zu niemandem. Bis dann. [pause]' } },
          { text: 'Vorher kurz: Wie heißt das Projekt, das Sie mir letzte Woche übergeben haben?', wert: 'gut',
            antwort: { id: 'c5_2b', tts: '[annoyed] Wie bitte? Was soll das denn jetzt? Ich habe wirklich keine Zeit für so etwas… Die Verbindung hier ist furchtbar, ich… [pause]', glitch: true } }
        ]
      ],
      signale: [
        { art: 'rot', titel: 'Geheim, eilig, am Prozess vorbei', zitat: ['Das darf noch niemand wissen', 'nicht über die normale Freigabe', 'Eilüberweisung'], text: '„Das darf niemand wissen“, „heute noch“, „nicht über die normale Freigabe“ – die Chefin persönlich macht Druck, damit niemand gegenprüft.' },
        { art: 'rot', titel: 'Kontrollfrage? Leitung tot.', zitat: 'Was soll das denn jetzt', text: 'Statt einer Antwort kam Ärger – und dann brach die Verbindung ab. Wer eine einfache Frage zum gemeinsamen Alltag nicht beantworten kann, ist nicht die, die sie vorgibt zu sein.', wenn: 'c5_2b' },
        { art: 'rot', titel: 'Rückruf abgeblockt', zitat: 'Dafür ist jetzt wirklich keine Zeit', text: 'Ein Rückruf über die Büronummer dauert eine Minute. Wer ihn mit Zeitdruck abblockt, will genau diese Prüfung verhindern.', wenn: 'c5_1b' },
        { art: 'info', titel: 'Gesicht und Stimme sind KI', geraet: 'anrufer', text: 'Diese Chefin gibt es nicht: Gesicht, Mimik und Stimme sind komplett KI-erzeugt. Ein Profilfoto kann jeder hochladen – und ein Videoanruf beweist nicht mehr, wer am anderen Ende sitzt.' }
      ],
      kern: 'Geheim, eilig, am Prozess vorbei – und der Rückruf wird abgeblockt. Auch ein bekanntes Gesicht im Video beweist nichts.',
      tipp: 'Zahlungen laufen nie am Prozess vorbei – egal, wer anruft. Auflegen, über die bekannte Nummer zurückrufen, Vier-Augen-Prinzip einhalten.',
      hacker: { reingelegt: '48.500 €. Und ich hab nicht mal ein echtes Gesicht gebraucht.', erwischt: 'Perfektes Gesicht, perfekte Geschichte – und trotzdem durchschaut. Respekt.' },
      beute: 48500,
      beuteText: '48.500 € Anzahlung'
    },

    {
      id: 'c3',
      echt: false,
      kanal: 'teams',
      geraet: 'teams',
      extern: true,
      stimme: 'qVRpsZJDV29g1CIPzssm', // Sebastian
      klang: 'teams',
      atmo: 'helpdesk',
      klingel: 'teams',
      zeit: 'Montag, 9:40',
      storyTitel: 'Was ist mit meinem Postfach los?',
      lage: 'Plötzlich fluten Spam-Mails dein Postfach – Dutzende pro Minute. Du kommst kaum hinterher. Da klingelt Teams: der „IT-Helpdesk“.',
      anrufer: { name: 'IT-Helpdesk Support', zeile: 'it-helpdesk-support.onmicrosoft.com', initialen: 'IT', farbe: '#4A55C9', badge: 'Extern' },
      start: { id: 'c3_0', tts: 'Hallo, hier ist Marcel vom IT-Helpdesk. Wir sehen gerade, dass Ihr Postfach mit Spam regelrecht bombardiert wird – haben Sie sicher schon gemerkt. Das ist ein laufender Angriff, da sind mehrere Kollegen betroffen. Ich würde das gern sofort für Sie filtern, bevor da was Schlimmeres reinrutscht. Haben Sie zwei Minuten? [pause]' },
      runden: [
        [
          { text: 'Ja, bitte! Was muss ich tun?', wert: 'riskant',
            antwort: { id: 'c3_1a', tts: 'Super. Drücken Sie bitte einmal die Windows-Taste und tippen Sie „Remotehilfe“ ein. Ich gebe Ihnen gleich einen Code, dann schalte ich mich kurz auf Ihren Rechner. Dauert keine fünf Minuten. [pause]' } },
          { text: 'Gibt’s dazu ein Ticket? Ich hab nichts gemeldet.', wert: 'gut',
            antwort: { id: 'c3_1b', tts: '[chuckles] Nein, ein Ticket gibt’s dafür noch nicht – wir sind ja proaktiv dran, das läuft gerade alles parallel. Ehrlich gesagt: Je länger wir warten, desto größer das Risiko. Ich brauche nur kurz Zugriff über die Remotehilfe, dann ist das erledigt. [pause]' } }
        ],
        [
          { text: 'Okay, ich öffne die Remotehilfe.', wert: 'riskant',
            antwort: { id: 'c3_2a', tts: 'Perfekt. Der Code lautet: sieben, vier, eins, neun, zwei, acht. Geben Sie den ein und klicken Sie auf „Zulassen“… Sehr gut. Ich übernehme ab hier. [pause]' } },
          { text: 'Ich rufe lieber selbst bei der IT-Hotline an.', wert: 'gut',
            antwort: { id: 'c3_2b', tts: '[sighs] Die Hotline ist gerade komplett überlastet, genau wegen dieses Angriffs – da warten Sie ewig. Wenn Ihr Konto in der Zwischenzeit gesperrt wird, kann ich auch nichts mehr machen… Na gut. Ihre Entscheidung. [pause]' } }
        ]
      ],
      signale: [
        { art: 'rot', titel: 'Erst Spam, dann der „Retter“', zitat: 'mit Spam regelrecht bombardiert', text: 'Die Spam-Flut war kein Zufall: Angreifer lösen sie selbst aus, um danach als Helfer anzurufen – und wollen dann per Remotehilfe auf deinen Rechner. Diese Masche läuft 2026 gezielt gegen Unternehmen.' },
        { art: 'rot', titel: '„Extern“ im Teams-Anruf', geraet: 'extern', text: 'Deine IT ruft aus dem eigenen Unternehmen an – nicht von einem fremden Konto wie „…onmicrosoft.com“. Fehlt die Warnung, ist der Anruf trotzdem nicht geprüft.' }
      ],
      kern: 'Deine IT ruft nicht von außen an, um dir ungefragt Fernzugriff abzuschwatzen – erst recht nicht direkt nach einer Spam-Flut, die sie angeblich „filtern“ will.',
      tipp: 'Fernzugriff nur, wenn DU ein Ticket eröffnet hast und der Kontakt über den bekannten IT-Kanal läuft. Im Zweifel: auflegen und die IT über die Nummer im Intranet anrufen.',
      hacker: { reingelegt: 'Danke für den Zugang! Morgen früh ist euer Netzwerk verschlüsselt.', erwischt: 'Hm. Nach 300 Spam-Mails ist sonst jeder dankbar für Hilfe …' },
      beute: 250000,
      beuteText: '250.000 € Lösegeld',
      schadenBei: 'c3_2a',
      schadenText: 'Über die Remotehilfe war er schon auf deinem Rechner, bevor du aufgelegt hast. Fernzugriff lässt sich nicht zurücknehmen.'
    },


    {
      id: 'c4',
      echt: true,
      kanal: 'teams',
      geraet: 'teams',
      extern: false,
      stimme: 'NE7AIW5DoJ7lUosXV2KR', // Ela
      klang: 'teams',
      atmo: 'homeoffice',
      klingel: 'teams',
      zeit: 'Mittwoch, 17:05',
      storyTitel: 'Lena braucht die Folie – jetzt noch?',
      lage: 'Morgen präsentiert euer Team die Quartalszahlen. Lena aus dem Vertrieb macht laut Weekly die Folien fertig. Kurz nach fünf klingelt Teams.',
      anrufer: { name: 'Lena Hofmann', zeile: 'Vertrieb · Verfügbar', initialen: 'LH', farbe: '#C2477E' },
      start: { id: 'c4_0', tts: 'Hey! [laughs] Sorry, dass ich so spät noch störe. Du, ich sitz grad an der Präsentation für morgen und finde die Folie mit den Kundenzahlen nicht mehr. Hast du die noch? Die war, glaub ich, in deiner Version vom Montag. [pause]' },
      runden: [
        [
          { text: 'Klar, ich schick sie dir gleich.', wert: 'neutral',
            antwort: { id: 'c4_1a', tts: 'Oh, super, danke! Leg sie am besten einfach in unseren Team-Ordner, dann haben alle die aktuelle Version. Ich guck dann gleich rein. [pause]' } },
          { text: 'Wofür genau brauchst du die? Das sind ja interne Zahlen.', wert: 'gut',
            antwort: { id: 'c4_1b', tts: '[laughs] Ja klar, gute Frage! Für die Präsentation morgen beim Vorstand – die Folie zum dritten Quartal, die wir im Weekly besprochen haben. Leg sie einfach in unseren Team-Ordner, da kommen alle dran. [pause]' } }
        ],
        [
          { text: 'Ich ruf dich gleich zurück, ich muss kurz was checken.', wert: 'gut',
            antwort: { id: 'c4_2a', tts: 'Klar, kein Stress! Ich bin noch ’ne Stunde online. Bis gleich! [pause]' } },
          { text: 'Mach ich. Soll ich noch was anpassen?', wert: 'neutral',
            antwort: { id: 'c4_2b', tts: 'Nee, alles gut, den Rest mach ich. Danke dir, du rettest mir echt den Abend! [laughs] Bis morgen! [pause]' } }
        ]
      ],
      signale: [
        { art: 'gruen', titel: 'Der normale Weg', zitat: 'in unseren Team-Ordner', text: 'Sie will die Datei im gemeinsamen Team-Ordner – nicht an eine private Mailadresse. Und sie ruft intern an, ohne „Extern“.' },
        { art: 'gruen', titel: 'Kein Druck, keine Geheimnisse', zitat: 'kein Stress', text: 'Nachfragen und Rückruf sind für sie völlig okay.', wenn: 'c4_2a' },
        { art: 'gruen', titel: 'Der Anlass passt', zitat: ['Präsentation für morgen', 'im Weekly besprochen'], text: 'Ihr habt im Weekly darüber gesprochen, die Präsentation ist morgen. Keine Eile, kein „sag niemandem was“.' }
      ],
      kern: 'Interner Kontakt, bekannter Anlass, der normale Weg über den Team-Ordner – und Nachfragen waren kein Problem.',
      tipp: 'Auch bei Kolleginnen und Kollegen gilt: Wird es ungewöhnlich – Geld, Passwörter, vertrauliche Daten an fremde Adressen –, dann prüfen. Hier war es das nicht.',
      hacker: { echt: 'Langweilig. Das war wirklich nur Lena.', fehlalarm: 'Jetzt misstraust du schon deiner eigenen Kollegin. Genau das will ich.' },
      beute: 0
    },
    {
      // Level 2: der kranke Jamie (Teams-Video vom Handy, Hochformat). Bild und Ton aus ElevenLabs
      // (Flow „Deepfake Challenge – echte Videos“: Porträt gpt-image-2, Stimme „Nico“ eleven_v3, Lip-Sync Creatify Aurora 480p).
      id: 'c10',
      echt: true,
      kanal: 'teams',
      geraet: 'teams',
      extern: false,
      // Jeder Clip endet mit einem stillen Übergang (Seedance) zurück in die Ausgangshaltung. Die Idle ist ein Film aus
      // Seedance-Stücken, die dort beginnen und enden (A ruhig, B hüstelt; tools/werk/idlefilm.swift). nah = Stellen,
      // an denen ein Clip ohne Sprung beginnen kann (gemessen); toene = das Hüsteln, zeitgleich mit Stück B.
      video: {
        hoch: true, auslauf: true, poster: 'assets/video/rivera-poster.jpg', idle: 'assets/video/c10_idle.mp4',
        nah: [[0, 1.0], [1.4, 1.7], [4.4, 6.0], [6.5, 6.8], [9.4, 10.6], [15.0, 16.1], [16.6, 16.8], [19.5, 21.1],
          [21.6, 21.9], [24.5, 26.2], [26.7, 26.9], [29.6, 30.8], [35.1, 36.2], [36.7, 37.0], [39.7, 40.3]],
        toene: [[10.08, 'c10_idleB'], [30.25, 'c10_idleB']],
        clips: ['c10_0', 'c10_1a', 'c10_1b', 'c10_2a', 'c10_2b']
      },
      klang: 'teams',
      atmo: 'wohnzimmer',
      klingel: 'teams',
      zeit: 'Donnerstag, 19:30',
      storyTitel: 'Klingt so heiser – ist das Jamie?',
      lage: 'Dein Teamleiter Jamie Rivera ruft dich abends an. Morgen um zehn hat er einen Kundentermin bei der Firma Hartmann.',
      anrufer: { name: 'Jamie Rivera', zeile: 'Teamleitung · Verfügbar', initialen: 'JR', farbe: '#2E6B7D', foto: 'assets/rivera-profil.jpg' },
      posteingang: [
        ['Kalender', 'Kundentermin Hartmann · Fr 10:00 (Jamie)'],
        ['Jamie Rivera', 'Unterlagen Hartmann liegen im Teamordner'],
        ['Lena Hofmann', 'Danke für die Folie!']
      ],
      start: { id: 'c10_0', tts: 'Hey, sorry für den späten Anruf. Mich hat’s richtig erwischt, ich bin morgen raus. Kannst du um zehn den Termin bei Hartmann übernehmen?' },
      runden: [
        [
          { text: 'Oh je, gute Besserung! Klar, ich übernehme.', wert: 'neutral',
            antwort: { id: 'c10_1a', tts: 'Danke, du rettest mich. Die Unterlagen liegen im Teamordner unter Hartmann. Ich leite dir gleich die Einladung weiter.' } },
          { text: 'Du klingst ganz anders – bist du das wirklich?', wert: 'gut',
            antwort: { id: 'c10_1b', tts: 'Ja, ich klinge wie ein Reibeisen. Ruf mich gern zurück, auf dem Handy oder in Teams. Ich liege eh den ganzen Abend auf dem Sofa.' } }
        ],
        [
          { text: 'Soll ich Herrn Hartmann die Unterlagen vorab schicken?', wert: 'neutral',
            antwort: { id: 'c10_2a', tts: 'Ja, gern, morgen früh ganz normal per Mail. Herr Hartmann weiß schon, dass du kommst.' } },
          { text: 'Ich komme nicht in den Kundenordner. Gibst du mir kurz dein Passwort?', wert: 'riskant',
            antwort: { id: 'c10_2b', tts: 'Oh nein, bloß nicht. Ich schreib gleich der IT, die schalten dich morgen früh frei.' } }
        ]
      ],
      signale: [
        { art: 'gruen', titel: 'Die Bitte ist harmlos', zitat: 'im Teamordner', text: 'Einen Termin übernehmen, Unterlagen aus dem Teamordner – nichts Riskantes, kein Geld, keine Geheimnisse. Ein Rückruf ist ihm sogar willkommen.' },
        { art: 'gruen', titel: 'Passwort? Abgelehnt.', zitat: 'bloß nicht', text: 'Du wolltest sein Passwort – er hat abgelehnt und die IT eingeschaltet. Ein echter Kollege gibt sein Passwort nicht weiter, auch nicht dir.', wenn: 'c10_2b' },
        { art: 'info', titel: 'Anders klingen ist kein Beweis', text: 'Erinnerst du dich an Jonas? Seine Stimme klang perfekt und war fake. Hier ist es umgekehrt: Erkältung, körniges Bild, später Abend – und trotzdem echt.' }
      ],
      kern: 'Die Stimme klang fremd, das Bild war körnig – trotzdem war es Jamie. Entscheidend war nicht der Klang, sondern die Bitte.',
      tipp: '„Klingt anders“ ist ein Grund nachzufragen – kein Beweis für einen Fake. Achte darauf, was jemand von dir will.',
      hacker: { echt: 'Gähn. Nur ein verschnupfter Teamleiter.', fehlalarm: 'Fake, nur weil er erkältet ist? Gute Besserung an dein Vertrauen!' },
      beute: 0
    },

    {
      // Echter Videoanruf: Du rufst selbst die IT-Hotline an (Pilot-Call 06, Ordner „Videos Case 6 – Das Headset Ticket“).
      // Das Bild friert einmal kurz ein (WLAN) – steckt im Clip c6_0 selbst, samt Tonaussetzer.
      // c6_2b: der Clip mit „Nein, auf keinen Fall, das brauchen wir nicht …“ fehlt noch. Bis dahin fragt Option B
      // nach dem Termin; mit dem Clip wird sie wieder zur Frage nach Passwort oder Code (wert: 'gut').
      id: 'c6',
      echt: true,
      kanal: 'teams',
      geraet: 'teams',
      extern: false,
      ausgehend: true,
      video: { poster: 'assets/video/chen-poster.jpg', idle: 'assets/video/c6_idle.mp4', clips: ['c6_0', 'c6_1a', 'c6_1b', 'c6_2a', 'c6_2b'] },
      klang: 'teams',
      atmo: null,
      klingel: 'teams',
      zeit: 'Freitag, 13:20',
      storyTitel: 'Das Headset-Ticket',
      lage: 'Dein Headset gibt seit heute Morgen keinen Ton von sich. Du hast ein Ticket eröffnet und rufst jetzt selbst die IT-Hotline aus dem Intranet an. Daniel Chen nimmt ab.',
      anrufer: { name: 'Daniel Chen', zeile: 'IT-Service Desk · Verfügbar', initialen: 'DC', farbe: '#2E7D6B', foto: 'assets/chen-profil.jpg' },
      posteingang: [
        ['IT-Service', 'Ticket 51877 angelegt: Headset ohne Ton'],
        ['Lena Hofmann', 'Kurzer Call um drei?'],
        ['Kalender', 'Teammeeting · Mo 9:30']
      ],
      start: { id: 'c6_0', tts: 'Hallo, Daniel Chen, IT-Service. Ich hab Ihr Ticket hier – Headset, seit heute Morgen kein Ton, richtig? … Sorry, bei mir ruckelt’s heute, wir haben WLAN-Probleme im Gebäude. Okay: Klicken Sie mal unten rechts auf das Lautsprechersymbol. Welches Gerät ist da ausgewählt?' },
      runden: [
        [
          { text: 'Moment … da steht „Laptop-Lautsprecher“.', wert: 'neutral',
            antwort: { id: 'c6_1a', tts: 'Da haben wir’s schon. Stellen Sie das bitte auf Ihr Headset um. … Hören Sie mich jetzt über das Headset? Wenn nicht, schauen wir uns das gleich gemeinsam an.' } },
          { text: 'Ihr Bild hat gerade gehangen. Sind Sie wirklich vom IT-Service?', wert: 'gut',
            antwort: { id: 'c6_1b', tts: 'Berechtigte Frage! Sie haben mich ja selbst über die Hotline angerufen. Und im IT-Portal steht bei Ihrem Ticket mein Name als Bearbeiter. Das Ruckeln ist unser WLAN – sorry dafür. Wollen wir weitermachen?' } }
        ],
        [
          { text: 'Soll ich meinen Bildschirm teilen?', wert: 'neutral',
            antwort: { id: 'c6_2a', tts: 'Gern, über den Button oben im Call. Sie sehen ja, was Sie zeigen, und können jederzeit stoppen. … Ah, da ist es: Der Treiber ist veraltet. Ich trage das ins Ticket ein und schicke Ihnen eine kurze Anleitung.' } },
          { text: 'Und wenn es danach immer noch nicht geht?', wert: 'neutral',
            antwort: { id: 'c6_2b', tts: 'Wenn’s danach immer noch nicht geht, trage ich das ins Ticket ein, und wir machen einen Termin vor Ort.' } }
        ]
      ],
      signale: [
        { art: 'gruen', titel: 'Du hast angerufen', geraet: 'namensschild', text: 'Du hast selbst die Hotline aus dem Intranet gewählt – zu deinem eigenen Ticket. Wer den Kontakt startet, entscheidet über das Risiko.' },
        { art: 'info', titel: 'Das Ruckeln ist kein Beweis', text: 'Bildstörungen gibt es bei jedem schlechten WLAN. Ein Ruckler macht noch keinen Deepfake – und ein flüssiges Bild noch keinen echten Anruf.' }
      ],
      kern: 'Du hast selbst angerufen, über die bekannte Hotline, zu deinem eigenen Ticket. Eine Bildstörung beweist keinen Deepfake – entscheidend ist, wer den Kontakt gestartet hat.',
      tipp: 'Frag dich zuerst: Wer hat den Kontakt gestartet? Rufst du selbst über die Hotline aus dem Intranet an, ist der Weg geprüft. Ruft „die IT“ dich an: Ticketnummer nennen lassen und im Portal prüfen.',
      hacker: { echt: 'Gähn. Da hat nur einer sein Headset repariert.', fehlalarm: 'Wegen eines Rucklers gleich Fake? Dann viel Spaß ohne Ton im nächsten Meeting!' },
      beute: 0
    },

    // nicht im Spiel (Level 2 zählt nur zwei Anrufe): der frühere echte IT-Anruf aus der Vishing Challenge
    {
      // Gegenstück zum falschen Helpdesk (c3): gleicher Kanal, aber intern, mit eigenem Ticket und ohne Druck
      id: 'c7',
      echt: true,
      kanal: 'teams',
      geraet: 'teams',
      extern: false,
      stimme: 'd9Ln92LAVKPJLW7vlW1m', // Michael
      klang: 'teams',
      atmo: 'helpdesk',
      klingel: 'teams',
      zeit: 'Freitag, 13:20',
      storyTitel: 'Die IT meldet sich – wirklich?',
      lage: 'Seit gestern stürzt Excel bei dir beim Speichern ab. Heute Morgen hast du im IT-Portal ein Ticket aufgemacht. Nach der Mittagspause klingelt Teams.',
      anrufer: { name: 'Tobias Brandt', zeile: 'IT-Service · Verfügbar', initialen: 'TB', farbe: '#2E7D6B' },
      posteingang: [
        ['IT-Service', 'Ticket 48213 angelegt: Excel stürzt beim Speichern ab'],
        ['Lena Hofmann', 'Danke nochmal für die Folie!'],
        ['Kalender', 'Teammeeting · Mo 9:30']
      ],
      start: { id: 'c7_0', tts: 'Hallo, hier ist Tobias Brandt vom IT-Service. Ich rufe wegen Ihres Tickets von heute Morgen an – Excel stürzt bei Ihnen beim Speichern ab, richtig? Haben Sie gerade fünf Minuten? Dann schauen wir uns das kurz zusammen an. [pause]' },
      runden: [
        [
          { text: 'Ja, passt. Was soll ich machen?', wert: 'neutral',
            antwort: { id: 'c7_1a', tts: 'Super. Schließen Sie Excel bitte einmal komplett. Dann halten Sie die Steuerungstaste gedrückt und starten Excel neu – es fragt dann, ob es im abgesicherten Modus starten soll. Klicken Sie auf „Ja“. Wenn es so stabil läuft, ist nur ein Add-in schuld – das schalte ich dann zentral für Sie ab. [pause]' } },
          { text: 'Moment – wie lautet denn meine Ticketnummer?', wert: 'gut',
            antwort: { id: 'c7_1b', tts: '[laughs] Gute Frage, richtig so! Vier, acht, zwei, eins, drei – aufgemacht heute um acht Uhr zwölf: „Excel stürzt beim Speichern ab“. Im IT-Portal steht auch mein Name als Bearbeiter drin. [pause]' } }
        ],
        [
          { text: 'Brauchen Sie dafür noch mein Passwort?', wert: 'gut',
            antwort: { id: 'c7_2a', tts: '[surprised] Nein, auf keinen Fall! Ihr Passwort brauchen wir nie – das geben Sie bitte auch sonst niemandem am Telefon. Ich schalte das Add-in zentral ab und schreibe alles ins Ticket. Schönen Tag noch! [pause]' } },
          { text: 'Ich rufe lieber selbst über die IT-Hotline zurück.', wert: 'gut',
            antwort: { id: 'c7_2b', tts: 'Klar, gar kein Problem! Die Nummer der Hotline steht im Intranet. Nennen Sie einfach die Ticketnummer, dann landen Sie wieder bei mir. Bis gleich! [pause]' } }
        ]
      ],
      signale: [
        { art: 'gruen', titel: 'Dein eigenes Ticket', zitat: 'wegen Ihres Tickets von heute Morgen', text: 'Anlass und Zeitpunkt passen genau zu dem Problem, das du heute Morgen selbst gemeldet hast.' },
        { art: 'gruen', titel: 'Gleicher Kanal – aber intern', geraet: 'namensschild', text: 'Auch der falsche Helpdesk rief über Teams an. Hier fehlt das „Extern“: Er ruft aus dem Firmen-Teams an, mit Namen und Abteilung.' },
        { art: 'gruen', titel: 'Passwort tabu', zitat: 'Ihr Passwort brauchen wir nie', text: 'Auf deine Frage kam sofort: niemals. Ein Betrüger hätte zugegriffen.', wenn: 'c7_2a' },
        { art: 'gruen', titel: 'Rückruf erwünscht', zitat: 'Die Nummer der Hotline steht im Intranet', text: 'Er verweist auf die Hotline aus dem Intranet – nicht auf eine Nummer, die er dir selbst nennt.', wenn: 'c7_2b' },
        { art: 'gruen', titel: 'Ticketnummer stimmt', zitat: 'Im IT-Portal steht auch mein Name', text: 'Er nennt Nummer, Uhrzeit und Problem – und verweist aufs Portal, wo du alles selbst prüfen kannst.', wenn: 'c7_1b' },
        { art: 'gruen', titel: 'Du machst es selbst', zitat: 'starten Excel neu', text: 'Keine Remotehilfe, kein Code: Du startest Excel selbst neu, er erklärt nur.', wenn: 'c7_1a' }
      ],
      kern: 'Dein eigenes Ticket, ein interner Kontakt, kein Passwort, kein Fernzugriff – und Nachprüfen ausdrücklich erwünscht. So klingt echter IT-Support.',
      tipp: 'Echte IT fragt nie nach deinem Passwort oder einem MFA-Code. Ruft sie an: Ticketnummer nennen lassen und im Portal prüfen – oder selbst über die Hotline aus dem Intranet zurückrufen.',
      hacker: { echt: 'Gähn. Das war wirklich nur die IT.', fehlalarm: 'Jetzt traust du nicht mal mehr deiner eigenen IT. Viel Spaß mit dem kaputten Excel!' },
      beute: 0
    },

    /* ---- Dieser Anruf wartet noch auf seine Videos (Text aus „Deepfake Challenge – drei neue Videos“).
       Er steht hinter c7 und ist damit nicht im Spiel; mit den Clips rückt er an seinen Platz (siehe levels). ---- */
    {
      // Level 2 nach c3: die falsche Sofia nutzt die Ankündigung aus (WhatsApp-Video, Hochformat). Clips liefert Arne.
      id: 'c9',
      echt: false,
      kanal: 'whatsapp',
      geraet: 'phone',
      video: { poster: 'assets/video/laurent-handy-poster.jpg', idle: 'assets/video/c9_idle.mp4', clips: ['c9_0', 'c9_1a', 'c9_1b', 'c9_2a', 'c9_2b'] },
      klang: 'messenger',
      atmo: null,
      klingel: 'messenger',
      zeit: 'Freitag, 11:50',
      storyTitel: 'Die Umstellung wurde vorgezogen?',
      lage: 'Zwei Tage nach eurem Abstimmungstermin ruft Sofia Laurent an – diesmal nicht über Teams, sondern von einer Handynummer, die du nicht kennst.',
      anrufer: { name: '+49 151 2290 4471', zeile: 'WhatsApp-Video', initialen: '?', farbe: '#5B6B8C' },
      start: { id: 'c9_0', tts: 'Hallo, Sofia Laurent hier. Unsere Bankumstellung wurde vorgezogen. Die September-Rechnung bitte schon aufs neue Konto. Geht das?' },
      runden: [
        [
          { text: 'Ah, Sie hatten es ja angekündigt. Schicken Sie mir die Daten.', wert: 'riskant',
            antwort: { id: 'c9_1a', tts: 'Genau, danke! Die Mail kommt von meiner privaten Adresse, unser Postfach spinnt. Nehmen Sie nur diese Daten, die im Portal sind veraltet.' } },
          { text: 'Ich warte lieber auf Ihr offizielles Schreiben.', wert: 'gut',
            antwort: { id: 'c9_1b', tts: 'Das Schreiben dauert noch zwei Wochen. Bis dahin ist das alte Konto zu, und Ihre Zahlung kommt zurück. Machen wir das lieber jetzt.' } }
        ],
        [
          { text: 'Okay, ich trage die neuen Daten heute noch ein.', wert: 'riskant',
            antwort: { id: 'c9_2a', tts: 'Super, Sie retten mir den Tag! Schicken Sie mir ein Foto der Buchung aufs Handy.' } },
          { text: 'Ich rufe kurz Herrn Vogt an und lasse es mir bestätigen.', wert: 'gut',
            antwort: { id: 'c9_2b', tts: 'Herr Vogt ist im Urlaub. Das läuft nur über mich. Sie kennen mich doch.' } }
        ]
      ],
      signale: [
        { art: 'rot', titel: 'Die Geschichte stimmt – der Weg nicht', geraet: 'anrufer', zitat: ['privaten Adresse', 'die im Portal sind veraltet'], text: 'Die Ankündigung war echt – solches Wissen stammt oft aus gehackten Postfächern. Aber: fremde Nummer, private Mailadresse, „nicht die Daten im Portal“.' },
        { art: 'rot', titel: 'Bestätigung ausgebremst', zitat: 'Das läuft nur über mich', text: 'Neue Bankdaten bestätigst du über bekannte Kontakte – nie bei der Person, die sie gerade ändern will.', wenn: 'c9_2b' },
        { art: 'rot', titel: 'Brille und Wange verformen sich', text: 'Als die Hand vors Gesicht ging, verbogen sich kurz Brille und Wange – ein typischer Fehler beim Live-Deepfake. Achte darauf, aber verlass dich nicht darauf.' }
      ],
      kern: 'Die Geschichte war wahr, der Weg nicht: fremde Nummer, private Mail, und der Rückruf bei Herrn Vogt wurde ausgebremst.',
      tipp: 'Neue Bankdaten bestätigst du über bekannte Kontakte – nie bei der Person, die sie gerade ändern will.',
      hacker: { reingelegt: '86.400 €! Danke für die Vorarbeit in Level 1. 😈', erwischt: 'Ich kannte sogar die echte Ankündigung … und trotzdem!' },
      beute: 86400,
      beuteText: '86.400 € September-Rechnung'
    },

  ],

  /* ---------------- Levels ----------------
     anzahl = so viele Anrufe aus der Liste oben, der Reihe nach; mindestens = so viele müssen richtig sein,
     sonst wird das Level wiederholt (im LMS gilt die Challenge erst als abgeschlossen, wenn alle Levels bestanden sind).
     Nach Level 1 kommt der Sicherheitstipp, nach dem letzten Level „Zum Schluss“ (unten). */
  levels: [
    // Ziel: 2 × 4 Anrufe, Audio und Video gemischt. Noch ohne Video: Sofia fake (Level 2, nach c3) –
    // der Text steht schon unten (c9). c6 (Headset) ist nicht mehr im Spiel.
    { anzahl: 4, mindestens: 3, kicker: 'Hör genau hin. Schau genau hin. Hak nach.' },
    { anzahl: 3, mindestens: 2, kicker: 'Anrufe im Job – wem kannst du trauen?' }
  ],
  levelIntro: {
    kicker: 'Level {n} von {gesamt}',
    kickerNochmal: 'Level {n} von {gesamt} · neuer Versuch',
    titel: 'Bereit für Level {n}?',
    anrufe: 'Anrufe',
    ziel: '{n} richtig zum Bestehen',
    los: 'Los geht’s'
  },
  levelEnde: {
    kicker: 'Level {n} von {gesamt} · Auswertung',
    perfekt: 'Perfekt! Kein Fake kam durch.',
    gut: 'Level {n} geschafft!',
    nichtBestanden: 'Noch nicht geschafft.',
    nichtBestandenText: 'Du brauchst mindestens {mindestens} von {gesamt} richtig. Spiel das Level noch einmal – die Hinweise aus dem Feedback helfen dir.',
    ziel: 'Zum Bestehen',
    richtig: '{richtig} von {gesamt} richtig erkannt',
    beute: 'Hacker-Beute in diesem Level',
    beuteNull: 'Der Hacker ging leer aus.',
    details: 'Deine Anrufe',
    warFake: 'Fake',
    warEcht: 'Echt',
    zumTipp: 'Weiter zum Sicherheitstipp',
    naechstesLevel: 'Weiter zu Level {n}',
    zumSchluss: 'Weiter zum Abschluss',
    zumErgebnis: 'Zur Auswertung',
    wiederholen: 'Level {n} wiederholen'
  },

  /* ---------------- Sicherheitstipp nach Level 1: Deepfake-Nugget ----------------
     Die Lehren aus den ersten Anrufen, eine Karte nach der anderen (Bild rechts, schmal oben).
     liste = das Muster als kompakte Beispiele. */
  pause: {
    kicker: 'Sicherheitstipp · Deepfakes',
    titel: 'Deepfakes erkennen',
    karten: [
      { bild: 'assets/nugget-stimme.webp', farbe: '#FF2D87', titel: 'Stimme und Gesicht sind kein Beweis',
        text: 'Ein kurzes Video aus den sozialen Netzwerken reicht, und eine KI spricht mit genau dieser Stimme – samt Tonfall und Lachen. Aus einem Foto wird ein sprechendes Gesicht, sogar live im Videoanruf. Ruckler oder Lippen, die nicht ganz passen, können Hinweise sein – gute Deepfakes zeigen keine davon.' },
      { bild: 'assets/nugget-nummer.webp', farbe: '#2BB8E8', titel: 'Auch Nummern lassen sich fälschen',
        text: 'Nummer und Name im Display können gefälscht sein (Call-ID-Spoofing) – auch die deiner Bank oder deiner Firma. Ein Profilfoto kann jeder hochladen. Und umgekehrt: Eine fremde Nummer allein macht noch keinen Fake.' },
      { bild: 'assets/nugget-muster.webp', farbe: '#FFC24D', titel: 'Erkenne das Muster',
        text: 'Im Gespräch folgt fast immer dasselbe Muster:',
        liste: [
          { titel: 'Zeitdruck', beispiel: '„Bitte, jetzt gleich!“' },
          { titel: 'Angst oder Autorität', beispiel: '„Die Polizei ist hier …“ – oder die CEO persönlich' },
          { titel: 'Geheimhaltung', beispiel: '„Das darf noch niemand wissen.“' },
          { titel: 'Eine ungewöhnliche Bitte', beispiel: 'Geld, PIN oder TAN, Passwörter – oder Fernzugriff auf deinen Rechner' }
        ] }
    ],
    lehre: '{n} von {gesamt}',
    weiter: 'Weiter',
    zurueck: 'Zurück'
  },

  /* ---------------- Zum Schluss nach Level 2: gleich die Frage ----------------
     Danach die Rückruf-Regel und die Auswertung. */
  schluss: {
    kicker: 'Eine letzte Frage',
    titel: 'Der wichtigste Tipp',
    zurFrage: 'Und jetzt du',
    frageTitel: 'Zum Schluss: Und wenn du dir nicht sicher bist?',
    szene: 'Dein Telefon klingelt. Die Stimme klingt genau wie deine Chefin. Sie bittet dich um etwas Ungewöhnliches – und es eilt. Irgendetwas fühlt sich komisch an.',
    frage: 'Was tust du?',
    optionen: [
      { icon: 'frage', farbe: '#9B7BFF', text: 'Ich stelle eine Kontrollfrage, die nur sie beantworten kann.', wert: 'halb',
        titel: 'Guter Instinkt – aber nur die halbe Miete.',
        erklaerung: 'Eine Kontrollfrage kann einen Fake entlarven: 2024 stoppten Manager bei Ferrari einen Deepfake ihres CEO, weil der Anrufer nicht wusste, welches Buch der Chef kürzlich empfohlen hatte. Aber vieles steht im Netz – und manche Fragen lassen sich erraten. Am sichersten ist der Rückruf.' },
      { icon: 'kamera', farbe: '#2BB8E8', text: 'Ich bitte um einen Videoanruf – dann sehe ich, ob sie es wirklich ist.', wert: 'falsch',
        titel: 'Leider nein.',
        erklaerung: 'Auch Gesichter lassen sich live fälschen. 2024 überwies ein Mitarbeiter des Ingenieurbüros Arup 25 Millionen Dollar – nach einer Videokonferenz, in der alle anderen Teilnehmenden Deepfakes waren.' },
      { icon: 'rueckruf', farbe: '#FFC24D', text: 'Ich lege auf und rufe sie über die Nummer an, die ich kenne.', wert: 'voll',
        titel: 'Genau richtig!',
        erklaerung: 'Der Rückruf über einen bekannten Weg ist der stärkste Schutz – gegen jede noch so gute Stimme und jedes noch so echte Gesicht. Echte Kolleginnen und Kollegen verstehen das.' },
      { icon: 'display', farbe: '#FF8A5B', text: 'Ich rufe die Nummer zurück, die im Display stand.', wert: 'falsch',
        titel: 'Vorsicht!',
        erklaerung: 'Die angezeigte Nummer lässt sich fälschen (Call-ID-Spoofing) – und eine echte Rückrufnummer kann trotzdem dem Betrüger gehören. Nutze nur Nummern, die du selbst kennst: Adressbuch, Intranet, Website, Kartenrückseite.' }
    ],
    regel: {
      titel: 'Die Rückruf-Regel',
      punkte: [
        { icon: 'phone-off', titel: 'Auflegen ist nicht unhöflich', text: 'Bei ungewöhnlichen Bitten darfst du das Gespräch jederzeit beenden.' },
        { icon: 'phone-out', titel: 'Selbst zurückrufen', text: 'Über eine Nummer, die DU kennst – nicht die im Display und nicht die aus dem Gespräch.' },
        { icon: 'key', titel: 'Codewort vereinbaren', text: 'In der Familie und im Team – für Notfälle und ungewöhnliche Anweisungen.' }
      ]
    }
  },

  /* ---------------- Auswertung ---------------- */
  auswertung: {
    titel: 'Auswertung',
    // fehler = höchstens so viele falsch erkannte Anrufe (der erste passende Rang gilt)
    raenge: [
      { fehler: 0, titel: 'Deepfake-Detektiv:in', text: 'Alle Anrufe richtig erkannt. Dich legt so schnell niemand rein – keine geklonte Stimme und kein gefälschtes Gesicht.' },
      { fehler: 1, titel: 'Scharfer Blick', text: 'Fast perfekt. Ein Anruf hat dich erwischt – schau dir an, welcher.' },
      { fehler: 2, titel: 'Wachsam – mit Lücken', text: 'Du bist auf dem richtigen Weg. Achte noch mehr auf das Muster: Zeitdruck, Geheimhaltung, eine ungewöhnliche Bitte.' },
      { fehler: 99, titel: 'Leichte Beute', text: 'Die Betrüger hatten heute leichtes Spiel. Aber jetzt kennst du ihre Deepfake-Tricks.' }
    ],
    richtig: 'richtig erkannt',
    beuteNull: 'Der Hacker geht leer aus.',
    beuteVoll: 'hat der Hacker heute erbeutet.',
    hackerGut: 'Ganz ehrlich? Mit dir macht das keinen Spaß.',
    hackerMittel: 'Nicht schlecht. Aber einmal hab ich dich.',
    hackerSchlecht: 'Danke für die Spende! Bis zum nächsten Anruf …',
    akte: 'Deine Anrufe',
    regelnTitel: 'Deine 4 Regeln gegen Deepfakes',
    regeln: [
      { titel: 'Stimme, Gesicht und Nummer sind kein Beweis', text: 'Ein kurzes Video reicht, um Stimme und Gesicht zu fälschen. Und Nummer und Name im Display lassen sich fälschen.' },
      { titel: 'Erkenne das Muster', text: 'Zeitdruck + Geheimhaltung + ungewöhnliche Bitte: Geld, Codes, Zugangsdaten, Fernzugriff.' },
      { titel: 'Hak nach', text: 'Kontrollfrage, Ticketnummer, normaler Prozess. Betrüger weichen aus und machen Druck – echte Anrufer nicht.' },
      { titel: 'Auflegen & zurückrufen', text: 'Über eine Nummer, die du kennst. Und vereinbart ein Codewort – privat und im Team.' }
    ],
    nachgehakt: 'mal nachgehakt',
    nochmal: 'Nochmal spielen',
    lms: 'Bestanden! Dein Ergebnis wurde an das LMS übermittelt.',
    weiterSpielen: 'Weiter mit Level {n}',
    kleingedruckt: 'Alle Stimmen, Gesichter, Videos und Bilder in dieser Challenge wurden mit KI erzeugt – auch die der echten Anrufer. Die Personen gibt es nicht.',
    quellen: 'Hintergrund: Lagebilder von Polizei und Verbraucherzentralen zu Vishing, Deepfakes und KI-Schockanrufen, Sicherheitsberichte zu Teams-Vishing (2026) sowie die bekannten Fälle eines britischen Energieversorgers (2019), Arup (2024) und Ferrari (2024).'
  }
};