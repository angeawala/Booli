// slices/bookSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks, fetchBookDetails, createBook, updateBook, deleteBook, fetchBookCategories, createBookCategory, updateBookCategory, deleteBookCategory } from "@/api/bookApi";
import { Book, BookCategory, CreateBookPayload, UpdateBookPayload } from "@/types/books";

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  categories: BookCategory[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  nextPage: string | null;
  previousPage: string | null;
}

const initialState: BookState = {
  books: [],
  selectedBook: null,
  categories: [],
  loading: false,
  error: null,
  totalCount: 0,
  nextPage: null,
  previousPage: null,
};

// Thunks
export const getBooks = createAsyncThunk("book/getBooks", async (params: {
  q?: string;
  category?: string;
  genre?: string;
  editeur?: string;
  langue?: string;
  format?: string;
  prix_normal_min?: number;
  prix_normal_max?: number;
  prix_reduit_min?: number;
  prix_reduit_max?: number;
  stock?: number;
  has_pdf?: boolean;
  ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "parution" | "-parution" | "pages" | "-pages" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}) => {
  const response = await fetchBooks(params);
  return {
    books: response.results,
    totalCount: response.count,
    nextPage: response.next,
    previousPage: response.previous,
  };
});

export const getBookDetails = createAsyncThunk("book/getBookDetails", async (bookId: string) => {
  const response = await fetchBookDetails(bookId);
  return response;
});

export const addBook = createAsyncThunk("book/addBook", async (data: CreateBookPayload) => {
  const response = await createBook(data);
  return response;
});

export const editBook = createAsyncThunk("book/editBook", async ({ bookId, data }: { bookId: string; data: UpdateBookPayload }) => {
  const response = await updateBook(bookId, data);
  return response;
});

export const removeBook = createAsyncThunk("book/removeBook", async (bookId: string) => {
  await deleteBook(bookId);
  return bookId;
});

export const getBookCategories = createAsyncThunk("book/getBookCategories", async () => {
  const response = await fetchBookCategories();
  return response;
});

export const addBookCategory = createAsyncThunk("book/addBookCategory", async (data: { name: string; description: string }) => {
  const response = await createBookCategory(data);
  return response;
});

export const editBookCategory = createAsyncThunk("book/editBookCategory", async ({ categoryId, data }: { categoryId: string; data: { name?: string; description?: string } }) => {
  const response = await updateBookCategory(categoryId, data);
  return response;
});

export const removeBookCategory = createAsyncThunk("book/removeBookCategory", async (categoryId: string) => {
  await deleteBookCategory(categoryId);
  return categoryId;
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalCount = action.payload.totalCount;
        state.nextPage = action.payload.nextPage;
        state.previousPage = action.payload.previousPage;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des livres";
      })
      .addCase(getBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(getBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des détails du livre";
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout du livre";
      })
      .addCase(editBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.map((book) => (book.id === action.payload.id ? action.payload : book));
        if (state.selectedBook?.id === action.payload.id) state.selectedBook = action.payload;
      })
      .addCase(editBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification du livre";
      })
      .addCase(removeBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book.id !== action.payload);
        if (state.selectedBook?.id === action.payload) state.selectedBook = null;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression du livre";
      })
      .addCase(getBookCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getBookCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des catégories";
      })
      .addCase(addBookCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addBookCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la catégorie";
      })
      .addCase(editBookCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBookCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) => (cat.id === action.payload.id ? action.payload : cat));
      })
      .addCase(editBookCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la catégorie";
      })
      .addCase(removeBookCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBookCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(removeBookCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la catégorie";
      });
  },
});

export default bookSlice.reducer;