import React from "react";
import HistoryLayout from "@/components/HistoryLayout";
import sessionData from "@/utils/sessionData";
import { useSession } from "next-auth/react";

export default function AccountHistory({ account }) {
    const {data: session} = useSession()
    const { accountbalance, accounthistory } = account;
    return (
        <main className="h-screen flex items-center">
            <HistoryLayout balance={accountbalance} history={accounthistory} contentType={'Tabungan'} email={session.user.email}/>
        </main>
    )
}

export async function getServerSideProps({ req }) {
    return sessionData({req}, true);
}