
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
    const [gameWon, setGameWon] = useState(false);

    const letterClicked = (e: React.MouseEvent | null, letter:string) => {
        if(gameLost || gameWon) { console.log('exiting'); return; }
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
            setGameWon(true);
        }
    }

    const keyPresses = (e:any) => {
        if(e.key) {
            letterClicked(null, e.key);
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', keyPresses);
        checkWinLoss();
        return () => {
            window.removeEventListener('keyup', keyPresses);
        }
    }, [correctLetters, incorrectLetters, gameWon, gameLost]);

    const newGame = () => {
        setGameStarted(true);
        setCorrectLetters([]);
        setIncorrectLetters([]);
        setGameWon(false);
        setGameLost(false);
        setWord(generateRandomWord().toString().toLowerCase());
    }

    const NewGameButton = () => {
        return (
            <button onClick={newGame} className="mx-auto block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">{gameStarted ? 'Restart Game' : 'New Game'}</button>      
        );
    }

    if(!gameStarted) {
        return <NewGameButton/>
    }

    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="flex-grow content-center relative">
                    <Image
                        src={"/images/games/hangman/"+(incorrectLetters.length > 6 ? 6 : incorrectLetters.length)+".png"}
                        width={250}
                        height={325}
                        alt="Hangman Base Graphic"
                        priority={true}
                    />
                    {gameWon && <div className="bg-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 text-white">You Won!</div>}
                    {gameLost && <div className="bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 text-white">You Lost!</div>}
                    
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
            <div className="pt-4">
                <NewGameButton/>
            </div>
            
        </div>
    )
}