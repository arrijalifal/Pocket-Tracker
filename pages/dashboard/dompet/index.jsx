import HistoryLayout from "@/components/HistoryLayout";
import sessionData from "@/utils/sessionData";

export default function PocketHistory({ account }) {
    const { pocketbalance, pockethistory } = account;
    return (
        <main className="h-screen flex items-center bg-[#11009E]">
            <HistoryLayout balance={pocketbalance} history={pockethistory} contentType={'Dompet'} />
        </main>
    )
}

export async function getServerSideProps({ req }) {
    const data = sessionData({req}, false);
    return data;
}