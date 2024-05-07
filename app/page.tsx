import AuthButtons from "@/app/components/auth/AuthButtons";
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if(session)
  {
    return redirect("/games")
  }
  return (
    <div className="flex">
      <div className="m-auto text-center">
        <h1 className="font-knight text-8xl">Games</h1>
        <span className="py-2 block text-sm">Silly NextJS / React games</span>
        <AuthButtons/>
      </div>
    </div>
  );
}
