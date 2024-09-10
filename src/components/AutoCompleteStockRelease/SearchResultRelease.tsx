import { useEffect, useState } from 'react'
import { SearchProps } from '../Search'
import { CommandItem, CommandList } from '@/components/ui/command'
import { Check } from 'lucide-react'
import { Categories } from '@/components/TableBase/types'
import { cn } from '@/lib/utils'

interface SearchResultsProps {
  query: string
  selectedResult: SearchProps['selectedResult']
  onSelectResult: SearchProps['onSelectResult']
  initialCategories: Categories[]
}

export function SearchResultStockRelease({
  query,
  selectedResult,
  onSelectResult,
  initialCategories,
}: SearchResultsProps) {
  const [categories, setCategories] = useState<Categories[]>(initialCategories)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch(
      `http://localhost:5000/api/enterprise-inventory-actual/categories?categoryName=${query}`,
      { credentials: 'include' },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        if (data && data.data) {
          const categories = data.data.map((item) => ({
            id: item.id,
            name: item.enterpriseInventory.idEnterpriseCategory.category.name,
            description:
              item.enterpriseInventory.idEnterpriseCategory.category
                .description,
          }))
          setCategories(categories)
        }
      })
      .catch(() => {
        setError('')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [query])

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">Buscando...</div>}
      {error && <div className="p-4 text-sm">{error}</div>}
      {!isLoading && categories.length === 0 && (
        <div className="p-4 text-sm">Nenhuma categoria...</div>
      )}
      {categories.map(({ id, name, description }) => {
        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult({ id, name, description })}
            value={name}
            className="z-auto cursor-pointer text-white"
          >
            <Check
              className={cn(
                'mr-2 h-4 w-4',
                selectedResult?.id === id ? 'opacity-100' : 'opacity-0',
              )}
            />
            {name}
          </CommandItem>
        )
      })}
    </CommandList>
  )
}
