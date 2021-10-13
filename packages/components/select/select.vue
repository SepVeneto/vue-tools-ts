<template>
  <el-select
    v-if="!onlyDisplay"
    :model-value="modelValue"
    @update:modelValue="emitValue"
    @change="emitLabel"
    :style="{ width: selectWidth }"
    v-bind="{ clearable: true, ...$attrs}"
  >
    <template v-if="needGroup">
      <el-option-group
        v-for="(groupOptions, index) in selectOptions"
        :key="index"
        :label="hasValue(groupOptions)"
        :value="groupOptions[optionValue] == null ? groupOptions: groupOptions[optionValue]"
      >
        <el-option
          v-for="item in groupOptions.children"
          :key="item[optionKey || optionValue]"
          :label="hasValue(item)"
          :value="item[optionValue] == null ? item : item[optionValue]"
          :disabled="itemDisabled && itemDisabled(item)"
        >
          <slot v-bind="{...item}"/>
        </el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-option
        v-for="item in selectOptions"
        :key="item[optionKey || optionValue]"
        :label="hasValue(item)"
        :value="item[optionValue] == null ? item : item[optionValue]"
        :disabled="itemDisabled && itemDisabled(item)"
      >
        <slot v-bind="{...item}"/>
      </el-option>
    </template>
  </el-select>
  <span v-else>{{displayText}}</span>
</template>

<script lang="ts">
// import serverSelect from './serverSelect';
import { computed, defineComponent, ref } from 'vue';
import { getValue } from '../_util/tools'
import { SelectProps, selectProps, SelectOptions, SelectOption } from './type';
import useConfigInject from '../_util/hooks/useConfigInject';

export default defineComponent({
  name: 'BcSelect',
  emits: ['update:modelValue', 'update:label', 'fetch'],
  props: selectProps,
  setup(props, context) {
    const {arrayName, label: optionLabel, value: optionValue} = useConfigInject<SelectProps>('select', props);

    const apiOptions = ref<SelectOptions>([]);

    const selectOptions = computed<SelectOptions>(() => {
      return [...(props.options || apiOptions.value || [])];
    })
    const needGroup = computed(() => {
      if (!props.group) {
        return false;
      }
      return selectOptions.value.some(item => item.children)
    })
    const displayText = computed(() => {
      const value = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
      const res:(string | number)[] = [];
      value.forEach(item => {
        let obj: SelectOption = {};
        if (props.modelValue instanceof Object) {
          obj = props.modelValue as SelectOption;
        } else {
          obj = selectOptions.value.find(each => each[optionValue.value] === item) || {};
        }
        res.push(obj ? obj[optionLabel.value] as string : '');
      })
      return res.join(',')
    })
    const selectWidth = computed(() => {
      if (!props.width) {
        return '';
      }
      if (typeof props.width === 'string') {
        return props.width;
      } else {
        return props.width + 'px';
      }
    });
    
    props.immediate && getList();
    props.defaultValue && context.emit('update:modelValue', props.defaultValue);

    function getList() {
      if (typeof props.api === 'function') {
        props.api().then((data) => {
          if (data.data) {
            apiOptions.value = data.data[arrayName.value] || data.data;
          }
          context.emit('fetch', apiOptions.value);
        });
      }
    }
    function hasValue(item: SelectOption) {
      const value = getValue(item, optionLabel.value);
      if (value === '' || !!value) {
        return value;
      } else {
        return typeof item === 'object' ? '' : item;
      }
    }
    function getObject(value: string) {
      const res = selectOptions.value.find(item => item[optionValue.value] === (value || props.modelValue));
      if (!res) {
        return {};
      }
      return res;
    }
    function getLabel(val?: unknown) {
      const value = val || props.modelValue
      if (Array.isArray(value)) {
        return value.reduce((res, curr) => {
          const result = selectOptions.value.find(item => item[optionValue.value] === curr) || {};
          if (!result) {
            res.push('')
          }
          res.push(result[optionLabel.value]);
          return res;
        }, [])
      } else {
        const res = selectOptions.value.find(item => item[optionValue.value] === value);
        if (!res) {
          return '';
        }
        return res[optionLabel.value];
      }
    }
    function getOptions() {
      return selectOptions.value;
    }
    function emitValue(val: unknown) {
      context.emit('update:modelValue', val)
    }
    function emitLabel(val: unknown) {
      context.emit('update:label', getLabel(val))
    }

    return {
      needGroup,
      displayText,
      selectOptions,
      selectWidth,
      optionValue,
      hasValue,

      getObject,
      getLabel,
      getOptions,
      emitLabel,
      emitValue,
    }
  },
})
</script>
