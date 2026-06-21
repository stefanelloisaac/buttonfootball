/**
 * physics.collision.system — resolução de colisões entre corpos e com paredes.
 */
import type { Body } from './physics.types'

/** Limites retangulares usados na colisão com paredes. */
export interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

/**
 * Resolve a colisão elástica entre dois corpos circulares, considerando massa.
 * Separa a sobreposição e atualiza as velocidades. Muta `a` e `b`.
 * Retorna true se houve colisão.
 */
export function resolveBodyCollision(a: Body, b: Body): boolean {
  // TODO: detectar sobreposição e resolver colisão elástica com massas
  void a
  void b
  throw new Error('NOT_IMPLEMENTED: resolveBodyCollision')
}

/**
 * Resolve a colisão de um corpo com as paredes do campo (quique).
 * Muta o corpo. Retorna true se houve colisão.
 */
export function resolveWallCollision(body: Body, bounds: Bounds): boolean {
  // TODO: refletir velocidade ao ultrapassar limites
  void body
  void bounds
  throw new Error('NOT_IMPLEMENTED: resolveWallCollision')
}

/** Resolve todas as colisões corpo-corpo do conjunto (par a par). */
export function resolveAllCollisions(bodies: Body[], bounds: Bounds): void {
  // TODO: pares de corpos + paredes
  void bodies
  void bounds
}
