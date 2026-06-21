/**
 * ui.menu.component — seleção de modo, dificuldade e início da partida.
 */
import { useState } from 'react';
import type { GameMode } from '../game';
import type { Difficulty } from '../ai';

/** Configuração escolhida no menu para iniciar a partida. */
export interface MatchSetup {
  mode: GameMode;
  difficulty: Difficulty;
}

/** Props do menu. */
export interface MenuProps {
  onStart: (setup: MatchSetup) => void;
}

/** Tela inicial: escolhe modo e dificuldade. */
export function Menu({ onStart }: MenuProps): React.JSX.Element {
  const [mode, setMode] = useState<GameMode>('local');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // TODO: estilizar e refinar a UX
  return (
    <div className="menu">
      <h1 className="menu__title">Futebol de Botão</h1>

      <fieldset className="menu__group">
        <legend>Modo</legend>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === 'local'}
            onChange={() => setMode('local')}
          />
          2 jogadores (local)
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === 'cpu'}
            onChange={() => setMode('cpu')}
          />
          vs Computador
        </label>
      </fieldset>

      <fieldset className="menu__group" disabled={mode !== 'cpu'}>
        <legend>Dificuldade</legend>
        {(['easy', 'medium', 'hard'] as const).map((level) => (
          <label key={level}>
            <input
              type="radio"
              name="difficulty"
              checked={difficulty === level}
              onChange={() => setDifficulty(level)}
            />
            {level}
          </label>
        ))}
      </fieldset>

      <button type="button" className="menu__start" onClick={() => onStart({ mode, difficulty })}>
        Iniciar
      </button>
    </div>
  );
}
