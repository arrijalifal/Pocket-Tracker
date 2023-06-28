import style from '@/styles/Home.module.css';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default function Home() {

    async function handleLogin() {
        await signIn('google', {
            callbackUrl: '/dashboard'
        });
    }
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <section className="bg-[#C4B0FF] rounded-xl">
                <h1 className={`${style.mediumtext2} w-full text-center pt-4 px-6 text-black`}>Pocket Tracker</h1>
                <div className='w-full text-center mt-2 pb-6 px-6'>
                    <button className='bg-[#4942E4] p-4 rounded-xl' onClick={handleLogin}>
                        <Image src={'/assets/google.svg'} width={30} height={30} alt='Google Logo' className='inline w-[30px] h-[30px]' />
                        <span className='inline ml-3'>Login</span>
                    </button>
                </div>
            </section>
        </main>
    )
}

export async function getServerSideProps({req}) {
    const session = await getSession({req});
    if (session) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
    else {
        return {
            props: {}
        }
    }
}