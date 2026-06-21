# Futebol de Botão — Arquitetura

Documento de arquitetura e estruturação de arquivos. Define a **convenção de
nomes**, as **fronteiras entre domínios**, a **estrutura de pastas** e o **lint de
fronteiras**. Companheiro do [`GAMEPLAY.md`](./GAMEPLAY.md), que cobre as regras do jogo.

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

| Prefixo   | Responsabilidade                                         |
| --------- | -------------------------------------------------------- |
| `core`    | Primitivos genéricos, sem regra de jogo (vetores, math). |
| `game`    | Orquestração: loop, estado, máquina de fases.            |
| `physics` | Movimento, colisão, atrito, integração.                  |
| `rules`   | Regras: turnos, gol, vitória, restrição de goleiro.      |
| `field`   | Geometria do campo (dimensões, traves, áreas).           |
| `input`   | Captura do estilingue (mouse/touch).                     |
| `render`  | Desenho no Canvas 2D.                                    |
| `ai`      | IA do oponente CPU.                                      |
| `ui`      | React: menu, HUD, telas.                                 |

### 1.2 Sufixos de tipo (o que o arquivo É)

| Sufixo      | Conteúdo permitido                                              |
| ----------- | --------------------------------------------------------------- |
| `types`     | Só tipos/interfaces. Sem lógica.                                |
| `config`    | Só constantes. Nenhuma função com efeito.                       |
| `system`    | Funções puras `(state, ...) => newState` ou que mutam um corpo. |
| `util`      | Funções auxiliares puras e reutilizáveis.                       |
| `state`     | Criação/clonagem do estado inicial.                             |
| `store`     | Estado observável (se necessário).                              |
| `component` | Componente React (`.tsx`).                                      |
| `hook`      | Hook React.                                                     |
| `index`     | Barrel: API pública do domínio.                                 |

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
field, physics, rules, input, render, ai   ← importam core + game (+ exceções abaixo)
ui     ← importa qualquer domínio (sempre via index.ts)
```

### 2.1 Matriz de dependências permitidas

Cada domínio pode importar **a si mesmo**, `core` e os listados. Tudo o que não
está na lista é **proibido** (a regra padrão do lint é `disallow`).

| De \\ Pode importar | core | game | field | physics | input | render | rules | ai  |
| ------------------- | :--: | :--: | :---: | :-----: | :---: | :----: | :---: | :-: |
| `core`              |  —   |      |       |         |       |        |       |     |
| `game`              |  ✅  |  —   |       |         |       |        |       |     |
| `field`             |  ✅  |  ✅  |   —   |         |       |        |       |     |
| `physics`           |  ✅  |  ✅  |       |    —    |       |        |       |     |
| `rules`             |  ✅  |  ✅  |  ✅   |         |       |        |   —   |     |
| `input`             |  ✅  |  ✅  |       |         |   —   |        |       |     |
| `render`            |  ✅  |  ✅  |       |         |  ✅   |   —    |       |     |
| `ai`                |  ✅  |  ✅  |       |         |  ✅   |        |       |  —  |
| `ui`                |  ✅  |  ✅  |  ✅   |   ✅    |  ✅   |   ✅   |  ✅   | ✅  |

**Exceções de mesmo nível (justificadas):**

- `rules` → `field`: regras de gol/goleiro consultam a geometria do campo.
- `render` → `input`: o estilingue precisa do `DragState` para desenhar a mira.
- `ai` → `input`: a decisão da IA produz um `ShotVector` (tipo do `input`).

### 2.2 Mapa de dependências

```
        ui  ───────────────► (importa tudo via index.ts)
        │
        ▼
  render → input    ai → input    rules → field    physics
        │
        ▼
      game
        │
        ▼
      core   ◄── base, não importa ninguém
```

### 2.3 Princípios

- Cada domínio expõe **apenas** seu `index.ts` (API pública).
- **Proibido** importar arquivo interno de outro domínio (só pelo `index.ts`).
- **Proibido** import cruzado não listado na matriz (seção 2.1).
- O `game.engine` **não** importa physics/rules/render: recebe esses passos por
  injeção (`EngineHooks`); o wiring concreto vive na camada `ui`. Isso mantém
  `game` dependente apenas de `core`.

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
Implementado com **`eslint-plugin-boundaries` v6** (já instalado como devDependency).

- **Regras ativadas:**
  - `boundaries/dependencies` — define a matriz de quem pode importar quem
    (na v6 substitui a antiga `boundaries/element-types`).
  - `boundaries/no-unknown` — proíbe imports de elementos fora dos domínios.

### 5.1 Config aplicada (ESLint flat — `eslint.config.js`)

Pontos de implementação:

- Elementos definidos por pasta (`mode: 'folder'`), o que faz qualquer arquivo
  dentro de `src/<dominio>/` pertencer ao domínio.
- `import/resolver` com extensões `.ts/.tsx` para resolver os barrels `index.ts`.
- Selectors no formato **object-based** da v6 (`from: { type }`,
  `allow: [{ to: { type } }]`), encapsulados pelo helper `toTypes`.
- `src/main.tsx` (entrypoint) fica isento das regras de fronteira.

```js
import boundaries from 'eslint-plugin-boundaries'

/** Converte tipos de domínio em selectors object-based de destino. */
const toTypes = (...types) => types.map((type) => ({ to: { type } }))

// adicionar ao array exportado por defineConfig([...])
{
  files: ['src/**/*.{ts,tsx}'],
  plugins: { boundaries },
  settings: {
    'import/resolver': { node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] } },
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      { type: 'core',    pattern: 'src/core',    mode: 'folder' },
      { type: 'game',    pattern: 'src/game',    mode: 'folder' },
      { type: 'field',   pattern: 'src/field',   mode: 'folder' },
      { type: 'physics', pattern: 'src/physics', mode: 'folder' },
      { type: 'rules',   pattern: 'src/rules',   mode: 'folder' },
      { type: 'input',   pattern: 'src/input',   mode: 'folder' },
      { type: 'render',  pattern: 'src/render',  mode: 'folder' },
      { type: 'ai',      pattern: 'src/ai',      mode: 'folder' },
      { type: 'ui',      pattern: 'src/ui',      mode: 'folder' },
    ],
  },
  rules: {
    'boundaries/no-unknown': 'error',
    'boundaries/dependencies': ['error', {
      default: 'disallow',
      rules: [
        { from: { type: 'core' },    allow: toTypes('core') },
        { from: { type: 'game' },    allow: toTypes('core', 'game') },
        { from: { type: 'field' },   allow: toTypes('core', 'game', 'field') },
        { from: { type: 'physics' }, allow: toTypes('core', 'game', 'physics') },
        { from: { type: 'rules' },   allow: toTypes('core', 'game', 'field', 'rules') },
        { from: { type: 'input' },   allow: toTypes('core', 'game', 'input') },
        { from: { type: 'render' },  allow: toTypes('core', 'game', 'input', 'render') },
        { from: { type: 'ai' },      allow: toTypes('core', 'game', 'input', 'ai') },
        { from: { type: 'ui' },      allow: toTypes('core', 'game', 'field',
            'physics', 'rules', 'input', 'render', 'ai', 'ui') },
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
- [ ] Os imports respeitam a matriz de camadas (seção 2.1) — verificado por `npm run lint`.
- [ ] Imports de outros domínios passam pelo `index.ts`, nunca por arquivo interno
      (convenção; entrada única por barrel).
- [ ] Arquivos `system`/`util`/`types`/`config` não importam React.
