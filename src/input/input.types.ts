/**
 * input.types — estado de arraste e vetor de disparo do estilingue.
 */
import type { Id, Vec2 } from '../core';

/** Estado de um arraste em andamento. */
export interface DragState {
  /** Peça sendo arrastada. */
  pieceId: Id;
  /** Ponto inicial do arraste (centro da peça), em coordenadas do campo. */
  origin: Vec2;
  /** Ponto atual do ponteiro, em coordenadas do campo. */
  current: Vec2;
}

/** Vetor de disparo resultante de um arraste finalizado. */
export interface ShotVector {
  /** Peça a ser disparada. */
  pieceId: Id;
  /** Velocidade inicial a aplicar ao corpo. */
  velocity: Vec2;
}
