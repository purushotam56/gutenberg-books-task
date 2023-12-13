// "use client"

import { IBook, IFormats } from '@/types/books'
import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
  books: IBook[]
}

export default function Books({ books }: PropsType) {

  const preferredFormats:IFormats[] = ['text/html', 'application/pdf', 'text/plain'];

  const handleDownload = (book: IBook) => {
    const downloadLink = preferredFormats.find((format:IFormats) => book?.formats[format]);
    
    if (downloadLink) {
      window.open(book?.formats[downloadLink], '_blank');
    } else {
      if(book?.formats['application/zip']){
        alert('No viewable version available! downloading zip file');
        window.open(book?.formats['application/zip'], '_blank');
      }else{
        alert('No viewable version available');
      }
    }
  };

  return books?.map((book, index) => {
    return (
      <div key={index} className='w-full'>
        <button onClick={()=> handleDownload(book)}>
          <div className='w-[114px]'>
            <Image
              src={book?.formats['image/jpeg']}
              width={114}
              height={100}
              alt='book'
              className='shadow-theme-options-card-shadow rounded-[8px]'
            />
            <p className='text-[12px] mt-2'>{book?.title}</p>
            <p className='text-[12px] text-theme-gray-medium'>{book?.authors[0]?.name}</p>
          </div>
        </button>
      </div>
    )
  })
}