# Gesichtspunkte (gesicht_punkte.swift) -> js/intro-netz.js: Messnetz, das dem Gesicht des Hackers in intro-live.mp4 folgt.
# Aufruf: python3 tools/werk/netz_js.py <punkte.json> js/intro-netz.js
# Je zweites Bild (12 fps, die App blendet dazwischen weich über), 3er-Mittel gegen Zittern,
# Koordinaten 0..4095 als zwei Base64-Zeichen; Bilder ohne Gesicht = leer.
import json, math, sys
d = json.load(open(sys.argv[1])); B = d['bilder']
ZEI = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
def code(v):
    n = max(0, min(4095, round(v * 4095)))
    return ZEI[n >> 6] + ZEI[n & 63]
# geglättet über die Nachbarbilder, die auch ein Gesicht haben
glatt = []
for k, b in enumerate(B):
    if not b: glatt.append(None); continue
    nb = [B[j] for j in range(max(0, k - 1), min(len(B), k + 2)) if B[j]]
    glatt.append([[sum(n[p][c] for n in nb) / len(nb) for c in (0, 1)] for p in range(len(b))])
# Kanten: jeder Punkt zu seinen drei nächsten Nachbarn im ersten Bild
ref = next(b for b in glatt if b)
kanten = set()
for i, a in enumerate(ref):
    nah = sorted((math.hypot((a[0] - q[0]) * 8, (a[1] - q[1]) * 9), j) for j, q in enumerate(ref) if j != i)[:3]
    for _, j in nah: kanten.add((min(i, j), max(i, j)))
schritt = 2
bilder = [''.join(code(c) for p in b for c in p) if b else '' for b in glatt[::schritt]]
aus = {'fps': d['fps'] / schritt, 'kanten': sorted(kanten), 'bilder': bilder}
open(sys.argv[2], 'w').write('// Gesichtspunkte des Hackers in assets/video/intro-live.mp4 (linke Hälfte), gelesen mit Apple Vision\n'
    '// (tools/werk/gesicht_punkte.swift + netz_js.py). Das Messnetz der Intro-Szene „Live gesteuert“ folgt damit seinem Gesicht.\n'
    'window.INTRO_NETZ = ' + json.dumps(aus, separators=(',', ':')) + ';\n')
print(len(bilder), 'Bilder,', len(kanten), 'Kanten')
