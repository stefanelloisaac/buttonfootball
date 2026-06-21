/**
 * render.config — paleta e estilos visuais do Canvas.
 */

/** Cores do campo e elementos. */
export const COLORS = {
  grass: '#2e7d32',
  grassStripe: '#329537',
  line: '#ffffff',
  home: '#1565c0',
  away: '#c62828',
  goalkeeperHome: '#0d47a1',
  goalkeeperAway: '#8e0000',
  ball: '#fafafa',
  ballOutline: '#212121',
  slingshot: '#ffeb3b',
  turnHighlight: '#ffffff',
} as const;

/** Largura das linhas do campo (px no mundo). */
export const LINE_WIDTH = 3;

/** Largura da linha do estilingue. */
export const SLINGSHOT_WIDTH = 4;
