"use client";
import EmptyState from "../components/emptyState";

export default function Wishlist() {
  return <div className="w-full px-4">
  <h1 className="text-center lg:text-8xl md:text-6xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mt-10">
    WISHLIST
  </h1>
  <h2 className="text-center lg:text-3xl md:text-2xl text-lg font-bold mt-3">
    See your wishlist here
  </h2>
  <EmptyState />
</div>
}