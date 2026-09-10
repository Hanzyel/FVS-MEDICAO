# Elevatta Medição + FVS — Android/PWA 1.7.7

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
- Build Command: `echo "Elevatta FVS PWA Android 1.7.7"`
- Publish Directory: `.`
- Auto Deploy: On Commit

Depois do deploy, abra o endereço `https://...onrender.com` diretamente no **Google Chrome do Android**.

O botão **Instalar app** permanece visível enquanto o PWA não estiver instalado.

## Importante sobre API

Se a API do Elevatta estiver em outro serviço Render, edite `config.js` e defina `API_BASE` com a URL HTTPS do backend.


## Novidades 1.7.7
- Botão Salvar fotos também no cabeçalho da câmera no Android.
- Botão Zerar relatório fotográfico com confirmação.
- A limpeza remove fotos, legendas, marcações, vínculos e capturas temporárias sem apagar FVS/medição.


## Instalação Android verificada
- Publicar por HTTPS no Render.
- Abrir diretamente no Google Chrome Android.
- Na primeira visita, toque na página e mantenha-a aberta por cerca de 30 segundos para o Chrome liberar `beforeinstallprompt`.
- O botão **Instalar app** permanece visível e muda para **Instalar agora** quando o prompt nativo estiver disponível.
- Alternativa: Chrome ⋮ → Instalar app / Adicionar à tela inicial.


## Medição diária 1.7.7
- A medição considera somente o serviço executado na data do registro.
- Não busca medição anterior e não calcula acumulado.
- App, PDF e Excel exibem apenas executado hoje, aprovado pela FVS e medido hoje.
- Campos legados de anterior/acumulado são gravados como zero apenas para compatibilidade com a estrutura atual do banco.

## Fluxo único 1.7.7

- Não existe mais escolha entre “Somente FVS” e “FVS + Medição”.
- Todo registro é obrigatoriamente **Medição + FVS**.
- A medição continua exclusivamente diária, sem anterior ou acumulado.
- É obrigatório adicionar pelo menos **1 foto** antes de registrar na base.
- O botão de registro permanece bloqueado enquanto não houver evidência fotográfica.
- Rascunhos antigos são normalizados automaticamente para o modo Medição + FVS.


## Persistência ao recarregar (1.7.7)
- F5/recarregar preserva aba atual, etapa 1–5 e posição de rolagem.
- O rascunho é salvo antes de a página ser descarregada/ocultada.
- Iniciar uma nova medição continua levando para a etapa 1.


## Novidade 1.7.7 — rastreabilidade da execução

A identificação da Medição + FVS agora registra **Quem executou o serviço** e **Tipo de mão de obra (Própria/Terceirizada)**. Os dados aparecem no resumo, histórico, PDF e Excel exportado. Para manter compatibilidade com bases antigas, a informação também é preservada em uma linha de rastreabilidade dentro do campo de observação do banco legado, sem exigir novas colunas.
