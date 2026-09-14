# Relatório de testes — FVS-MED-1.7.11

Base comparada: **1.7.10** (`ELEVATTA_FVS_GITHUB_RENDER_NOME_ARQUIVO_1_7_10.zip`).

## Testes executados

| Área | Verificação | Resultado |
|---|---|---|
| Release | `npm run check` / `node scripts/check.mjs` | PASS |
| JavaScript | Sintaxe dos 3 scripts inline do `index.html` | PASS |
| JavaScript | Sintaxe de `pwa.js`, `sw.js`, `config.js`, `scripts/check.mjs` | PASS |
| Versionamento | `index.html`, `pwa.js`, `sw.js`, `version.json`, `package.json` sincronizados em 1.7.11 | PASS |
| Render | `render.yaml` parseado; Static Site, `staticPublishPath: .`, build com check | PASS |
| Manifest | JSON válido; id/start/scope `/`; `display: standalone`; cores/nome esperados | PASS |
| Ícones | `icon-192.png` = 192x192; `icon-512.png` = 512x512; referências do manifest existem | PASS |
| Service Worker | `/api`, `/api/*`, `/healthz` usam rede com `cache: no-store` e não consultam cache | PASS (mock) |
| Service Worker | `version.json` usa rede/no-store | PASS (mock) |
| Service Worker | `skipWaiting()` não roda automaticamente no install | PASS (mock) |
| Service Worker | `SKIP_WAITING` somente por mensagem explícita | PASS (mock) |
| Service Worker | `clients.claim()` na ativação | PASS (mock) |
| Cache | caches antigos Elevatta removidos; cache de outra aplicação preservado | PASS (mock) |
| Regressão | `index.html` 1.7.11 comparado à 1.7.10 | PASS: única diferença operacional é `APP_VERSION` |
| Backend | Lista de endpoints `/api/*` e `/healthz` comparada 1.7.10 x 1.7.11 | PASS: idêntica |
| Config | `config.js` comparado byte a byte | PASS: preservado |
| Ícones | arquivos comparados com a 1.7.10 | PASS: preservados byte a byte |
| Segurança | scan simples de segredos em `config.js` | PASS: nenhum segredo detectado |
| IndexedDB | código operacional comparado pela identidade do `index.html` | PASS: schema/lógica não alterados |
| Câmera/Fotos | código operacional comparado pela identidade do `index.html` | PASS: não alterado |
| FVS/Medição | código operacional comparado pela identidade do `index.html` | PASS: não alterado |
| PDF/XLSX | bibliotecas e funções permanecem no mesmo `index.html` | PASS: não alteradas |
| Reload/Rascunho | lógica de persistência permanece no mesmo `index.html` | PASS: não alterada |

## Validação que depende do ambiente publicado

O diálogo nativo de instalação **WebAPK/PWA do Chrome Android** e a integração com o **backend real do Render** dependem de uma origem HTTPS publicada e do aparelho/navegador. O ambiente desta revisão não permite abrir uma origem localhost no Chromium por política administrativa, portanto esses dois pontos devem ser confirmados no smoke test pós-deploy.

O pacote foi validado quanto aos pré-requisitos técnicos de instalabilidade: manifest, ícones, Service Worker, escopo, `start_url`, `display: standalone`, atualização controlada e headers planejados no Render.

## Smoke test recomendado após deploy

1. Abrir a URL HTTPS do Render no Chrome Android.
2. Confirmar que o app mostra `FVS-MED-1.7.11`.
3. Confirmar opção **Instalar app** / instalação PWA.
4. Criar um rascunho e recarregar a página; confirmar persistência.
5. Selecionar obra/pacote, preencher medição e FVS.
6. Abrir câmera, capturar/adicionar/remover foto.
7. Gerar PDF e XLSX.
8. Salvar um registro no backend e consultar o histórico.
9. Desconectar a internet e abrir o shell previamente carregado; confirmar que API não retorna dados antigos em cache.
10. Em uma próxima versão, confirmar banner **Nova versão disponível** e atualização somente ao tocar **Atualizar agora**.
