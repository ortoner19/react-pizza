import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";
import { Sort } from "./filterSlice";

  type Pizza = {
  id: string;
  title: string; 
  price: number; 
  imageUrl: string; 
  sizes: number[]; 
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  // status: 'loading' | 'success' | 'error';
  status: Status;

}

const initialState: PizzaSliceState = {
  items: [],
  // status: "loading", // loading | success | error
  status: Status.LOADING // loading | success | error
};


export type SearchPizzaParams = {
  sortBy: string; order: string; category: string; search: string; currentPage: string;  //! sortBy: Sort; зробили, але у мене все полетіло..
}

// type FetchPizzasArgs = Record<string, string>;
// export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63f1fde1aab7d09125ff6f7c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  // оце з відоса, а ниже з комєнта по новим правилам
  // extraReducers: {
  //   [fetchPizzas.pending] : (state) => {
  //     // console.log('Идет отправка');
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled] : (state, action) => {
  //     // console.log(state, 'Все ОК');
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected] : (state, action) => {
  //     // console.log('Была ошибка');
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) =>{
      // state.status = 'loading';
      state.status = Status.LOADING;
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) =>{
        state.items = action.payload;
        state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) =>{
        state.status = Status.ERROR;
        state.items = [];
    })
  },
  //це по новим правилам
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPizzas.pending, (state) => {
//         state.status = "loading";
//         state.items = [];
//       })
//       .addCase(fetchPizzas.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.status = "success";
//       })
//       .addCase(fetchPizzas.rejected, (state) => {
//         state.status = "error";
//         state.items = [];
//       });
//   },
});

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;













// переробить https://redux-toolkit.js.org/api/createAsyncThunk
