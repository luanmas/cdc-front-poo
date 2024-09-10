'use client'

import { useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { CiSearch } from 'react-icons/ci'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  actualPage: string
  perPage: string
  searchTarget: string
  routeTarget: string
}

const SearchInput = ({
  actualPage,
  perPage,
  searchTarget,
  routeTarget,
}: SearchInputProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getUpdatedUrl = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', actualPage)
    params.set('limit', perPage)
    params.set(searchTarget, value)

    return `/${routeTarget}?${params.toString()}`
  }

  const timeoutRef = useRef<null | NodeJS.Timeout>(null)

  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    timeoutRef.current = setTimeout(() => {
      const searchValue = e.target.value.trim()

      if (searchValue === '') {
        router.push(`/${routeTarget}`)
      } else {
        router.push(getUpdatedUrl(searchValue))
      }
    }, 500)
  }

  return (
    <Input
      sizeType="lg"
      label="Pesquisar"
      iconLeft={<CiSearch size={20} className="mr-1" />}
      id="search"
      type="text"
      onChange={handleSearchItem}
    />
  )
}

export default SearchInput
