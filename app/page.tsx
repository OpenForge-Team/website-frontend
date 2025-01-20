import Header from "@/components/header";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Index() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-6 px-4"></main>
    </>
  );
}
