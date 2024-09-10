import fetchData from "@/utils/fetchData"
import FormEnterprise from "@/components/FormEnterprise"


export default async function Empresa() {
  const info = await fetchData('auth/status')
  let formatedDate = null

  if(info.user.id_enterprise) {
    const enterprise = await fetchData(`enterprises/${info.user.id_enterprise}`, {
      next: {
        tags: ["enterprise-post"]
      }
    })
    formatedDate = {
      name: enterprise.name,
      cnpj: enterprise.cnpj,
      company: enterprise.company,
      email: enterprise.contact.email,
      telephone: enterprise.contact.telephone,
      cellPhone: enterprise.contact.cellPhone,
      cep: enterprise.address.cep,
      state: enterprise.address.state,
      city: enterprise.address.city,
      district: enterprise.address.district,
      street: enterprise.address.street,
    }
  }


  return (
    <>
      <FormEnterprise id={info.user.id_enterprise} data={formatedDate || {}} />
    </>
  )
}
