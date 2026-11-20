// Archived calls from js/content.js (removed from the game on 2026-11-20).
// To restore: paste these objects back into the `anrufe` list in js/content.js and move the files
// from archiv/c6-c7/assets/ back into assets/.

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
