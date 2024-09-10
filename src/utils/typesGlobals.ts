export interface Contact {
  id: number
  email: string
  telephone: string
  cellPhone: string
}

export interface Address {
  id: number
  cep: string
  state: string
  city: string
  district: string
  street: string
}

export interface User {
  id: number
  email: string
  displayName: string
  photoLink: string
  createdAt: string
  id_enterprise: number
}

export interface Enterprise {
  id: number
  name: string
  cnpj: string
  company: string
  createdAt: string
  updatedAt: string | null
  margin: number
  contact: Contact
  address: Address
  user: User
}
