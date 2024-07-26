import Image from "next/image";
import banner from "@/images/banner.png";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] px-2 bg-slate-300 text-black">
      <h2 className="font-medium text-xl md:text-2xl mb-2">
        Manage your company
      </h2>
      <h1 className="font-bold text-3xl mb-8 text-blue md:text-6xl">
        Services, customers
      </h1>
      <Image
        src={banner}
        alt="Banner Job Control"
        width={600}
        className="max-w-[240px] md:max-w-sm animate-pulse opacity-80"
        priority
        quality={100}
      />
    </main>
  );
}
