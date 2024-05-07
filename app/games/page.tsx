import NavBar from "../components/ui/NavBar"
import { auth } from "@/lib/auth";
import Welcome from "../components/ui/Welcome";

export default async function GamesPage() {
    const session = await auth();
    return (
        <main className="flex flex-col h-screen">
            {session && <NavBar {...session}/>}
            <div className="grow flex">
                <div className="text-center m-auto">
                    { !session?.user.nicknameAsked && <Welcome {...session}/>}
                </div>
            </div>
        </main>
    )
}