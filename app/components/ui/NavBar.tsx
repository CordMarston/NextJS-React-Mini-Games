import Link from 'next/link';
import AuthButtons from '../auth/AuthButtons';
import LoggedInUser from '../auth/LoggedInUser';
import { Session } from 'next-auth';

export default function NavBar(session:Session) {
    return (
        <header className="bg-white shadow-lg">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <div className="hover:bg-slate-300 py-2 rounded">
                    <Link className="block" href="/">
                        <h1 className="font-knight text-3xl mx-4">Games</h1>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global">
                    <ul className="flex items-center gap-6 text-sm">
                        Snake
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    {session ? <LoggedInUser {...session}/> : <AuthButtons/> }
                    <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                    <span className="sr-only">Toggle menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
        </header>
    )
}