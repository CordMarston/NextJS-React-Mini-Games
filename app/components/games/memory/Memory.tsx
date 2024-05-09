"use client"
import MemoryCard from './MemoryCard';
import ScoreBoard from './ScoreBoard';
import { useEffect, useState } from 'react';

// TOO MANY CLIENT NOTES: https://github.com/prisma/prisma/issues/1983#issuecomment-620621213

export default function MemoryGame() {

    type Card = {
        number: number,
        color: string,
        placement: number
    }
    
    const [gameStarted, setGameStarted] = useState(false);
    // Total cars option for changing game size in future?
    const [totalCards, setTotalCards] = useState(16);
    const [totalMoves, setTotalMoves] = useState(0);
    const [cards, setCards] = useState<Card[]>([]);
    const [flipDisabled, setFlipDisabled] = useState(false);
    const [firstCard, setFirstCard] = useState<Card>({number: 0, color: '', placement: 0})
    const [secondCard, setSecondCard] = useState<Card>({number: 0, color: '', placement: 0});
    const [matchedCards, setMatchedCards] = useState<Card[]>([]);

    function NewGame() {
        setCards(Shuffle());
        setGameStarted(true);
    }

    function Shuffle() {
        // Fill array of cards with 2 of each pair. Randomly assign and change card value.
        let totalPairs = totalCards / 2;
        let tempCards = [];
        for(let i = 0; i < totalPairs; i++) {
            tempCards[i] = { number: i + 1, color: '', placement: i+1};
            // There may be a better way to create the array and duplicate with an increased "index" (tempCards = [...tempCards, ...tempCards];) & map
            tempCards[i+totalPairs] = { number: i + 1, color: '', placement: i+totalPairs};
        }
        for (let i = 0; i < tempCards.length; i++) {
            let shuffle = Math.floor(Math.random() * (tempCards.length));
            [tempCards[i], tempCards[shuffle]] = [tempCards[shuffle], tempCards[i]];
        }
        return tempCards;
    }

    function CardClicked(card:Card) {
        if(firstCard.placement == 0 || firstCard.placement == card.placement) {
            setFirstCard(card);
        } else {
            setSecondCard(card);
        }
        setTotalMoves(totalMoves+1);
    }

    useEffect(() => {
        if(firstCard.placement !== 0 && secondCard.placement !== 0) {
            setFlipDisabled(true);
            CheckSelected();
        }
    }, [firstCard, secondCard]);

    function CheckSelected() {
        if(firstCard.number !== secondCard.number) {
            setTimeout(() => {
                ResetSelectedCards();
            }, 1000);
        } else {
            AddMatch();
        }
    }

    function AddMatch() {
        setMatchedCards(matchedCards => [...matchedCards, firstCard, secondCard]);
        ResetSelectedCards();
        setFlipDisabled(false);
    }

    function ResetSelectedCards() {
        // Reset to initial state
        setFirstCard({number: 0, color: '', placement: 0});
        setSecondCard({number: 0, color: '', placement: 0});
        setFlipDisabled(false);
    }

    return (
        <div className="container m-auto max-w-screen-xl text-center">
            {gameStarted && <ScoreBoard />}
            <div className={"text-center" + (gameStarted ? ' grid grid-cols-8 gap-2' : '')}>
                {gameStarted && cards.map((card, index) =>
                    <MemoryCard card={card} key={index} flipDisabled={(flipDisabled || matchedCards.includes(card))} flipCard={() => (flipDisabled || !matchedCards.includes(card)) && CardClicked(card)} cardShowing={firstCard == card || secondCard == card || matchedCards.includes(card)}/>
                )}
            </div>
            <div>
                {!gameStarted && <button onClick={NewGame} className="mx-auto block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Start Game</button>}
            </div>
        </div>
    )
}