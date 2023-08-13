"use client";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../components/emptyState";
import { getWishlist } from "../api/wishlist.api";
import * as loadingImage from "@/public/loading-svgrepo-com.svg";
import Image from "next/image";
import ReactStars from "react-stars";

export default function Wishlist() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  });

  return (
    <div className="w-full px-4">
      <h1 className="text-center lg:text-8xl md:text-6xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mt-10">
        WISHLIST
      </h1>
      <h2 className="text-center lg:text-3xl md:text-2xl text-lg font-bold mt-3">
        See your wishlist here
      </h2>
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
              <div className="lg:w-1/6 w-full shadow-lg">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
