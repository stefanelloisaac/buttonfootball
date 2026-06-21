/**
 * physics.config — constantes que definem o "feel" da física.
 */

/** Fator de atrito por passo (velocidade *= FRICTION). */
export const FRICTION = 0.98

/** Coeficiente de restituição (elasticidade) das colisões. 1 = perfeitamente elástica. */
export const RESTITUTION = 0.9

/** Abaixo deste módulo de velocidade, o corpo é considerado parado. */
export const REST_THRESHOLD = 2

/** Velocidade máxima de um disparo (clamp do estilingue). */
export const MAX_SHOT_SPEED = 1400

/** Passo fixo de simulação, em segundos (loop de física determinístico). */
export const FIXED_DT = 1 / 120

/** Massa de um botão de linha. */
export const MASS_BUTTON = 3

/** Massa do goleiro (mais firme). */
export const MASS_GOALKEEPER = 5

/** Massa da bola (mais leve). */
export const MASS_BALL = 1
