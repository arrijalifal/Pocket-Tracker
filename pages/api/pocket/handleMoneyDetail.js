import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(404).json({ status: false, result: 'only post method allowed!' });
    const { date, amount, type, contentType, key } = req.body;
    if (!amount) return res.status(404).json({ status: false, result: 'amount is empty!' });
    let updates;
    const data = () => ({
        date,
        type,
        amount,
        name: (type === 'income')? 'Pemasukan' : 'Pengeluaran'
    });
    switch (contentType) {
        case 'Tabungan':
            updates = {
                accountbalance: db.util.increment((type === 'income') ? amount : -amount),
                accounthistory: db.util.append(data())
            }
            break;
        case 'Dompet':
            updates = {
                pocketbalance: db.util.increment((type === 'income')? amount: -amount),
                pockethistory: db.util.append(data())
            }
            break;
    }
    const result = await db.update(updates, key);
    res.status(200).json({status: true, result});
}