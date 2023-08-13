import axios from "axios"

export const fetchBooks = async  (keyword: string | undefined) => {
   const {data} =  await axios.get(`http://localhost:3001/api/v1/search?keyword=${keyword}`)
   return data
}