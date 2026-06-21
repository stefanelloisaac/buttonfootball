/**
 * ui.useGame.hook — hook fino que expõe o estado do engine para a UI (HUD/menu).
 * A física roda fora do React; aqui só refletimos o estado para renderização React.
 */
import { useEffect, useState } from 'react';
import type { Engine, GameState } from '../game';

/** Estado derivado consumido pela UI. */
export interface UseGameResult {
  state: GameState | null;
}

/**
 * Assina o engine e devolve o estado atual de forma reativa.
 * Contrato: `engine.subscribe` emite o estado atual imediatamente ao assinar.
 */
export function useGame(engine: Engine | null): UseGameResult {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    if (!engine) return;
    const unsubscribe = engine.subscribe(setState);
    return unsubscribe;
  }, [engine]);

  return { state: engine ? state : null };
}
