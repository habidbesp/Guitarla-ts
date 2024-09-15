import { db } from "../data/db";
import { initialCart, MAX_ITEMS, MIN_ITEMS } from "../helpers";
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
  cart: initialCart(),
};

export const cartReducer = (
  state: CartState = initialState,
  actions: CartActions
) => {
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
      updatedCart = state.cart.map((item) =>
        item.id === actions.payload.id && item.quantity > MIN_ITEMS
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );

      return {
        ...state,
        cart: updatedCart,
      };

    case "increase-quantity":
      updatedCart = state.cart.map((item) =>
        item.id === actions.payload.id && item.quantity < MAX_ITEMS
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        cart: updatedCart,
      };

    case "clear-cart":
      return {
        ...state,
        cart: updatedCart,
      };

    default:
      throw new Error("Invalid Action");
  }
};
