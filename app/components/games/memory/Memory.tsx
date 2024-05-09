"use client"
import MemoryCard from './MemoryCard';
import { useState } from 'react';

export default function MemoryGame() {
    
    const [gameStarted, setGameStarted] = useState(false);
    const [totalCards, setTotalCards] = useState(16);
    const [cards, setCards] = useState<number[]>([]);

    function NewGame() {
        setCards(Shuffle());
        setGameStarted(true);
    }

    function Shuffle() {
        // Fill array of cards with 2 of each pair. Randomly assign and change card value.
        let totalPairs = totalCards / 2;
        let tempCards = [];
        for(let i = 0; i < totalPairs; i++) {
            tempCards[i] = i + 1;
        }
        tempCards = [...tempCards, ...tempCards];
        for (let i = 0; i < tempCards.length; i++) {
            let shuffle = Math.floor(Math.random() * (tempCards.length));
            [tempCards[i], tempCards[shuffle]] = [tempCards[shuffle], tempCards[i]];
        }
        return tempCards;
    }

    return (
        <div className="container m-auto max-w-screen-xl">
            <div className={"text-center" + (gameStarted ? ' grid grid-cols-8 gap-2' : '')}>
                {gameStarted && cards.map((card, index) =>
                    <MemoryCard cardNumber={card} key={index}/>
                )}
                {!gameStarted && <button onClick={NewGame} className="mx-auto block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Start Game</button>}
            </div>
        </div>
    )
}