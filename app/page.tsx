
import Uploader from "@/components/molecules/Uploader";
import Hero from "@/components/templates/Hero";
import DownloadFiles from "@/components/molecules/DownloadFiles";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-67px)] w-screen flex justify-center items-center flex-col gap-8 py-16">
      <Hero />
      <DownloadFiles />
      <Uploader/>
    </div>
  );
}