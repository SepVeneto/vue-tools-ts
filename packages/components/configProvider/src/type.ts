import { ExtractPropTypes, PropType } from 'vue';

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
export const configProviderProps = {
  table: {
    type: Object as PropType<ConfigProviderTableProps>
  },
  select: {
    type: Object as PropType<ConfigProviderSelectProps>
  },
  response: {
    type: Object as PropType<{ code?: string, msg?: string, data?: string }>,
  }
}
export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>;