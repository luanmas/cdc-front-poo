'use client'

import React from 'react'
import { GoSignOut } from 'react-icons/go'
import TooltipComponent from '../Tooltip'
import logout from './serverActions/lougoutFunctions'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.refresh()
  }

  return (
    <div
      onClick={handleLogout}
      className="text-white text-opacity-75 hover:text-opacity-100 bg-blue-light bg-opacity-75 hover:bg-opacity-100 text-base rounded-md flex justify-center items-center p-2"
    >
      <TooltipComponent
        hoverInfo={<GoSignOut size={20} />}
        tooltipContent="Sair"
      />
    </div>
  )
}
