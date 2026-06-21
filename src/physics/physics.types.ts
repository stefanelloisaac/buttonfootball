/**
 * physics.types — corpo físico e tipos de movimento.
 */
import type { Id, Vec2 } from '../core'

/** Categoria de um corpo físico. */
export type BodyKind = 'button' | 'goalkeeper' | 'ball'

/** Corpo físico: círculo com massa e velocidade. */
export interface Body {
  id: Id
  kind: BodyKind
  position: Vec2
  velocity: Vec2
  radius: number
  mass: number
}
