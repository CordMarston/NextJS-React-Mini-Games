
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

    const letterClicked = (e: React.MouseEvent, letter:string) => {
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
        if(incorrectLetters.length == word.length) {
            alert('You Lost!');
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
                {word}
            </div>
            <div className="flex flex-col justify-between py-4">
                <div className="grow content-center">
                    {word.split('').map((letter, index) => 
                        <Letter character={letter} showing={correctLetters.includes(letter)} key={index}/>
                    )}
                </div>
                <Keyboard keyClicked={letterClicked} />
            </div>
        </div>
    )
}