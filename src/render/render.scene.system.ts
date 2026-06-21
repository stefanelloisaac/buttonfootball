/**
 * render.scene.system — orquestra a ordem de desenho da cena completa.
 */
import type { GameState } from '../game';
import type { DragState } from '../input';
import { drawField } from './render.field.system';
import { drawBodies } from './render.bodies.system';
import { drawSlingshot } from './render.slingshot.system';

/** Dados necessários para desenhar um frame. */
export interface SceneFrame {
  state: GameState;
  drag: DragState | null;
}

/** Desenha a cena completa na ordem: campo -> corpos -> estilingue. */
export function drawScene(ctx: CanvasRenderingContext2D, frame: SceneFrame): void {
  // TODO: limpar canvas, aplicar transform de view, e desenhar camadas
  drawField(ctx);
  drawBodies(ctx, frame.state);
  drawSlingshot(ctx, frame.drag);
}
