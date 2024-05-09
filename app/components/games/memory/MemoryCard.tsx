type Props = {
    cardNumber: number
}

export default function MemoryCard(props: Props) {
    return (
        <div className="bg-white p-4 border-solid border-2 border-slate-300 rounded min-h-44 flex">
            <div className="m-auto">{props.cardNumber}</div>
        </div>
    )
}