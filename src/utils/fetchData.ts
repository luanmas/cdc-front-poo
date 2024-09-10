import { cookies } from 'next/headers'

interface FetchDataOptions<T> extends Omit<RequestInit, 'body'> {
  body?: T
  headers?: Record<string, string>
  method?:
    | 'HEAD'
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH'
}

export default async function fetchData<T, U>(
  endpoint: string,
  options: FetchDataOptions<T> = {},
): Promise<U> {
  const { body, headers: optionHeaders = {}, method, ...otherOptions } = options

  const headers = new Headers(optionHeaders)

  headers.append(
    'cookie',
    `connect.sid=${cookies().get('connect.sid')?.value as string}`,
  )
  headers.append('connection', 'keep-alive')

  if (body) {
    headers.append('Content-Type', 'application/json')
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/${endpoint}`, {
    method: method ?? 'GET',
    body: body ? JSON.stringify(body) : null,
    headers,
    credentials: 'include',
    ...otherOptions,
  })

  let responseBody = null

  const contentType = response.headers.get('Content-Type')
  if (contentType?.includes('application/json')) {
    responseBody = await response.json()
  }

  if (!response.ok) {
    if (responseBody && 'message' in responseBody) {
      throw new Error(responseBody.message)
    }

    throw new Error('Erro ao tentar fazer a requisição')
  }

  return responseBody as U
}
