/**
 * rules.types — resultados de regras (turno, gol).
 */
import type { Id } from '../core'
import type { Team } from '../game'

/** Resultado da avaliação de uma jogada (turno). */
export interface TurnOutcome {
  /** A peça jogada tocou na bola? (se sim, mantém a vez). */
  touchedBall: boolean
  /** Time que joga a próxima vez. */
  nextTurn: Team
}

/** Evento de gol detectado. */
export interface GoalEvent {
  /** Time que marcou. */
  scoringTeam: Team
  /** Id da bola que entrou. */
  ballId: Id
}
