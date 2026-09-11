# Demo — Salão Estela (nicho estética / salão)

Cardápio de **serviços** offline-friendly para visita presencial. Complementa a Boutique Aurora (moda).

## Quando usar
- Salão de beleza, barbearia, unhas, estética facial
- Pitch: “cardápio de serviços + WhatsApp + QR na recepção”

## Abrir
Igual à demo moda:
```bash
cd assets/demo-salao-estela && ./serve.sh
# ou: python3 -m http.server 8766 --bind 0.0.0.0
```
Celular na mesma Wi‑Fi → `http://<IP>:8765/` (porta do `serve.sh`).

Arquivo direto: abra `index.html` no Chrome.

## Conteúdo
- 12 serviços · seções Cabelo / Unhas / Estética / Barbearia / Pacotes
- WA fictício `5511988880000`
- Sem CDN (offline)

## Personalizar lead
Edite `PRODUCTS` e `SHOP_NAME` / `WA_E164` em `app.js` + textos em `index.html`.

## Visual (Salão Estela)
Identidade própria de nicho (paleta/tipo). Base de layout compartilhada Loja no Bolso; **não** usar o CSS genérico Aurora antigo.
