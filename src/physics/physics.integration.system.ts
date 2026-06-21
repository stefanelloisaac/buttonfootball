/**
 * physics.integration.system — avança a posição dos corpos no tempo e aplica atrito.
 */
import type { Body } from './physics.types'

/**
 * Integra um corpo por um passo `dt`: aplica atrito e atualiza a posição.
 * Muta o corpo no lugar.
 */
export function integrate(body: Body, dt: number): void {
  // TODO: aplicar atrito (FRICTION) e mover por velocity * dt
  void body
  void dt
}

/** Integra todos os corpos por um passo. */
export function integrateAll(bodies: Body[], dt: number): void {
  // TODO: iterar e chamar integrate
  void bodies
  void dt
}
