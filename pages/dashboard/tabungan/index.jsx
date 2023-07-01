import React from "react";
import HistoryLayout from "@/components/HistoryLayout";
import sessionData from "@/utils/sessionData";

export default function AccountHistory({ account }) {
    const { accountbalance, accounthistory } = account;
    return (
        <main className="h-screen flex items-center">
            <HistoryLayout balance={accountbalance} history={accounthistory} contentType={'Tabungan'}/>
        </main>
    )
}

export async function getServerSideProps({ req }) {
    return sessionData({req}, true);
}