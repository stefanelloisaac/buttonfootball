/**
 * physics — API pública: corpos, integração, colisão e repouso.
 */
export type { Body, BodyKind } from './physics.types'
export type { Bounds } from './physics.collision.system'
export {
  FRICTION,
  RESTITUTION,
  REST_THRESHOLD,
  MAX_SHOT_SPEED,
  FIXED_DT,
  MASS_BUTTON,
  MASS_GOALKEEPER,
  MASS_BALL,
} from './physics.config'
export { integrate, integrateAll } from './physics.integration.system'
export {
  resolveBodyCollision,
  resolveWallCollision,
  resolveAllCollisions,
} from './physics.collision.system'
export { isAtRest, allAtRest, snapToRest } from './physics.rest.util'
