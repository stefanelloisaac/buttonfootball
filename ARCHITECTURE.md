# Futebol de Botão — Arquitetura

Documento de arquitetura e estruturação de arquivos. Define a **convenção de
nomes**, as **fronteiras entre domínios**, a **estrutura de pastas** e o **lint de
fronteiras**. Companheiro do [`DESIGN.md`](./DESIGN.md), que cobre as regras do jogo.

Regra de ouro: **olhou o nome do arquivo, sabe a que domínio pertence e qual é a
responsabilidade dele.**

---

## 1. Convenção de nomeação

Formato obrigatório para todo arquivo de código:

```
<dominio>.<nome>.<tipo>.ts
```

- `<dominio>` — a que parte do sistema o arquivo pertence (prefixo).
- `<nome>` — o que ele representa (camelCase quando composto).
- `<tipo>` — o que o arquivo **é** (sufixo de responsabilidade).

Exemplos: `physics.collision.system.ts`, `game.state.ts`, `ui.hud.component.tsx`.

### 1.1 Domínios (prefixos permitidos)

| Prefixo   | Responsabilidade                                              |
| --------- | ------------------------------------------------------------ |
| `core`    | Primitivos genéricos, sem regra de jogo (vetores, math).     |
| `game`    | Orquestração: loop, estado, máquina de fases.                |
| `physics` | Movimento, colisão, atrito, integração.                      |
| `rules`   | Regras: turnos, gol, vitória, restrição de goleiro.          |
| `field`   | Geometria do campo (dimensões, traves, áreas).               |
| `input`   | Captura do estilingue (mouse/touch).                         |
| `render`  | Desenho no Canvas 2D.                                        |
| `ai`      | IA do oponente CPU.                                          |
| `ui`      | React: menu, HUD, telas.                                     |

### 1.2 Sufixos de tipo (o que o arquivo É)

| Sufixo      | Conteúdo permitido                                              |
| ----------- | ------------------------------------------------------------- |
| `types`     | Só tipos/interfaces. Sem lógica.                              |
| `config`    | Só constantes. Nenhuma função com efeito.                    |
| `system`    | Funções puras `(state, ...) => newState` ou que mutam um corpo. |
| `util`      | Funções auxiliares puras e reutilizáveis.                     |
| `state`     | Criação/clonagem do estado inicial.                          |
| `store`     | Estado observável (se necessário).                           |
| `component` | Componente React (`.tsx`).                                   |
| `hook`      | Hook React.                                                  |
| `index`     | Barrel: API pública do domínio.                             |

Regras por sufixo:

- `*.types.ts` — **proibido** conter lógica/valores executáveis.
- `*.config.ts` — **proibido** conter funções com efeito colateral; só constantes.
- `*.system.ts` / `*.util.ts` — **proibido** importar React.
- `*.component.tsx` / `*.hook.ts` — únicos autorizados a importar React.

---

## 2. Regra de camadas (fronteiras rígidas)

```
core   ← pode ser importado por todos
game   ← importa core
physics, rules, field, render, input, ai   ← importam core + game
ui     ← importa qualquer domínio (sempre via index.ts)
```

### 2.1 Mapa de dependências

```
        ui  ───────────────► (importa tudo via index.ts)
        │
        ▼
  render  input  ai  rules  physics  field
        │
        ▼
      game
        │
        ▼
      core   ◄── base, não importa ninguém
```

### 2.2 Princípios

- Cada domínio expõe **apenas** seu `index.ts` (API pública).
- **Proibido** importar arquivo interno de outro domínio (só pelo `index.ts`).
- **Proibido** import cruzado entre domínios de mesmo nível
  (ex.: `physics` não importa `render`).
- A comunicação entre domínios de mesmo nível é orquestrada pelo `game`.

---

## 3. Estado

- O estado do jogo é **puro** (objetos planos) e vive no domínio `game`.
- O game loop roda em `requestAnimationFrame`, **fora** do ciclo de render do React.
- O React consome o estado por meio de **um hook fino** (`ui.useGame.hook.ts`),
  usado apenas por HUD e menus.
- A física **nunca** passa pelo ciclo de render do React.

---

## 4. Estrutura de arquivos

