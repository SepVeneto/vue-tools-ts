import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BcTableCellEdit',
  emits: ['save', 'blur'],
  directives: {
    focus: {
      mounted: el => {
        el.querySelector('input').focus();
      }
    }
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    unit: String,
  },
  setup(props, context) {
    const editing = ref(false);
    const cell = ref<string | number>('');
    const inputRef = ref();

    function toggleEdit() {
      editing.value = !editing.value;
    }
    function save() {
      context.emit('save', cell.value);
      inputRef.value.$el.blur();
    }

    const editInput = () => (
      <bc-input
        class="bc-table-input"
        ref={inputRef}
        model-value={cell.value}
        v-focus
        v-slots={{
          suffix: props.unit ? <span>{props.unit}</span> : null,
        }}
        {...{
          'onUpdate:modelValue': (val: string) => { cell.value = val },
          onFocus: () => { cell.value = props.modelValue },
          onBlur: () => { toggleEdit(); context.emit('blur', cell.value) },
          onKeyup: (e: KeyboardEvent) => { e.code === 'Enter' && save() }
        }}
      >
      </bc-input>
    );
    const displayInput = () => (
      <div class="bc-table-cell-edit" onClick={toggleEdit}>{props.modelValue}</div>
    )
    return () => editing.value ? editInput() : displayInput();
  },
})
