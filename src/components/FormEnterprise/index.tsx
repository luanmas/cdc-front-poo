"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import postEnterprise from "@/utils/serverActions/postEnterprise"
import putEnterprise from "@/utils/serverActions/putEnterprise"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  company: z.string().min(1, "Empresa é obrigatória"),
  email: z.string().email("Email inválido"),
  telephone: z.string().min(10, "Telefone deve ter no mínimo 10 dígitos"),
  cellPhone: z.string().min(11, "Celular deve ter no mínimo 11 dígitos"),
  cep: z.string().min(8, "CEP deve ter 8 dígitos"),
  state: z.string().min(2, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  district: z.string().min(1, "Bairro é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
})

type FormSchema = z.infer<typeof formSchema>

interface IFormEnterprise {
  data?: any
  id: string
}

export default function FormEnterprise({ data, id }: IFormEnterprise) {
  const { toast } = useToast()
  const [enterpriseData, setEnterpriseData] = useState<FormSchema | null>(data && Object.keys(data).length > 0 ? { ...data } : null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: enterpriseData || {},
  })

  console.log("enterpriseData", enterpriseData)

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const formattedData = {
      name: data.name,
      cnpj: data.cnpj,
      company: data.company,
      contact: {
        email: data.email,
        telephone: data.telephone,
        cellPhone: data.cellPhone,
      },
      address: {
        cep: data.cep,
        state: data.state,
        city: data.city,
        district: data.district,
        street: data.street,
      },
    }

    if (enterpriseData) {
      putEnterprise({ data: formattedData, id })
      return toast({
        title: "Dados salvos com sucesso"
      })
    }


    postEnterprise(formattedData)
    return toast({
      title: "Empresa criada com sucesso"
    })
  }

  return (
    <section className="flex flex-col justify-center h-screen px-[100px]">
        <>
          <h2 className="py-8 text-4xl font-semibold text-white text-left">Informações da Empresa</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("name")}
                placeholder="Nome"
              />
              {errors.name && <span className="text-red/50">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("cnpj")}
                placeholder="CNPJ"
              />
              {errors.cnpj && <span className="text-red/50">{errors.cnpj.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("company")}
                placeholder="Empresa"
              />
              {errors.company && <span className="text-red/50">{errors.company.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && <span className="text-red/50">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("telephone")}
                placeholder="Telefone"
              />
              {errors.telephone && <span className="text-red/50">{errors.telephone.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("cellPhone")}
                placeholder="Celular"
              />
              {errors.cellPhone && <span className="text-red/50">{errors.cellPhone.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("cep")}
                placeholder="CEP"
              />
              {errors.cep && <span className="text-red/50">{errors.cep.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("state")}
                placeholder="Estado"
              />
              {errors.state && <span className="text-red/50">{errors.state.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("city")}
                placeholder="Cidade"
              />
              {errors.city && <span className="text-red/50">{errors.city.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("district")}
                placeholder="Bairro"
              />
              {errors.district && <span className="text-red/50">{errors.district.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                className="p-4 rounded-md bg-blue border border-1 border-blue-light text-white text-xl"
                {...register("street")}
                placeholder="Rua"
              />
              {errors.street && <span className="text-red/50">{errors.street.message}</span>}
            </div>
            <button
              type="submit"
              className="col-span-1 bg-green-500 text-white rounded-md bg-blue-light"
            >
              Salvar
            </button>
          </form>
        </>
    </section>
  )
}
