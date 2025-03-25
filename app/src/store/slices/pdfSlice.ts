// slices/pdfSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { streamPDF, downloadPDF, createPDF, updatePDF, deletePDF, fetchPDFAccess } from "@/api/pdfApi";
import { BookPDF, CreatePDFPayload, UpdatePDFPayload } from "@/types/pdf";

interface PDFState {
  pdfs: BookPDF[];
  pdfUrl: string | null;
  downloadUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PDFState = {
  pdfs: [],
  pdfUrl: null,
  downloadUrl: null,
  loading: false,
  error: null,
};

// Thunks
export const getPDFStream = createAsyncThunk("pdf/getPDFStream", async (pdfId: string) => {
  const response = await streamPDF(pdfId);
  return response.pdf_url;
});

export const getPDFDownload = createAsyncThunk("pdf/getPDFDownload", async (pdfId: string) => {
  const response = await downloadPDF(pdfId);
  return response.download_url;
});

export const getPDFAccess = createAsyncThunk("pdf/getPDFAccess", async ({ bookId, subscriptionCode }: { bookId: string; subscriptionCode?: string }) => {
  const response = await fetchPDFAccess(bookId, subscriptionCode);
  return response; // Retourne l’URL directe (string)
});

export const addPDF = createAsyncThunk("pdf/addPDF", async (data: CreatePDFPayload) => {
  const response = await createPDF(data);
  return response;
});

export const editPDF = createAsyncThunk("pdf/editPDF", async ({ pdfId, data }: { pdfId: string; data: UpdatePDFPayload }) => {
  const response = await updatePDF(pdfId, data);
  return response;
});

export const removePDF = createAsyncThunk("pdf/removePDF", async (pdfId: string) => {
  await deletePDF(pdfId);
  return pdfId;
});

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPDFStream.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPDFStream.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfUrl = action.payload;
      })
      .addCase(getPDFStream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du streaming du PDF";
      })
      .addCase(getPDFDownload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPDFDownload.fulfilled, (state, action) => {
        state.loading = false;
        state.downloadUrl = action.payload;
      })
      .addCase(getPDFDownload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du téléchargement du PDF";
      })
      .addCase(getPDFAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPDFAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfUrl = action.payload; // Stocke l’URL dans pdfUrl
      })
      .addCase(getPDFAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’accès au PDF";
      })
      .addCase(addPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPDF.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfs.push(action.payload);
      })
      .addCase(addPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout du PDF";
      })
      .addCase(editPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPDF.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfs = state.pdfs.map((pdf) => (pdf.id === action.payload.id ? action.payload : pdf));
      })
      .addCase(editPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification du PDF";
      })
      .addCase(removePDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePDF.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfs = state.pdfs.filter((pdf) => pdf.id !== action.payload);
      })
      .addCase(removePDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression du PDF";
      });
  },
});

export default pdfSlice.reducer;