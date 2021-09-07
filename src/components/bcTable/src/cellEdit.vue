<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BcTableCellEdit',
  emits: ['save'],
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
          onBlur: toggleEdit,
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
}
.edit-input /deep/ input {
  font-family: YaHei;
  height: 23px;
  line-height: 23px;
}
.cell-edit {
  padding: 0 15px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.cell-edit:hover {
  padding: 0 14px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}
</style>
