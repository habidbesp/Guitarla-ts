import { CartItem } from "../types";

export const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};
export const MIN_ITEMS = 1;
export const MAX_ITEMS = 5;
