import { MONGO_DB_NAME, MONGO_URI } from "../../config";
import { MongoClient } from "mongodb";

const DatabasePlugin = {
    name: 'App-Db',
    version: '0.1.0',
    register: async function (server) {
        const client: MongoClient = await MongoClient.connect(MONGO_URI);
        const db = client.db(MONGO_DB_NAME);
        console.log(`Connected to Mongodb: ${MONGO_DB_NAME}`);
        server.log(['info'], `Connected to Mongodb: ${MONGO_DB_NAME}`);
        server.app['db'] = db;
        server.app['mongoClient'] = client;
    }
};

export default DatabasePlugin;
