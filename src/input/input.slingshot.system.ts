/**
 * input.slingshot.system — converte arraste em vetor de disparo (estilingue).
 */
import type { Vec2 } from '../core';
import type { DragState, ShotVector } from './input.types';

/** Inicia um arraste a partir de uma peça e do ponto inicial no mundo. */
export function beginDrag(pieceId: string, origin: Vec2): DragState {
  // TODO: criar DragState inicial
  void pieceId;
  void origin;
  throw new Error('NOT_IMPLEMENTED: beginDrag');
}

/** Atualiza o ponto atual do arraste. */
export function updateDrag(drag: DragState, current: Vec2): DragState {
  // TODO: retornar novo DragState com current atualizado
  void drag;
  void current;
  throw new Error('NOT_IMPLEMENTED: updateDrag');
}

/**
 * Finaliza o arraste e calcula o vetor de disparo (puxar para trás = estilingue),
 * aplicando o teto de velocidade (MAX_SHOT_SPEED).
 */
export function releaseDrag(drag: DragState): ShotVector {
  // TODO: vetor = (origin - current) * força, limitado a MAX_SHOT_SPEED
  void drag;
  throw new Error('NOT_IMPLEMENTED: releaseDrag');
}
