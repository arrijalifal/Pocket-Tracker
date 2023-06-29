import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { amount, date, key, type } = req.body;
        if (amount) {
            const data = {
                pocketbalance: db.util.increment((type === 'income')? amount : -amount),
                pockethistory: db.util.append({
                    date,
                    type,
                    name: '',
                    amount
                })
            }
            const result = await db.update(data, key);
            res.status(200).json({status: true, result});
        }
        else {
            res.status(200).json({status: true, result: 'no data change'})
        }
    }
}