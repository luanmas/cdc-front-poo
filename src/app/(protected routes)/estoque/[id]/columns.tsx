'use client'

import { ColumnsProps } from '@/components/TableBase/types'

export const columns: ColumnsProps<T>[] = [
  {
    name: 'Produto',
    orderName: 'productName',
    direction: 'ASC',
    sort: true,
    cell: 'text',
    className: 'w-[350px]',
    renderCell: (row) => <>{row.name}</>,
  },
  {
    name: 'Marca',
    label: 'brands',
    cell: 'select',
  },
  {
    name: 'UND',
    className: 'w-[50px]',
    renderCell: (row) => <>{row.unit.name}</>,
  },
  {
    name: 'Qtd Min',
    label: 'min_quantity',
    cell: 'input',
  },
  {
    name: 'Margem (%)',
    label: 'margin',
    cell: 'input',
  },
  {
    name: 'Qtd Margem',
    label: 'quantity_margin',
    className: 'w-[50px]',
    renderCell: (row) => <>{row.quantity_margin}</>,
  },
  {
    name: 'Status',
    label: 'active',
    cell: 'radio',
  },
]
