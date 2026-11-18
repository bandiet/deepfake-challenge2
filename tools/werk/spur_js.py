# Gesichtsspur (gesicht_spur.swift) -> js/intro-spur.js: je Bild Bewegung relativ zum ersten Bild, leicht geglättet.
# Aufruf: python3 tools/werk/spur_js.py <spur.json> js/intro-spur.js
import json, math, sys
d = json.load(open(sys.argv[1])); F = d['felder']; B = d['bilder']
i = {f: k for k, f in enumerate(F)}
def roll(v): return v - math.pi if v > 0 else v + math.pi
null = B[0]
reihen = []
for b in B:
    g = b[i['gr']]
    reihen.append([
        (b[i['x']] - null[i['x']]) / null[i['gr']],        # dx in Gesichtshöhen
        (b[i['y']] - null[i['y']]) / null[i['gr']],        # dy
        g / null[i['gr']],                                   # Größe
        roll(b[i['roll']]) - roll(null[i['roll']]),          # Neigung (rad)
        b[i['nase']] - null[i['nase']],                      # Drehung (Nase gegen Augenmitte)
        b[i['pitch']] - null[i['pitch']],                    # Nicken
        b[i['mund']], b[i['augeL']], b[i['augeR']],
        b[i['braue']] - null[i['braue']], b[i['breite']] - null[i['breite']]
    ])
# 3er-Mittel gegen Zittern (Augen nicht: das Blinzeln soll kurz bleiben)
glatt = []
for k in range(len(reihen)):
    nb = [reihen[j] for j in range(max(0, k - 1), min(len(reihen), k + 2))]
    glatt.append([round(sum(r[m] for r in nb) / len(nb), 3) if m not in (7, 8) else round(reihen[k][m], 3) for m in range(11)])
aus = {'fps': d['fps'], 'felder': ['dx', 'dy', 'gr', 'roll', 'dreh', 'nick', 'mund', 'augeL', 'augeR', 'braue', 'breite'],
       'null': {'augeL': null[i['augeL']], 'augeR': null[i['augeR']], 'mund': null[i['mund']]}, 'bilder': glatt}
open(sys.argv[2], 'w').write('// Gesichtsbewegung von Markus in assets/video/intro-live.mp4 (rechte Hälfte), gelesen mit Apple Vision\n'
    '// (tools/werk/gesicht_spur.swift + spur_js.py). Steuert den Hacker in der Intro-Szene „Live gesteuert“ Bild für Bild.\n'
    'window.INTRO_SPUR = ' + json.dumps(aus, separators=(',', ':')) + ';\n')
print(len(glatt), 'Bilder')
