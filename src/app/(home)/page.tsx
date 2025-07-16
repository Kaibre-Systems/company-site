import Image from "next/image";
import HeroSection from "./components/hero-section";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
            <HeroSection />
        </main>
    );
}
