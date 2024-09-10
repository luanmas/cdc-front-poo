'use client'

import { Key, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  Categories,
  IEnterpriseInventory,
  TableBaseProps,
  handleCellUpdateProps,
  initialValueProps,
} from './types'
import { RenderCell } from './utils/renderCell'
import PaginationControls from './utils/paginationControls'
import SearchInput from './utils/handleSearchItem'
import { cn } from '@/lib/utils'
import HeaderGridComponents from '../HeaderComponentsStockConfiguration'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Select from '../SelectInput'
import Link from 'next/link'
import putProductConfiguration from '@/utils/serverActions/putProductConfiguration'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { useToast } from '../ui/use-toast'
import { AutoComplete } from '../AutoComplete'
import ModalChoiceQuotation from '../ModalChoiceQuotation'
import { AutoCompleteStockRelease } from '../AutoCompleteStockRelease'
import ModalAskSaveChangeProducts from '../ModalAskSaveChangeProducts'
import putProductRelease from '@/utils/serverActions/putProductRelease'
import { ModalStockReleaseProduct } from '../ModalStockReleaseProduct'
import { IoIosPrint } from 'react-icons/io'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { StockReleaseProductsPDF } from '../StockReleaseProductsPDF'

export default function TableBase<
  Data extends Key | null | undefined | object | boolean,
  Row extends object,
