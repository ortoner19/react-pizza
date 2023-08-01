import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count: number,
}

interface CartSliceState {  // обично коли тіпізірують стейт, іспользують interface. interface і type практично одне й те саме
 totalPrice: number;
 items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id == action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //    return obj.price + sum;
    //   }, 0);
    // },
    // plusItem(state, action) {
    //   const findItem = state.items.find((obj) => obj.id == action.payload); // так само як в addItem, тількі без id
    //   if (findItem) {
    //     findItem.count ++;
    //   }
    // },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id == action.payload); 
      if (findItem) {
        findItem.count --;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id != action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id == id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
