'use server'

import fetchData from '@/utils/fetchData'
import { revalidateTag } from 'next/cache'

export default async function postEnterprise(data: any) {
  try {
    const response = await fetchData(`enterprises`, {
      method: 'POST',
      body: data,
    })
    console.log(response)
    revalidateTag('enterprise-post')
    return { message: 'alteração feita com sucesso', error: false }
  } catch (error) {
    console.log(error)
    return { message: 'Não foi possível criar uma empresa', error: true }
  }
}