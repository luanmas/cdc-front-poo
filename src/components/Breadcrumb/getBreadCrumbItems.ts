import { IBreacrumbListProps, INamesLinkProps } from './breadcumbList'

export function getBreadcrumbItems(
  pathname: string,
  breadCrumbList: IBreacrumbListProps[],
) {
  const breadcrumbItems: INamesLinkProps[] = []

  breadCrumbList.forEach((breadcrumb) => {
    breadcrumb.dynamicLinks.forEach((dynamicLink) => {
      const matchPattern = dynamicLink.match.replace(/:\w+/g, '[^/]+')
      const match = new RegExp(`^${matchPattern}$`)
      if (match.test(pathname)) {
        dynamicLink.namesLink.forEach((link) => {
          if (breadcrumbItems[link.sort]) {
            breadcrumbItems[link.sort] = {
              ...breadcrumbItems[link.sort],
              ...link,
            }
          } else {
            breadcrumbItems[link.sort] = link
          }
        })
      }
    })
  })

  return breadcrumbItems
}
