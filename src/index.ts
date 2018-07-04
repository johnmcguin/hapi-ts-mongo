import { Server } from 'hapi';
import * as uuid from 'uuid';
import * as hapiAuthCookie from 'hapi-auth-cookie';

import { PORT, HOST, COOKIE_NAME } from './config';
import { database, featuresPlugins } from './plugins';

start();

async function start() {
    // hapi server instance
    const server = new Server({
        port: PORT,
        host: HOST
    });
    // register the cookie scheme
    await server.register(hapiAuthCookie);
    // auth strategy
    server.auth.strategy('session', 'cookie', {
        // namesspace this password to DNS or URL? (see uuid docs)
        password: uuid.v4(),
        cookie: COOKIE_NAME,
        isSecure: true
    });
    // set session as the default strategy
    server.auth.default('session');
    // register mongodb plugin and expose connection to the server
    await server.register(database);
    // register all features of the app
    await server.register(featuresPlugins, { routes: { prefix: '/api' }});
    // start server
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    server.log('info', `Server running at: ${server.info.uri}`);
}
