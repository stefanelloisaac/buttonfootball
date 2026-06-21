/**
 * rules.victory.system — condição de vitória (primeiro a X gols).
 */
import type { Team, GameState } from '../game';

/** Retorna o time vencedor se a condição foi atingida, ou null. */
export function checkVictory(state: GameState): Team | null {
  // TODO: comparar placar com GOALS_TO_WIN
  void state;
  throw new Error('NOT_IMPLEMENTED: checkVictory');
}

/** Aplica o fim de jogo ao estado (fase GAME_OVER + winner). */
export function applyVictory(state: GameState, winner: Team): GameState {
  // TODO: retornar estado com winner e fase GAME_OVER
  void state;
  void winner;
  throw new Error('NOT_IMPLEMENTED: applyVictory');
}
