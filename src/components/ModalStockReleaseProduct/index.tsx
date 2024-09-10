import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { AutoCompleteStockReleaseProducts } from "../AutoCompleteStockReleaseProducts"
import { FormEvent, useState } from "react"
import { ModalBase } from "../ModalBase"

const categories = [
    {
        id: 1,
        name: "cortes bovinos",
        description: "bovinos",
    },
    {
        id: 2,
        name: "cortes de aves",
        description: "aves",
    },
    {
        id: 3,
        name: "vegetais de folhas verdes",
        description: "bovinos",
    },
]

export const ModalStockReleaseProduct = () => {
    const [open, setOpen] = useState(false)

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <section>
            <Button onClick={() => setOpen(true)}>Lançar Produtos</Button>

            <ModalBase open={open} onClose={() => setOpen(false)}>
                <form className="w-[350px] space-y-8" onSubmit={onSubmit}>
                    <div className="flex justify-between items-center space-x-4">
                        <AutoCompleteStockReleaseProducts initialCategories={categories} />
                        <Input
                            sizeType="sm"
                            label="Qtd"
                            id="qtd"
                            type="text"
                        />
                    </div>
                    <div className="w-full flex justify-between">
                        <Button className="bg-green text-white" size={"lg"}>Lançar</Button>
                        <Button onClick={() => setOpen(false)} className="bg-red text-white" size={"lg"}>Cancelar</Button>
                    </div>
                </form>
            </ModalBase>
        </section>
    )
}
