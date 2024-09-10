'use client'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipProps {
  hoverInfo: any
  tooltipContent: string
}

const TooltipComponent: React.FC<TooltipProps> = ({
  hoverInfo,
  tooltipContent,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{hoverInfo}</TooltipTrigger>
        <TooltipContent>
          <p className="text-blue">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipComponent
