import { X } from "lucide-react"

interface IModalStockReleeaseProduct {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalBase = ({ open, onClose, children }: IModalStockReleeaseProduct) => {

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-blue/20" : "invisible"}`}>
            <div className={`bg-blue-dark rounded-xl shadow p-12 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-white hover:text-white/75">
                    <X />
                </button>
                {children}
            </div>
        </div>
    )
}