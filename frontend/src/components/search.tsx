"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type props = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent = ({ searchText, setSearchText }: props) => {

    return <div className="search-bar w-full p-10 sm:p-20 lg:p-24 px-10 lg:!px-44 !py-0">
        <div className='flex justify-start rounded-[4px] items-center relative focus-within:border-theme-text-primary focus-within:border-2'>
            <div className='bg-theme-background rounded-tl-[4px] rounded-bl-[4px] pl-[10px] h-[40px] flex justify-center items-center'>
                <Image
                    src='/assets/icons/search.svg'
                    width={24}
                    height={24}
                    alt='search'
                />
            </div>
            <input
                type="text"
                placeholder='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className='w-full rounded-tr-[4px] rounded-br-[4px] px-[10px] h-[40px] bg-theme-background outline-none caret-theme-text-primary'
            />
            {
                searchText !== '' &&
                <div className='absolute right-3 flex justify-center items-center'>
                    <button onClick={() => setSearchText('')}>
                        <Image
                            src='/assets/icons/cross.svg'
                            width={24}
                            height={24}
                            alt='search'
                        />
                    </button>
                </div>
            }
        </div>
    </div>
}

export default SearchComponent