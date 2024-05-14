'use client';
import Link from 'next/link';
import LoggedInUser from '../auth/LoggedInUser';
import { Session } from 'next-auth';
import { useState } from 'react';

export default function NavBar(session:Session) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMenu = () =>
    {
        setMobileOpen(!mobileOpen);
    }
    return (
        <div className="bg-white w-full">
            <nav className="relative mx-auto flex max-w-screen-xl flex-wrap items-center py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
                <div className="flex w-full justify-between items-center">
                    <div>
                        <Link className="block" href="/">
                            <h1 className="font-knight text-3xl mx-4">Games</h1>
                        </Link>
                    </div>
                    <div className={mobileOpen ? 'absolute left-0 top-0 mt-16 bg-white w-full' : '!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto'}>
                        <ul className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row">
                            <li className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2 bg-red">
                                <Link href="/games/memory" className="block hover:bg-slate-300 p-2 rounded">Memory</Link>
                            </li>
                            <li className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2">
                                <Link href="/games/hangman" className="block hover:bg-slate-300 p-2 rounded">Hangman</Link>
                            </li>
                            <li className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2">
                                <Link href="/games/snake" className="block hover:bg-slate-300 p-2 rounded">Snake</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        {session ? <LoggedInUser {...session}/> : '' }
                        <button onClick={toggleMenu} className="order-last block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button">
                            <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
      </div>
    )
}