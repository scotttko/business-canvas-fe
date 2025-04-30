import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd'

function DatePicker({ ...props }: DatePickerProps) {
  return <AntdDatePicker showNow={false} style={{ width: 160 }} {...props} />
}

export default DatePicker
