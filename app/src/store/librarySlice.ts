import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks, fetchBookDetails, createSubscription, accessPDF } from "@/api/libraryApi";
import { Book, Abonnement } from "@/types/library";

interface LibraryState {
  books: Book[];
  currentBook: Book | null;
  subscriptions: Abonnement[];
  currentPDFUrl: string | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  nextPage: string | null;
  previousPage: string | null;
}

const initialState: LibraryState = {
  books: [],
  currentBook: null,
  subscriptions: [],
  currentPDFUrl: null,
  loading: false,
  error: null,
  totalCount: 0,
  nextPage: null,
  previousPage: null,
};

export const fetchBooksThunk = createAsyncThunk(
  "library/fetchBooks",
  async (
    params: { q?: string; genre?: string; is_free?: boolean; ordering?: string; limit?: number; offset?: number; subscription?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchBooks(params);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la récupération des livres";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchBookDetailsThunk = createAsyncThunk(
  "library/fetchBookDetails",
  async (bookId: string, { rejectWithValue }) => {
    try {
      const response = await fetchBookDetails(bookId);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la récupération des détails";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createSubscriptionThunk = createAsyncThunk(
  "library/createSubscription",
  async (data: { plan_id: string; payment_confirmed: boolean }, { rejectWithValue }) => {
    try {
      const response = await createSubscription(data);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la création de l’abonnement";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchPDFAccessThunk = createAsyncThunk(
  "library/fetchPDFAccess",
  async ({ bookId, data }: { bookId: string; data: { code?: string; payment_confirmed?: boolean } }, { rejectWithValue }) => {
    try {
      const response = await accessPDF(bookId, data);
      return response.pdf_url;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de l’accès au PDF";
      return rejectWithValue(errorMessage);
    }
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    clearCurrentBook(state) {
      state.currentBook = null;
    },
    clearPDFUrl(state) {
      state.currentPDFUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.results;
        state.totalCount = action.payload.count;
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
      })
      .addCase(fetchBooksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSubscriptionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscriptionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload);
      })
      .addCase(createSubscriptionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPDFAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPDFAccessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPDFUrl = action.payload;
      })
      .addCase(fetchPDFAccessThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentBook, clearPDFUrl } = librarySlice.actions;
export default librarySlice.reducer;