# Video calls with Grok Imagine – workflow, prompts and settings

Status: 2026-11-18. This is the method behind the Katrin Albers call (c5, v2), which gives seamless transitions between the idle loop and the spoken clips. Use it for every new video call and for the localised versions.

## 1. The principle: every clip starts and ends on the same picture

The app plays one idle film while the player chooses an answer, then the clip with the reply, then the idle again. A clip can only follow the idle without a visible jump if both show exactly the same pose at the cut. So:

- **One reference image per character.** It is the first **and** last frame of every clip and every idle piece.
- **The person speaks right away,** in one go, and then waits silently for the rest of the clip. During this silent tail they return to the pose of the image.
- **The app starts every clip at frame 0** (the rest pose). The voice starts at the first word, and the picture fades in over the paused idle (`video.auslauf: true`). Don't trim the lead-in before the first word: in those frames the person moves out of the rest pose, so trimming them causes the jump.

## 2. Grok settings

Grok Imagine is at grok.com/imagine, in the browser.

| Setting | Value |
|---|---|
| Mode | **Video** |
| Resolution | **720p** |
| Aspect ratio | **Automatisch** (keeps the ratio of the reference image; 1:1 would carry over otherwise) |
| Start frame | reference image (upload into the composer, the file input of the "Frag Grok…" form) |
| End frame | **the same** reference image (click the second slot → upload → Escape) |
| Duration | 15 s for long lines, 10 s for short lines, 6 s for idle pieces |

The duration setting carries over between generations, so check it every time. Only about **two generations run at the same time**; further ones get dropped silently. Download each video and save it under the clip name (e.g. `c5_1b.mp4`) in `../werk/<character>/`.

## 3. The reference image

- **Landscape and wider than you think.** The phone frame in the app crops to the middle. A wide source (`werk/grok-albers/albers-weit.jpg`) gives a natural distance instead of a close-up.
- Neutral rest pose: looking into the camera, mouth closed, head centred, hands low or out of frame.
- Ordinary, believable surroundings (office, car, living room). Nothing in the picture that you don't want to see move.

## 4. Prompt structure for spoken clips

Every prompt has four parts in this order. Keep them short and in plain spoken language.

1. **Scene and camera (fixed prefix, identical for all clips of a character)**
   ```
   Casual video call, landscape view, the woman from the image sitting alone at her desk in her office. Starts and ends on exactly this image. The camera is completely fixed and still – the framing never changes. Only she moves.
   ```
2. **Delivery: tone and tempo, then the line**
   ```
   Right at the start, <mood>, looking straight into the camera, she says quickly and casually in one go, <situation, e.g. "like a busy executive between two meetings"> – no pauses between the sentences, words run together, not like reading aloud. Only small hand movements, her hands mostly stay low.
   She says in German: "<line>"
   ```
3. **Silent tail back to the image**
   ```
   Then, for the rest of the clip, she says nothing and waits for the answer, eyes on the camera: <small expression, e.g. "eyebrows slightly raised, expectant">, and she ends in exactly the pose of the image.
   ```
4. **Sound**
   ```
   Quiet office sound, no music, no subtitles.
   ```

Full example (c5_0, 15 s):
```
Video call from a phone propped up on the desk, landscape view, the woman from the image sitting alone at her desk in her office. Starts and ends on exactly this image. The camera is completely fixed and still – the framing never changes. Only she moves. Right at the start, friendly but in a confidential, slightly hurried tone, leaning in a little and looking straight into the camera, she says quickly and casually in one go, like a busy executive between two meetings – no pauses between the sentences, words run together, not like reading aloud. Only small hand movements, her hands mostly stay low. She says in German: "Hallo, Katrin Albers hier – vom privaten Handy, ich bin in Zürich. Wir stehen kurz vor einer Übernahme, das darf noch niemand wissen. Heute muss noch eine Anzahlung von achtundvierzigtausendfünfhundert Euro raus. Können Sie das anstoßen?" Then, for the rest of the clip, she says nothing and waits for the answer, eyes on the camera: eyebrows slightly raised, expectant, and she ends in exactly the pose of the image. Quiet office sound, no music, no subtitles.
```

### Line length

With "says quickly … in one go", Grok speaks about **20–25 characters per second** (measured on c5 and c9). Leave at least 3 s for the silent tail.

| Clip duration | Max. characters of the line | Measured examples |
|---|---|---|
| 15 s | ~250 | c5_0: 249 characters → speech 0.2–11.4 s |
| 10 s | ~150 | c5_2b: 145 characters → speech 0.3–5.9 s |

If a line doesn't fit, shorten the text; don't ask for faster speech. Write numbers out as words ("achtundvierzigtausendfünfhundert Euro"), otherwise the pronunciation is unpredictable.

## 5. Idle pieces

