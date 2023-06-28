import db from "@/utils/deta";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;
        const userData = await db.get(email);
        if (userData) {
            res.status(200).json(userData);
        }
        else {
            const data = {
                pocketbalance: 0,
                accountbalance: 0,
                pockethistory: [],
                accounthistory: []
            }
            const add = await db.put(data, email);
            res.status(200).json(add);
        }
    }
}