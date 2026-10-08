# Validação 4.0.4

Testes em perfis isolados do Chrome, sem criar medições reais.

- Desktop e Chrome Android emulado: aprovação total com um toque, aprovação parcial confirmada e pendência.
- Digitar ou arrastar o executado não aprova nem mede automaticamente.
- A proposta parcial só altera aprovado/medido depois de confirmar.
- Percentuais decimais persistem após recarregar.
- Registros anteriores mantêm executado, aprovado e medido distintos.
- Ajuste manual do medido e retorno ao aprovado; validações de percentual, aprovado ≤ executado, medido ≤ aprovado e anterior + medido ≤ 100%.
- Saldo de 5%: impede aprovação total de 10%, permitindo aprovação parcial de até 5%.
- Mudança de serviço reinicia a medição e preserva a ficha anterior.
- Excel validado por leitura: anterior 45%, executado 25%, aprovado/medido 12,5%, acumulado 57,5%.
- Layout em 320, 390 e 844 pixels, incluindo orientação horizontal.
- Modo somente FVS continua disponível.
- Zero erros JavaScript.

2 perfis aprovados.
