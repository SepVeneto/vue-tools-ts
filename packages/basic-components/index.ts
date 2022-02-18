import installer from './install'

export * from '@basic-components/components'
export * from '@basic-components/utils'
export * from '@basic-components/hooks'

export const install = installer.install;
export default {
  install,
}