'use client'

import * as React from 'react'
import { ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePathname, useRouter } from 'next/navigation'
import { Categories } from '../TableBase/types'
import { SearchStockRelease } from './SearchStockRelease'

const POPOVER_WIDTH = 'w-[250px]'

interface IAutoCompleteProps {
  initialValue?: Categories
  initialCategories: Categories[]
}

export function AutoCompleteStockRelease({
  initialValue,
  initialCategories,
}: IAutoCompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Categories>(initialValue!)
  const router = useRouter()
  const pathname = usePathname()

  const handleSetActive = React.useCallback(
    (categorie: Categories) => {
      setSelected(categorie)
      router.push(`${pathname}/${categorie.id}`)
      setOpen(false)
    },
    [pathname, router],
  )

  const displayName = 'Lançar Estoque'

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="bg-yellow text-white border border-yellow"
          asChild
        >
          <Button
            variant="outline"
            role="combobox"
            className={cn('flex justify-between', POPOVER_WIDTH)}
          >
            <span className="overflow-hidden">{displayName}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent side="bottom" className={cn('p-0', POPOVER_WIDTH)}>
          <SearchStockRelease
            selectedResult={selected}
            onSelectResult={handleSetActive}
            initialCategories={initialCategories}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