>({
  initialValue,
  page,
  limit,
  next,
  prev,
  actualPage,
  items,
  totalPages,
  searchTarget,
  routeTarget,
  columns,
  margin,
  configProducts,
  categories,
  categorieSelected,
  categoryId,
  enterpriseId,
  releaseProducts,
  releaseCategory,
  releaseLog,
  hasReleaseFooter,
  categoriesStockRelease,
}: TableBaseProps<Data, Row>) {
  const [dataEdited, setDataEdited] = useState<initialValueProps<Data>[]>([])
  const [productsQuotation, setProductsQuotation] = useState(0)
  const { toast } = useToast()
  const [sort, setSort] = useState({
    orderBy: '',
    orderDirection: '',
  })
  const router = useRouter()
  const pathname = usePathname()
  const totalItems = totalPages

  useEffect(() => {
    const quotationsProductValidate = () => {
      let storedDataEdited = [];

      if (typeof window !== "undefined" && localStorage) {
        storedDataEdited = JSON.parse(localStorage.getItem('dataEdited')) || [];
      }

      let initialQuotationCount = 0;
      let editedQuotationCount = 0;

      initialValue.forEach((product) => {
        if (Number(product.quantityQuotation) > 0) {
          initialQuotationCount++;
        }
      });

      storedDataEdited = storedDataEdited.filter((product) => {
        const initialProduct = initialValue.find((p) => p.id === product.id);

        if (initialProduct) {
          if (Number(initialProduct.quantityQuotation) > 0) {
            initialQuotationCount++;
            return true;
          }
        }

        if (Number(product.quantityQuotation) > 0) {
          editedQuotationCount++;
          return true;
        }

        return false;
      });

      initialValue.forEach((product) => {
        const editedProduct = storedDataEdited.find((p) => p.id === product.id);

        if (
          Number(product.quantityQuotation) > 0 &&
          !editedProduct
        ) {
          storedDataEdited.push(product);
          editedQuotationCount++;
        }
      });

      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem('dataEdited', JSON.stringify(storedDataEdited));
      }

      setDataEdited(storedDataEdited);

      return setProductsQuotation(initialQuotationCount + editedQuotationCount);
    }


    quotationsProductValidate();
    
    return () => {
      localStorage.clear();
    }
  }, [initialValue]);


  const categoriesAutoComplete: Categories[] = categories?.map(
    (item: IEnterpriseInventory) => ({
      id: item.idEnterpriseCategory.category.id,
      name: item.idEnterpriseCategory.category.name,
      description: item.idEnterpriseCategory.category.description,
    }),
  )

  const categoriesAutoCompleteRelease = categoriesStockRelease?.map((item) => ({
    id: item.enterpriseInventory.idEnterpriseCategory.category.id,
    name: item.enterpriseInventory.idEnterpriseCategory.category.name,
    description:
      item.enterpriseInventory.idEnterpriseCategory.category.description,
  }))

  const categorieName =
    categorieSelected && categorieSelected.idEnterpriseCategory.category.name
  const categorieId = categorieSelected && categorieSelected.id

  const releaseFooter = {
    totalValue: dataEdited.reduce((acc, current) => {
      return acc + Number(current.lastPrice) * Number(current.quantityQuotation)
    }, 0),
    totalProducts: items,
    productsQuotation: productsQuotation,
  }

  function handleSortClick(orderName: string) {
    const newOrderDirection =
      sort.orderBy === orderName && sort.orderDirection === 'ASC'
        ? 'DESC'
        : 'ASC'

    setSort({
      orderBy: orderName,
      orderDirection: newOrderDirection,
    })
    router.push(
      `${pathname}?page=${actualPage}&limit=${limit}&orderBy=${orderName}&orderDirection=${newOrderDirection}`,
    )
  }

  function handleChangeSort({
    orderName,
    orderDirection,
  }: {
    orderName: string
    orderDirection: string
  }) {
    router.push(
      `${pathname}?page=${actualPage}&limit=${limit}&orderBy=${orderName}&orderDirection=${orderDirection}`,
    )
  }

  const handleProductChange = async () => {
    const productsRows = dataEdited.map((data) => {
      if (
        data?.min_quantity <= 0 ||
        data?.min_quantity === '' ||
        data?.min_quantity === null
      ) {
        return toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          title:
            'Não é aceito produtos com quantidade minima inferiores ou iguais a zero',
          variant: 'destructive',
        })
      }
      const selectedBrand = data?.brands?.find(
        (brand: { selected: boolean }) => brand.selected,
      )
      data.margin = String(data.margin) === '' ? null : data.margin
      data.min_quantity =
        String(data.min_quantity) === '' ? null : data.min_quantity
      return {
        ...data,
        brand_id: selectedBrand ? selectedBrand.id : null,
      }
    })

    const response: Promise<{ message: string; error: boolean }> =
      putProductConfiguration({ products: productsRows, categoryId })

    const { message, error } = await response
    toast({
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
      ),
      title: message,
      variant: error ? 'destructive' : 'success',
    })
    setDataEdited([])
  }

  const handleStockRelease = async () => {
    const products = dataEdited.map((product) => ({
      quantity: product.quantity,
      quantityToDeliver: product.quantityToDeliver,
      id: product.id,
    }))

    const response: Promise<{ message: string; error: boolean }> =
      putProductRelease({ products })

    console.log(response)

    const { message, error } = await response
    if (error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        title: message,
        variant: 'destructive',
      })
    } else {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        title: message,
        variant: 'success',
      })
      setDataEdited([])
      localStorage.clear();
      localStorage.removeItem('dataEdited')
      router.push('/lancamento-estoque')
    }
  }

  const handleCellUpdate = ({
    rowIndex,
    columnName,
    newValue,
  }: handleCellUpdateProps<Data>) => {
    if (initialValue && initialValue[rowIndex]) {
      const updatedData = [...initialValue]
      updatedData[rowIndex][columnName] = newValue
      updatedData[rowIndex].edited = true

      if (columnName === 'quantityQuotation' || columnName === 'lastPrice') {
        const quantity =
          columnName === 'quantityQuotation'
            ? newValue
            : updatedData[rowIndex].quantityQuotation
        const price =
          columnName === 'lastPrice'
            ? newValue
            : updatedData[rowIndex].lastPrice
        updatedData[rowIndex].value = quantity * price
      }

      if (columnName === 'min_quantity' || columnName === 'quantity') {
        const minQuantity =
          columnName === 'min_quantity'
            ? newValue
            : updatedData[rowIndex].min_quantity
        const actualQuantity =
          columnName === 'quantity' ? newValue : updatedData[rowIndex].quantity
        updatedData[rowIndex].purchaseSuggestion = Math.max(
          0,
          minQuantity - actualQuantity,
        )
      }

      if (columnName === 'min_quantity' || columnName === 'quantity') {
        const minQuantity =
          columnName === 'min_quantity'
            ? newValue
            : updatedData[rowIndex].min_quantity
        const actualQuantity =
          columnName === 'quantity' ? newValue : updatedData[rowIndex].quantity
        updatedData[rowIndex].quantityQuotation = Math.max(
          0,
          minQuantity - actualQuantity,
        )
      }

      const isExist = dataEdited.findIndex(
        (obj) => obj.id === updatedData[rowIndex].id,
      )
      if (isExist === -1) {
        setDataEdited((rest) => [...rest, updatedData[rowIndex]])
      } else {
        const newDataEdited = [...dataEdited]
        newDataEdited[isExist] = updatedData[rowIndex]
        setDataEdited(newDataEdited)
      }
    }
  }

  return (
    <>
      {margin && (
        <div className="flex justify-between py-2 space-x-2">
          <div>
            <HeaderGridComponents
              margin={Number(margin)}
              enterpriseId={Number(enterpriseId)}
            />
          </div>
          <div className="w-full">
            <SearchInput
              actualPage={actualPage}
              perPage={limit}
              searchTarget={searchTarget}
              routeTarget={routeTarget}
            />
          </div>
        </div>
      )}
      {configProducts && (
        <div className="flex items-end justify-between mb-2 gap-2">
          <div>
            <Button
              onClick={() => router.push('/estoque')}
              className="text-blue-light inline-flex items-center px-0 bg-blue"
            >
              <FaRegArrowAltCircleLeft size={28} className="mr-1" />
            </Button>
          </div>
          <div>
            {categorieId && categorieName && (
              <AutoComplete
                initialValue={{
                  id: categorieId,
                  name: categorieName,
                  description: '',
                }}
                initialCategories={categoriesAutoComplete}
              />
            )}
          </div>
          <div className="w-[200px]">
            <Select
              className="bg-blue"
              id="filter-products"
              label="Filtro"
              onChange={(e) =>
                handleChangeSort({
                  orderName: 'active',
                  orderDirection: e.target.value,
                })
              }
            >
              <option className="font-sm" disabled>
                Selecione
              </option>
              <option value="DESC" className="bg-white text-gray-dark">
                Ativos
              </option>
              <option value="ASC" className="bg-white text-gray-dark">
                Inativos
              </option>
            </Select>
          </div>
          <div className="w-full">
            <SearchInput
              actualPage={actualPage}
              perPage={limit}
              searchTarget={searchTarget}
              routeTarget={routeTarget}
            />
          </div>
          <div className="w-[150px]">
            <Button
              disabled={!(dataEdited.length > 0)}
              className={`${dataEdited.length > 0 ? 'bg-yellow text-white' : 'bg-gray-dark text-white'} w-full`}
              onClick={handleProductChange}
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      )}
      {releaseProducts && (
        <div className="flex items-end justify-between mb-2 gap-2">
          <div>
            <ModalAskSaveChangeProducts length={dataEdited.length} />
          </div>
          <div className="w-full">
            <SearchInput
              actualPage={actualPage}
              perPage={limit}
              searchTarget={searchTarget}
              routeTarget={routeTarget}
            />
          </div>
          <div>
            {/* <ModalChoiceQuotation
              disabledButton={!(dataEdited.length > 0)}
              classNameButton={`${dataEdited.length > 0 ? 'bg-green text-white' : 'bg-gray-dark/50 text-white/50 '} w-full`}
              handleClick={handleStockRelease}
            /> */}
            <Button disabled={!(dataEdited.length > 0)} onClick={handleStockRelease} >Atualizar estoque</Button>
          </div>
        </div>
      )}
      {releaseCategory && (
        <div className="flex items-end justify-between mb-2 gap-2">
          <div className="w-full">
            <SearchInput
              actualPage={actualPage}
              perPage={limit}
              searchTarget={searchTarget}
              routeTarget={routeTarget}
            />
          </div>
          <div>
            <Button variant={"default"}>
              <Link href={"/lancamento-estoque/produtos"}>Lançar Estoque</Link>
            </Button>
          </div>
        </div>
      )}
      {releaseLog && (
        <div className="flex items-center justify-between mb-2 gap-2">
          <div>
            <Link
              href={'/lancamento-estoque'}
              className="text-blue-light inline-flex items-center py-2"
            >
              <FaRegArrowAltCircleLeft size={28} className="mr-1" />
            </Link>
          </div>
          <div className="w-full">
            <SearchInput
              actualPage={actualPage}
              perPage={limit}
              searchTarget={searchTarget}
              routeTarget={routeTarget}
            />
          </div>
          <div>
            <PDFDownloadLink document={<StockReleaseProductsPDF products={initialValue} />} fileName='listagem'>
              <IoIosPrint size={50} className='bg-blue-light rounded-xl text-white p-2' />
            </PDFDownloadLink>
          </div>
        </div>
      )}

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columns.map((col, index) =>
              col.sort && col.direction ? (
                <TableHead
                  key={col.name}
                  className={cn('', {
                    'rounded-tl-[12px]': index === 0,
                    'rounded-tr-[12px]': index === columns.length - 1,
                  })}
                  onClick={() => handleSortClick(col.orderName)}
                >
                  {col.name}
                </TableHead>
              ) : (
                <TableHead
                  key={col.name}
                  className={cn('', {
                    'rounded-tl-[12px]': index === 0,
                    'rounded-tr-[12px]': index === columns.length - 1,
                  })}
                >
                  {col.name}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialValue.map((row, rowIndex) => (
            <TableRow key={row.id} id={String(rowIndex)}>
              {columns.map((col) =>
                col.renderCell ? (
                  <TableCell className={col?.className} key={col.name}>
                    {col.renderCell(row)}
                  </TableCell>
                ) : (
                  <TableCell className="max-w-[300px]" key={col.name}>
                    {row.brand_id ? (
                      <RenderCell
                        value={row[col.label]}
                        brandId={row?.brand_id?.id}
                        columnType={col.cell}
                        onChange={(newValue) =>
                          handleCellUpdate({
                            rowIndex,
                            columnName: col.label,
                            newValue,
                          })
                        }
                      />
                    ) : (
                      <RenderCell
                        value={row[col.label]}
                        columnType={col.cell}
                        onChange={(newValue) =>
                          handleCellUpdate({
                            rowIndex,
                            columnName: col.label,
                            newValue,
                          })
                        }
                      />
                    )}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
          {Array.from({
            length: Number(limit) - initialValue.length,
          }).map((_, index) => (
            <TableRow
              key={`empty-${index}`}
              className={`h-[55px] ${Number(index) % 2 === 0 ? 'bg-gray-dark' : 'bg-gray-light'}`}
            >
              {columns.map((col) => (
                <TableCell key={`empty-cell-${col.name}`}>{''}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter className="w-full rounded-b-[12px] px-2">
        <PaginationControls
          items={totalItems}
          next={next}
          prev={prev}
          page={page}
          perPage={limit}
          pages={String(items)}
          routeTarget={routeTarget}
          releaseFooter={releaseFooter}
          hasReleaseFooter={hasReleaseFooter}
        />
      </TableFooter>
    </>
  )
}
