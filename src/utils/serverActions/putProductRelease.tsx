'use server'

import fetchData from '@/utils/fetchData'
import { revalidateTag } from 'next/cache'

interface ProductPutProps {
  id: number
  name: string
  description: string
  min_quantity: number
  quantity_margin: number
  active: boolean
  brand_id: number
  edited: boolean
}

interface PutProductReleaseProps {
  products: ProductPutProps[]
  categoryId: string
}

export default async function putProductRelease({
  products,
}: PutProductReleaseProps) {
  try {
    await fetchData(`enterprise-inventory-actual`, {
      method: 'PUT',
      body: { products },
    })
    revalidateTag('enterprise-inventory-actual')
    return { message: 'Alterações feitas com sucesso', error: false }
  } catch (error) {
    return { message: 'Não foi possível alterar suas mudanças', error: true }
  }
}
