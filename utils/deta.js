import { Deta } from "deta";

const deta = Deta(process.env.DETA_KEY);
const db = deta.Base("trackers");

export default db;