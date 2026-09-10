# Demo — Cantina do Beco (nicho food / cardápio QR)

Cardápio digital offline-friendly para visita presencial a restaurantes, cafés e lanchonetes. Complementa Boutique Aurora (moda) e Salão Estela (estética).

## Quando usar
- Restaurante, café, quilo, lanchonete, pizza, barzinho
- Pitch: “QR na mesa + cardápio no celular + pedido no WhatsApp”

## Abrir
```bash
cd assets/demo-cardapio-cantina && ./serve.sh
# ou: PORT=8767 python3 -m http.server 8767 --bind 0.0.0.0
```
Celular na mesma Wi‑Fi → `http://<IP>:8765/` (porta do `serve.sh`).

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
