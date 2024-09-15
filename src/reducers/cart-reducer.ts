import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

export const initialState: CartState = {
  data: db,
  cart: [],
};

export const cartReducer = (
  state: CartState = initialState,
  actions: CartActions
) => {
  //   const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;
  let updatedCart: CartItem[] = [];
  switch (actions.type) {
    case "add-to-cart":
      const itemExists = state.cart.find(
        (guitar) => guitar.id === actions.payload.item.id
      );

      if (itemExists && itemExists.quantity < MAX_ITEMS) {
        updatedCart = state.cart.map((item) =>
          item.id === itemExists.id
            ? {
                ...itemExists,
                quantity: itemExists.quantity + 1,
              }
            : item
        );
      }

      if (!itemExists) {
        const newItem: CartItem = { ...actions.payload.item, quantity: 1 };
        updatedCart = [...state.cart, newItem];
      }

      return {
        ...state,
        cart: updatedCart,
      };

    case "remove-from-cart":
      updatedCart = state.cart.filter((item) => item.id !== actions.payload.id);
      return {
        ...state,
        cart: updatedCart,
      };

    case "decrease-quantity":
      return {
        ...state,
      };

    case "increase-quantity":
      return {
        ...state,
      };

    case "clear-cart":
      return {
        ...state,
      };

    default:
      throw new Error("Invalid Action");
  }
};
