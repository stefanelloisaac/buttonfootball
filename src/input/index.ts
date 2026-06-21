/**
 * input — API pública: estilingue e normalização de ponteiro.
 */
export type { DragState, ShotVector } from './input.types';
export type { ViewTransform } from './input.pointer.util';
export { screenToWorld, pointerToCanvas } from './input.pointer.util';
export { beginDrag, updateDrag, releaseDrag } from './input.slingshot.system';
