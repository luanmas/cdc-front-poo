import { useState } from 'react'
import { DialogBase } from '../DialogComponentBase'
import { Button } from '../ui/button'
import Link from 'next/link'

interface IQuotationChoiceProps {
  textButton: string
  value: number
}

interface IModalChoiceQuotationProps {
  classNameButton: string
  disabledButton: boolean
  handleClick: (choice: number) => void
}

export default function ModalChoiceQuotation({
  classNameButton,
  disabledButton,
  handleClick,
}: IModalChoiceQuotationProps) {
  const [clickedButton, setClickedButton] = useState<number | null>(null)

  const quotationsChoice: IQuotationChoiceProps[] = [
    {
      textButton: 'Cotação Automática',
      value: 0,
    },
    {
      textButton: 'Cotação Manual',
      value: 1,
    },
    {
      textButton: 'Lançamento de Estoque',
      value: 2,
    },
  ]

  const handleButtonClick = (value: number) => {
    setClickedButton(value)
    handleClick(value)
  }

  return (
    <>
      <DialogBase
        buttonTitle="Salvar Alterações"
        titleDialog="Escolha o tipo de ação"
        classNameButton={classNameButton}
        disabledButton={disabledButton}
      >
        {quotationsChoice.map((button) => (
          <Link
            href={'/lancamento-estoque'}
            prefetch={true}
            key={button.value}
            className="w-[300px] py-1"
          >
            <Button
              onClick={() => handleButtonClick(button.value)}
              className="bg-blue-light text-white w-full"
              key={button.value}
              disabled={
                clickedButton !== null && clickedButton !== button.value
              }
            >
              {button.textButton}
            </Button>
          </Link>
        ))}
      </DialogBase>
    </>
  )
}
