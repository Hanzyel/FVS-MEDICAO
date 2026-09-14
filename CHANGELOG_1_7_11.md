# CHANGELOG — FVS-MED-1.7.11

Base: **1.7.10**

## Alterações

- revisão do Service Worker;
- API e `/healthz` excluídos de qualquer cache/fallback do PWA;
- atualização controlada do PWA, sem ativação agressiva durante FVS/medição;
- cache versionado `elevatta-fvs-med-1.7.11`;
- limpeza restrita a caches antigos pertencentes ao Elevatta;
- `version.json`, `sw.js`, `pwa.js` e `index.html` sincronizados na versão 1.7.11;
- verificação periódica e ao retomar a aba, sem polling excessivo;
- proteção contra loop de reload após troca de Service Worker;
- headers HTTP de segurança revisados no Render;
- headers HTTP de cache específicos por tipo de arquivo;
- manifesto PWA normalizado para instalação Android;
- validação automática de release por `scripts/check.mjs`;
- build do Render passa a bloquear release inconsistente;
- `.gitignore` ampliado para arquivos locais, logs e `.env`;
- comportamento operacional e regras de negócio da 1.7.10 preservados.

## Não alterado nesta versão

- regras de medição;
- FVS/checklists;
- payloads/endpoints do backend;
- IndexedDB;
- câmera/zoom;
- fotos;
- geração de PDF e XLSX;
- histórico e rascunhos;
- layout/identidade visual;
- bibliotecas incorporadas ExcelJS e jsPDF.
