import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { amount, date, key } = req.body;
        console.log(amount, date, key);
        console.log("menghasilkan result")
        const result = await db.update({
            accountbalance: db.util.increment(amount),
            accounthistory: db.util.append({
                date,
                type: 'expense',
                name: '',
                amount
            }),
            pocketbalance: db.util.increment(amount),
            pockethistory: db.util.append({
                date,
                type: 'income',
                name: '',
                amount
            })
        }, key);
        res.status(200).json({ status: true, result });
    }
}