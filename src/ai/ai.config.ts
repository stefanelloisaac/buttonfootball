/**
 * ai.config — parâmetros de erro por dificuldade.
 */
import type { Difficulty } from './ai.types';

/** Erro de mira (radianos) e variação de força por dificuldade. */
export interface DifficultyProfile {
  /** Desvio angular máximo aplicado à mira (rad). */
  aimErrorRad: number;
  /** Variação relativa de força (0..1). */
  powerJitter: number;
}

/** Perfis de dificuldade. Maior dificuldade => menos erro. */
export const DIFFICULTY_PROFILES: Record<Difficulty, DifficultyProfile> = {
  easy: { aimErrorRad: 0.35, powerJitter: 0.4 },
  medium: { aimErrorRad: 0.18, powerJitter: 0.2 },
  hard: { aimErrorRad: 0.05, powerJitter: 0.08 },
};
