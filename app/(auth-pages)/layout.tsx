import { Navbar } from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-center justify-center mx-auto min-h-screen dark">
      <Navbar />
      <section>
        {children}
      </section>
    </div>
  );
}
