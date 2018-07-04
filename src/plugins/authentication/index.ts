import AuthRoutes from "./auth.routes";

const AuthPlugin = {
    name: 'App-Auth',
    version: '0.1.0',
    register: function (server) {
        server.route(AuthRoutes);
    }
};

export default AuthPlugin;
