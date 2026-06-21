/**
 * rules — API pública: turnos, gol, goleiro e vitória.
 */
export type { TurnOutcome, GoalEvent } from './rules.types';
export { evaluateTurn, applyTurn } from './rules.turn.system';
export { detectGoal, applyGoal } from './rules.goal.system';
export { isGoalkeeperPiece, constrainGoalkeeper } from './rules.goalkeeper.system';
export { checkVictory, applyVictory } from './rules.victory.system';
