import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import { IBookRes, IBookStates } from '@/types/books';
import * as _ from 'lodash';

type FetchBooksArgs = {
    page?: number | null,
    ids?: string,
    type?: string,
    search?: string
}

// ----------------------------------------------------------------------

const initialState: IBookStates = {
    isLoading: false,
    error: null,
    book: [],
    searchBooks: [],
    nextPage: 1
};

const slice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getBooksSuccess(state, action) {
            state.isLoading = false;
            state.book = _.unionBy(state.book,action.payload.results,'id');
            
            if(action.payload.next){
                const url = new URL(action.payload.next);
                const urlParams = new URLSearchParams(url.search);
                const page = Number(urlParams.get('page'));
                state.nextPage = page;
            }else{
                state.nextPage = null;
            }
        },

        clearBooks(state) {
            state.book = [];
        }
    },
});

// Reducer
export default slice.reducer;

export type BookState = ReturnType<typeof slice.reducer>;

// Actions
export const {clearBooks } = slice.actions;

// ----------------------------------------------------------------------

export function getAllBooks({ page, ids, type, search }: FetchBooksArgs) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            // let url = `http://skunkworks.ignitesol.com:8000/books/?page=${page || 1}&mime_type=image/jpeg`;
            let url = `http://localhost:3000/books/?page=${page || 1}&mime_type=image/jpeg`;
            if (ids) {
                url = `${url}&ids=${ids}`
            }
            if (type) {
                url = `${url}&topic=${type}`
            }
            if (search) {
                url = `${url}&search=${search}`
            }
            const res = await fetch(url,{
                mode: "cors"
            })
            const data: IBookRes = await res.json()
            dispatch(slice.actions.getBooksSuccess(data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
