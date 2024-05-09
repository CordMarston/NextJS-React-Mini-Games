import LoggedLayout from '@/app/components/ui/LoggedLayout';
import MemoryGame from '@/app/components/games/memory/Memory'

export default function Memory() {
    return (
        <LoggedLayout>
            <div className="grow text-center m-auto p-4">
                <h1 className="font-blomberg text-8xl pb-4">Memory</h1>
                <MemoryGame/>
            </div>
        </LoggedLayout>
    )
}