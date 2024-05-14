import { auth } from "@/lib/auth";
import NavBar from "./NavBar2"

export default async function LoggedLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth();

    return (
        <main className="flex flex-col h-screen overflow-auto">
            {session && <NavBar {...session}/>}
            <div className="grow flex">
                { children }
            </div>
        </main>
    )
  }