```
src/
├── core/
│   ├── core.types.ts                  # Vec2, Circle, Id — primitivos
│   ├── core.math.util.ts              # clamp, lerp, distância, normalização
│   ├── core.vector.util.ts            # operações de vetor (add, scale, dot...)
│   └── index.ts                       # API pública do core
│
├── game/
│   ├── game.types.ts                  # GameState, Phase, Team, Player, Match
│   ├── game.config.ts                 # nº de botões, gols p/ vencer, atrito
│   ├── game.state.ts                  # criação/clonagem do estado inicial
│   ├── game.phase.system.ts           # máquina de estados (AIMING→SIMULATING→…)
│   ├── game.engine.ts                 # game loop; orquestra physics+rules+render
│   └── index.ts
│
├── field/
│   ├── field.config.ts                # dimensões, posição de traves e áreas
│   ├── field.geometry.util.ts         # está dentro da área? dentro do gol?
│   └── index.ts
│
├── physics/
│   ├── physics.types.ts               # Body (corpo físico), estado de movimento
│   ├── physics.config.ts              # atrito, restituição, limiar de "parado"
│   ├── physics.integration.system.ts  # integra posição/velocidade por frame
│   ├── physics.collision.system.ts    # colisão círculo-círculo + parede
│   ├── physics.rest.util.ts           # detecta "tudo parado"
│   └── index.ts
│
├── rules/
│   ├── rules.types.ts                 # TurnOutcome, GoalEvent
│   ├── rules.turn.system.ts           # troca de vez, "tocou bola = joga de novo"
│   ├── rules.goal.system.ts           # detecção de gol, placar
│   ├── rules.goalkeeper.system.ts     # restrição de movimento do goleiro
│   ├── rules.victory.system.ts        # condição de vitória (primeiro a X gols)
│   └── index.ts
│
├── input/
│   ├── input.types.ts                 # DragState, ShotVector
│   ├── input.slingshot.system.ts      # converte arraste em vetor de disparo
│   ├── input.pointer.util.ts          # normaliza mouse/touch → coords do campo
│   └── index.ts
│
├── render/
│   ├── render.config.ts               # cores, escala, estilos visuais
│   ├── render.field.system.ts         # desenha campo, traves, áreas, círculo
│   ├── render.bodies.system.ts        # desenha botões + bola
│   ├── render.slingshot.system.ts     # desenha a mira/linha do estilingue
│   ├── render.scene.system.ts         # orquestra a ordem de desenho da cena
│   └── index.ts
│
├── ai/
│   ├── ai.types.ts                    # Difficulty, AiDecision
│   ├── ai.config.ts                   # parâmetros de erro por dificuldade
│   ├── ai.decision.system.ts          # escolhe botão + mira + força
│   └── index.ts
│
├── ui/
│   ├── ui.app.component.tsx           # navegação Menu <-> Jogo
│   ├── ui.menu.component.tsx          # escolher modo, dificuldade, iniciar
│   ├── ui.hud.component.tsx           # placar, de quem é a vez
│   ├── ui.gameCanvas.component.tsx    # monta canvas + conecta engine/input/render
│   ├── ui.useGame.hook.ts             # hook fino: expõe estado do engine pra UI
│   └── index.ts
│
└── main.tsx                           # entrypoint (importa ui.app.component)
```

### 4.1 Substituição do scaffold

- `src/App.tsx` e `src/App.css` são **removidos** e substituídos por `src/ui/`.
- `src/main.tsx` passa a importar `ui.app.component` no lugar de `App`.

---

## 5. Lint de fronteiras

A regra de camadas é reforçada por lint, não só por disciplina.

- **Plugin:** `eslint-plugin-boundaries` (dev dependency a adicionar).
- **Regras ativadas:**
  - `boundaries/element-types` — define a matriz de quem pode importar quem.
  - `boundaries/no-private` — força a entrada só pelo `index.ts` de cada domínio.
  - `boundaries/no-unknown` — proíbe arquivos fora da convenção.

### 5.1 Config planejada (ESLint flat — `eslint.config.js`)

> A instalação do pacote e a aplicação no `eslint.config.js` ocorrem na fase de
> implementação. O trecho abaixo é a referência a ser colada.

```js
import boundaries from 'eslint-plugin-boundaries'

// adicionar ao array exportado por defineConfig([...])
{
  files: ['src/**/*.{ts,tsx}'],
  plugins: { boundaries },
  settings: {
    'boundaries/elements': [
      { type: 'core',    pattern: 'src/core/*' },
      { type: 'game',    pattern: 'src/game/*' },
      { type: 'field',   pattern: 'src/field/*' },
      { type: 'physics', pattern: 'src/physics/*' },
      { type: 'rules',   pattern: 'src/rules/*' },
      { type: 'input',   pattern: 'src/input/*' },
      { type: 'render',  pattern: 'src/render/*' },
      { type: 'ai',      pattern: 'src/ai/*' },
      { type: 'ui',      pattern: 'src/ui/*' },
    ],
  },
  rules: {
    'boundaries/no-unknown': 'error',
    'boundaries/no-private': 'error',
    'boundaries/element-types': ['error', {
      default: 'disallow',
      rules: [
        { from: 'core',    allow: ['core'] },
        { from: 'game',    allow: ['core', 'game'] },
        { from: 'field',   allow: ['core', 'game'] },
        { from: 'physics', allow: ['core', 'game'] },
        { from: 'rules',   allow: ['core', 'game'] },
        { from: 'input',   allow: ['core', 'game'] },
        { from: 'render',  allow: ['core', 'game'] },
        { from: 'ai',      allow: ['core', 'game'] },
        { from: 'ui',      allow: ['core', 'game', 'field', 'physics',
                                    'rules', 'input', 'render', 'ai', 'ui'] },
      ],
    }],
  },
}
```

---

## 6. Checklist de conformidade

Antes de aceitar um novo arquivo, verificar:

- [ ] O nome segue `<dominio>.<nome>.<tipo>.ts`.
- [ ] O prefixo é um domínio válido (seção 1.1).
- [ ] O sufixo é um tipo válido (seção 1.2) e respeita as restrições de conteúdo.
- [ ] Os imports respeitam a regra de camadas (seção 2).
- [ ] Imports de outros domínios passam pelo `index.ts`, nunca por arquivo interno.
- [ ] Arquivos `system`/`util`/`types`/`config` não importam React.
```
