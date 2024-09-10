import { DialogBase } from '../DialogComponentBase'

export default function ModalCategoryStockRelease({ children }) {
  return (
    <>
      <DialogBase
        buttonTitle="Lançar estoque"
        titleDialog="Escolha uma categoria"
        classNameButton="bg-yellow text-white"
      >
        {children}
      </DialogBase>
    </>
  )
}
