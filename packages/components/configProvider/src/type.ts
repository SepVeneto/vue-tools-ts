import { ExtractPropTypes, PropType } from 'vue';

export interface ConfigProviderSearchProps {
  pageName?: string,
  pageSizeName?: string,
  export?: boolean,
}
export interface ConfigProviderTableProps {
  arrayName?: string,
  pageName?: string,
  pageSizeName?: string,
  totalName?: string,
}
export interface ConfigProviderSelectProps {
  label?: string,
  value?: string,
  arrayName?: string,
}
export interface ConfigProviderDatePicker {
  valueFormat?: string,
}
export const configProviderProps = {
  table: {
    type: Object as PropType<ConfigProviderTableProps>
  },
  search: {
    type: Object as PropType<ConfigProviderSearchProps>
  },
  select: {
    type: Object as PropType<ConfigProviderSelectProps>
  },
  response: {
    type: Object as PropType<{ code?: string, msg?: string, data?: string }>,
  },
  datePicker: {
    type: Object as PropType<ConfigProviderDatePicker>,
    default: (): ConfigProviderDatePicker => ({
      valueFormat: 'YYYY-MM-DD hh:mm:ss'
    })
  }
}
export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>;