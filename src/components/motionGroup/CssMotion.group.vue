<script lang="tsx">
import { defineComponent } from 'vue'
import { motionGroupProps } from './type';

export default defineComponent({
  name: 'BcMotionGroup',
  props: motionGroupProps,
  setup(props, context) {
    const motionList = context.slots.default?.();
    motionList?.forEach((item, index) => {
      if ((item.type as any).name === 'BcMotion') {
        (item.props as { delay: string }).delay = `${props.delay + props.step * index}s`
      }
    })
    return () => (
      <>
        {motionList?.map(item => item)}
      </>
    )
  },
})
</script>

