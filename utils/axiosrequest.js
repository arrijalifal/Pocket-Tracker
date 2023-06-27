const axios = require('axios');

export default async function withdrawCash({ amount, key }) {
    const date = new Date();
    const res = await axios({
        method: "POST",
        url: `${process.env.APP_URL}/api/pocket/withdrawCash`,
        data: {
            date: date.toISOString(),
            amount: amount,
            key: key
        }
    });
    return res;
}