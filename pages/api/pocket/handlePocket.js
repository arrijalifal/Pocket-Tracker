import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(404).json({status: false, result: 'only post method allowed'})
    const { amount, date, key, type } = req.body;
    if (amount) {
        const data = {
            pocketbalance: db.util.increment((type === 'income') ? amount : -amount),
            pockethistory: db.util.append({
                date,
                type,
                name: (type === 'income')? 'Pemasukan': 'Pengeluaran',
                amount
            })
        }
        const result = await db.update(data, key);
        res.status(200).json({ status: true, result });
    }
    else {
        res.status(200).json({ status: true, result: 'no data change' })
    }
}