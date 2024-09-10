export interface IStockPageSearchParams {
  page: string | undefined
  limit: string | undefined
  orderBy?: string
  orderDirection?: string
  categoryName?: string
}

interface Category {
  id: number
  name: string
  description: string
}

interface EnterpriseCategory {
  id: number
  active: boolean
  category: Category
}

interface DataItem {
  id: number
  margin: number
  createdAt: string
  updatedAt: string | null
  status: boolean
  idEnterpriseCategory: EnterpriseCategory
  productCount: string
}

export interface FetchResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: DataItem[]
}
