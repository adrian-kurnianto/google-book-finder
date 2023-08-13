"use client";

import { useState } from "react";
import Image from "next/image";
import EmptyState from "./components/emptyState";
import { fetchBooks } from "./api/books.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as loadingImage from "@/public/loading-svgrepo-com.svg";
import ReactStars from "react-stars";
import { addToWishlist } from "./api/wishlist.api";
import { BookType } from "./types";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks(search),
    enabled: false,
  });

  const notifySuccess = () => toast.success("Added to Wishlist");
  const notifyError = () => toast.error("books already in wishlist")

  const handleSubmit = async () => {
    if (!search) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    await refetch();
  };

  const { mutate } = useMutation(
    ({ id, title, author, rating, thumbnail }: BookType) =>
      addToWishlist({
        id,
        title,
        author,
        rating: rating.toString(),
        thumbnail,
      }),
    {
      onError: (err:any) => {
        if(err.response.data.message.toLowerCase() == 'item already in wishlist') {
          notifyError()
        }
      },
      onSuccess: () =>{
        notifySuccess()
      }
    }
  );

  

  const handleToWishlist = (data: BookType) => {
    mutate(data);
  };

  return (
    <div className="w-full px-4 pb-20 sm:px-2">
      <h1 className="text-center lg:text-8xl md:text-6xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mt-10">
        BOOK FINDER
      </h1>
      <h2 className="text-center lg:text-3xl md:text-2xl text-lg font-bold mt-3">
        The right place for you to find a book
      </h2>
      <div className="flex justify-center w-full">
        <div className="relative mt-10">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>

          <input
            type="text"
            name="q"
            className="py-2 lg:w-72 md:w-72 w-4/6 text-sm text-gray-800 rounded-md pl-10 focus:outline-none border border-2 border-gray-400 focus:border-gray-800 rounded-xl"
            placeholder="Search books"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl ml-3"
          >
            Search
          </button>
        </div>
      </div>
      {error && (
        <div className="text-md text-center w-full  font-bold mt-5 text-red-400">
          <span>Type something to search!!</span>
        </div>
      )}
      {!isFetching && !data && <EmptyState />}
      {isFetching && (
        <div className="w-full flex justify-center mt-36">
          <Image
            src={loadingImage}
            width={100}
            height={100}
            alt={""}
            className="animate-spin"
          />
        </div>
      )}
      {data && !isFetching && (
        <div className="mt-10 flex flex-wrap gap-10 justify-center w-full">
          {data.data.map((item: any) => {
            return (
              <div key={item.id} className="lg:w-1/6 w-full shadow-lg">
                <div className="relative m-0 shadow-lg  bg-white ">
                  <div className="">
                    <div className="w-full h-64 relative">
                      <Image
                        alt=""
                        src={item.thumbnail}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="card-block relative">
                    <div className="p-6 h-64 flex flex-col justify-between">
                      <h4 className="text-md mb-3 line-clamp-2 font-bold text-center">
                        {item.title}
                      </h4>
                      <div>
                        <div className="text-sm text-grey block mt-6 flex">
                          <p>Authors: {item.author} </p>
                        </div>
                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          value={item.rating}
                          color2={"#ffd700"}
                        />
                        <button
                          onClick={() => handleToWishlist(item)}
                          className="bg-blue-500 hover:bg-blue-800 text-white font-bold rounded-lg text-lg py-2 w-full"
                        >
                          + add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Toaster />
    </div>
  );
}
