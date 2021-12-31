import { ExtractPropTypes } from "vue";
export const motionProps = {
  type: String,
  direction: String,
  delay: String,
  show: Boolean,
  modelValue: Boolean,
}

export type MotionProps = Partial<ExtractPropTypes<typeof motionProps>>;