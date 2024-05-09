import { auth } from "@/lib/auth";
import Welcome from "../components/ui/Welcome";
import { redirect } from 'next/navigation';
import LoggedLayout from '@/app/components/ui/LoggedLayout';

export default async function GamesPage() {
    const session = await auth();
    if(!session) {
        redirect('/')
    }
    return (
        <LoggedLayout>
            <div className="text-center m-auto">
                { !session?.user.nicknameAsked && <Welcome/>}
            </div>
        </LoggedLayout>
    )
}