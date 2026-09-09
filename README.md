# Elevatta FVS + Medição — PWA 1.7.0

Pacote pronto para GitHub + Render.

## Estrutura correta do repositório

```text
.
├── .gitignore
├── README.md
├── render.yaml
├── index.html
├── config.js
├── manifest.webmanifest
├── pwa.js
├── sw.js
├── version.json
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-512.png
    ├── apple-touch-icon.png
    └── favicon-32.png
```

## GitHub

Descompacte este ZIP e envie **todo o conteúdo** para a raiz do repositório. Não crie uma pasta `public`.

## Render — configuração manual

Crie um **Static Site** e use:

- Branch: `main`
- Root Directory: vazio
- Build Command: `echo "Elevatta FVS PWA"`
- Publish Directory: `.`
- Auto Deploy: `On Commit`

Ou use **New → Blueprint**, pois o `render.yaml` já está configurado para publicar a raiz do repositório.

## API

Se a API estiver em outro domínio, edite `config.js`:

```js
window.ELEVATTA_CONFIG = {
  API_BASE: "https://SEU-BACKEND.onrender.com"
};
```

Se frontend e API usam o mesmo domínio, mantenha `API_BASE` vazio.

## Atualizações

Nas versões futuras, substitua os arquivos no mesmo repositório e faça commit/push. O Render fará o deploy e o PWA instalado detectará a nova versão.
