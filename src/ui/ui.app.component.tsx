/**
 * ui.app.component — navegação entre o menu e a tela de jogo.
 */
import { useState } from 'react';
import { Menu } from './ui.menu.component';
import type { MatchSetup } from './ui.menu.component';
import { GameCanvas } from './ui.gameCanvas.component';

/** Raiz da aplicação: alterna entre Menu e Jogo. */
export function App(): React.JSX.Element {
  const [setup, setSetup] = useState<MatchSetup | null>(null);

  if (!setup) {
    return <Menu onStart={setSetup} />;
  }

  return <GameCanvas setup={setup} onExit={() => setSetup(null)} />;
}
