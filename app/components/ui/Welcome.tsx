"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function Welcome() {

    interface FormInfo {
        nickName?: string
    }
    const { data: session, update } = useSession()
    const [buttonMessage, setButtonMessage] = useState('Continue using real name');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [formData, setFormData] = useState<FormInfo>({nickName: session?.user.name});
    const router = useRouter()

    const nicknameChanged = (e: any) => {
        setButtonDisabled(false);
        if(e.target.value.length ==  0) {
            setButtonMessage('Can not go by nothing');
            setButtonDisabled(true);
        } else if(formData.nickName !== e.target.value) {
            setButtonMessage('Start using nickname');
        } else {
            setButtonMessage('Continue using real name')
        }
        setFormData({
            nickName: e.target.value
        })
    }

    const submitName = async(e: any) => {
        e.preventDefault();

        const response = await fetch('/api/user/nickname', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
          if(data.success) {
            router.refresh()
          }
    }
    return (
        <form onSubmit={submitName}>
            <div className="grid grid-rows-3 gap-y-2">
                <div>
                    <h1 className="font-blomberg text-8xl">Welcome,</h1>
                </div>
                <div className="self-center">
                    <span className="text-lg block">What would you like to go by?</span>
                    <span className="text-sm block">If you're good enough your name will appear on the leadboard as follows:</span>
                    <input type="text" name="nickname" className="mt-2 bg-inherit text-center border-x-0 border-b-4 px-4 text-xl" defaultValue={session?.user.name} onChange={nicknameChanged} />
                </div>
                <div>
                    <button type="submit" className="block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg" disabled={buttonDisabled}>{ buttonMessage }</button>
                </div>
            </div>
        </form>
    )
}