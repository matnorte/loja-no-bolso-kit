# NARA — flagship Loja no Bolso

Demo de catálogo **mobile-first** para venda presencial em Teresópolis.

## Quando usar
- Boutique de moda feminina, rua comercial, mercado de luxo
- Pitch: "vitrine de moda no celular + WhatsApp direto"

## Abrir
```bash
cd /root/missions/earn10k/assets/flagship-loja
python3 -m http.server 8765 --bind 0.0.0.0
```

No celular (mesma rede): `http://<IP-do-servidor>:8765/`
Ou abra `index.html` direto no navegador do aparelho.

## Conteúdo
- 14 peças · 5 categorias · cacheado + offline-friendly
- Sem CDN (funciona sem internet)
- Design editorial, não template IA genérico
- WA fictício (troque na entrega real)

## Personalizar lead
Edite `PRODUCTS` e `SHOP_NAME` / `WA_E164` em `app.js` + textos em `index.html`.

## Arquivos
| Arquivo | Uso |
|---------|-----|
| `index.html` | Página |
| `styles.css` | Visual |
| `app.js` | Catálogo + WhatsApp |

## Por que parece produto
- **Editorial**: paleta de cores NARA, tipografia serif com caráter, header sticky
- **UX**: chip de filtro, busca em tempo real, sheet para produto, CTA claro no dock
- **Acessível**: skip link, contraste, teclado navigável
- **Funciona offline**: sem dependência de CDN/fontes remotas