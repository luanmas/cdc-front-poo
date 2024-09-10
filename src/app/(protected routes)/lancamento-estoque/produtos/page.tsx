import TableBase from '@/components/TableBase'
import fetchData from '@/utils/fetchData'
import { columns } from './column'

function getValueSearchParamsSort(searchParams) {
  const params: {
    searchParamsSortName: string
    searchParamsSortValue: string
  }[] = []

  if (searchParams.productName) {
    params.push({
      searchParamsSortName: 'productName',
      searchParamsSortValue: searchParams.productName,
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

function buildFetchDataUrl(
  actualPage: string,
  perPage: string,
  searchParams: IStockConfigurationProduct,
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

export default async function StockConfigurationProduct({
  searchParams,
}: {
  searchParams,
}) {
  const actualPage = searchParams.page ?? '1'
  const perPage = searchParams.limit ?? '10'

  const fetchDataUrl = buildFetchDataUrl(
    actualPage,
    perPage,
    searchParams,
    `enterprise-inventory-actual`,
  )
  const { data, next, items, prev } = await fetchData(
    fetchDataUrl,
    {
      next: {
        tags: ['enterprise-inventory-actual'],
      },
    },
  )
  const categories = await fetchData<undefined, Categories>(
    'enterprise-inventory',
  )
  const itemsPerPage = data.length

  return (
    <section className="px-10 py-3">
      <TableBase
        initialValue={data}
        page={actualPage}
        limit={perPage}
        totalPages={String(items)}
        next={next}
        prev={prev}
        actualPage={actualPage}
        items={String(itemsPerPage)}
        routeTarget={`lancamento-estoque/produtos`}
        searchTarget={'productName'}
        columns={columns}
        releaseProducts={true}
        hasReleaseFooter={true}
      />
    </section>
  )
}
