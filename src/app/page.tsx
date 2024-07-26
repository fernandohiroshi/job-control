// Import Image component from Next.js
import Image from "next/image";

// Import the banner image
import banner from "@/images/banner.png";

// Home component
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center bg-slate-300 px-2 min-h-[calc(100vh-80px)] text-black">
      <h2 className="mb-2 font-medium text-xl md:text-2xl">
        Manage your company
      </h2>
      <h1 className="mb-8 font-bold text-3xl text-blue md:text-6xl">
        Services, customers
      </h1>
      <Image
        src={banner}
        alt="Banner Job Control"
        width={600}
        className="opacity-80 max-w-[240px] md:max-w-sm animate-pulse"
        priority
        quality={100}
      />
    </main>
  );
}
