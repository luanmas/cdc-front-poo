import TableBase from '@/components/TableBase'
import fetchData from '@/utils/fetchData'
import { columns } from './columns'
import { Categories, IIdEnterpriseCategory } from '@/components/TableBase/types'

interface IStockConfigurationProduct {
  id: number
  page: string | undefined
  limit: string | undefined
  orderBy?: string
  orderDirection?: string
  productName?: string
}

interface ParamsProps {
  id: string
}

interface BrandId {
  id: number
  name: string
  description: string
}

interface Brand {
  id: number
  name: string
  description: string
}

interface Unit {
  id: number
  name: string
  description: string
}

interface Data {
  id: number
  name: string
  description: string
  unit: Unit
  min_quantity: number
  margin: number
  quantity_margin: number
  active: boolean
  brand_id: BrandId
  brands: Brand[]
}

interface Info {
  id: number
  createdAt: string
  updatedAt: string
  status: boolean
  idEnterpriseCategory: IIdEnterpriseCategory
}

interface IStockConfugurationProductsResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Data[]
  info: Info
}

function getValueSearchParamsSort(searchParams: IStockConfigurationProduct) {
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
  params,
}: {
  searchParams: IStockConfigurationProduct
  params: ParamsProps
}) {
  const categoryId = params.id
  const actualPage = searchParams.page ?? '1'
  const perPage = searchParams.limit ?? '10'

  const fetchDataUrl = buildFetchDataUrl(
    actualPage,
    perPage,
    searchParams,
    `enterprise-inventory/${categoryId}`,
  )

  const { data, info, next, items, prev } = await fetchData<
    undefined,
    IStockConfugurationProductsResponse
  >(fetchDataUrl, {
    next: {
      tags: ['enterprise-inventory'],
    },
  })
  const categories = await fetchData<undefined, Categories>(
    'enterprise-inventory',
  )
  const marginEnterprise = info.enterprise.margin
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
        routeTarget={`estoque/${categoryId}`}
        searchTarget={'productName'}
        columns={columns}
        configProducts={true}
        categorieSelected={info}
        categories={categories.data}
        categoryId={categoryId}
        marginConfigProduct={marginEnterprise}
      />
    </section>
  )
}
