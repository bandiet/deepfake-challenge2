#!/usr/bin/env python3
"""Local server with caching switched off: python3 serve.py [port]"""
import http.server
import os
import sys


class NoCache(http.server.SimpleHTTPRequestHandler):
    # Videos and voices may be cached and are served in byte ranges, like on Cloudflare; without that the
    # browser downloads every clip in full before it can play or seek, and the picture lags behind the voice
    def end_headers(self):
        if not self.path.startswith('/assets/'):
            self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        rng = self.headers.get('Range')
        path = self.translate_path(self.path)
        if not rng or not rng.startswith('bytes=') or not os.path.isfile(path):
            return super().send_head()
        size = os.path.getsize(path)
        a, _, b = rng[6:].split(',')[0].partition('-')
        start = int(a) if a else max(0, size - int(b))
        end = min(int(b), size - 1) if a and b else size - 1
        if start >= size:
            self.send_error(416)
            return None
        f = open(path, 'rb')
        f.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        self._rest = end - start + 1
        return f

    def copyfile(self, source, outputfile):
        rest = getattr(self, '_rest', None)
        if rest is None:
            return super().copyfile(source, outputfile)
        self._rest = None
        while rest > 0:
            blok = source.read(min(65536, rest))
            if not blok:
                break
            outputfile.write(blok)
            rest -= len(blok)

    def handle(self):
        # the browser drops music downloads halfway on every reload; that is not an error
        try:
            super().handle()
        except (BrokenPipeError, ConnectionResetError):
            pass


class Server(http.server.ThreadingHTTPServer):
    # the page, its scripts and three music files all ask at once; the default queue of 5 drops some
    request_queue_size = 64
    daemon_threads = True


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8816
os.chdir(os.path.dirname(os.path.abspath(__file__)))
print(f'Deepfake Challenge v2 läuft on http://127.0.0.1:{port}', flush=True)
Server(('127.0.0.1', port), NoCache).serve_forever()
