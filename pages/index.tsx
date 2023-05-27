import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <h1 className="shadow-xl py-10 text-center hover:text-yellow-700">
      Hello world
    </h1>
  );
}
