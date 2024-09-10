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

interface PutProductConfigurationProps {
  products: ProductPutProps[]
  categoryId: string
}

export default async function putProductConfiguration({
  products,
  categoryId,
}: PutProductConfigurationProps) {
  const body = { products }
  try {
    await fetchData(`enterprise-inventory/${categoryId}`, {
      method: 'PUT',
      body,
    })
    revalidateTag('enterprise-inventory')
    return { message: 'Alterações feitas com sucesso', error: false }
  } catch (error) {
    return { message: 'Não foi possível fazer as alterações', error: true }
  }
}
