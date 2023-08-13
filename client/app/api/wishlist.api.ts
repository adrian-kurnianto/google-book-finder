import axios from "axios";

export const addToWishlist =  (payload: Record<string, string>) => {
   return axios.post(`http://localhost:3001/api/v1/wishlist`, {
    ...payload,
  });
};
