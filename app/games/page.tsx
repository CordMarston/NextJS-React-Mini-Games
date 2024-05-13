import { auth } from "@/lib/auth";
import Welcome from "../components/ui/Welcome";
import { redirect } from 'next/navigation';
import LoggedLayout from '@/app/components/ui/LoggedLayout';
import LeaderBoard from "../components/games/leaderboard/Leaderboard";

export default async function GamesPage() {
    const session = await auth();
    if(!session) {
        redirect('/')
    }
    return (
        <LoggedLayout>
            <div className="text-center m-auto">
                { !session?.user.nicknameAsked ? <Welcome/> : <LeaderBoard/>}
            </div>
        </LoggedLayout>
    )
}