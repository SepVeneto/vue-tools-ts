<script lang="tsx">
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
        class="edit-input"
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
      <div class="cell-edit" onClick={toggleEdit}>{props.modelValue}</div>
    )
    return () => editing.value ? editInput() : displayInput();
  },
})
</script>

<style scoped>
.edit-input {
  font-size: 12px !important;
  line-height: 35px;
  height: 35px;
}
.edit-input /deep/ input {
  font-size: 14px;
  /* font-family: YaHei; */
  line-height: 35px;
  height: 35px;
}
.cell-edit {
  cursor: text;
  padding: 6px 16px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
