/**
 * game.types — estado do jogo, fases, equipes e partida.
 */
import type { Id, Vec2 } from '../core'

/** Equipe controladora. */
export type Team = 'home' | 'away'

/** Modo de jogo. */
export type GameMode = 'local' | 'cpu'

/**
 * Fase da máquina de estados do jogo.
 * AIMING     — jogador da vez mira (estilingue).
 * SIMULATING — corpos em movimento.
 * RESOLVING  — checa toque na bola, gol, troca de vez.
 * GOAL       — gol marcado, aguardando reset.
 * GAME_OVER  — partida encerrada.
 */
export type Phase = 'AIMING' | 'SIMULATING' | 'RESOLVING' | 'GOAL' | 'GAME_OVER'

/** Uma peça do jogo (botão de linha, goleiro), referenciando seu corpo físico. */
export interface Piece {
  id: Id
  team: Team
  isGoalkeeper: boolean
}

/** Placar da partida. */
export interface Score {
  home: number
  away: number
}

/** Estado completo e puro do jogo. */
export interface GameState {
  mode: GameMode
  phase: Phase
  turn: Team
  score: Score
  pieces: Piece[]
  /** Posições iniciais por id de peça (para reset pós-gol). */
  kickoffPositions: Record<Id, Vec2>
  ballId: Id
  winner: Team | null
}
