'use server'

import fetchData from '@/utils/fetchData'
import { revalidateTag } from 'next/cache'

interface putMarginProps {
  margin: number
  enterpriseId: number
}

export default async function putMargin({
  margin,
  enterpriseId,
}: putMarginProps) {
  const body = { margin }
  try {
    await fetchData(`enterprises/${enterpriseId}`, {
      method: 'PUT',
      body,
    })
    revalidateTag('enterprise')
    return { message: 'alteração feita com sucesso', error: false }
  } catch (error) {
    return { message: 'Não foi possível alterar a margin global', error: true }
  }
}
