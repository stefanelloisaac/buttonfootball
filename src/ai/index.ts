/**
 * ai — API pública: dificuldade e decisão da CPU.
 */
export type { Difficulty, AiDecision } from './ai.types';
export type { DifficultyProfile } from './ai.config';
export { DIFFICULTY_PROFILES } from './ai.config';
export { decideMove } from './ai.decision.system';
