import { Checkbox } from '@/components/shared'
import { TableActionDropdown, TableFilterDropdown } from '@/components/shared/table'
import { Field } from '@/models/member'
import { MenuProps, TableColumnType, TableProps } from 'antd'
import { useCallback, useMemo } from 'react'

interface UseTableProps<T, N extends keyof T = keyof T> {
  data: T[]
  fields: Field<N>[]
  getFilterLabelMap?: (fieldName: N) => Record<string, string> | null
  getActions?: (record: T) => MenuProps['items']
}
function useTable<T extends { [K in keyof T]: string | boolean }, N extends keyof T = keyof T>({
  data,
  fields,
  getFilterLabelMap,
  getActions,
}: UseTableProps<T, N>) {
  const getColumnFilter = useCallback(
    (field: Field<N>): { text: string; value: string }[] => {
      const recordValueSet = new Set(data.map((r) => String(r[field.name])).filter((v) => !!v))

      const labelMap = getFilterLabelMap?.(field.name) ?? {}

      return [...recordValueSet].map((val) => ({
        text: labelMap[val] ?? val,
        value: val,
      }))
    },
    [data, getFilterLabelMap],
  )

  const columns: TableColumnType<T>[] = useMemo(() => {
    const coreColumns: TableColumnType<T>[] = fields.map((field) => ({
      title: field.label,
      dataIndex: field.name as keyof T & string,
      filterDropdown: (filterProps) => (
        <TableFilterDropdown options={getColumnFilter(field)} filterProps={filterProps} />
      ),
      onFilter: (value, record) => String(record[field.name]) === value,
      ...(field.type === 'checkbox' && {
        render: (checked: boolean) => <Checkbox checked={checked} />,
      }),
    }))

    if (getActions) {
      const actionColumn: TableColumnType<T> = {
        title: '',
        key: 'action',
        render: (_: string, record) => {
          return <TableActionDropdown items={getActions(record)} />
        },
      }
      return [...coreColumns, actionColumn]
    }

    return coreColumns
  }, [fields, getActions, getColumnFilter])

  const rowSelection: TableProps<T>['rowSelection'] = {
    onChange: (keys, selected) => {
      console.log('Selected keys:', keys, 'Selected rows:', selected)
    },
  }

  return { columns, rowSelection }
}

export default useTable
