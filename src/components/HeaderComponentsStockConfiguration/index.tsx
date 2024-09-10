'use client'

import { useRef, useState } from 'react'
import putMargin from '@/utils/serverActions/putMargin'
import { Input } from '@/components/ui/input'
import { useToast } from '../ui/use-toast'
import { cn } from '@/lib/utils'

interface HeaderGridComponentsProps {
  margin: number | null
  enterpriseId: number
}

export default function HeaderGridComponents({
  margin,
  enterpriseId,
}: HeaderGridComponentsProps) {
  const { toast } = useToast()
  const timeoutRef = useRef<null | NodeJS.Timeout>(null)
  const [marginGlobal, setMarginGlobal] = useState<number | null>(margin)

  async function handleChangeMargin(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    const value = e.target.value
    let numericValue = value.replace(/[^0-9]/g, '')

    // Remove leading zeros
    numericValue = numericValue.replace(/^0+/, '')

    // If numericValue is empty after removing leading zeros, reset to margin
    if (numericValue === '') {
      setMarginGlobal(null)
      return
    }

    setMarginGlobal(Number(numericValue))

    timeoutRef.current = setTimeout(async () => {
      if (numericValue !== '' && numericValue !== '0') {
        const response: Promise<{ message: string; error: boolean }> =
          putMargin({
            margin: Number(numericValue),
            enterpriseId,
          })
        const { message, error } = await response
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          title: 'Margem Global',
          description: message,
          variant: error ? 'destructive' : 'success',
        })
      }
    }, 500)
  }

  return (
    <>
      <Input
        sizeType="sm"
        label="Margem %"
        id="margin"
        type="text"
        value={marginGlobal !== null ? marginGlobal : ''}
        onChange={handleChangeMargin}
      />
    </>
  )
}
