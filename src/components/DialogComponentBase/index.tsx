import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ModalDialogBaseProps {
  buttonTitle?: string | ReactNode
  children?: ReactNode
  descriptionDialog?: string
  titleDialog?: string
  classNameButton?: string
  classNameTitleDialog?: string
  classNameDescDialog?: string
  disabledButton?: boolean
}

export function DialogBase({
  buttonTitle,
  titleDialog,
  descriptionDialog,
  children,
  classNameButton,
  classNameDescDialog,
  classNameTitleDialog,
  disabledButton,
}: ModalDialogBaseProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabledButton} className={cn(classNameButton)}>
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn(classNameTitleDialog)}>
            {titleDialog}
          </DialogTitle>
          <DialogDescription className={cn(classNameDescDialog)}>
            {descriptionDialog}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 place-content-center">{children}</div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
