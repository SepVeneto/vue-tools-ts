import { shallowMount, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Select from '../select.vue'
// import { ElSelect as Select } from 'element-plus'
import { ref, shallowRef } from 'vue'
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'

const selectGroupOptions = [
  {
    label: 'Australia',
    options: [
      {
        value: 'Sydney',
        label: 'Sydney',
      },
      {
        value: 'Melbourne',
        label: 'Melbourne',
      },
    ],
  },
  {
    label: 'China',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
  {
    label: 'India',
    options: [
      {
        value: 'Mumbai',
        label: 'Mumbai',
      },
      {
        value: 'Delhi',
        label: 'Delhi',
      },
      {
        value: 'Bangalore',
        label: 'Bangalore',
      },
    ],
  },
  {
    label: 'Indonesia',
    options: [
      {
        value: 'Bandung',
        label: 'Bandung',
      },
      {
        value: 'Jakarta',
        label: 'Jakarta',
      },
    ],
  },
]
const selectOptions = [
  {
    value: 'Sydney',
    label: 'Sydney',
  },
  {
    value: 'Melbourne',
    label: 'Melbourne',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
  {
    value: 'Dalian',
    label: 'Dalian',
  },
  {
    value: 'Mumbai',
    label: 'Mumbai',
  },
  {
    value: 'Delhi',
    label: 'Delhi',
  },
  {
    value: 'Bangalore',
    label: 'Bangalore',
  },
  {
    value: 'Bandung',
    label: 'Bandung',
  },
  {
    value: 'Jakarta',
    label: 'Jakarta',
  },
]

jest.useFakeTimers()

function _mount(options) {
  return mount(Select, {
    shallow: false,
    global: {
      renderStubDefaultSlot: true,
      stubs: {
        'ElSelect': '<div></div>'
      }
    },
    ...options,
  })
}

describe('Select.vue', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })
  test('create', async () => {
    const wrapper = shallowMount(Select, {
      props: {},
      global: {
        renderStubDefaultSlot: true,
      }
    })
    expect(wrapper.classes()).toContain('bc-select')
  })

  test('options', async () => {
    const wrapper = shallowMount(Select, {
      props: {
        options: selectOptions,
      },
      global: {
        renderStubDefaultSlot: true,
      }
    })
    const options = wrapper.findAllComponents('[label]')
    const res = options.every((item, index) => {
      return item.attributes().label === wrapper.vm.options[index].label
    })
    expect(res).toBe(true)
  })

  test('group options', async () => {
    const wrapper = mount(Select, {
      shallow: true,
      global: {
        renderStubDefaultSlot: true,
      },
      props: {
        options: selectGroupOptions,
        group: true,
        groupProps: {
          children: 'options'
        }
      }
    })

    const groups = wrapper.findAllComponents(ElOptionGroup)
    const res = groups.every((item, index) => {
      return item.attributes().label === wrapper.vm.options[index].label
    })
    expect(res).toBe(true)
  })

  test('custom option label & value', async () => {
    const wrapper = mount(Select, {
      shallow: true,
      global: {
        renderStubDefaultSlot: true,
      },
      props: {
        options: [{ id: 1, name: 'venento' }, { id: 2, name: 'shiho' }],
      }
    })

    function isLabelEqual(options: typeof wrapper[]) {
      return options.every((item, index) => {
        return item.attributes().label === wrapper.vm.options[index].name
      })
    }
    expect(isLabelEqual(wrapper.findAllComponents('[label]'))).toBe(false)

    await wrapper.setProps({
      customLabel: 'name',
      customValue: 'id',
    })
    expect(isLabelEqual(wrapper.findAllComponents('[label]'))).toBe(true)
  })

  // TODO: 目前所有涉及el-popper的组件都存在无限递归的问题，除非通过shallowMount挂载
  // test('v-model', async () => {
  //   // const handleInput = jest.fn()
  //   function handleInput(val) {
  //     console.log(val)
  //   }
  //   const wrapper = _mount({
  //     props: {
  //       options: selectOptions,
  //     },
  //     attrs: {
  //       onInput: handleInput
  //     }
  //   })

  //   console.log(wrapper.findComponent)

  //   // await wrapper.setProps({
  //   //   modelValue: 'Shanghai'
  //   // })
  //   // console.log(wrapper.html())
  //   // expect(handleInput).toBeCalled()
  //   // const select = wrapper.findComponent(ElSelect);
  //   // console.log(select.attributes())
  // })
})