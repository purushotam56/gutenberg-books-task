"use client";

import { useEffect, useRef } from "react";
import Books from "./books";
import { IBook } from "@/types/books";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { clearBooks, getAllBooks } from "@/redux/slices/book";

interface props {
    type: string;
    searchText?: string;
}

export default function ScrollMore({ type, searchText }: props) {
    const { book, nextPage } = useSelector((state: RootState) => state.book)
    const dispatch = useDispatch();

    const observerTarget = useRef(null);

    useEffect(() => {
        dispatch(clearBooks())
        dispatch(getAllBooks({ type }))
    }, [])

    useEffect(() => {
        dispatch(clearBooks())
        async function fetchData() {
            await dispatch(getAllBooks({ page : 1, type, search: searchText }))
        }
        fetchData()
    }, [searchText])

    useEffect(() => {
        const observer = new IntersectionObserver(
            async entries => {
                if (entries[0].isIntersecting) {
                    if(nextPage){
                        dispatch(getAllBooks({ page: nextPage, type, search: searchText }))
                    }
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, book.length]);

    return (
        <>
            <Books books={book as IBook[]} />
            {book.length > 0 && <div ref={observerTarget}></div>}
        </>
    )
}
