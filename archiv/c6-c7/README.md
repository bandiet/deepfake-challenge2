# Archived calls c6 and c7

Removed from the game on 2026-11-20 to make the package smaller (about 10 MB). Nothing was deleted.

- **c6 – "Das Headset-Ticket"** (genuine, Teams video, IT hotline, Daniel Chen). Source clips: `Vishing - Deepfake or not/Videos Case 6 - Das Headset Ticket/`. The R2B clip ("Nein, auf keinen Fall, das brauchen wir nicht …") was still missing.
- **c7 – Tobias Brandt, IT-Service** (genuine, audio only, from the Vishing Challenge).

Contents:
- `content-c6-c7.js` – the two call objects from `js/content.js`
- `assets/video/` – c6 clips, idle and `chen-poster.jpg`
- `assets/stem/` – voices c6 (m4a) and c7 (mp3)
- `assets/chen-profil.jpg` – profile photo of Daniel Chen

To restore a call: move its files back into the same folders under `assets/`, paste its object back into the `anrufe` list in `js/content.js` (and into a level if it should be played), then run `python3 tools/bouw-artifact.py`.
