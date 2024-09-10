import { IoWalletOutline } from 'react-icons/io5'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import { LuPackageSearch } from 'react-icons/lu'
import { AiOutlineSetting, AiOutlineShopping } from 'react-icons/ai'
import { ReactElement } from 'react'
import { CiGrid41 } from 'react-icons/ci'

type routesProps = {
  link: string
  name: string
  icon: ReactElement<any, any>
}

export const routes: routesProps[] = [
  {
    link: 'empresa',
    name: 'Empresa',
    icon: <IoWalletOutline size={32} />,
  },
  {
    link: 'lancamento-estoque',
    name: 'Lançamento de Estoque',
    icon: <LuPackageSearch size={32} />,
  },
  {
    link: 'estoque',
    name: 'Estoque Configuração - Categorias',
    icon: <AiOutlineSetting size={32} />,
  },
]
