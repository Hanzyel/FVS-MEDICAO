# CHANGELOG — FVS-MED-1.7.12

Base: **FVS-MED-1.7.11**

## Alteração funcional

- adicionado catálogo exclusivo para **Solaris (S1 a S5) + Mão de obra terceirizada**;
- preservado o catálogo atual para **Solaris + Mão de obra própria**;
- preservado o comportamento atual de todas as demais obras;
- seleção do catálogo centralizada em `getCatalogoServicos(...)` e `CATALOGOS`;
- catálogo terceirizado com 15 linhas e códigos preservados: `1`, `2`, `3`, `4`, `5a`, `5b`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`;
- pesos individuais preservados exatamente conforme a origem; soma decimal = 99,99% por arredondamento e total conceitual = 100%;
- troca de própria/terceirizada atualiza o catálogo sem recarregar a página;
- seleção incompatível é limpa automaticamente;
- fotos existentes não são apagadas na troca de catálogo; vínculos antigos aos itens são convertidos em evidência geral;
- código e peso da etapa passam a constar no resumo, PDF e XLSX quando o catálogo Solaris terceirizado estiver ativo;
- metadados do catálogo são preservados em rascunho e na rastreabilidade textual do registro, sem alterar o schema do backend.

## FVS técnica

Foram reutilizadas apenas IT/FVS já existentes quando a correspondência é direta:

- 1 → IT 8.5-08 — Execução de Alvenaria Não-Estrutural;
- 3 → IT 8.5-08 — Execução de Alvenaria Não-Estrutural;
- 5a → IT 8.5-23.1 — Instalação Elétrica (Infraestrutura);
- 5b → IT 8.5-23.2 — Instalação Elétrica (Fiação);
- 6 → IT 8.5-24 — Instalação Hidro-Sanitária;
- 9 → IT 8.5-17 — Impermeabilização;
- 11 → IT 8.5-11 — Revestimento Externo;
- 12 → IT 8.5-25 — Bancada, Louça e Metal Sanitário.

Os serviços compostos `2`, `4`, `7`, `8`, `10`, `13` e `14` permanecem no checklist genérico já existente do aplicativo até que sejam fornecidos critérios técnicos específicos. Nenhum critério de engenharia novo foi inventado.

## Versionamento/PWA

- versão atualizada para `1.7.12` / `FVS-MED-1.7.12`;
- `index.html`, `sw.js`, `pwa.js`, `version.json`, `package.json` e `scripts/check.mjs` sincronizados;
- Service Worker continua com a política de atualização controlada da 1.7.11.
