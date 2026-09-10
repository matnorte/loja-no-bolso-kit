# Demo — Loja no Bolso (Boutique Aurora)

Catálogo estático **offline-friendly** para visita presencial.

## Abrir no celular (local)

### Opção A — arquivo direto
1. Copie a pasta `demo-loja-no-bolso/` para o celular (Drive, cabo, Telegram “Salvar”).
2. Abra `index.html` no Chrome (Android: app “Abrir HTML” / Files) ou Safari via Files (iOS).
3. Se o `file://` bloquear algo, use a Opção B.

### Opção B — servidor local no notebook (recomendado na visita)
Na pasta deste demo:

```bash
python3 -m http.server 8765 --bind 0.0.0.0
```

No celular (mesma Wi‑Fi): `http://<IP-do-notebook>:8765/`

Descobrir IP (Linux): `hostname -I | awk '{print $1}'`

### Opção C — hospedar (quando tiver URL)
Suba a pasta em qualquer static host (Cloudflare Pages, Netlify, GitHub Pages, Vercel).  
Aí gere o QR apontando para a URL pública (ver `qr-instructions.md`).

## O que mostrar na loja (30s)
1. Home com horários + botão WhatsApp  
2. Filtro de seção / busca  
3. Abrir um produto → **Quero este no WhatsApp** (mensagem pré-montada)  
4. Frase: “na de vocês entram as fotos e preços reais”

## Conteúdo
- 12 itens fake · 5 seções · WhatsApp `wa.me` com número **fictício** `5511999990000`
- Sem dependência de CDN/fonte externa (funciona offline)
- `styles.css` + `app.js` + `manifest.webmanifest` (PWA leve sem service worker)

## Personalizar rápido pra um lead
Edite o array `PRODUCTS` em `app.js` e textos em `index.html` (nome da loja, endereço, `WA_E164`).

## Arquivos
| Arquivo | Uso |
|---------|-----|
| `index.html` | Página |
| `styles.css` | Visual |
| `app.js` | Catálogo + WhatsApp |
| `manifest.webmanifest` | Atalho “app” |
| `qr-instructions.md` | Como gerar QR |
| `serve.sh` | Atalho servidor local |
