#!/usr/bin/env python3
"""Download finished ElevenLabs generations into the project.

Usage: python3 tools/haal.py <status.json> [<status.json> ...]

A status file is the saved result of creative_get_flow_run_status. Every media
URL contains its session id; stem-nodes.json and sound-nodes.json map session ids
to file names (voices -> assets/stem/<id>.mp3, sound -> assets/<dir>/<name>.mp3).
Existing files are skipped unless --neu is given.
"""
import json
import os
import subprocess
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
PROJEKT = os.path.dirname(HIER)

ziele = {}
stem = json.load(open(os.path.join(HIER, 'stem-nodes.json')))
for name, sess in stem['sessions'].items():
    ziele[sess] = os.path.join(PROJEKT, 'assets', 'stem', name + '.mp3')
if os.path.exists(os.path.join(HIER, 'sound-nodes.json')):
    sound = json.load(open(os.path.join(HIER, 'sound-nodes.json')))
    for name, it in sound['items'].items():
        ziele[it['session']] = os.path.join(PROJEKT, 'assets', it['dir'], name + '.mp3')
extra = os.path.join(HIER, 'extra-nodes.json')
if os.path.exists(extra):
    for sess, pfad in json.load(open(extra)).items():
        ziele[sess] = os.path.join(PROJEKT, pfad)

neu = '--neu' in sys.argv
for datei in [a for a in sys.argv[1:] if not a.startswith('--')]:
    d = json.load(open(datei))
    for m in d.get('media', []):
        url = m['url']
        sess = url.split('/content_generation/')[1].split('/')[0]
        ziel = ziele.get(sess)
        if not ziel:
            print('?', sess, 'unbekannt')
            continue
        if os.path.exists(ziel) and not neu:
            print('=', os.path.relpath(ziel, PROJEKT))
            continue
        os.makedirs(os.path.dirname(ziel), exist_ok=True)
        ok = subprocess.run(['curl', '-sfL', '-o', ziel, url]).returncode == 0
        print('+' if ok else 'FEHLER', os.path.relpath(ziel, PROJEKT))
