import axios from "axios"

export const fetchBooks = async  (keyword: string | undefined) => {
   const {data} =  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search?keyword=${keyword}`)
   return data
}