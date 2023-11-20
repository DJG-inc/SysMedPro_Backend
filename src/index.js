import dotenv from 'dotenv';
dotenv.config();
import Server from './models/serverModel/server.model.js';
const server = new Server();
server.listen();
