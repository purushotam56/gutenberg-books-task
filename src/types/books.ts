export interface IBook {
  id: number,
  title: string,
  authors: [{ name: string, birth_year: number, death_year: number }],
  translators: [{ name: string, birth_year: number, death_year: number }],
  subjects: [string],
  bookshelves: [string],
  languages: [string],
  copyright: boolean,
  media_type: string,
  formats: {
    'text/html': string,
    'application/epub+zip': string,
    'application/x-mobipocket-ebook': string,
    'text/plain': string,
    'text/plain; charset=us-ascii': string,
    'application/rdf+xml': string,
    'image/jpeg': string,
    'application/octet-stream': string,
    'application/pdf': string,
    'application/zip': string,
  },
  download_count: number
}

export interface IBookRes {
  results: IBook[]
}

export type IFormats = keyof IBook['formats'];

export interface IBookStates {
  book: IBook[];
  searchBooks: IBook[];
  isLoading: boolean;
  error: Error | string | null;
  nextPage?: number | null
}