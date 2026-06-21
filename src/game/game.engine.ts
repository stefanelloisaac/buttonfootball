/**
 * game.engine — game loop (requestAnimationFrame) e orquestração por injeção.
 *
 * Fronteira: `game` só pode importar `core`. Por isso o engine NÃO importa
 * physics/rules/render diretamente; recebe esses passos via `EngineHooks`,
 * cujo wiring concreto é feito na camada `ui`.
 */
import type { GameState } from './game.types';

/** Passos injetados que o loop executa a cada frame, na ordem definida. */
export interface EngineHooks {
  /** Avança a física (integração + colisões) por um delta em segundos. */
  step: (state: GameState, dt: number) => GameState;
  /** Aplica regras quando a simulação repousa (gol, turno, vitória). */
  resolve: (state: GameState) => GameState;
  /** Desenha o estado atual. */
  render: (state: GameState) => void;
}

/** Assinante de mudanças de estado (ex.: hook do React para HUD). */
export type StateListener = (state: GameState) => void;

/** Controla o ciclo de vida do loop de jogo. */
export interface Engine {
  start: () => void;
  stop: () => void;
  getState: () => GameState;
  setState: (state: GameState) => void;
  subscribe: (listener: StateListener) => () => void;
}

/** Cria um engine a partir de um estado inicial e dos passos injetados. */
export function createEngine(initial: GameState, hooks: EngineHooks): Engine {
  // TODO: implementar loop rAF com acumulador de tempo fixo,
  // notificar assinantes em mudanças de estado.
  void initial;
  void hooks;
  throw new Error('NOT_IMPLEMENTED: createEngine');
}
