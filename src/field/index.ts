/**
 * field — API pública: geometria e dimensões do campo.
 */
export {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_MARGIN,
  GOAL_WIDTH,
  GOAL_DEPTH,
  PENALTY_AREA_DEPTH,
  PENALTY_AREA_WIDTH,
  CENTER_CIRCLE_RADIUS,
} from './field.config'
export type { FieldSide } from './field.geometry.util'
export {
  isInsidePenaltyArea,
  detectGoalSide,
  clampToField,
} from './field.geometry.util'
