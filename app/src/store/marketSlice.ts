import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BaseProduct } from "@/types/product";
import {
  getSupermarketById,
  getShopById,
  getCompanyById,
  getDoctorById,
  getMarkById,
  getSupermarketProducts,
  getShopProducts,
  getCompanyProducts,
  getDoctorProducts,
  getMarkProducts,
  getShops, // Ajout de la fonction pour lister toutes les boutiques
} from "@/api/marketApi";
import { Supermarket, Shop, Company, Doctor, Mark } from "@/types/market";

interface MarketState {
  entities: { [entityKey: string]: Supermarket | Shop | Company | Doctor | Mark }; // ex. "supermarkets/1"
  productsByMarketEntity: { [entityKey: string]: BaseProduct[] }; // ex. "supermarkets/1"
  loading: boolean;
  error: string | null;
}

const initialState: MarketState = {
  entities: {},
  productsByMarketEntity: {},
  loading: false,
  error: null,
};

// Typage sécurisé pour les erreurs
interface FetchError {
  message?: string;
}

// Récupère les détails d'une entité spécifique
export const fetchMarketEntity = createAsyncThunk(
  "market/fetchMarketEntity",
  async (
    { entityType, entityId }: { entityType: "supermarkets" | "shops" | "companies" | "doctors" | "marks"; entityId: string },
    { rejectWithValue }
  ) => {
    try {
      let entity: Supermarket | Shop | Company | Doctor | Mark;
      switch (entityType) {
        case "supermarkets":
          entity = await getSupermarketById(entityId);
          break;
        case "shops":
          entity = await getShopById(entityId);
          break;
        case "companies":
          entity = await getCompanyById(entityId);
          break;
        case "doctors":
          entity = await getDoctorById(entityId);
          break;
        case "marks":
          entity = await getMarkById(entityId);
          break;
        default:
          throw new Error("Type d'entité non supporté");
      }
      const entityKey = `${entityType}/${entityId}`;
      console.log(`Fetched entity ${entityKey}:`, entity);
      return { entityKey, entity };
    } catch (error) {
      const err = error as FetchError;
      console.error(`Error fetching entity ${entityType}/${entityId}:`, err);
      return rejectWithValue(err.message || "Erreur lors du chargement de l'entité");
    }
  }
);

// Récupère les produits d'une entité spécifique
export const fetchMarketEntityProducts = createAsyncThunk(
  "market/fetchMarketEntityProducts",
  async (
    { entityType, entityId }: { entityType: "supermarkets" | "shops" | "companies" | "doctors" | "marks"; entityId: string },
    { rejectWithValue }
  ) => {
    try {
      let products: BaseProduct[];
      switch (entityType) {
        case "supermarkets":
          products = await getSupermarketProducts(entityId);
          break;
        case "shops":
          products = await getShopProducts(entityId);
          break;
        case "companies":
          products = await getCompanyProducts(entityId);
          break;
        case "doctors":
          products = await getDoctorProducts(entityId);
          break;
        case "marks":
          products = await getMarkProducts(entityId);
          break;
        default:
          throw new Error("Type d'entité non supporté");
      }
      const entityKey = `${entityType}/${entityId}`;
      console.log(`Products for ${entityKey}:`, products);
      return { entityKey, products };
    } catch (error) {
      const err = error as FetchError;
      console.error(`Error fetching products for ${entityType}/${entityId}:`, err);
      return rejectWithValue(err.message || "Erreur lors du chargement des produits de l'entité");
    }
  }
);

// Récupère toutes les boutiques
export const fetchAllShops = createAsyncThunk(
  "market/fetchAllShops",
  async (_, { rejectWithValue }) => {
    try {
      const shops = await getShops();
      const shopEntities = shops.reduce((acc, shop) => {
        acc[`shops/${shop.id}`] = shop;
        return acc;
      }, {} as { [key: string]: Shop });
      console.log("Fetched all shops:", shopEntities);
      return shopEntities;
    } catch (error) {
      const err = error as FetchError;
      console.error("Error fetching all shops:", err);
      return rejectWithValue(err.message || "Erreur lors du chargement des boutiques");
    }
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMarketEntity
      .addCase(fetchMarketEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketEntity.fulfilled, (state, action: PayloadAction<{ entityKey: string; entity: Supermarket | Shop | Company | Doctor | Mark }>) => {
        state.loading = false;
        state.entities[action.payload.entityKey] = action.payload.entity;
      })
      .addCase(fetchMarketEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Erreur lors du chargement de l'entité";
      })
      // fetchMarketEntityProducts
      .addCase(fetchMarketEntityProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketEntityProducts.fulfilled, (state, action: PayloadAction<{ entityKey: string; products: BaseProduct[] }>) => {
        state.loading = false;
        state.productsByMarketEntity[action.payload.entityKey] = action.payload.products;
      })
      .addCase(fetchMarketEntityProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Erreur lors du chargement des produits de l'entité";
      })
      // fetchAllShops
      .addCase(fetchAllShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShops.fulfilled, (state, action: PayloadAction<{ [key: string]: Shop }>) => {
        state.loading = false;
        state.entities = { ...state.entities, ...action.payload };
      })
      .addCase(fetchAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Erreur lors du chargement des boutiques";
      });
  },
});

export default marketSlice.reducer;