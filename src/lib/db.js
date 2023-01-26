import 'dotenv/config';
import { Deta } from 'deta';
const deta = Deta(process.env.DETA_PROJECT_KEY);
export default deta;
