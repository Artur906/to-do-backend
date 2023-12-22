export { pool } from "./pool";
import { pool } from "./pool";

export const query = async (text: string, values?: Array<string>) => {
  const res = await pool.query(text, values)
  return res;
}
