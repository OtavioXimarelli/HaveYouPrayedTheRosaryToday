# Checklist de lançamento do beta

O núcleo do frontend está pronto para um beta público: onboarding local, santuário, Rosário completo e retomável, liturgia diária, PWA/offline, privacidade e canal de feedback.

## Bloqueadores antes de abrir o acesso

- [ ] Definir `NEXT_PUBLIC_APP_URL` com a URL HTTPS final, sem barra no fim.
- [ ] Definir `NEXT_PUBLIC_API_BASE_URL` com a API Java/Spring de produção em HTTPS.
- [ ] Confirmar CORS da API para o domínio final do frontend.
- [ ] Confirmar que `GET /liturgy/today` retorna a data local correta para `America/Sao_Paulo` e nunca reapresenta conteúdo de outro dia como atual.
- [ ] Submeter orações, frutos dos mistérios e referências bíblicas a uma revisão pastoral e editorial humana.
- [ ] Documentar a tradução e a licença dos trechos bíblicos, além da origem e das condições de uso da liturgia.
- [ ] Validar `GET /api/health` no container publicado.
- [ ] Configurar `SENTRY_ENVIRONMENT=production`; definir os DSNs somente se o monitoramento privativo for desejado.
- [ ] Confirmar DNS, certificado TLS e redirecionamento do domínio canônico.
- [ ] Confirmar que o formulário **Feedback do beta** do GitHub abre e que o rótulo `feedback` existe no repositório.

## Smoke test no ambiente publicado

- [ ] Abrir `/pt/inicio` em uma janela privada e concluir as três etapas de preparação.
- [ ] Iniciar um Rosário, avançar duas orações, fechar a aba e confirmar a retomada.
- [ ] Concluir um Rosário e confirmar o histórico no santuário.
- [ ] Abrir a liturgia e conferir título, data, fonte e horário de atualização.
- [ ] Instalar a PWA em Android/Chrome e abrir o Rosário sem conexão.
- [ ] Repetir instalação, retomada e navegação offline em um iPhone/Safari real, incluindo áreas seguras da tela.
- [ ] Verificar tema claro, escuro e preferência do sistema.
- [ ] Fazer uma passagem curta com VoiceOver ou TalkBack e navegação somente por teclado.
- [ ] Exportar os dados em Ajustes e conferir o JSON baixado.
- [ ] Apagar todos os dados locais e confirmar o retorno à experiência inicial.
- [ ] Abrir uma rota inexistente e confirmar a página de recuperação.
- [ ] Compartilhar `/pt/inicio` em WhatsApp/Slack e conferir título, descrição e imagem social.

## Critério de go/no-go

Abrir o beta somente quando o build de produção, os testes unitários e os testes E2E estiverem verdes, a liturgia do dia estiver correta no domínio final e os caminhos de feedback e exclusão de dados estiverem funcionando.

Contas, sincronização, intenções comunitárias, IA teológica, paróquias e planos espirituais continuam deliberadamente fora deste beta.
