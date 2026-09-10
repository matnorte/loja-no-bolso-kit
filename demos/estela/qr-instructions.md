# QR Code — instruções (Loja no Bolso)

Objetivo: gerar um QR que abre o **demo** (ou a loja real) no celular do dono/cliente.

## 1) Tenha uma URL
QR de `file://` **não funciona** bem entre celulares. Precisa de URL `https://...` (ou `http://` só na mesma rede local).

### Demo em rede local (visita)
```bash
cd /root/missions/earn10k/assets/demo-loja-no-bolso
./serve.sh
# URL: http://SEU_IP:8765/
```
QR com IP local só funciona se o celular estiver na **mesma Wi‑Fi**.

### Demo público (melhor)
Hospede a pasta em Pages/Netlify/Cloudflare e use a URL https.

## 2) Gerar o PNG/SVG (escolha uma)

### A — CLI com Python (qrcode)
```bash
python3 -m venv /tmp/qrvenv && /tmp/qrvenv/bin/pip install qrcode[pil]
/tmp/qrvenv/bin/python - <<'PY'
import qrcode
url = "https://SEU-DOMINIO-OU-IP/caminho/"  # troque
img = qrcode.make(url)
img.save("qr-loja-no-bolso-demo.png")
print("ok", "qr-loja-no-bolso-demo.png")
PY
```

### B — Site gerador (sem instalar)
1. Abra um gerador confiável (ex.: qr-code-generator.com, goqr.me, ou o do próprio Cloudflare se usar).
2. Cole a URL https do catálogo.
3. Baixe PNG alta resolução (mín. 1000×1000 px para impressão).
4. Mantenha **margem branca** (quiet zone).

### C — Google Chart API (rápido, precisa rede)
```text
https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=URL_ENCODED&choe=UTF-8
```
Substitua `URL_ENCODED` pela URL codificada. (API legada — preferir A/B em produção.)

## 3) Arquivos para a loja
| Arquivo | Uso |
|---------|-----|
| `qr-vitrine.png` | Adesivo porta/vitrine |
| `qr-balcao.png` | Pequeno no balcão |
| `qr-vector.svg` | Gráfica (se tiver) |

Texto ao lado do QR (imprimir):
> **Escaneie para ver o catálogo**  
> Boutique Aurora · WhatsApp na hora

## 4) Teste obrigatório antes da visita / entrega
- [ ] Abrir com câmera iPhone  
- [ ] Abrir com câmera Android  
- [ ] Link cai na home certa  
- [ ] Botão WhatsApp abre com mensagem  
- [ ] Funciona em 4G (não só Wi‑Fi da loja)

## 5) Placeholder atual
Enquanto não houver URL pública, use na visita:
- demo **local** no celular do Mateus (sem QR), **ou**
- QR temporário para `http://IP:8765/` na mesma rede.

**Não inventar** URL hospedada. Quando Mateus autorizar host/domínio, gerar o QR final e versionar em `assets/demo-loja-no-bolso/qr/`.

## 6) Loja real (pós-venda)
URL final tipicamente:
`https://nome-da-loja.seu-dominio.com.br`  
ou link curto do host.

Trocar QR a cada mudança de domínio (custa reimprimir adesivo — combinar domínio estável no kickoff).
