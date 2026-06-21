/**
 * input.pointer.util — normaliza eventos de ponteiro para coordenadas do campo.
 */
import type { Vec2 } from '../core';

/** Transformação entre coordenadas de tela (canvas) e mundo (campo). */
export interface ViewTransform {
  /** Deslocamento horizontal do campo no canvas (px). */
  offsetX: number;
  /** Deslocamento vertical do campo no canvas (px). */
  offsetY: number;
  /** Escala mundo->tela. */
  scale: number;
}

/** Converte coordenadas de tela (clientX/clientY relativos ao canvas) para mundo. */
export function screenToWorld(screenX: number, screenY: number, view: ViewTransform): Vec2 {
  // TODO: aplicar inversa de offset/scale
  void screenX;
  void screenY;
  void view;
  throw new Error('NOT_IMPLEMENTED: screenToWorld');
}

/** Extrai coordenadas (x,y) de um PointerEvent relativas ao elemento canvas. */
export function pointerToCanvas(event: PointerEvent, canvas: HTMLCanvasElement): Vec2 {
  // TODO: usar getBoundingClientRect
  void event;
  void canvas;
  throw new Error('NOT_IMPLEMENTED: pointerToCanvas');
}
