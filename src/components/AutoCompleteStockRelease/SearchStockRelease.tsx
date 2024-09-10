import * as React from 'react'

import { Command, CommandInput } from '@/components/ui/command'
import { SearchResultStockRelease } from './SearchResultRelease'
import { Categories } from '../TableBase/types'

export interface SearchProps {
  selectedResult?: Categories
  onSelectResult: (categorie: Categories) => void
  initialCategories: Categories[]
}

export function SearchStockRelease({
  selectedResult,
  onSelectResult,
  initialCategories,
}: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debouncedQuery, setDebouncedQuery] = React.useState('')

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  const handleSelectResult = (categorie: Categories) => {
    onSelectResult(categorie)
    setSearchQuery('')
  }

  return (
    <Command
      shouldFilter={false}
      className="z-50 h-auto rounded-lg border border-b-0 shadow-md bg-blue text-white"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Buscar categoria"
        className="text-white bg-blue"
      />

      <SearchResultStockRelease
        query={debouncedQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
        initialCategories={initialCategories}
      />
    </Command>
  )
}
