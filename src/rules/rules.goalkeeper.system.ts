/**
 * rules.goalkeeper.system — restrição de movimento do goleiro à sua área.
 */
import type { Vec2 } from '../core'
import type { GameState } from '../game'

/** Retorna true se a peça informada é um goleiro. */
export function isGoalkeeperPiece(state: GameState, pieceId: string): boolean {
  // TODO: localizar peça e checar isGoalkeeper
  void state
  void pieceId
  throw new Error('NOT_IMPLEMENTED: isGoalkeeperPiece')
}

/**
 * Restringe a posição do goleiro à sua grande área.
 * Retorna a posição corrigida (clamp na área).
 */
export function constrainGoalkeeper(
  state: GameState,
  pieceId: string,
  desired: Vec2,
): Vec2 {
  // TODO: usar field.isInsidePenaltyArea e clamp à área do lado do time
  void state
  void pieceId
  void desired
  throw new Error('NOT_IMPLEMENTED: constrainGoalkeeper')
}
