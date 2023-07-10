import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(404).json({ status: false, result: 'only post method allowed!' });
    const { data, type, key } = req.body;
    const dataUpdate = (type === 'dompet') ? { pockethistory: data } : { accounthistory: data };
    try {
        const result = await db.update(dataUpdate, key);
        res.status(200).json({ status: true, result });
    }
    catch (error) {
        res.status(404).json({status: false, result: error});
    }
}