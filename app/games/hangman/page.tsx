import LoggedLayout from '@/app/components/ui/LoggedLayout';
import { generate as generateRandomWord } from "random-words";

export default function Snake() {
    const word = generateRandomWord();

    return (
        <LoggedLayout>
            <div className="text-center m-auto">
                <h1 className="font-blomberg text-8xl">{ word }</h1>
            </div>
        </LoggedLayout>
    )
}