'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Profile({
  imageIcon = 'https://github.com/shadcn.png',
}: {
  imageIcon: string
}) {
  return (
    <>
      <Avatar>
        <AvatarImage src={imageIcon} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  )
}
