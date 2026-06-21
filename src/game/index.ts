/**
 * game — API pública: estado, fases, engine e configuração de partida.
 */
export type { Team, GameMode, Phase, Piece, Score, GameState } from './game.types';
export {
  PIECES_PER_TEAM,
  OUTFIELD_PER_TEAM,
  GOALS_TO_WIN,
  BUTTON_RADIUS,
  GOALKEEPER_RADIUS,
  BALL_RADIUS,
  OUTFIELD_FORMATION,
  GOALKEEPER_FORMATION,
  TEAM_KICKOFF_SIDE,
} from './game.config';
export { createInitialState, resetToKickoff } from './game.state';
export { canTransition, transition } from './game.phase.system';
export type { EngineHooks, StateListener, Engine } from './game.engine';
export { createEngine } from './game.engine';
