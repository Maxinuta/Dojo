import CubeSection from "@/components/sections/CubeSection";


export default async function Home() {
  return (
    <main className="w-full h-full flex flex-col">
      <section className="w-full h-full bg-primary-light dark:bg-primary-dark">
        <CubeSection />
      </section>
    </main>
  );
}