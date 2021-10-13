import { ExtractPropTypes } from "@vue/runtime-core";
export const motionProps = {
  type: String,
  direction: String,
  delay: String,
}

export type MotionProps = Partial<ExtractPropTypes<typeof motionProps>>;