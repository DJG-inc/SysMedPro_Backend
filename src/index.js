import dotenv from 'dotenv';
dotenv.config();
import Server from './models/server.model.js';
const server = new Server();
server.listen();