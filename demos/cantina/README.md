# Demo — Cantina do Beco (nicho food / cardápio QR)

Cardápio digital offline-friendly para visita presencial a restaurantes, cafés e lanchonetes.

## Quando usar
- Restaurante, café, quilo, lanchonete, pizza, barzinho
- Pitch: "QR na mesa + cardápio no celular + pedido no WhatsApp"

## Abrir
```bash
cd assets/demo-cardapio-cantina && ./serve.sh
# ou: python3 -m http.server 8767 --bind 0.0.0.0
```

No celular (mesma rede): `http://<IP>:8765/`
Arquivo direto: abra `index.html` no Chrome.

## Conteúdo
- 14 itens · Almoço / Lanches / Bebidas / Doces / Combos
- WA fictício `5511977770000`
- Sem CDN (offline)

## Personalizar lead
```bash
./scripts/clone-demo.sh cantina "Nome do Bar" 55DDDNÚMERO
```
Ou edite `PRODUCTS` / `SHOP_NAME` / `WA_E164` em `app.js` + textos em `index.html`.

## Arquivos
| Arquivo | Uso |
|---------|-----|
| `index.html` | Página |
| `styles.css` | Visual |
| `app.js` | Catálogo + WhatsApp |
| `manifest.webmanifest` | Atalho "app" |
| `qr-instructions.md` | Como gerar QR |
| `serve.sh` | Atalho servidor local |

## Visual (Cantina do Beco)
Identidade própria de nicho (paleta/tipo). Base de layout compartilhada Loja no Bolso; **não** usar o CSS genérico Aurora antigo.
