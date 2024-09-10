'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TableCell, TableRow } from '@/components/ui/table'
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri'

interface releaseFooterProps {
  totalValue: number
  totalProducts: number
  productsQuotation: number
}

interface PaginationControlsProps {
  next: number | null
  prev: number | null
  page: string | string[]
  pages: string
  perPage: string | string[]
  items: string
  routeTarget: string
  releaseFooter?: releaseFooterProps
  hasReleaseFooter?: boolean
}

const PaginationControls: FC<PaginationControlsProps> = ({
  next,
  prev,
  page,
  perPage,
  pages,
  items,
  routeTarget,
  releaseFooter,
  hasReleaseFooter,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getUpdatedUrl = (newPage: number | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newPage !== null) {
      params.set('page', newPage.toString())
      params.set('limit', perPage.toString())
    }

    return `/${routeTarget}?${params.toString()}`
  }

  return (
    <>
      <TableRow className="bg-opacity-0 border-b-0">
        {releaseFooter && hasReleaseFooter ? (
          <>
            <TableCell>
              Total de Produtos: {releaseFooter.totalProducts}
            </TableCell>
            <TableCell>
              Produtos a cotar: {releaseFooter.productsQuotation}
            </TableCell>
            <TableCell>
              Valor Previsto:{' '}
              {releaseFooter.totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>Total de Items: {items}</TableCell>
          </>
        )}
      </TableRow>
      <TableRow className="bg-opacity-0 border-b-0 flex">
        <div className="flex items-center">
          <span>
            {page} - {pages} de {items}
          </span>
          <TableCell>
            <button
              className={`text-yellow ${prev === null ? 'text-opacity-50' : ''}`}
              disabled={prev === null}
              onClick={() => {
                router.push(getUpdatedUrl(prev), { scroll: false })
              }}
            >
              <RiArrowDropLeftLine size={'30px'} />
            </button>
          </TableCell>
          <TableCell className="pl-2">
            <button
              className={`text-yellow ${next === null ? 'text-opacity-50' : ''}`}
              disabled={next === null}
              onClick={() => {
                router.push(getUpdatedUrl(next), { scroll: false })
              }}
            >
              <RiArrowDropRightLine size={'30px'} />
            </button>
          </TableCell>
        </div>
      </TableRow>
    </>
  )
}

export default PaginationControls
