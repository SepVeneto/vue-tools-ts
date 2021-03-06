import { defineComponent, getCurrentInstance, ref, watch, h } from 'vue'
import { useConfigInject } from '@basic-components/hooks';
import { RenderInputConfigType, searchProps } from './type';
import { renderUnit, setValue } from '@basic-components/utils';
import BcButton from '@basic-components/components/button'
import BcUpload from '@basic-components/components/upload'
import { ElForm, ElFormItem } from 'element-plus'

export default defineComponent({
  name: 'BcSearch',
  props: searchProps,
  emits: ['update:modelValue', 'reset', 'create', 'export'],
  components: {
    BcButton,
    ElForm,
    ElFormItem,
    BcUpload,
  },
  setup(props, context) {
    const searchInject = useConfigInject('search', props).search;
    const { pageName: tablePageName } = useConfigInject('table', props);
    const pageName = searchInject?.pageName ?? tablePageName.value
    const needExport = searchInject?.export ?? props.export
    const instance = getCurrentInstance();

    const uploadVisible = ref(false);
    const searchConfig = ref<RenderInputConfigType[]>();
    const defaultParams = ref();

    watch(() => props.config, (config) => {
      searchConfig.value = [...config];
    }, { immediate: true, deep: true });
    watch(() => props.defaultValue, (value) => {
      defaultParams.value = JSON.parse(JSON.stringify({ ...props.modelValue, ...value}));
      context.emit('update:modelValue', { ...props.modelValue, ...defaultParams.value });
    }, { immediate: true })

    function updateData(key: string, val: string | string[]) {
      const modelValue = { ...props.modelValue }
      setValue(modelValue, key, val)
      context.emit('update:modelValue', modelValue);
    }
    function handleUpload() {
      uploadVisible.value = true;
    }
    function handleSubmit(e: Event) {
      e.preventDefault();
    }
    function handleSearch(params: MouseEvent | Record<string, unknown>) {
      context.emit('update:modelValue', { ...props.modelValue, ...(params instanceof MouseEvent ? {} : params), [pageName]: 1 });
      props.search?.();
    }
    function handleReset() {
      const params = { ...defaultParams.value };
      for (const key in props.modelValue) {
        const whiteList = Object.keys(params);
        if (!whiteList.includes(key)) {
          params[key] = Array.isArray(props.modelValue[key]) ? [] : '';
        } else {
          params[key] = defaultParams.value[key];
        }
      }
      context.emit('update:modelValue', params);
      context.emit('reset');
      props.search?.();
    }

    const create = () => (
      context.slots.create?.()
      || (props.create && <bc-button type="primary" onClick={() => { context.emit('create') }}>??????</bc-button>)
    );
    const search = () => (
      context.slots.search?.()
      || (<bc-button type="primary" onClick={handleSearch}>??????</bc-button>)
    );
    const reset = () => (
      context.slots.reset?.()
      || (<bc-button type="primary" class="el-icon-refresh" onClick={handleReset}>??????</bc-button>)
    );
    const upload = () => (
      context.slots.upload?.()
      || (props.upload && <bc-button onClick={handleUpload}>{props.upload.text || '??????'}</bc-button>)
    );
    const exportButton = () => (
      context.slots.export?.()
      || (needExport && <bc-button onClick={() => { context.emit('export') }}>??????</bc-button>)
    );
    const layout = { create, search, reset, upload, export: exportButton, advance: () => <></> };
    const node = () => (
      <section class="bc-search-wraper">
        <el-form class="bc-search-containers" inline onSubmit={handleSubmit}>
          {searchConfig.value?.map(item => (
            <el-form-item>
              {renderUnit(h, props.modelValue as Record<string, unknown>, item, {
                handleSearch: props.search,
                updateData,
                context: instance,
              })}
            </el-form-item>
          ))}
          <el-form-item>
            {props.layout.map(item => layout[item]())}
            {context.slots.default?.()}
          </el-form-item>
        </el-form>
        {props.upload && <bc-upload
          v-model={[uploadVisible.value]}
          onSuccess={handleSearch}
          {...props.upload}
          {...context.attrs}
        />}
      </section>
    );
    return node;
  },
})
