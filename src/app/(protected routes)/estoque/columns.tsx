'use client'

import { ColumnsProps } from '@/components/TableBase/types'
import Link from 'next/link'
import { formatISOToBrazilian } from '@/utils/formatDate'
import { IoIosSettings } from 'react-icons/io'

export const columns: ColumnsProps<T>[] = [
  {
    name: 'Categoria',
    orderName: 'categoryName',
    direction: 'ASC',
    sort: true,
    label: 'idEnterpriseCategory.category.name',
    cell: 'text',
    renderCell: (row) => <>{row.idEnterpriseCategory.category.name}</>,
  },
  {
    name: 'Data Atualização',
    label: 'updatedAt',
    renderCell: (row) => (
      <>{row.updatedAt === null ? '' : formatISOToBrazilian(row.updatedAt)}</>
    ),
  },
  {
    name: 'Produtos Ativos',
    label: 'productCount',
    renderCell: (row) => <>{row.productCount}</>,
  },
  {
    name: 'Configuração',
    label: 'status',
    renderCell: (row) => (
      <span className={`${row.status ? 'text-green' : 'text-yellow'}`}>
        {row.status ? 'Configurado' : 'Pendente'}
      </span>
    ),
  },
  {
    name: 'Configurar',
    renderCell: (row) => (
      <Link
        className="flex justify-center"
        href={`http://localhost:3000/estoque/${row.id}`}
      >
        <IoIosSettings size={20} />
      </Link>
    ),
  },
]
