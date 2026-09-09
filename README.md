# Elevatta FVS + Medição — Android/PWA 1.7.1

Pacote corrigido para GitHub + Render, com todos os arquivos na raiz do repositório.

## Upload no GitHub

1. Apague/substitua os arquivos antigos do repositório.
2. Descompacte este ZIP.
3. Envie **todos os arquivos da raiz e a pasta `icons/`**.
4. Confirme o commit na branch `main`.

A raiz do Git deve mostrar `index.html`, `pwa.js`, `sw.js`, `manifest.webmanifest`, `render.yaml`, `config.js`, `version.json` e `icons/`.

## Render

Use Static Site. Configuração:

- Root Directory: vazio
- Build Command: `echo "Elevatta FVS PWA Android 1.7.1"`
- Publish Directory: `.`
- Auto Deploy: On Commit

Depois do deploy, abra o endereço `https://...onrender.com` diretamente no **Google Chrome do Android**.

O botão **Instalar app** permanece visível enquanto o PWA não estiver instalado.

## Importante sobre API

Se a API do Elevatta estiver em outro serviço Render, edite `config.js` e defina `API_BASE` com a URL HTTPS do backend.
