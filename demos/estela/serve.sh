#!/usr/bin/env bash
# Serve a demo Loja no Bolso na porta 8765
set -euo pipefail
cd "$(dirname "$0")"
PORT="${PORT:-8765}"
echo "Loja no Bolso demo → http://0.0.0.0:${PORT}/"
echo "No celular (mesma rede), use o IP desta máquina + :${PORT}"
if command -v hostname >/dev/null 2>&1; then
  hostname -I 2>/dev/null | awk '{print "IP provável: http://"$1":'"${PORT}"'/"}' || true
fi
exec python3 -m http.server "$PORT" --bind 0.0.0.0
