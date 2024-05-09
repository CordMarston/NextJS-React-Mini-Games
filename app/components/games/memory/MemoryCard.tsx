type Card = {
    number: number,
    color: string
}

type Props = {
    card: Card,
    cardShowing: boolean,
    flipDisabled: boolean,
    flipCard: () => void,
}

export default function MemoryCard({card, cardShowing, flipDisabled, flipCard}:Props) {
    return (
        <div className={"bg-white p-2 border-solid border-2 border-slate-300 rounded min-h-44 flex " + (flipDisabled ? 'cursor-not-allowed' : 'cursor-pointer')} onClick={flipCard}>
            <div className="bg-gradient-to-b from-slate-50 to-slate-400 text-8xl w-full h-full flex">
                <div className="m-auto text-center text-slate-100">
                    { cardShowing ? card.number : "X" }
                </div>
            </div>
        </div>
    )
}