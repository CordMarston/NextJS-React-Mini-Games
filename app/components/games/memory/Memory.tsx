"use client"
import MemoryCard from './MemoryCard';
import ScoreBoard from './ScoreBoard';
import { useEffect, useState } from 'react';


export default function MemoryGame() {
    // Color for possibly adding colors to the cards.
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
    const [bestScore, setBestScore] = useState(0);
    const [muted, setMuted] = useState(false);

    function newGame() {
        setCards(shuffle());
        setGameStarted(true);
    }

    function shuffle() {
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

    function cardClicked(card:Card) {
        playSound('faceUp');
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
            checkSelected();
        }
    }, [firstCard, secondCard]);

    function checkSelected() {
        if(firstCard.number !== secondCard.number) {
            setTimeout(() => {
                resetSelectedCards();
            }, 1000);
        } else {
            addMatch();
        }
    }

    function addMatch() {
        setMatchedCards(matchedCards => [...matchedCards, firstCard, secondCard]);
        resetSelectedCards();
        setFlipDisabled(false);
    }

    useEffect(() => {
        if(matchedCards.length == totalCards && matchedCards.length > 0) {
            alert('Game Over');
            submitScore();
        }
    }, [matchedCards]);

    function resetSelectedCards() {
        // Reset to initial state
        playSound('faceDown');
        setFirstCard({number: 0, color: '', placement: 0});
        setSecondCard({number: 0, color: '', placement: 0});
        setFlipDisabled(false);
    }

    function resetGame() {
        resetSelectedCards();
        setTotalCards(0);
        setMatchedCards([]);
        setTotalMoves(0);
    }

    async function submitScore() {
        if(totalMoves < bestScore) {
            setBestScore(totalMoves);
        }
        const postScore = await fetch('/api/games/memory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({game: 'Memory', score: totalMoves}),
        });
      
        const data = await postScore.json();
    }

    async function getHighScore() {
        const getScore = await fetch('/api/games/memory', {
            method: 'GET'
        });
      
        const data = await getScore.json();
        if(data.success && data.message) {
            setBestScore(data.message.score);
        }
    }

    function playSound(direction:string) {
        if(muted) { return; }
        if(direction == 'faceUp') {
            let audio = new Audio('/audio/card-flip-1.mp3');
            audio.play();
        } else {
            let audio = new Audio('/audio/card-flip-2.mp3');
            audio.play();
        }
    }

    getHighScore();

    return (
        <div className="container m-auto max-w-screen-xl text-center">
            {gameStarted && <ScoreBoard currentScore={totalMoves} bestScore={bestScore} />}
            <div className={"text-center" + (gameStarted ? ' grid grid-cols-8 gap-2' : '')}>
                {gameStarted && cards.map((card, index) =>
                    <MemoryCard card={card} key={index} flipDisabled={(flipDisabled || matchedCards.includes(card))} flipCard={() => (flipDisabled || !matchedCards.includes(card)) && cardClicked(card)} cardShowing={firstCard == card || secondCard == card || matchedCards.includes(card)}/>
                )}
            </div>
            <div>
                {!gameStarted && <button onClick={newGame} className="mx-auto block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Start Game</button>}
            </div>
            {gameStarted && <div className="mt-4"><button onClick={resetGame} className="mx-auto block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Reset Game</button></div>}
        </div>
    )
}