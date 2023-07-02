import HistoryLayout from "@/components/HistoryLayout";
import sessionData from "@/utils/sessionData";
import { useSession } from "next-auth/react";

export default function PocketHistory({ account }) {
    const { pocketbalance, pockethistory } = account;
    const {data: session} = useSession();
    return (
        <main className="h-screen flex items-center bg-[#11009E]">
            <HistoryLayout balance={pocketbalance} history={pockethistory} contentType={'Dompet'} email={session.user.email}/>
        </main>
    )
}

export async function getServerSideProps({ req }) {
    const data = sessionData({req}, false);
    return data;
}