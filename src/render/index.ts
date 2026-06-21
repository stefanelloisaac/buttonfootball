/**
 * render — API pública: desenho do campo, corpos, estilingue e cena.
 */
export { COLORS, LINE_WIDTH, SLINGSHOT_WIDTH } from './render.config';
export { drawField } from './render.field.system';
export { drawBodies } from './render.bodies.system';
export { drawSlingshot } from './render.slingshot.system';
export type { SceneFrame } from './render.scene.system';
export { drawScene } from './render.scene.system';
