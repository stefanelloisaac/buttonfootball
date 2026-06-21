/**
 * core.types — primitivos genéricos, sem regra de jogo.
 */

/** Identificador único de uma entidade. */
export type Id = string;

/** Vetor 2D / ponto no plano. */
export interface Vec2 {
  x: number;
  y: number;
}

/** Círculo: centro + raio. Base de todo corpo do jogo. */
export interface Circle {
  center: Vec2;
  radius: number;
}
