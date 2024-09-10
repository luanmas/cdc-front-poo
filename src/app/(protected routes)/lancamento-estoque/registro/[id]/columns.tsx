'use client'

import { ColumnsProps } from '@/components/TableBase/types'

export const columns: ColumnsProps<T>[] = [
  {
    name: 'Produto',
    orderName: 'productName',
    label: 'productName',
    renderCell: (row) => <>{row.name}</>,
  },
  {
    name: 'Qtd Atual',
    label: 'quantity',
    renderCell: (row) => <>{row.quantity}</>,
  },
  {
    name: 'Estoque Mínimo',
    renderCell: (row) => <>{row.min_quantity}</>,
  },
  {
    name: 'UND',
    renderCell: (row) => <>{row.unit.name}</>,
  },
  {
    name: 'Sugestão de Compra',
    renderCell: (row) => <>{Math.max(0, row.min_quantity - row.quantity)}</>,
  },
  {
    name: 'Qtd a Entregar',
    renderCell: (row) => <>{row.quantityToDeliver}</>,
  },
  {
    name: 'Último Preço',
    label: 'lastPrice',
    cell: 'input',
    renderCell: (row) => <>{row.lastPrice}</>,
  },
  {
    name: 'Qtd Cotar',
    label: 'quantityQuotation',
    renderCell: (row) => <>{row.quantityQuotation}</>,
  },
  {
    name: 'Valor',
    renderCell: (row) => <>{row.lastPrice * row.quantityQuotation}</>,
  },
]
