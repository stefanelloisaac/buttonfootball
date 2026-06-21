# AGENTS

Guia rápido para agentes e devs. Leia os documentos referenciados antes de
trabalhar; eles são a fonte de verdade.

## Documentos do projeto

- [`PRODUCT.md`](./PRODUCT.md) — estratégia: register, usuários, propósito,
  personalidade, anti-referências, princípios de design, acessibilidade.
- [`GAMEPLAY.md`](./GAMEPLAY.md) — regras do jogo: modos, controle, turnos, vitória.
- [`DESIGN.md`](./DESIGN.md) — sistema visual: paleta, tipografia, componentes, layout.
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — convenção de nomes, camadas, estrutura
  de arquivos e lint de fronteiras.
- [`README.md`](./README.md) — visão geral, stack e como rodar.

## Comandos

```bash
npm run dev       # servidor de desenvolvimento (Vite + HMR)
npm run build     # type-check + build de produção
npm run lint      # ESLint (inclui fronteiras de camadas)
npm run fix:all   # corrige lint + formata tudo (Prettier)
```

## Design Context

- **Register**: product (UI de jogo — o design serve à jogabilidade).
- **Público**: fãs do futebol de botão de mesa; partidas curtas no navegador
  (2 jogadores local ou vs CPU).
- **Personalidade**: nostálgico, artístico, acolhedor — nostalgia de mesa
  (feltro, madeira) com lustro digital moderno.
- **Evitar**: estética de cassino/apostas, dashboard SaaS genérico,
  infantil/cartoon, realismo 3D de estádio.
- **Acessibilidade**: WCAG 2.1 AA, `prefers-reduced-motion`, e distinção de times
  por forma/rótulo além da cor (daltonismo).

Detalhes completos em [`PRODUCT.md`](./PRODUCT.md).

## Regras de trabalho

- Siga a convenção `<dominio>.<nome>.<tipo>.ts` e a matriz de camadas do
  `ARCHITECTURE.md`. `npm run lint` valida as fronteiras.
- Rode `npm run fix:all` antes de finalizar mudanças.
- Não sobrescreva os documentos de contexto sem confirmar.
