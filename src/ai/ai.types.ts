/**
 * ai.types — dificuldade e decisão da IA.
 */
import type { ShotVector } from '../input';

/** Nível de dificuldade da IA. */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** Decisão da IA: o disparo escolhido. */
export interface AiDecision {
  shot: ShotVector;
}
