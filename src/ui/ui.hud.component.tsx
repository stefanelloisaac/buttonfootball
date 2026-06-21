/**
 * ui.hud.component — exibe placar e de quem é a vez.
 */
import type { GameState } from '../game';

/** Props do HUD. */
export interface HudProps {
  state: GameState | null;
}

/** Cabeçalho com placar e indicador de turno. */
export function Hud({ state }: HudProps): React.JSX.Element {
  // TODO: estilizar; por ora exibe placar e turno textualmente
  if (!state) {
    return <div className="hud hud--empty" />;
  }

  return (
    <div className="hud">
      <span className="hud__score">
        {state.score.home} : {state.score.away}
      </span>
      <span className="hud__turn">Vez: {state.turn}</span>
    </div>
  );
}
