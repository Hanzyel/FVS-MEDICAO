# Elevatta FVS + Medição — Lótus e Solaris

Versão 4.0.2. Pacote completo para GitHub e Render, com arquivos na raiz.

## Atualizar o GitHub

1. Descompacte o ZIP.
2. Envie o conteúdo da pasta extraída para a raiz do repositório: todos os arquivos, `icons/` e `scripts/`.
3. Substitua os arquivos de mesmo nome e confirme o commit.
4. Após o deploy, no app instalado toque em **Atualizar agora** quando aparecer o aviso.

Não envie somente o ZIP nem coloque os arquivos dentro de uma pasta adicional no repositório.

## Conteúdo

- Escolha de Lótus 2 e Solaris 1 a 6 no mesmo app.
- Lótus: 158 serviços do orçamento; Solaris: 28 serviços do contrato DIFELIX para cada obra.
- Campos dependentes em sequência lógica e FVS do serviço escolhido.
- PDF com logo e fundo branco, resumo, checklist e fotos; exportação Excel.
- Layout móvel, fotos comprimidas, rascunhos locais e instalação como aplicativo.
- Manifesto, ícones, atualização controlada, cache offline e validação do pacote.

## Render

Use Static Site. Root Directory: vazio. Build Command: `node scripts/check.mjs`. Publish Directory: `.`. Auto Deploy: On Commit. `render.yaml` mantém a configuração do pacote anterior.

## GitHub Pages

O manifesto e o instalador aceitam publicação em subpasta, por exemplo `/FVS-MEDICAO/`. Instalação e câmera exigem o endereço HTTPS publicado.

## Conexão com o banco

O pacote contém o frontend. Não cria um backend novo. Se utiliza uma API separada do Elevatta LAB, preserve a URL atual em `config.js`, campo `API_BASE`. Se a API está no mesmo domínio, mantenha vazio. A API deve aceitar a origem do site. As rotas continuam `/healthz`, `/api/erp/*` e `/api/lab/*`.

Sem API disponível, o formulário, rascunhos, fotos e exportações funcionam no navegador; os registros aguardam sincronização. Os dados locais pertencem ao navegador e dispositivo onde foram preenchidos.

## Validação

Execute `node scripts/check.mjs` na raiz. Veja `TEST_REPORT_4_0_2.md`. Arquivos com versão 1.7.x documentam apenas o histórico do pacote de origem.

## Fotos e marcações

Na etapa Fotos, toque em **Câmera**, permita o acesso no Chrome e use **Tirar foto** quantas vezes precisar. **Concluir** fecha a câmera e mantém as fotos no registro. **Trocar câmera** alterna traseira/frontal. A **Galeria** aceita várias fotos de uma vez. **Câmera do aparelho** é uma alternativa para navegadores sem câmera ao vivo.

Em cada imagem, toque em **Editar foto**. Escolha **Seta** ou **Círculo**, arraste sobre a foto e toque em **Salvar**. As marcações aparecem na galeria, no PDF e no Excel. O original é preservado e as marcações podem ser desfeitas.
