'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React from 'react'
import { breadCrumbList } from './breadcumbList'
import { getBreadcrumbItems } from './getBreadCrumbItems'

export function BreadcrumbMenu() {
  const pathname = usePathname()
  const breadcrumbItems = getBreadcrumbItems(pathname, breadCrumbList)

  return (
    <Breadcrumb className="py-4 w-[94%] ml-[6%] pl-4 bg-blue text-white border-b-2 border-opacity-20 border-white">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="text-lg">
              {item.link && (
                <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
              )}
              {item.active && (
                <span className="text-yellow underline">{item.name}</span>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
