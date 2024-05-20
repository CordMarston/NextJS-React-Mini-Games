type Props = {
    keyClicked: (e: React.MouseEvent | null, letter:string) => void,
    disabled: boolean
}

export default function Keyboard({keyClicked, disabled}:Props) {
    return (
        <div id="keyboard">
            <div>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'Q')}>Q</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'W')}>W</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'E')}>E</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'R')}>R</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'T')}>T</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'Y')}>Y</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'U')}>U</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'I')}>I</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'O')}>O</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'P')}>P</button>
            </div>
            <div>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'A')}>A</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'S')}>S</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'D')}>D</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'F')}>F</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'G')}>G</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'H')}>H</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'J')}>J</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'K')}>K</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'L')}>L</button>
            </div>
            <div>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'Z')}>Z</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'X')}>X</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'C')}>C</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'V')}>V</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'B')}>B</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'N')}>N</button>
                <button className="p-2 bg-gray-100 rounded-lg border border-gray-300 w-8 m-1 bg-white" onClick={(e) => keyClicked(e, 'M')}>M</button>
            </div>
        </div>
    )
}