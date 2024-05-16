
"use client";
import Image from 'next/image'
import Keyboard from '@/app/components/games/hangman/Keyboard';
import { generate as generateRandomWord } from "random-words";
import { useEffect, useState } from 'react';
import Letter from '@/app/components/games/hangman/Letter';

export default function HangmanGame() {
    const [word, setWord] = useState<string>(generateRandomWord().toString().toLowerCase());
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
    const [gameLost, setGameLost] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const letterClicked = (e: React.MouseEvent, letter:string) => {
        if(gameLost) { return; }
        // Make sure it hasn't already been added to either array first.
        let lowercaseLetter = letter.toLowerCase();
        if(word.includes(lowercaseLetter)) {
            if(!correctLetters.includes(lowercaseLetter)) {
                setCorrectLetters([...correctLetters, lowercaseLetter]);
            }
        } else {
            if(!incorrectLetters.includes(lowercaseLetter)) {
                setIncorrectLetters([...incorrectLetters, lowercaseLetter]);
            }
        }
    }

    const checkWinLoss = () => {
        if(incorrectLetters.length == 6) {
            alert('You Lost!');
            setGameLost(true);
            return;
        }

        let hasWon = true;
        word.split('').forEach((letter) => {
            if(!correctLetters.includes(letter)) {
                hasWon = false;
            }
        })
        
        if(hasWon) {
            alert('You Won!');
        }
    }

    useEffect(() => {
       checkWinLoss()
    }, [correctLetters, incorrectLetters]);

    const newGame = () => {
        setGameStarted(true);
    }

    if(!gameStarted) {
        return (
            <button onClick={newGame} className="mx-auto block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Start Game</button>
        )
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="flex-grow content-center">
                <Image
                    src={"/images/games/hangman/"+incorrectLetters.length+".png"}
                    width={300}
                    height={375}
                    alt="Hangman Base Graphic"
                    priority={true}
                />
            </div>
            <div className="flex flex-col justify-between py-4">
                <div className="grow content-center">
                    {word.split('').map((letter, index) => 
                        <Letter character={letter} showing={correctLetters.includes(letter) || gameLost} key={index}/>
                    )}
                </div>
                <Keyboard keyClicked={letterClicked} disabled={gameLost}/>
            </div>
        </div>
    )
}