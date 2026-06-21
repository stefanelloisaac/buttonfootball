/**
 * field.geometry.util — consultas geométricas sobre o campo.
 */
import type { Vec2 } from '../core'

/** Lado do campo associado a uma equipe (gol que ela defende). */
export type FieldSide = 'left' | 'right'

/** Retorna true se a posição está dentro da grande área do lado informado. */
export function isInsidePenaltyArea(side: FieldSide, pos: Vec2): boolean {
  // TODO: usar field.config para testar limites da área
  void side
  void pos
  throw new Error('NOT_IMPLEMENTED: isInsidePenaltyArea')
}

/** Retorna o lado cujo gol a bola cruzou, ou null se não houve gol. */
export function detectGoalSide(ballPos: Vec2, ballRadius: number): FieldSide | null {
  // TODO: testar se a bola cruzou a linha de fundo dentro da abertura do gol
  void ballPos
  void ballRadius
  throw new Error('NOT_IMPLEMENTED: detectGoalSide')
}

/** Restringe uma posição aos limites jogáveis do campo. */
export function clampToField(pos: Vec2, radius: number): Vec2 {
  // TODO: aplicar margens e limites jogáveis
  void pos
  void radius
  throw new Error('NOT_IMPLEMENTED: clampToField')
}
