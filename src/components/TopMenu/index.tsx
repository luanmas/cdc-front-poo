'use client'
import React from 'react'

import { FaBell } from 'react-icons/fa'
import { routes } from '../SideMenu/routes'
import { usePathname } from 'next/navigation'

export default function TopMenu({ isLogin }: { isLogin: boolean }) {
  const pathname = usePathname()
  const formatDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.toLocaleString('pt-BR', { month: 'long' })
    const year = date.getFullYear()

    return `${day} de ${month}, ${year}`
  }

  return (
    <div
      className={`py-5 px-3 flex justify-between sticky z-10 top-0 items-center border-b-2 bg-blue border-blue-dark ${isLogin ? 'w-full' : 'w-[94%]'} ${isLogin ? 'ml-0' : 'ml-[6%]'}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-white mr-3 font-semibold text-2xl">
          {isLogin
            ? 'Olá, tudo bem'
            : routes.map(
                (route) =>
                  route.link === pathname.split('/').join('') && route.name,
              )}
        </h1>
      </div>
      <div className="flex space-x-4">
        <h3 className="text-sm text-blue-light">{formatDate()}</h3>
        <FaBell
          size={20}
          className={`${isLogin ? 'hidden' : 'block'} text-blue-light cursor-pointer`}
        />
      </div>
    </div>
  )
}
