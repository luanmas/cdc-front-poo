'use server'

import fetchData from '@/utils/fetchData'
import { revalidateTag } from 'next/cache'

interface IRequest {
    data: any
    id: string
}

export default async function putEnterprise({ data, id }: IRequest) {
  try {
    const response = await fetchData(`enterprises/${id}`, {
      method: 'PUT',
      body: data,
    })
    console.log(response)
    revalidateTag('enterprise-post')
    return { message: 'alteração feita com sucesso', error: false }
  } catch (error) {
    console.log(error.message)
    return { message: 'Não foi possível criar uma empresa', error: true }
  }
}