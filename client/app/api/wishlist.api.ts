import axios from "axios";

export const addToWishlist =  (payload: Record<string, string>) => {
   return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`, {
    ...payload,
  });
};

export const getWishlist = async () =>{
  const {data} =  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`)
  return data
}
