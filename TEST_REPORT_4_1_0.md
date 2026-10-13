# Validação 4.1.0

Executada em 13/10/2026, Chrome automatizado em ambiente isolado, sem dados de produção.

- Validador do pacote: 7 obras, 158 serviços Lótus, 75 serviços e 7 etapas do contrato 23 Solaris; estrutura, JavaScript, ícones e recursos offline íntegros.
- Câmera simulada: duas capturas contínuas, identificação imutável do ambiente e ponto.
- Editor: círculo criado, salvo, reaberto e movido; persistência comprovada.
- Separação das obras: fotos do Solaris 1 não aparecem no Solaris 2 ou Lótus. Plantas aparecem somente no Solaris 1.
- Lótus: identificação livre de bloco / apartamento, pavimento e ambiente.
- QR manual: etiqueta ObraMap seleciona obra, apartamento, pavimento e cômodo corretos. Câmera QR depende de BarcodeDetector e permissão do aparelho; não foi validada com câmera física.
- Backup: exportação, restauração em contexto limpo com marcações e importação repetida sem duplicação. Importação do formato ObraMap v2 validada.
- FVS: seleção de serviço do apartamento, cópia independente das fotos, percentuais iniciados sem aprovação automática e preservação dos rascunhos anteriores.
- PDFs de campo e FVS gerados e inspecionados visualmente: logo, responsáveis, planta, pontos e evidências. Nome do PDF com DIFELIX.
- Regressão de exportações: PDF padrão, 2/4/6 fotos e Excel; registro histórico com nome Eduardo preservado integralmente.
- Layouts 360, 390, 768 e 1366 px sem rolagem horizontal.
- Offline: 16 recursos no cache; recarga sem rede, plantas dos dois pavimentos, importação e PDF funcionando sem internet.
- Nenhuma exceção JavaScript nos fluxos testados.

Limite: emulação de tamanhos de tela e câmera simulada não substituem uma vistoria com o celular físico e suas permissões de câmera.
