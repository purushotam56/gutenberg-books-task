"use client";

import SearchComponent from '@/components/search'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ScrollMore from '@/components/scoll'
import { useSearchParams } from 'next/navigation';

const FictionPage = () => {
    const [searchText, setSearchText] = useState('')
    const search = useSearchParams();
    const bookType = search.get('type');

    return (
        <main className="flex min-h-screen w-full flex-col items-start gap-10 mt-0 sm:mt-10">
            <div className='title p-10 sm:p-20 lg:p-24 px-10 lg:!px-44 sm:!pt-20 !pb-0'>
                <Link href='/' className='flex gap-1'>
                    <Image
                        src={'/assets/icons/arrow-left.svg'}
                        width={35}
                        height={35}
                        alt='left-icon'
                    />
                    <h1 className={`text-[30px] text-theme-text-primary capitalize`}>
                        {bookType}
                    </h1>
                </Link>
            </div>
            <SearchComponent searchText={searchText} setSearchText={setSearchText} />
            <div className="books-card-container w-full p-10 sm:p-20 lg:p-24 px-10 lg:!px-44 !pt-8 bg-theme-background">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 grid-flow-row gap-8 justify-between">
                    <ScrollMore type={bookType as string} searchText={searchText} />
                </div>
            </div>
        </main>
    )
}

export default FictionPage