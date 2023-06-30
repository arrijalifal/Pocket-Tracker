import { getSession } from "next-auth/react";
import axios from "axios";
import React from "react";

export default function AccountHistory({ account }) {
    const { accountbalance, accounthistory } = account;
    return (
        <main className="h-screen flex items-center">
            <div className="w-full h-3/4 flex flex-col">
                <section className="w-full p-3 rounded-t-2xl bg-[#4942E4] flex justify-between">
                    <p className="inline">Tabungan</p>
                    <p className="inline">{accountbalance} <span className="inline-block tracking-tight rotate-90">{'>>'}</span></p>
                </section>
                <section className="w-full bg-[#11009E] p-3 rounded-b-2xl flex-1 flex flex-col justify-between">
                    <div>
                        {
                            (accounthistory.length > 0)?
                            accounthistory.map(ac => {
                                const date = new Date(ac.date);
                                const datestring = date.toString().split(" ");
                                const timestring = datestring[4].split(':').slice(0, 2).join(':');
                                const datetext = datestring[2] + ' ' + datestring[1];
                                return (
                                    <React.Fragment key={ac.date}>
                                        <div className="flex items-center border-b last-of-type:border-none">
                                            <p className="flex-none mr-4"><span className="block">{datetext}</span><span className="text-center">{timestring}</span></p>
                                            <div className="flex justify-between items-center flex-1 text-lg">
                                                <p className="inline">{(ac.name) ? ac.name : 'Tanpa nama'}</p>
                                                <span className="">{(ac.type === 'expense')? '-' : '+'}Rp {ac.amount.toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            : <div className="text-center">
                                No Data
                            </div>
                        }
                    </div>
                    <div className="text-center">
                        <button className="py-4 px-6 border rounded-xl">Back</button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        const email = session.user.email;
        const result = await axios({
            method: 'POST',
            url: `${process.env.APP_URL}/api/pocket/getUser`,
            data: {
                email
            }
        })
        const account = result.data;
        account.accounthistory.reverse();
        return {
            props: {
                session,
                account
            }
        }
    }
    else {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}