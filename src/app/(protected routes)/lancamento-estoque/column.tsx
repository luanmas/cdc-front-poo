'use client'

import { ColumnsProps } from '@/components/TableBase/types'
import Link from 'next/link'
import { formatISOToBrazilian } from '@/utils/formatDate'
import { IoEyeSharp } from 'react-icons/io5'

export const columns: ColumnsProps<T>[] = [
  {
    name: 'Última Atualização',
    label: 'updatedAt',
    renderCell: (row) => (
      <>{row.updatedAt === null ? '' : formatISOToBrazilian(row.updatedAt)}</>
    ),
  },
  {
    name: 'Estoque',
    renderCell: (row) => (
      <Link
        className="flex justify-center underline"
        href={`/lancamento-estoque/registro/${row.id}`}
      >
        Detalhe
      </Link>
    ),
  },
]
