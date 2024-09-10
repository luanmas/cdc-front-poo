'use client'

import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { DialogBase } from '../DialogComponentBase'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'

interface ModalAskSaveChangeProductsProps {
  length: number
}

export default function ModalAskSaveChangeProducts({
  length,
}: ModalAskSaveChangeProductsProps) {
  const router = useRouter()

  return (
    <>
      {length > 0 ? (
        <DialogBase
          titleDialog="Descartar alterações ?"
          classNameButton="text-blue-light bg-blue py-0 px-0"
          buttonTitle={<FaRegArrowAltCircleLeft size={28} className="mr-1" />}
        >
          <div className="flex justify-between w-[300px]">
            <Button
              onClick={() => {
                router.push('/lancamento-estoque')
                localStorage.clear();
                localStorage.removeItem('dataEdited')
              }}
              className="bg-green text-white py-1 text-lg"
            >
              Sim
            </Button>
            <Button className="bg-red text-white py-1 text-lg">
              <DialogClose>Não</DialogClose>
            </Button>
          </div>
        </DialogBase>
      ) : (
        <Button className="text-blue-light bg-blue py-0 px-0">
          <FaRegArrowAltCircleLeft
            size={28}
            className="mr-1"
            onClick={() => router.push('/lancamento-estoque')}
          />
        </Button>
      )}
    </>
  )
}
