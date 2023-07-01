import { getSession } from "next-auth/react";
import axios from "axios";

export default async function sessionData({ req }, type) {
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
        (type)? account.accounthistory.reverse(): account.pockethistory.reverse();
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