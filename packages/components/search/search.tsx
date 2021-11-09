import { defineComponent, getCurrentInstance, ref, watch, h } from 'vue'
import useConfigInject from '../_util/hooks/useConfigInject';
import { RenderInputConfigType, searchProps } from './type';
import renderUnit from '../_util/renderUnit';

export default defineComponent({
  name: 'BcSearch',
  props: searchProps,
  emits: ['update:modelValue', 'reset', 'create', 'export'],
  setup(props, context) {
    const { pageName } = useConfigInject('table', props);
    const instance = getCurrentInstance();

    const uploadVisible = ref(false);
    const visible = ref(false);
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
      context.emit('update:modelValue', { ...props.modelValue, [key]: val });
    }
    function handleUpload() {
      uploadVisible.value = true;
    }
    function handleSubmit(e: Event) {
      e.preventDefault();
    }
    function handleSearch(params: MouseEvent | Record<string, unknown>) {
      context.emit('update:modelValue', { ...props.modelValue, ...(params instanceof MouseEvent ? {} : params), [pageName.value]: 1 });
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
      context.slots.create
      || (props.create && <bc-button type="primary" onClick={() => { context.emit('create') }}>新增</bc-button>)
    );
    const search = () => (
      context.slots.search
      || (<bc-button type="primary" onClick={handleSearch}>搜索</bc-button>)
    );
    const reset = () => (
      context.slots.reset
      || (<bc-button type="primary" class="el-icon-refresh" onClick={handleReset}>重置</bc-button>)
    );
    const upload = () => (
      context.slots.upload
      || (props.upload && <bc-button onClick={handleUpload}>{props.upload.text || '导入'}</bc-button>)
    );
    const exportButton = () => (
      context.slots.export
      || (props.export && <bc-button onClick={() => { context.emit('export') }}>导出</bc-button>)
    );
    const layout = { create, search, reset, upload, export: exportButton, advance: () => <></> };
    const node = () => (
      <section class="bc-search-wraper">
        <el-form class="bc-search-containers" inline onSubmit={handleSubmit}>
          {searchConfig.value?.map(item => (
            <el-form-item>
              {renderUnit(h, props.modelValue as Record<string, unknown>, item, {
                updateData,
                context: instance,
              })}
            </el-form-item>
          ))}
          <el-form-item>
            {props.layout.map(item => layout[item]())}
            {context.slots.default}
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
