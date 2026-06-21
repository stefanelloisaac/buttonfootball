# Futebol de Botão

Jogo de futebol de botão para a web. Visão de cima (top-down), controle por
estilingue (arrasta-e-solta), com modos **2 jogadores local** e **vs Computador**.
Roda 100% no navegador, sem servidor.

> Estado atual: **esqueleto estrutural**. A arquitetura, as fronteiras de domínio
> e o tooling estão completos e validados; a lógica de jogo (física, regras, IA,
> render) está com stubs marcados como `// TODO`.

## Documentação

- [`GAMEPLAY.md`](./GAMEPLAY.md) — definições do jogo: regras, modos, condição de vitória.
- [`DESIGN.md`](./DESIGN.md) — sistema visual: paleta, tipografia, componentes, layout.
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — convenção de nomes, regra de camadas,
  estrutura de arquivos e lint de fronteiras.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Canvas 2D** para renderização (sem dependências de jogo)
- Física caseira (círculos com colisão elástica e atrito)
- **ESLint** (com fronteiras de arquitetura via `eslint-plugin-boundaries`)
- **Prettier** para formatação

## Como rodar

```bash
npm install      # instala dependências
npm run dev      # servidor de desenvolvimento (Vite + HMR)
npm run build    # build de produção (tsc -b && vite build)
npm run preview  # serve o build de produção localmente
```

## Scripts

| Script                 | O que faz                                                |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento com HMR.                     |
| `npm run build`        | Type-check (`tsc -b`) + build de produção.               |
| `npm run preview`      | Serve o build de produção.                               |
| `npm run lint`         | Roda o ESLint (inclui as fronteiras de camadas).         |
| `npm run lint:fix`     | ESLint com correção automática.                          |
| `npm run format`       | Formata todo o projeto com Prettier.                     |
| `npm run format:check` | Verifica a formatação sem alterar arquivos.              |
| `npm run fix:all`      | **Corrige lint + formata tudo** (`lint:fix` + `format`). |

## Estrutura

Cada domínio em `src/` é isolado e exposto apenas pelo seu `index.ts`. A regra de
camadas é reforçada por lint (ver [`ARCHITECTURE.md`](./ARCHITECTURE.md)).

```
src/
├── core/      # primitivos: vetores, math (sem regra de jogo)
├── game/      # estado, fases, engine (loop), config da partida
├── field/     # geometria do campo: dimensões, áreas, gols
├── physics/   # corpos, integração, colisão, repouso
├── rules/     # turnos, gol, goleiro, vitória
├── input/     # estilingue (arraste -> disparo), ponteiro
├── render/    # desenho no Canvas: campo, corpos, mira, cena
├── ai/        # decisão da CPU por dificuldade
├── ui/        # React: menu, HUD, canvas, hook de estado
└── main.tsx   # entrypoint
```

### Convenção de nomes

Todo arquivo segue `<dominio>.<nome>.<tipo>.ts`, por exemplo:
`physics.collision.system.ts`, `game.state.ts`, `ui.hud.component.tsx`.
Detalhes em [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Próximos passos

Preencher a lógica dos stubs, de baixo para cima nas dependências:
`core → physics → field → game → rules → input → render → ai → ui`.
