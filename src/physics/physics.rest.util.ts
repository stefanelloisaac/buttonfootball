/**
 * physics.rest.util — detecção de repouso ("tudo parado").
 */
import type { Body } from './physics.types';

/** Retorna true se o corpo está abaixo do limiar de repouso. */
export function isAtRest(body: Body): boolean {
  // TODO: comparar módulo da velocidade com REST_THRESHOLD
  void body;
  throw new Error('NOT_IMPLEMENTED: isAtRest');
}

/** Retorna true se todos os corpos estão em repouso. */
export function allAtRest(bodies: Body[]): boolean {
  // TODO: todos os corpos abaixo do limiar
  void bodies;
  throw new Error('NOT_IMPLEMENTED: allAtRest');
}

/** Zera a velocidade de corpos abaixo do limiar (evita deriva residual). */
export function snapToRest(bodies: Body[]): void {
  // TODO: zerar velocidades pequenas
  void bodies;
}
