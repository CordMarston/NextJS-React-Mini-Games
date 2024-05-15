type Props = {
    character: string,
    showing: boolean
}
export default function Letter({character, showing}:Props) {
    return(
        <div className="border-b-4 border-slate-400 w-12 font-blomberg text-4xl mx-1 inline-block">{ showing ? character : '\u00A0' } { showing }</div>
    )
}