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

    function toggleMute() {
        setMuted(!muted);
    }

    getHighScore();

    return (
        <div className="container m-auto max-w-screen-xl text-center">
            {gameStarted && <ScoreBoard currentScore={totalMoves} bestScore={bestScore} />}
            {gameStarted && 
                <button onClick={toggleMute} className="float-end block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    {muted && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20"><path fill="#ffffff" d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z"/></svg>}
                    {!muted && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20"><path fill="#ffffff" d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>}
                </button>
            }
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