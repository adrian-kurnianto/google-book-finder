import Image from "next/image";
import * as libraryImg from "@/public/library-svgrepo-com.svg";
export default function EmptyState() {
  return (
    <div className=" mt-12">
      <div className="flex justify-center">
        <Image src={libraryImg} width={300} height={300} alt={""} priority />
      </div>
      <h2 className="text-center text-lg font-bold mt-3">
        No books found, Search for books
      </h2>
    </div>
  );
}
