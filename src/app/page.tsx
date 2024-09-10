import { dashboardImage } from '@/assets'
import TopMenu from '@/components/TopMenu'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export default function Home() {
  return (
    <div className="bg-blue h-screen w-full flex flex-col overflow-hidden">
      <TopMenu isLogin={true} />
      <section className="h-full flex justify-between">
        <div className="flex flex-col items-baseline text-left w-[50%] pl-20 pt-12 space-y-5">
          <h2 className="text-blue-light text-7xl font-bold">
            Sistema <br /> Central de <br /> Compras
          </h2>
          <span className="text-white font-semibold text-2xl">
            Faça login <br /> para começar sua organização
          </span>
          <Button variant={'primary'} className="px-12">
            <Link
              href={'http://localhost:5000/api/auth/google/login'}
              prefetch={true}
              className="flex justify-between items-center"
            >
              <FcGoogle size={25} />
              <span className="px-2">Continue com google</span>
            </Link>
          </Button>
        </div>
        <div>
          <Image src={dashboardImage} alt="dashboard image" height={800} />
        </div>
      </section>
    </div>
  )
}
