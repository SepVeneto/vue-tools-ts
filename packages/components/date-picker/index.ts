import type { App, Plugin } from 'vue'
import DatePicker from './src/date-picker'

DatePicker.install = (app: App) => {
  app.component(DatePicker.name, DatePicker)
}

const _DatePicker = DatePicker as unknown as Plugin
export default _DatePicker
export const BcDatePicker = _DatePicker
