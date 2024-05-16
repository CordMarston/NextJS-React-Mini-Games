import LoggedLayout from '@/app/components/ui/LoggedLayout';
import MemoryGame from '@/app/components/games/memory/Memory'

export default function Memory() {
    return (
        <LoggedLayout>
            <div className="grow text-center m-auto p-4">
                <h1 className="font-blomberg text-8xl">Memory</h1>
                <div className="py-4">Level up your memory for free with this online memory card game. Flip the cards and match the tiles together in pairs.</div>
                <MemoryGame/>
            </div>
        </LoggedLayout>
    )
}