/**
 * ui.gameCanvas.component — monta o canvas e faz o wiring entre engine,
 * física, regras, input, render e IA. Esta é a camada que pode importar
 * todos os domínios (topo da hierarquia de camadas).
 */
import { useEffect, useRef, useState } from 'react';
import { createEngine, createInitialState } from '../game';
import type { Engine, EngineHooks, GameState } from '../game';
import { useGame } from './ui.useGame.hook';
import { Hud } from './ui.hud.component';
import type { MatchSetup } from './ui.menu.component';

/** Props do canvas de jogo. */
export interface GameCanvasProps {
  setup: MatchSetup;
  onExit: () => void;
}

/**
 * Constrói os passos do loop (step/resolve/render) a partir dos domínios.
 * Implementação real será preenchida na fase de lógica.
 */
function buildHooks(canvas: HTMLCanvasElement): EngineHooks {
  // TODO: ligar physics (step), rules (resolve) e render (render) ao canvas
  void canvas;
  return {
    step: (state: GameState) => state,
    resolve: (state: GameState) => state,
    render: () => {},
  };
}

/** Tela de jogo: canvas + HUD. */
export function GameCanvas({ setup, onExit }: GameCanvasProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);
  const { state } = useGame(engine);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initial = createInitialState(setup.mode);
    const hooks = buildHooks(canvas);
    const created = createEngine(initial, hooks);
    setEngine(created);
    created.start();

    return () => {
      created.stop();
      setEngine(null);
    };
    // TODO: tratar input (pointer) e turno da IA aqui
  }, [setup]);

  return (
    <div className="game">
      <Hud state={state} />
      <canvas ref={canvasRef} className="game__canvas" />
      <button type="button" className="game__exit" onClick={onExit}>
        Sair
      </button>
    </div>
  );
}
