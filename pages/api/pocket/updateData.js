import db from "@/utils/deta";

export default async function handler(req, res) {
    const {key, data} = req.body;
    const add = await db.put(data, key);
    res.status(200).json(add);
}