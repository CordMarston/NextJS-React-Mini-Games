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
        <div className={"bg-white p-2 border-solid border-2 border-slate-300 rounded min-h-44 flex " + (flipDisabled ? 'cursor-not-allowed' : 'cursor-pointer') + (cardShowing ? ' opacity-25 text-slate-900' : ' text-slate-100')} onClick={flipCard}>
            <div className="bg-gradient-to-b from-slate-50 to-slate-400 text-8xl w-full h-full flex">
                <div className="m-auto text-center">
                    { cardShowing ? card.number : "X" }
                </div>
            </div>
        </div>
    )
}