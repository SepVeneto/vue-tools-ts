import {
  ButtonProps,
  SearchProps,
  TableProps,
  ClipboardProps,
  DialogProps,
  InputProps,
  SelectProps,
  MotionProps,
  MotionGroupProps,
  UploadProps,
} from '@basic-components/components/type'

declare module 'vue' {
  export interface GlobalComponents {
    BcButton: typeof import('basic-components')['BcButton'],
    BcSearch: SearchProps,
    BcTable: TableProps,
    BcClipboard: ClipboardProps,
    BcDialog: DialogProps,
    BcInput: InputProps,
    BcSelect: SelectProps,
    BcMotion: MotionProps,
    BcMotionGroup: MotionGroupProps,
    BcUplaod: UploadProps,
  }
}
