import { Session } from 'next-auth';

export default function Welcome(session:Session) {
    return (
        <div>
            <h1 className="font-blomberg text-8xl">Welcome,</h1>
            <p>{session.user.name}</p>
        </div>
    )
}