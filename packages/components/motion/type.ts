import { ExtractPropTypes } from "vue";
export const motionProps = {
  type: String,
  direction: String,
  delay: String,
}

export type MotionProps = Partial<ExtractPropTypes<typeof motionProps>>;