import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import sessionData from "@/utils/sessionData";
import EditMoneyDetail from "@/components/EditMoneyDetail";

export default function EditDompet({account}) {
    const {accounthistory} = account;
    const router = useRouter()
    return <EditMoneyDetail history={accounthistory} exactdata={router.query.tabungan} edittype='tabungan'/>
}

export async function getServerSideProps({ req }) {
    const currentsession = await sessionData({ req }, false);
    if (currentsession.redirect) return;
    return currentsession
}