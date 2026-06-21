/**
 * ai.decision.system — escolhe a peça, mira e força para a jogada da CPU.
 */
import type { GameState } from '../game';
import type { Difficulty, AiDecision } from './ai.types';

/**
 * Decide a jogada da CPU para o estado atual:
 * escolhe a peça mais próxima da bola, mira o gol adversário e aplica
 * o erro correspondente à dificuldade.
 */
export function decideMove(state: GameState, difficulty: Difficulty): AiDecision {
  // TODO: selecionar peça, calcular direção ao gol, aplicar erro/força
  void state;
  void difficulty;
  throw new Error('NOT_IMPLEMENTED: decideMove');
}
