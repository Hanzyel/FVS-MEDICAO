# Validação da versão 4.0.6

Conferência em 09/10/2026 no Google Chrome, com downloads reais em contexto local isolado.

- PDF padrão e PDFs de 2, 4 e 6 fotos geram o nome `S2_BRUNO_OLIVEIRA_REBOCO_INTERNO_AP_101_VB_09102026.pdf` para a ficha testada.
- Excel gera `S2_BRUNO_OLIVEIRA_REBOCO_INTERNO_AP_101_VB_09102026.xlsx`.
- O responsável digitado como Brúno Oliveira é convertido para BRUNO_OLIVEIRA, sem acentos nem espaços no nome do arquivo.
- Exportação de um registro histórico Solaris 1 usa `S1_EDUARDO_PINTURA_AP_101_VB_24092026.pdf`, mesmo quando a ficha atual está no Solaris 2 com outra data e outro responsável.
- O registro histórico armazenado continua idêntico após exportar.
- Sem erros JavaScript nos cenários acima.
- Validação do pacote confirma versões, sintaxe, PWA, ícones, sete obras e os catálogos existentes: 158 serviços Lótus e 75 serviços Solaris em 7 etapas.

Os IDs internos dos registros e os caminhos de sincronização das fotos não foram modificados. A alteração se aplica ao nome de download dos relatórios.
