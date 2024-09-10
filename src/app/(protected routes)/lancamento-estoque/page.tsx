import TableBase from '@/components/TableBase'
import { columns } from './column'
import fetchData from '@/utils/fetchData'
import Link from 'next/link'

function getValueSearchParamsSort(searchParams: {
  categoryName: any
  orderBy: any
  orderDirection: any
}) {
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
  searchParams: any,
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

export default async function StockRelease({ searchParams }) {
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
    'enterprise-inventory-actual/log',
  )

  const { data, items, next, pages, prev } = await fetchData(fetchDataUrl, {
    next: {
      tags: ['enterprise-inventory-actual'],
    },
  })

  if (typeof window !== "undefined" && localStorage) {
    localStorage.removeItem('dataEdited');
    localStorage.clear();
  }

  const categories = await fetchData('enterprise-inventory-actual/categories')
  const itemsPerPage = data.length
  return (
    <div className="px-10 py-3">
      <TableBase
        initialValue={data}
        routeTarget={'lancamento-estoque'}
        searchTarget={'categoryName'}
        columns={columns}
        items={String(itemsPerPage)}
        limit={perPage}
        next={next}
        totalPages={String(items)}
        actualPage={actualPage}
        page={actualPage}
        releaseCategory={true}
        prev={prev}
        categoriesStockRelease={categories.data}
        sortParams={getValueSearchParamsSort(searchParams)}
      />
    </div>
  )
}
