# Validação 4.0.2

Testes automatizados em perfis isolados do Chrome, com câmera simulada (sem fotografar pessoas ou usar dados reais).

- Desktop e Chrome Android emulado: quatro fotos em sequência, mantendo a câmera aberta.
- Troca entre câmera traseira/frontal e encerramento do fluxo ao concluir.
- Captura sem áudio; contador e miniaturas.
- Editor: círculo, seta, desfazer, salvar e reabrir.
- O original permanece idêntico; imagens renderizadas e exportações recebem as marcações.
- Recarregamento preserva quatro fotos e marcações no rascunho.
- PDF com fotos gerado nos dois perfis.
- Layout do editor em 320, 390 e 844 pixels, incluindo orientação horizontal.
- Permissão negada mostra orientação; fechamento durante o pedido interrompe qualquer câmera que abrir depois.
- Zero erros JavaScript.
- Câmeras físicas e permissões reais dependem do aparelho; os testes usam a API de câmera com fonte simulada.

Resultado: 4 cenários aprovados.
