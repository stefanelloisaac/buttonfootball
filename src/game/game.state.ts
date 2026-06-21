/**
 * game.state — criação e reset do estado do jogo.
 */
import type { GameMode, GameState, Team } from './game.types';

/** Cria o estado inicial de uma partida no modo informado. */
export function createInitialState(mode: GameMode): GameState {
  // TODO: montar peças (formação), bola, placar zerado, posições de kickoff
  void mode;
  throw new Error('NOT_IMPLEMENTED: createInitialState');
}

/** Reposiciona as peças para o pontapé inicial após um gol. */
export function resetToKickoff(state: GameState, kickingTeam: Team): GameState {
  // TODO: restaurar kickoffPositions, definir turno, fase AIMING
  void state;
  void kickingTeam;
  throw new Error('NOT_IMPLEMENTED: resetToKickoff');
}
