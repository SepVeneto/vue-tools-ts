import { mount } from '@vue/test-utils'
import Input from '../src/input'
import { ref } from 'vue'
function sleep(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const _mount = options => mount({
  components: {
    'bc-input': Input,
  },
  ...options
})

describe('Input.tsx', () => {
  test('create', async () => {
    const handleFocus = jest.fn()
    const wrapper = _mount({
      template : `
        <bc-input
          :minlength="3"
          :maxlength="5"
          @focus="handleFocus"
          placeholder="请输入"
          :model-value="input"
        />
      `,
      setup() {
        const input = ref('input')
        return {
          input,
          handleFocus,
        }
      }
    })

    const inputElm = wrapper.find('input')
    const vm = wrapper.vm;
    const nativeInput = inputElm.element

    await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    expect(handleFocus).toHaveBeenCalled()
    expect(nativeInput.placeholder).toBe('请输入')
    expect(nativeInput.value).toBe('input')
    expect(nativeInput.minLength).toBe(3)

    vm.input = 'text'
    await sleep()
    expect(inputElm.element.value).toBe('text')
  })

  describe('Input Events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()

    test('event:focus & blur', async () => {
      const wrapper = _mount({
        template: `
          <bc-input
            :model-value="input"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        `,
        setup() {
          const input = ref('')
          return {
            input,
            handleFocus,
            handleBlur,
          }
        }
      })

      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(handleFocus).toBeCalled()
      await input.trigger('blur')
      expect(handleBlur).toBeCalled()
    })

    test('event:change', async () => {
      const wrapper = _mount({
        template: `<bc-input :model-value="input" @change="handleChange" />`,
        setup() {
          const input = ref('a')
          function handleChange(val) {
            input.value = val;
          }
          return {
            input,
            handleChange
          }
        }
      })

      const el = wrapper.find('input').element
      const vm = wrapper.vm
      const simulateEvent = (text, event) => {
        el.value = text;
        el.dispatchEvent(new Event(event))
      }

      simulateEvent('2', 'change')
      await sleep()
      expect(vm.input).toBe('2')
      simulateEvent('1', 'input')
      await sleep()
      expect(vm.input).toBe('2')
    })
    test('event:input', async () => {
      const handleInput = jest.fn()
      const wrapper = _mount({
        template: `
          <bc-input
            clearable
            :model-value="input"
            @input="handleInput"
          />
        `,
        setup() {
          const input = ref('a')
          return {
            input,
            handleInput,
          }
        }
      })

      const vm = wrapper.vm;
      const input = wrapper.find('input')
      const el = input.element
      el.value = '1'
      await input.trigger('compositionstart')
      await input.trigger('input')
      el.value = '2'
      await input.trigger('compositionupdate')
      await input.trigger('input')
      await input.trigger('compositionend')
      expect(handleInput).toBeCalledTimes(1)

      expect(vm.input).toEqual('a')
      expect(el.value).toEqual('a')
    })
  })

  test('input width', async () => {
    const wrapper = _mount({
      template: `
        <bc-input
          :model-value="input"
          :width="width"
        />
      `,
      setup() {
        const input = ref('')
        const width = ref('')
        return {
          input,
          width
        }
      }
    })

    const el = wrapper.element as HTMLElement;
    const vm = wrapper.vm;
    
    vm.width = '200px'
    await sleep()
    console.log(el.style)
    expect(el.style.width).toEqual('200px')
  })
})
