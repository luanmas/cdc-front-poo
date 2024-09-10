import { ReactNode } from 'react'

export interface ColumnsProps<Row extends object> {
  name: string
  orderName?: string
  sort?: boolean
  cell?: string
  label?: string
  direction?: string
  className?: string
  renderCell?: (row: Row) => ReactNode
}

export interface inputSelectProps {
  id: number | undefined
  name: string | number | readonly string[] | undefined
  option: string
  selected: boolean
}

type Data<T> = T | string

export interface initialValueProps<T> {
  id: string
  [key: string]: Data<T>
}

export interface Categories {
  id: number
  name: string
  description: string
}

export interface IIdEnterpriseCategory {
  id: number
  active: boolean
  category: Categories
}
export interface IEnterpriseInventory {
  id: number
  createdAt: string
  updatedAt: string
  status: boolean
  idEnterpriseCategory: IIdEnterpriseCategory
}

export interface TableBaseProps<Data, Row extends object> {
  initialValue: initialValueProps<Data>[]
  hasReleaseFooter?: boolean
  categoryId?: string
  page: string
  totalPages: string
  limit: string
  next: number | null
  prev: number | null
  actualPage: string
  searchParamsSortName?: string | null
  searchParamsSortValue?: string | null
  items: string
  searchTarget: string
  routeTarget: string
  columns: ColumnsProps<Row>[]
  margin?: number
  configProducts: boolean
  releaseProducts?: boolean
  releaseCategory?: boolean
  releaseLog?: boolean
  categories?: IEnterpriseInventory[]
  categorieSelected?: IEnterpriseInventory
  categoriesStockRelease?: any[]
  enterpriseId?: string
  marginConfigProduct?: number
}

export type Value<T> = string | boolean | inputSelectProps[] | T

export interface RenderCellProps<T> {
  value: Value<string | boolean | inputSelectProps[]>
  columnType: string
  brandId?: number
  onChange: (newValue: Value<string | boolean | inputSelectProps[] | T>) => void
}

export interface handleCellUpdateProps<Data> {
  rowIndex: number
  columnName: keyof initialValueProps<Data>
  newValue: initialValueProps<string | boolean | inputSelectProps[]>
}
