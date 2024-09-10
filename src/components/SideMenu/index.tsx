'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import logo from '../../assets/logo.png'
import LogoutButton from '../LogoutButton/logout'
import Profile from '../Profile'

import TooltipComponent from '../Tooltip'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { routes } from './routes'

export default function SideMenu() {
  const [currentPage, setCurrentPage] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    routes.forEach((route) => {
      if (route.link === pathname.split('/').join('')) {
        setCurrentPage(route.name)
      }
    })
  }, [pathname])

  return (
    <div className="h-screen p-4 flex flex-col w-[6%] bg-blue-dark items-center fixed">
      <Image src={logo} alt="" width={80} />
      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => (
            <button
              onClick={() => router.push(`/${route.link}`)}
              disabled={!!currentPage.includes(route.name)}
              key={route.name}
              className="py-1"
            >
              <NavigationMenuItem
                changeColor={!!currentPage.includes(route.name)}
              >
                <TooltipComponent
                  hoverInfo={route.icon}
                  tooltipContent={route.name}
                />
              </NavigationMenuItem>
            </button>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <LogoutButton />
      <div className="w-full h-[2px] bg-white my-5 opacity-25"></div>
      <Profile imageIcon="" />
    </div>
  )
}
