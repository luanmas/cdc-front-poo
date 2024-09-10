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
import { Search } from '../Search'
import { usePathname, useRouter } from 'next/navigation'
import { Categories } from '../TableBase/types'

const POPOVER_WIDTH = 'w-[250px]'

interface IAutoCompleteProps {
  initialValue: Categories
  initialCategories: Categories[]
}

export function AutoComplete({
  initialValue,
  initialCategories,
}: IAutoCompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Categories>(initialValue)
  const router = useRouter()
  const pathname = usePathname()

  const handleSetActive = React.useCallback(
    (categorie: Categories) => {
      const lastSlashIndex = pathname.lastIndexOf('/')
      const newPathname = pathname.slice(0, lastSlashIndex + 1)
      setSelected(categorie)
      router.push(`${newPathname}${categorie.id}`)
      setOpen(false)
    },
    [pathname, router],
  )

  const displayName = selected ? selected.name : 'Selecionar categoria'

  return (
    <>
      <div className="relative flex top-2 left-2 w-min px-2 bg-blue text-sm text-blue-light">
        Categorias
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="bg-blue text-white border border-blue-light"
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
          <Search
            selectedResult={selected}
            onSelectResult={handleSetActive}
            initialCategories={initialCategories}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
