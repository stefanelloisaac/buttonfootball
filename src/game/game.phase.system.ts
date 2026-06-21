/**
 * game.phase.system — máquina de estados das fases do jogo (transições puras).
 */
import type { GameState, Phase } from './game.types'

/** Retorna true se a transição de fase é permitida. */
export function canTransition(from: Phase, to: Phase): boolean {
  // TODO: validar transições permitidas
  void from
  void to
  throw new Error('NOT_IMPLEMENTED: canTransition')
}

/** Aplica uma transição de fase, retornando novo estado. */
export function transition(state: GameState, to: Phase): GameState {
  // TODO: validar e aplicar transição
  void state
  void to
  throw new Error('NOT_IMPLEMENTED: transition')
}
