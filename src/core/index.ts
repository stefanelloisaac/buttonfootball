/**
 * core — API pública: primitivos e utilitários genéricos.
 */
export type { Id, Vec2, Circle } from './core.types'
export { clamp, lerp, distance, randRange } from './core.math.util'
export {
  add,
  sub,
  scale,
  dot,
  length,
  normalize,
  limit,
} from './core.vector.util'
