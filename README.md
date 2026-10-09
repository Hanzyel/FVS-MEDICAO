# Elevatta FVS + Medição — Lótus e Solaris

Versão 4.0.8. Pacote completo para GitHub e Render, com arquivos na raiz.

## Atualizar o GitHub

1. Descompacte o ZIP.
2. Envie o conteúdo da pasta extraída para a raiz do repositório: todos os arquivos, `icons/` e `scripts/`.
3. Substitua os arquivos de mesmo nome e confirme o commit.
4. Após o deploy, no app instalado toque em **Atualizar agora** quando aparecer o aviso.

Não envie somente o ZIP nem coloque os arquivos dentro de uma pasta adicional no repositório.

## Conteúdo

- Escolha de Lótus 2 e Solaris 1 a 6 no mesmo app.
- Lótus: 158 serviços do orçamento; Solaris: 75 serviços em 7 etapas do contrato 23 DIFELIX para cada obra.
- Campos dependentes em sequência lógica e FVS do serviço escolhido.
- PDF com logo e fundo branco, resumo, checklist e fotos; exportação Excel.
- Layout móvel, fotos comprimidas, rascunhos locais e instalação como aplicativo.
- Manifesto, ícones, atualização controlada, cache offline e validação do pacote.

## Serviços dos Solaris

Solaris 1 a 6 usam os 75 itens do arquivo `Contrato Analítico - 23 - DIFELIX EMPREITEIRA LTDA.xlsx`, aba `Contrato Analítico`, gerado em 08/10/2026. A planilha identifica Solaris Village IV; por solicitação do usuário, o mesmo escopo é aplicado aos seis Solaris. O catálogo mantém as descrições, índices, códigos e ordem originais, sem juntar serviços de apartamentos diferentes.

As etapas são: FUNDAÇÃO, MURO, PAVIMENTO TÉRREO, PAVIMENTO SUPERIOR, COBERTA, ÁREA DE LAZER e ACABAMENTOS. Escolha a obra, a etapa e o serviço. Os itens de AP 101, AP 102, AP 201 e AP 202 preenchem a unidade e o pavimento; detalhe o ambiente no campo Frente / unidade / local, se necessário. A busca também aceita o índice do item.

Os registros do contrato 24 permanecem em Registros, identificados como histórico, com consulta pelos botões PDF. Seus percentuais, fotos e marcações ficam preservados. Uma nova inspeção usa o contrato 23 e não acumula medições do contrato anterior. O arquivo `solaris-contract-23.json` contém a referência das linhas da planilha para validação do catálogo; os critérios da FVS são propostas de campo, sujeitos aos projetos e procedimentos da obra.

## Render

Use Static Site. Root Directory: vazio. Build Command: `node scripts/check.mjs`. Publish Directory: `.`. Auto Deploy: On Commit. `render.yaml` mantém a configuração do pacote anterior.

## GitHub Pages

O manifesto e o instalador aceitam publicação em subpasta, por exemplo `/FVS-MEDICAO/`. Instalação e câmera exigem o endereço HTTPS publicado.

## Conexão com o banco

O pacote contém o frontend. Não cria um backend novo. Se utiliza uma API separada do Elevatta LAB, preserve a URL atual em `config.js`, campo `API_BASE`. Se a API está no mesmo domínio, mantenha vazio. A API deve aceitar a origem do site. As rotas continuam `/healthz`, `/api/erp/*` e `/api/lab/*`.

Sem API disponível, o formulário, rascunhos, fotos e exportações funcionam no navegador; os registros aguardam sincronização. Os dados locais pertencem ao navegador e dispositivo onde foram preenchidos.

## Validação

Execute `node scripts/check.mjs` na raiz. Veja `TEST_REPORT_4_0_8.md`. Arquivos com versão 1.7.x documentam apenas o histórico do pacote de origem.

## Fotos e marcações

Na etapa Fotos, toque em **Câmera**, permita o acesso no Chrome e use **Tirar foto** quantas vezes precisar. **Concluir** fecha a câmera e mantém as fotos no registro. **Trocar câmera** alterna traseira/frontal. A **Galeria** aceita várias fotos de uma vez. **Câmera do aparelho** é uma alternativa para navegadores sem câmera ao vivo.

Em cada imagem, toque em **Editar foto**. Escolha **Seta** ou **Círculo**, arraste sobre a foto e toque em **Salvar**. As marcações aparecem na galeria, no PDF e no Excel. O original é preservado e as marcações podem ser desfeitas.

**Mover marcações:** depois de desenhar ou reabrir uma foto, escolha **Mover**, toque no círculo (borda ou centro) ou na seta e arraste. A seleção aparece com contorno azul. **Desfazer** reverte movimentos, desenhos, exclusões e limpeza. **Excluir marcação** remove apenas o elemento selecionado. No PC, as teclas de direção também permitem ajustar a posição. **Salvar** mantém as novas posições para a próxima abertura e para os relatórios.

## Aprovar a medição

Informe o **Executado neste período** digitando ou arrastando a barra. **Aprovar e medir** confirma o executado como aprovado e medido em um único toque. **Aprovar parcialmente** permite escolher um valor menor e confirmá-lo; **Deixar pendente** mantém o executado sem aprovação. O resumo mostra anterior, esta medição e acumulado. Se precisar registrar menos que o aprovado, abra **Medir um valor diferente do aprovado**. Aprovações nunca são preenchidas automaticamente ao apenas editar o executado. As validações e o histórico separado por serviço/frente continuam preservados.

## Nome dos arquivos exportados

PDF usa `OBRA_EMPREITEIRO_SERVICO_DATA`, por exemplo `S2_DIFELIX_PINTURA_AP_101_VB_09102026.pdf`. O empreiteiro é DIFELIX, conforme solicitado, independentemente do responsável/inspetor. Excel mantém o nome com responsável/inspetor. OBRA corresponde a S1 a S6 ou L2; SERVICO vem do serviço selecionado; DATA é a data da inspeção em DDMMAAAA. Letras ficam maiúsculas, sem acentos, e espaços/símbolos são convertidos em sublinhados. A exportação pelo histórico usa obra, serviço e data do registro original.

## Responsáveis no PDF

O resumo e as assinaturas distinguem **Executado pela empreiteira: DIFELIX** de **Conferido por: Ricardo Cavalcante**. Ricardo Cavalcante é o responsável/inspetor inicial de novas fichas e de rascunhos sem nome; o campo continua editável. Registros com outro inspetor informado mantêm esse nome. O coordenador, se preenchido, aparece nas informações complementares. Os nomes nas assinaturas ficam maiores e em negrito.
