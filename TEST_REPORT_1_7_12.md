# Relatório de testes — FVS-MED-1.7.12

Base comparada: **FVS-MED-1.7.11**

## Testes executados

| Teste | Resultado |
|---|---|
| Sintaxe de todos os scripts inline do `index.html` com `node --check` | PASS |
| Sintaxe de `pwa.js`, `sw.js`, `config.js` e `scripts/check.mjs` | PASS |
| `npm run check` | PASS |
| Versionamento 1.7.12 sincronizado | PASS |
| Catálogo Solaris terceirizado possui 15 linhas | PASS |
| Códigos `5a` e `5b` preservados | PASS |
| Nomes das 15 etapas preservados | PASS |
| Pesos individuais preservados | PASS |
| Soma decimal dos pesos = 99,99% | PASS |
| Total conceitual da empreitada = 100% | PASS |
| Solaris + Própria retorna ao catálogo atual | PASS |
| Solaris + Terceirizada retorna exclusivamente o catálogo novo | PASS |
| Lótus/outras obras + Terceirizada continuam no catálogo atual | PASS |
| Normalização de `Solaris`, caixa e espaços | PASS |
| Troca Própria → Terceirizada limpa seleção incompatível | PASS |
| Troca Terceirizada → Própria limpa seleção incompatível | PASS |
| Fotos existentes são preservadas e desvinculadas de itens incompatíveis | PASS |
| Metadados `codigoEtapa`, `pesoEtapa` e `catalogoServico` aplicados à seleção | PASS |
| Endpoints `/api/*` e `/healthz` comparados 1.7.11 x 1.7.12 | PASS — idênticos |
| Constante/schema do IndexedDB comparado 1.7.11 x 1.7.12 | PASS — idêntico |
| Funções de IndexedDB/fotos comparadas 1.7.11 x 1.7.12 | PASS — idênticas |
| Núcleo da câmera/zoom comparado 1.7.11 x 1.7.12 | PASS — idêntico |
| Scripts vendor incorporados (jsPDF/ExcelJS) comparados por hash | PASS — idênticos |
| PDF/XLSX: código alterado passa validação de sintaxe | PASS |
| Service Worker/manifest/PWA continuam aprovados pelo `scripts/check.mjs` | PASS |

## Teste funcional de catálogo executado em runtime Node

Foram executadas as seguintes transições sobre as funções reais extraídas do `index.html`:

1. `Solaris II + PRÓPRIA` → pacote atual `PCT-040` permanece disponível.
2. `Solaris II + TERCEIRIZADA` → catálogo passa a ter 15 serviços.
3. Serviço próprio selecionado + troca para terceirizada → seleção é zerada.
4. Foto previamente vinculada a item → foto preservada como grupo geral (`G`).
5. Seleção da etapa `7` → `pesoEtapa = 16.63` e catálogo = `SOLARIS_TERCEIRIZADA`.
6. Terceirizada → Própria → serviço terceirizado incompatível é zerado.
7. `Lótus 2 + TERCEIRIZADA` → comportamento atual preservado.

Resultado: **PASS**.

## Pendências de validação em ambiente real

Os testes estáticos e de runtime da regra foram concluídos. Ainda é recomendado, após o deploy HTTPS, executar um smoke test em Android real com:

- seleção de S1–S5 + terceirizada;
- captura de foto usando 0,5x/1x/zoom conforme suporte do aparelho;
- salvamento real no backend;
- abertura do registro no histórico;
- geração real de PDF e XLSX no navegador.

Isso depende do navegador, hardware da câmera e backend publicado e não é reproduzível integralmente em Node.
