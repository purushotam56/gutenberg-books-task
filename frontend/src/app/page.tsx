import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
const montserratSemiBold = Montserrat({ subsets: ['latin'], weight: '600' })

const options = [
  {
    label: 'FICTION',
    path: '/book?type=fiction',
    img: 'Fiction.svg'
  },
  {
    label: 'PHILOSOPHY',
    path: '/book?type=philosophy',
    img: 'Philosophy.svg'
  },
  {
    label: 'DRAMA',
    path: '/book?type=drama',
    img: 'Drama.svg'
  },
  {
    label: 'HISTORY',
    path: '/book?type=history',
    img: 'History.svg'
  },
  {
    label: 'HUMOUR',
    path: '/book?type=humour',
    img: 'Humour.svg'
  },
  {
    label: 'ADVENTURE',
    path: '/book?type=adventure',
    img: 'Adventure.svg'
  },
  {
    label: 'POLITICS',
    path: '/book?type=politics',
    img: 'Politics.svg'
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-10 mt-20">
      <div className='title w-full bg-theme-title-pattern sm:p-20 md:p-24 px-10 sm:!px-48 !py-10'>
        <h1 className={`text-[48px] ${montserratSemiBold.className} text-theme-text-primary`}>Gutenberg Project</h1>
        <p className={`text-[16px] ${montserratSemiBold.className} max-w-[50rem] break-words`}>A social cataloging website that allows you to freely search its database of books, annotations,
          and reviews.
        </p>
      </div>
      <div className="options-container w-full sm:p-20 md:p-24 px-10 sm:!px-48 !py-10 !pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-x-24 gap-y-8">
          {
            options.map((option, index) => {
              return (
                <Link key={index} href={option.path}>
                  <div className='rounded-[4px] px-[10px] h-[50px] shadow-theme-options-card-shadow bg-theme-text-white flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                      <Image
                        src={`/new_assets/${option.img}`}
                        width={20}
                        height={20}
                        alt='left-icon'
                      />
                      <span className='text-[20px] font-semibold'>{option.label}</span>
                    </div>
                    <Image
                      src={'/assets/icons/arrow-right.svg'}
                      width={30}
                      height={30}
                      alt='left-icon'
                    />
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}
