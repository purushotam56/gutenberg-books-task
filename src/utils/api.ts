import { IBookRes } from "@/types/books"

type FetchBooksArgs = {
    page? : number,
    ids?: string
}

export async function fetchBooks({page,ids}:FetchBooksArgs){
    let url = `http://skunkworks.ignitesol.com:8000/books/?page=${page || 1}`;
    if(ids){
        url = `${url}&ids=${ids}`
    }
    const res = await fetch(url)
    const data:IBookRes = await res.json()
    return data
}