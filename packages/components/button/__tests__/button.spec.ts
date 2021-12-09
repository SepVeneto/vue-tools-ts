import { mount, shallowMount } from '@vue/test-utils'
import BcButton from '../src/button'
import { ref, nextTick } from 'vue'
import { ElTooltip } from 'element-plus'

function sleep(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const _mount = (options) => mount({
  components: {
    BcButton,
  },
  ...options,
})

describe('button.tsx', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  })
  test('create', async () => {
    const wrapper = mount(BcButton, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes()).toContain('el-button--primary')
  })

  test('render text', async () => {
    const wrapper = mount(BcButton, {
      slots: {
        default: 'veneto'
      }
    })
    expect(wrapper.text()).toEqual('veneto')
  })

  test('handle click', async () => {
    const wrapper = mount(BcButton, {
      slots: {
        default: 'veneto'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  describe('confirm', () => {
    test('confirm create', async () => {
      const wrapper = mount(BcButton, {
        props: {
          type: 'danger'
        }
      })

      await wrapper.trigger('click')
      expect(document.querySelectorAll('.el-message-box')).toHaveLength(1)
    })

    test('warning confirm text', async () => {
      const wrapper = _mount({
        template: `
          <bc-button type="primary" :confirm="confirm">veneto</bc-button>
        `,
        setup() {
          const confirm = ref<boolean | string>(false)
          return {
            confirm
          }
        }
      })

      const vm = wrapper.vm

      vm.confirm = 'warning confirm text'
      await sleep()
      await wrapper.trigger('click')
      expect(document.querySelectorAll('.el-message-box')).toHaveLength(1)
      expect(document.querySelector('.el-message-box .el-message-box__message').textContent).toEqual(vm.confirm)
    })

    test('warning confirm submit', async () => {
      const handleSubmit = jest.fn();
      const wrapper = mount(BcButton, {
        attrs: {
          onClick: handleSubmit
        },
        props: {
          type: 'delete'
        }
      })

      await wrapper.trigger('click')
      expect(handleSubmit).not.toBeCalled()
      const [, confirm]= document.querySelectorAll('.el-message-box__btns > .el-button');
      (confirm as HTMLElement).click();
      // 第一次nextTick, 通过style display:none隐藏,触发transition
      await nextTick();
      // 第二次nextTick, 将messagebox卸载，从dom上移除
      await nextTick();
      // 到此为止messageBox才真正关闭
      expect(handleSubmit).toBeCalled()
    })
  })

  test('button size mini', async () => {
    const wrapper = mount(BcButton, { props: { mini: true } })
    expect(wrapper.classes()).toContain('bc-button--mini')
  })

  test('button content tooltip', async () => {
    const wrapper = shallowMount(BcButton, {
      props: {
        tooltip: true,
      },
      slots: {
        default: 'veneto'
      },
      global: {
        stubs: {
          ElTooltip,
        },
        renderStubDefaultSlot: true,
      }
    })
    expect(wrapper.text()).toEqual('veneto')
  })
})