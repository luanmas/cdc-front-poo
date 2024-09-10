export interface INamesLinkProps {
  name: string
  active: boolean
  sort: number
  link?: string
}

export interface IDynamicLinksProps {
  match: string
  namesLink: INamesLinkProps[]
}

export interface IBreacrumbListProps {
  dynamicLinks: IDynamicLinksProps[]
}

export const breadCrumbList: IBreacrumbListProps[] = [
  {
    dynamicLinks: [
      {
        match: '/lancamento-estoque',
        namesLink: [
          {
            name: 'Lançamento de Estoque',
            active: false,
            sort: 0,
            link: '/lancamento-estoque',
          },
        ],
      },
      {
        match: '/lancamento-estoque/:id',
        namesLink: [
          {
            name: 'Lançamento de Estoque',
            active: false,
            link: '/lancamento-estoque',
            sort: 0,
          },
          {
            name: 'Produtos',
            active: true,
            sort: 1,
          },
        ],
      },
      {
        match: '/lancamento-estoque/registro/:id',
        namesLink: [
          {
            name: 'Lançamento de Estoque',
            active: false,
            link: '/lancamento-estoque',
            sort: 0,
          },
          {
            name: 'Registros',
            active: true,
            sort: 1,
          },
        ],
      },
    ],
  },
  {
    dynamicLinks: [
      {
        match: '/cotacao',
        namesLink: [
          {
            name: 'Cotação',
            active: false,
            sort: 0,
            link: '/cotacao',
          },
        ],
      },
    ],
  },
  {
    dynamicLinks: [
      {
        match: '/empresa',
        namesLink: [
          {
            name: 'Empresa',
            active: false,
            link: '/empresa',
            sort: 0,
          },
        ],
      },
    ],
  },
  {
    dynamicLinks: [
      {
        match: '/fornecedores',
        namesLink: [
          {
            name: 'Fornecedores',
            active: false,
            link: '/fornecedores',
            sort: 0,
          },
        ],
      },
    ],
  },
  {
    dynamicLinks: [
      {
        match: '/pedidos',
        namesLink: [
          {
            name: 'Pedidos',
            active: false,
            sort: 0,
            link: '/pedidos',
          },
        ],
      },
    ],
  },
  {
    dynamicLinks: [
      {
        match: '/estoque',
        namesLink: [
          {
            name: 'Estoque Configuração',
            active: false,
            link: '/estoque',
            sort: 0,
          },
          {
            name: 'Categorias',
            active: true,
            sort: 1,
          },
        ],
      },
      {
        match: '/estoque/:id',
        namesLink: [
          {
            name: 'Estoque Configuração',
            link: '/estoque',
            active: false,
            sort: 0,
          },
          {
            name: 'Categorias',
            sort: 1,
            link: '/estoque',
            active: false,
          },
          {
            name: 'Produtos',
            sort: 2,
            active: true,
          },
        ],
      },
    ],
  },
]
