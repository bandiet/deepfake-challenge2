#!/usr/bin/env python3
"""Zet den moov-Index vor die Mediendaten (wie qt-faststart), damit der Browser sofort abspielen kann.
AVAssetExportSession schreibt moov ans Ende. Aufruf: python3 tools/faststart.py datei.mp4 [...]"""
import struct
import sys


def atome(d, a=0, e=None):
    e = len(d) if e is None else e
    while a < e - 8:
        n, typ = struct.unpack('>I4s', d[a:a + 8])
        kopf = 8
        if n == 1:
            n = struct.unpack('>Q', d[a + 8:a + 16])[0]; kopf = 16
        elif n == 0:
            n = e - a
        yield typ, a, n, kopf
        a += n


CONTAINER = {b'moov', b'trak', b'mdia', b'minf', b'stbl', b'edts', b'udta'}


def offsets_schieben(moov, delta):
    moov = bytearray(moov)

    def lauf(a, e):
        for typ, s, n, k in atome(moov, a, e):
            if typ in CONTAINER:
                lauf(s + k, s + n)
            elif typ == b'stco':
                cnt = struct.unpack('>I', moov[s + 12:s + 16])[0]
                for i in range(cnt):
                    p = s + 16 + 4 * i
                    v = struct.unpack('>I', moov[p:p + 4])[0] + delta
                    if v > 0xFFFFFFFF:
                        raise SystemExit('stco-Überlauf – Datei zu groß für stco')
                    moov[p:p + 4] = struct.pack('>I', v)
            elif typ == b'co64':
                cnt = struct.unpack('>I', moov[s + 12:s + 16])[0]
                for i in range(cnt):
                    p = s + 16 + 8 * i
                    moov[p:p + 8] = struct.pack('>Q', struct.unpack('>Q', moov[p:p + 8])[0] + delta)
    lauf(8, len(moov))
    return bytes(moov)


def faststart(pfad):
    d = open(pfad, 'rb').read()
    teile = list(atome(d))
    typen = [t for t, *_ in teile]
    if b'moov' not in typen or b'mdat' not in typen:
        print(pfad, 'übersprungen (kein moov/mdat)'); return
    if typen.index(b'moov') < typen.index(b'mdat'):
        print(pfad, 'schon faststart'); return
    moov = next(d[s:s + n] for t, s, n, k in teile if t == b'moov')
    vorne = b''.join(d[s:s + n] for t, s, n, k in teile if t in (b'ftyp',))
    rest = b''.join(d[s:s + n] for t, s, n, k in teile if t not in (b'ftyp', b'moov'))
    neu = vorne + offsets_schieben(moov, len(moov)) + rest
    open(pfad, 'wb').write(neu)
    print(pfad, 'ok')


for p in sys.argv[1:]:
    faststart(p)
