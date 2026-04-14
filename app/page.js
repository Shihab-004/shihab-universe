import Hero from "@/components/landing/Hero";
import SplitScreen from "@/components/landing/SplitScreen";
import ThreeScene from "@/components/landing/ThreeScene";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <ThreeScene />
      <div className="relative z-10">
        <Hero />
        <section className="w-full px-4 sm:px-6 lg:px-0 py-10">
          <div className="max-w-7xl mx-auto">
            <SplitScreen />
          </div>
        </section>
      </div>

      <footer className="text-center py-8 sm:py-10 px-4 text-zinc-600 font-mono text-xs uppercase tracking-widest">
        Shihab_Universe // System.Initialize(2026)
      </footer>
    </main>
  );
}
