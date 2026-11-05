# Deepfake Challenge — anrufe en videoanrufe in het serieformat (CCT)

Afgeleid van de **Vishing Challenge** (`../../Vishing Challenge/MenschOderKI2`, blijft ongewijzigd). Onderwerp: bedriegers die met nieuwe technologie misleiden — geklonde stemmen, nagemaakte gezichten in videogesprekken, gegevens verzamelen en gecombineerde aanvallen (eerst spam, dan "de IT" aan de lijn). Zelfde look en opzet als de Vishing Challenge en de Phishing Challenge 2.0; de enige score is de **buit van de hacker**. Het oordeel heet ECHT / FAKE.

**v2 (2026-11-02, map `DeepfakeChallenge_v2`, poort 8816, repo `bandiet/deepfake-challenge_v2`; v1 blijft in `DeepfakeChallenge`):** doel = 2 levels × 4 gesprekken, 4 audio en 4 video, gemengd (lijst in de Claude Doc "Deepfake Challenge – drei neue Videos (Grok)"). Nu speelbaar: Level 1 = c1 Jonas (audio, fake), c2 bank (audio, echt), c8 Sofia (video, echt), c5 Alex Morgan (video, fake) — min. 3 van 4. Level 2 = c3 nep-helpdesk (audio, fake), c4 Lena (audio, echt), c10 Jamie (video, echt) — min. 2 van 3. Nog zonder video (achter c7, dus niet in het spel): **c9** Sofia fake (WhatsApp, level 2 na c3). Grok-prompts voor Sofia echt/fake en Alex: `../Grok-prompts v2.md`.

**Video-regels (2026-11-05):** clips met begin- én eindbeeld = het portret (Grok: "Letztes Bild hinzufügen"), 1 s stil vooraf, stil terugkeren op het eind. `video.auslauf: true` laat de clip na het laatste woord uitlopen tot de rusthouding; pas dan gaat het beeld naar de idle. De stem start pas als het beeld speelbaar is (`bereit()`). Alle mp4's moeten **faststart** zijn (`python3 tools/faststart.py assets/video/*.mp4`; AVAssetExportSession met `shouldOptimizeForNetworkUse` doet het zelf). `serve.py` levert byte-ranges en laat `assets/` cachen, net als Cloudflare. Ruimtegeluid: `atmo-buero` (Sofia) en `atmo-wohnzimmer` (Jamie), ElevenLabs SFX, in `klang.js` hoog versterkt (bestanden zijn ~−67 dB).

**c8 Sofia (echt):** vijf Grok-clips (720p, 16:9) en twee Grok-idleclips (luisteren/knikken; blik naar papier) uit `../werk/grok-test/`, alle met het portret als begin- en eindbeeld.