Make **three 6 s idle pieces** with different small actions. The app joins them into one film. Each piece is almost motionless, so the start/end pose is nearly always available as an entry point for the next clip.

```
Casual video call, landscape view, the woman from the image sitting alone at her desk in her office. Starts and ends on exactly this image. The camera is completely fixed and still – the framing never changes. She says nothing and calmly listens to the other person, looking straight into the camera the whole time. She stays almost motionless: her head stays in exactly the same place, she only breathes, blinks once naturally and gives one very small nod. Lips closed. She ends in exactly the pose of the image. Quiet office sound, no speech, no music, no subtitles.
```

Variants used for the other two pieces:
- "…listens to the other person, a little impatient … she only breathes, presses her lips together briefly and blinks once."
- "…attentively listens … she only breathes, raises her eyebrows very slightly for a moment and blinks twice. Lips closed."

Longer idles (10 s) with more movement turned out worse: the head drifts sideways, so there are few clean entry points and the app has to wait or jump.

## 6. Profile photo (ringing screen)

The profile photo is a **separate image**, never a frame from the call. Otherwise the ringing screen looks like the live picture and jumps slightly when the video starts. Make it with Grok in image mode, with the reference image uploaded:

```
A personal profile photo of the same woman from the image, taken on a different day: she stands outdoors on a sunny lakeside promenade in summer, wearing a light beige linen blouse, hair slightly moved by the wind, warm natural smile, looking into the camera. Head and shoulders, shallow depth of field, soft blurred background with water and trees. Photorealistic smartphone portrait, square.
```

Unknown numbers (e.g. the fake Sofia, c9) get **no** photo: leave `foto` out of `anrufer`. The ringing screen then shows the "?" on the plain background.

## 7. Lessons learned (what goes wrong)

- **Grok draws prompt words literally.** "face-swap glitch … cheek outline" produced black lines on her face. Don't prompt glitches; the app adds the freeze and "Verbindung instabil" itself.
- **Never name objects you don't want, not even negated.** "no phone" makes a phone appear. Leave out phone, holder, steering wheel, mirror and similar.
- **No timelines in seconds** ("0–1 s: …"). Without them the tempo is more natural; the silent tail does the timing.
- **"says quickly … in one go … not like reading aloud"** avoids the over-articulated, stretched voice.
- **Hands stay low.** Big gestures near the face cause smearing and make the return to the rest pose less exact.
- **Coughs, laughs and sighs** rarely match the picture. Only use them if the picture clearly shows them, otherwise leave them out of the line (Jamie's opening cough was removed for this reason).
- Generate 2 takes per line if the first one is borderline, and choose the take whose first and last frames are closest to the reference image (see section 8).

## 8. From Grok clip to the app

The tools are in `tools/werk/`. Compile them with `swiftc -O <file>.swift -o <name>`.

1. **Clip → silent video + voice**
   ```
   clip_bau <grok.mp4> assets <id>        → assets/video/<id>.mp4 + assets/stem/<id>.m4a
   bitrate 900 assets/video/<id>.mp4
   ```
2. **Check start/end pose and speech time**
   ```
   analyse <reference.jpg> assets/video/<id>.mp4 …
   ```
3. **Idle film** from the three idle pieces, with the entry windows measured against the reference image
   ```
   idlefilm assets/video/<char>_idle.mp4 <reference.jpg> 3.0 idleA.mp4 idleB.mp4 idleC.mp4
   bitrate 900 assets/video/<char>_idle.mp4
   ```
   Copy the printed `nah` windows into `content.js`.
4. **content.js** (example c5):
   ```js
   video: { auslauf: true, poster: 'assets/video/albers-poster.jpg', idle: 'assets/video/c5_idle.mp4',
            nah: [[0, 3.0], [4.2, 18.1]], clips: ['c5_0', 'c5_1a', 'c5_1b', 'c5_2a', 'c5_2b'] },
   anrufer: { …, foto: 'assets/albers-profil.jpg' },
   ```
   `poster` = frame 0 of the first clip. The subtitle texts (`tts`) must match what Grok actually says. Listen to the clip and adjust the text, not the clip.
5. Fix a single bad frame (e.g. a too fast blink) with `einfrieren <in.mp4> <out.mp4> <from s> <to s>`. It holds one frame and keeps the length.
6. Build with `python3 tools/bouw-artifact.py`, then test in Chrome with the sound off. The test browser caches mp4s, so reload them after replacing assets.

## 9. Localisation

- Keep the **same reference image, profile photo and idle film** for all languages. Only the spoken clips are regenerated.
- Translate the line, check it against the character limits in section 4, and replace "She says in German:" with the target language.
- Keep the prefix, delivery, silent tail and sound parts word for word. They carry the timing and the pose.
- Some languages need noticeably more characters for the same line (e.g. French). Shorten the line rather than switch to a longer clip, so the silent tail still fits.
