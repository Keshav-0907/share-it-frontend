import Header from "@/components/molecules/Header";
import Uploader from "@/components/molecules/Uploader";
import Image from "next/image";
import Hero from "@/components/templates/Hero";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-67px)] w-screen flex justify-center items-center flex-col gap-8 py-16">
      <Hero />
      <Uploader/>
    </div>
  );
}