**Idle = één film** (geen bestandswissel, anders flitst er een leeg beeld): `tools/werk/idlefilm.swift <ziel> <referentie> <drempel> <stuk…>` plakt de stukken (daarna `tools/werk/bitrate.swift 900 …` voor een redelijke bestandsgrootte) en meet de `nah`-vensters (momenten waarop een clip zonder sprong kan beginnen). `toene: [[tijd, id]]` speelt geluiden in de idle af (Jamie's hoestje). Kiest de speler een antwoord terwijl de stille overgang nog loopt, dan speelt die op dubbele snelheid uit voordat de volgende clip begint.
Feedback: per gesprek **2 hints + "Das schützt dich"** (`slice(0, 2)` in app.js); elke les staat maar bij één gesprek (terugbellen geblokkeerd: c5, "Extern": c3, stem: c1, gezicht: c5). Bij videogesprekken komt bij "Details anzeigen" **geen transcript** naast het beeld, alleen de hints.

**Videoanruf c10 Jamie (echt, level 2, vervangt c6):** gemaakt in ElevenLabs, flow "Deepfake Challenge – echte Videos (Sofia, Jamie)": portret gpt-image-2 (variant B), stem "Nico – Laid-back Storyteller" (`ntwcx49ZcqEarZ2so6jP`, eleven_v3 met tags [hoarse]/[coughs]), lip-sync Creatify Aurora 480p (448×832). Per regel één clip, met daarachter een stille overgang van 4 s (Seedance 1.5 Pro, start = laatste clipbeeld, eind = eerste clipbeeld `c10-anfang.png`, camera vast). Idle = film uit twee Seedance-stukjes van 5 s die op dat beeld beginnen en eindigen (A A B A A A B A, 40 s): A rustig, B met hoestje (geluid apart als `assets/stem/c10_idleB.m4a`, via `toene`). Losse stukjes in `../werk/echt/overgang/`. Seedance levert 496×864, de Aurora-clips zijn 448×832: alles wordt op 448×780 gezet (clips 26 px boven/onder bijgesneden), zie `tools/werk/jamie-uebergaenge.swift` (clip + overgang met 0,12 s overvloeier). Omzetten: beeld zonder geluid + m4a, poster = eerste beeld van idle A, `rivera-profil.jpg` = uitsnede. In het Teams-venster staat het staande beeld met grijze balken (`video.hoch: true` → klasse `.win-video.hoch`). Werkbestanden in `../werk/echt/`.
**Sofia echt (c8):** de eerste Aurora-clip (S1) werd door de ElevenLabs-moderatie geblokkeerd ("may violate our Terms of Service"); niet opnieuw geprobeerd of omzeild. Portret (`../werk/echt/sofia-a.png`) en de vijf stemmen (`c8_*.mp3`, stem "Rebecca Green") liggen klaar; de video moet via een andere aanbieder komen.

**Videoanruf c5 Alex Morgan (fake, CEO-fraude):** bron = `../Alex_hotel_DF02_DE_v3/` (storyboard "Pilot Calls 02, 04, 06", call 02; hoogformaat 400×736). Per regel meerdere clips van 10 s aan elkaar met 0,2 s cross-fade; vanaf de tweede clip begint elk stuk 0,25 s vóór het eerste woord, en elk stuk eindigt 0,2 s na het laatste (geluid na > 2,5 s stilte telt niet). S1 = S1_01–05 (25 s), R1A = 3 clips, R1B = 3, R2A = 3, R2B = 4 (23 s). Idle = `DF02_IDLE_DE.mp4`; `morgan-poster.jpg` = eerste beeld daarvan, `morgan-profil.jpg` = uitsnede. Het beeld blijft bewust foutloos (geen glitch). Ondertitels = tekst uit het storyboard; `../werk/alex-alle-zinnen.m4a` bevat de vijf zinnen achter elkaar (c5_0 op 0 s, c5_1a 28,1 s, c5_1b 48,3 s, c5_2a 66,8 s, c5_2b 84,0 s) om met MacWhisper te controleren of v3 woordelijk zo klinkt.

**Videoanruf c6 "Das Headset-Ticket" (echt, level 2):** bron = `../../Vishing - Deepfake or not/Videos Case 6 - Das Headset Ticket/` (storyboard "Pilot Calls 02, 04, 06", call 06). Elke bronclip duurt 10 s met ±5 s spraak; per regel aan elkaar gezet met een cross-fade van 0,2 s (S1 = clip 3–6, R1A = 7–8, R1B = 9–11, R2A = 12–14, R2B = 15–16; clip 17 is een losse oproep om de pc te vergrendelen, niet gebruikt). In c6_0 zit tussen "richtig?" en "Sorry" een bevroren beeld van 0,6 s met stilte (WLAN-hapering). Idle = stil einde van clip 14 (6,2–9,9 s). Het gesprek speelt in het Teams-venster; `ausgehend: true` = jij belt de hotline, Teams verbindt na 3,6 s vanzelf (geen Annehmen-knop). **Nog open:** de clip "Nein, auf keinen Fall, das brauchen wir nicht. Wir schauen nur in die Einstellungen." voor R2B ontbreekt; tot die er is vraagt optie B "Und wenn es danach immer noch nicht geht?" (neutral) in plaats van naar het wachtwoord. De vorige echte IT-case c7 (Tobias, audio) staat nog achteraan in `content.js` maar wordt niet gespeeld.

**Nugget-plaatje "Auch ein Gesicht ist kein Beweis":** `assets/nugget-gesicht.png` is nog een tijdelijke kopie van het stemplaatje. Het echte plaatje staat in de ElevenLabs-flow "Vishing Challenge – Nugget-Bilder" (node "Deepfake Challenge – Gesicht", 2 varianten); downloaden vanaf deze Mac gaf "not available in your location".

## Verloop

Start (titel, golf Echt→Fake, vliegende symbolen) → "Bereit für Level 1?" → intro (stemkloon-werkbank, eindigt met "Gleich klingelt dein Telefon.") → **Level 1** (c1 Jonas, c3 nep-helpdesk, c2 bank) → level-auswertung → **Sicherheitstipp "Vishing erkennen"**: drie lessen uit de eerste gesprekken, één per kaart met een beeld (introtekst op kaart 1, het patroon als lijst op kaart 3) → **Level 2** (c4 Lena, c7 echte IT-terugbelactie, c5 Chefin per WhatsApp-audio) → level-auswertung → **Zum Schluss**: de tipkaart "Hak nach – und prüf den Weg", dan de vraag "Und wenn du dir nicht sicher bist?" (de Rückruf-Regel staat in dezelfde feedbackbox als het antwoord) → eindauswertung. De knoppen onderaan de vraag en de eindauswertung blijven onderaan staan, net als in de nugget.

**Minimaal 2 van 3 per level** (`levels[].mindestens` in `content.js`). Wie minder goed heeft, ziet "Noch nicht geschafft." met een streepje bij 67 % op de meter en speelt het level opnieuw ("Level 1 wiederholen"). De uitslagen en de buit van die poging vervallen; de intro komt niet nog een keer. De level-start toont het doel als tweede chip ("2 richtig zum Bestehen").

De nugget-beelden (`assets/nugget-*.webp`) zijn met ElevenLabs gemaakt in de stijl van de Phishing Challenge-nuggets (flow "Vishing Challenge – Nugget-Bilder"). De niet gekozen varianten en de ontwerpvergelijking voor het transcript staan lokaal in `entwurf/`. Git negeert die map.

Gesprekscherm: links het toestel (telefoon of Teams), gecentreerd. Rechts staan de situatie, het transcript, direct daaronder de antwoorden, en daarna het oordeel. Live-ondertitels staan standaard **uit**. Het transcript is dan één smalle balk met de schakelaar "Live-Untertitel" en "Nochmal hören", zonder tekst en zonder je eigen keuzes. Wie het geluid uitzet, krijgt de ondertitels automatisch aan. Het oordeel is "Was steckt hinter diesem Anruf?" met de knoppen ECHT (mint, schild met vinkje) en VISHING (koraal, hoorn met uitroepteken). Ophangen kan alleen met de knop, niet met Escape: die toets sloot vroeger per ongeluk gesprekken af bij het wisselen van venster of volledig scherm.

Onder 960 px breed of 540 px hoog staat alles onder elkaar, zoals op mobiel. De telefoon houdt op elk formaat zijn verhouding.

Vóór een Teams-gesprek toont het venster een mailprogramma. In de titelbalk staan het menu-symbool met "Mail", de zoekbalk, een bel, instellingen en een profielfoto. Links staat een app-balk (mail, agenda, personen, chat, bestanden). Bovenaan een werkbalk met "Neue E-Mail" en onopvallende symbolen: verwijderen, archiveren, melden, verplaatsen, beantwoorden, doorsturen, markeren. Daaronder de mappen, de lijst (kürzel, afzender, tijd, onderwerp; ongelezen vet met een balk links) en rechts het leesvenster: de bovenste mail staat open, de tekst als grijze regels. Hoe smaller het venster, hoe meer er wegvalt: eerst het leesvenster, dan de mappen, dan de app-balk. Bij gesprek c3 is het postvak eerst leeg en loopt het dan langzaam vol, tot het venster vol is; het leesvenster zegt dan "Element zum Lesen auswählen". De antwoordopties tijdens het gesprek zijn paars, zoals je eigen tekstballonnen in het transcript, zodat ze zich onderscheiden van de ondertitels. Verschijnen de antwoorden of het oordeel onder het transcript, dan scrolt het transcript mee naar de laatste regel.

Feedback staat, net als in de Phishing Challenge, in het paneel rechts (in plaats van situatie en antwoorden). Bij "Details anzeigen" schuift het transcript naar links: de telefoon schuift opzij en het gespreksverloop staat ernaast, ook als de ondertitels uit stonden. Bij Teams schuift het venster helemaal naar boven, gelijk met het paneel rechts, en neemt het hooguit de helft van de hoogte; het transcript eronder is even breed en loopt door tot onderaan. Tussen 960 en 1100 px breed en op mobiel valt het toestel dan weg en staat alleen het transcript links (mobiel: erboven). Eerst het resultaat ("Entlarvt!", "Getäuscht!", …), de algemene terugkoppeling en "Das Entscheidende". Intussen vliegt de SVG-hacker uit Opus even van links binnen met een sprechblase (niet bij elk gesprek: altijd bij het eerste, daarna willekeurig, samen bij ongeveer 4 van de 6): blij als hij gewonnen heeft, geschrokken als hij door de mand viel, gapend bij een echt gesprek. Daarna volgen "Details anzeigen" en "Hinweise überspringen". "Details anzeigen" loopt de signalen één voor één door, met als laatste "Das schützt dich". Per gesprek zijn dat maximaal 4 stappen: de eerste drie signalen die bij het gespreksverloop passen (`signale` staan op volgorde van belang), plus "Das schützt dich". Elk signaal kan een `zitat` hebben. Bij die hinweis licht de passage in het transcript op, zoals de spotlight in de Phishing Challenge. Het citaat moet letterlijk in de ondertitel staan. Een klik op een onderstreepte passage opent de bijbehorende hinweis. Met `geraet` (anrufer, extern, namensschild) licht ook iets op het toestel op, zoals "Extern" in Teams of het onbekende nummer. Als de hacker buit maakt, telt de kas in de HUD mee op. Een klik op die kas haalt de hacker erbij met een zin over zijn buit (`hackerKasse` in `content.js`; vóór het eerste gesprek: "wacht maar af"). Nog een klik stuurt hem weg; de klik daarna haalt hem terug met een andere zin.

## Starten

`python3 serve.py 8815` (launch-config `deepfakechallenge`). Testsprongen: `#intro`, `#l1`, `#l2`, `#anruf1` … `#anruf6`, `#e1`, `#e2`, `#pause` (nugget), `#schluss` (tipkaart), `#frage` (slotvraag), `#ende`. Testsprongen melden niets aan het LMS.

## SCORM

`python3 tools/bouw-artifact.py` bouwt naast de website ook `dist/Deepfake_Challenge_DE_SCORM2004.zip` en `dist/Deepfake_Challenge_DE_SCORM12.zip`. Beide bevatten `imsmanifest.xml`, `index.html` (CSS en JS ingebed) en `assets/` in de root van de zip. Git negeert de zips.

`js/lms.js` (zelfde opzet als in de Phishing Challenge) praat met het LMS:

- Bij de start wordt `cmi.completion_status` `incomplete`; `cmi.exit` is `suspend`.
- Elk oordeel gaat als interaction mee (`c1` … `c7`, antwoord `echt`/`fake`, correct/incorrect).
- Na elk gehaald level: `cmi.progress_measure` (0.5 en 1). De stand gaat in `suspend_data`: gehaalde levels, hun uitslagen, de buit en of de sicherheitstipp gezien is. Wie het pakket opnieuw opent, ziet "Weiter mit Level 2".
- Pas als **beide levels gehaald** zijn: `completed` + `passed` (1.2: `passed`), score = goed herkende gesprekken van de laatste poging per level (bijv. 4/6 = 67). Een eerder `passed` wordt nooit teruggezet. Het eindscherm meldt "Bestanden! Dein Ergebnis wurde an das LMS übermittelt."
- Het manifest laat het slagen niet over aan de score (geen `satisfiedByMeasure`); het SCO meldt status en succes zelf.
- Zonder LMS (website) doet `lms.js` niets en onthoudt het niets.

Testen zonder LMS: `http://localhost:8814/test/lms.html` (LMS-simulator met SCORM 1.2/2004, schermformaten en een log van alle SCORM-aanroepen; "Neu laden" test het hervatten).

## Bestanden

| Bestand | Inhoud |
|---|---|
| `js/content.js` | alle teksten; `anrufe` in speelvolgorde, `feedback` (titels en terugkoppeling in het paneel), `hackerKasse` (zinnen bij een klik op de buit), `levels` (aantal gesprekken per level), `levelIntro`, `levelEnde`, `pause` (nugget-kaarten), `schluss` (tipkaart, vraag en Rückruf-Regel) |
| `js/app.js` | verloop: start, intro, levels, gesprekken, oordeel, feedback, nugget, level-auswertung (herhalen bij minder dan 2 goed), eindscherm, LMS-stand |
| `js/lms.js` | SCORM 1.2 en 2004 (status, score, interactions, hervatten) |
| `test/lms.html` | LMS-simulator voor lokaal testen |
| `js/klang.js` | Web Audio (muziek, stemmen door de lijnfilters, beltonen, synth-geluiden) |
| `js/feier.js` | confetti (overgenomen uit de Phishing Challenge) |
| `css/style.css` | serielook; telefoon/Teams/ondertitels/feedback/nugget |
| `tools/stimmen.json` | tekst en stem van elke opgenomen regel (ElevenLabs eleven_v3) |
| `tools/haal.py` | haalt klaargezette ElevenLabs-generaties binnen (`stem-nodes.json` koppelt sessie → bestand) |
| `tools/bouw-artifact.py` | bouwt `dist/artifact`, `dist/site` (Cloudflare-worker `deepfake-challenge`) en de SCORM-zips |

## Stemmen

- c7 (echte IT, Tobias Brandt): stem "Michael" (`d9Ln92LAVKPJLW7vlW1m`), take 1 van elke regel.
- c5 (Chefin): de bestaande opnames uit de vroegere videocase; bij de kontrollvraag (`c5_2b`) valt de verbinding weg (`glitch: true`).
- Wie een `tts`-tekst in `content.js` wijzigt, moet die regel opnieuw genereren (zelfde bestandsnaam in `assets/stem/`).
