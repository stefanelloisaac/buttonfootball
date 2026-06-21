/**
 * game.config — constantes de regras e formação inicial.
 */
import type { Vec2 } from '../core';
import type { Team } from './game.types';

/** Número de peças por time (6 de linha + 1 goleiro). */
export const PIECES_PER_TEAM = 7;

/** Número de jogadores de linha por time. */
export const OUTFIELD_PER_TEAM = 6;

/** Gols necessários para vencer a partida. */
export const GOALS_TO_WIN = 5;

/** Raio padrão de um botão (mundo). */
export const BUTTON_RADIUS = 22;

/** Raio do goleiro. */
export const GOALKEEPER_RADIUS = 26;

/** Raio da bola. */
export const BALL_RADIUS = 12;

/**
 * Formação inicial: offsets relativos (0..1 do campo) de cada peça de linha,
 * espelhados por time. O goleiro é posicionado à parte.
 */
export const OUTFIELD_FORMATION: ReadonlyArray<Vec2> = [
  { x: 0.25, y: 0.5 },
  { x: 0.4, y: 0.25 },
  { x: 0.4, y: 0.75 },
  { x: 0.18, y: 0.3 },
  { x: 0.18, y: 0.7 },
  { x: 0.45, y: 0.5 },
];

/** Posição relativa do goleiro (do lado esquerdo; espelhado para o direito). */
export const GOALKEEPER_FORMATION: Vec2 = { x: 0.05, y: 0.5 };

/** Cor lógica de cada time (resolvida em render.config). */
export const TEAM_KICKOFF_SIDE: Record<Team, 'left' | 'right'> = {
  home: 'left',
  away: 'right',
};
