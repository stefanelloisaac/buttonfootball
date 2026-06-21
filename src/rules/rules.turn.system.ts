/**
 * rules.turn.system — troca de vez e regra "tocou a bola = joga de novo".
 */
import type { GameState } from '../game'
import type { TurnOutcome } from './rules.types'

/**
 * Avalia o resultado da jogada que acabou de repousar.
 * Se a peça jogada tocou a bola, o mesmo time mantém a vez.
 */
export function evaluateTurn(state: GameState, touchedBall: boolean): TurnOutcome {
  // TODO: decidir nextTurn com base em touchedBall e turno atual
  void state
  void touchedBall
  throw new Error('NOT_IMPLEMENTED: evaluateTurn')
}

/** Aplica o resultado do turno ao estado (atualiza `turn`). */
export function applyTurn(state: GameState, outcome: TurnOutcome): GameState {
  // TODO: retornar novo estado com turno atualizado
  void state
  void outcome
  throw new Error('NOT_IMPLEMENTED: applyTurn')
}
