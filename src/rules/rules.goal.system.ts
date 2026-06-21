/**
 * rules.goal.system — detecção de gol e atualização do placar.
 */
import type { Vec2 } from '../core';
import type { GameState } from '../game';
import type { GoalEvent } from './rules.types';

/** Detecta se a bola (posição/raio) resultou em gol. Retorna o evento ou null. */
export function detectGoal(
  state: GameState,
  ballPosition: Vec2,
  ballRadius: number,
): GoalEvent | null {
  // TODO: usar field.detectGoalSide e mapear lado -> time que marcou
  void state;
  void ballPosition;
  void ballRadius;
  throw new Error('NOT_IMPLEMENTED: detectGoal');
}

/** Aplica um gol ao placar, retornando novo estado. */
export function applyGoal(state: GameState, goal: GoalEvent): GameState {
  // TODO: incrementar placar do time que marcou
  void state;
  void goal;
  throw new Error('NOT_IMPLEMENTED: applyGoal');
}
