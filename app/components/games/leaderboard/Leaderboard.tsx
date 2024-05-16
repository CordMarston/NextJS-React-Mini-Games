'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function LeaderBoard() {

    type Score = {
        createdAt: string,
        score: number,
        user: {
            nickname: string,
            image: string
        }
    }

    const [scores, setSCores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    async function LoadLeaderBoard() {
        const getScores = await fetch('/api/games/leaderboard', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const topScores = await getScores.json();
        setSCores(topScores.memoryScores);
        setLoading(false);
    }

    useEffect(() => {
        LoadLeaderBoard();
    }, []);
    if(loading) {
        return (
            <div className="cssload-wrap w-60 h-60">
                <div className="cssload-cssload-spinner"></div>
            </div>
        )
    }

    return (
        <div className="bg-white shadow text-left">
            <div className="font-knight text-4xl p-4 bg-black text-white">Memory Leaderboard</div>
            {scores && scores.map((score, index) => {
                return (
                    <div className="" key={index}>
                        <div className="hover:bg-slate-100 p-4 flex gap-8">
                            <div>{ index + 1 }</div>
                            <div className="colspan-2">{ new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.parse(score.createdAt)) }</div>
                            <div className="">
                                { score.user.nickname }
                                <Image
                                    src={score.user.image}
                                    width="30"
                                    height="30"
                                    alt="Profile Picture"
                                    className="rounded-full inline ml-2 border-cyan-900 border-2"
                                />
                            </div>
                            <div className="text-center">{ score.score }</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}