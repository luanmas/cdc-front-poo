import TableBase from '@/components/TableBase'
import { columns } from './columns'
import { FetchResponse, IStockPageSearchParams } from '.'
import fetchData from '@/utils/fetchData'
import { Enterprise } from '@/utils/typesGlobals'
import Link from 'next/link'

function getValueSearchParamsSort(searchParams: IStockPageSearchParams) {
  const params: {
    searchParamsSortName: string
    searchParamsSortValue: string
  }[] = []

  if (searchParams.categoryName) {
    params.push({
      searchParamsSortName: 'categoryName',
      searchParamsSortValue: searchParams.categoryName,
    })
  }

  if (searchParams.orderBy) {
    params.push({
      searchParamsSortName: 'orderBy',
      searchParamsSortValue: searchParams.orderBy,
    })
  }

  if (searchParams.orderDirection) {
    params.push({
      searchParamsSortName: 'orderDirection',
      searchParamsSortValue: searchParams.orderDirection,
    })
  }

  return params
}

export function buildFetchDataUrl(
  actualPage: string,
  perPage: string,
  searchParams: IStockPageSearchParams,
  endpoint: string,
) {
  const params = getValueSearchParamsSort(searchParams)
  let baseUrl = `${endpoint}?page=${actualPage}&limit=${perPage}`

  if (params.length > 0) {
    const queryParams = params
      .map(
        (param) =>
          `${param.searchParamsSortName}=${param.searchParamsSortValue}`,
      )
      .join('&')
    baseUrl += `&${queryParams}`
  }

  return baseUrl
}

export default async function StockConfiguration({
  searchParams,
}: {
  searchParams: IStockPageSearchParams
}) {
  const actualPage = searchParams.page ?? '1'
  const perPage = searchParams.limit ?? '10'
  const response = await fetchData<void, { id_enterprise: string }>('auth/status')

  if(response.user.id_enterprise === null) {
    return (
      <section className='flex flex-col justify-center items-center h-screen space-y-2'>
        <h2 className='text-white font-semibold text-2xl'>Você não tem empresa associada</h2>
        <Link className='text-xl font-semibold bg-blue-light text-white p-2 rounded-md' href={"/empresa"}>Criar empresa</Link>
      </section>
    )
  }

  const fetchDataUrl = buildFetchDataUrl(
    actualPage,
    perPage,
    searchParams,
    'enterprise-inventory',
  )
  const { data, items, next, pages, prev } = await fetchData<
    undefined,
    FetchResponse
  >(fetchDataUrl)
  const user = await fetchData('auth/status')
  const enterprise = await fetchData<undefined, Enterprise>(
    `enterprises/${user.user.id_enterprise}`,
    {
      next: {
        tags: ['enterprise'],
      },
    },
  )
  const categories = await fetchData('enterprise-inventory')
  const itemsPerPage = data.length
  return (
    <div className="px-10 py-3">
      <TableBase
        initialValue={data}
        categories={categories.data}
        enterpriseId={user.user.id_enterprise}
        page={actualPage}
        limit={perPage}
        totalPages={String(items)}
        next={next}
        prev={prev}
        actualPage={actualPage}
        items={String(itemsPerPage)}
        routeTarget={'estoque'}
        searchTarget={'categoryName'}
        columns={columns}
        margin={Number(enterprise.margin)}
        sortParams={getValueSearchParamsSort(searchParams)}
      />
    </div>
  )
}
