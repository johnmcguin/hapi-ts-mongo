const ShutdownSequence = {
    name: 'App-Shutdown-Sequence',
    version: '0.1.0',
    register: function (server) {
        process.on('uncaughtException', gracefulShutdown);
        process.on('unhandledRejection', gracefulShutdown);
        process.on('SIGUSR2', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);

        async function gracefulShutdown(err) {
            await server.app.mongoClient.close();
            await server.stop();
            console.error('An unexpected error occurred');
            server.log('error', 'An unexpected error occurred');
            process.exit(err ? 1 : 0);
        }
    }
};

export default ShutdownSequence;
