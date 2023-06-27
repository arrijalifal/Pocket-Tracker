import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const {amount, date, key} = req.body;
        const dataUpdate = {
            accountbalance: db.util.increment(-amount),
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
        }
        await db.update(dataUpdate, key);
    }
}