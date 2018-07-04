import { authPayload } from './auth.validation';
import AuthController from './auth.controller';

const controller = new AuthController();

const AuthRoutes = [
    {
        method: 'POST',
        path: '/signup',
        handler: controller.signup,
        options: {
            auth: {
                mode: 'try'
            },
            validate: authPayload
        }
    }, 
    {
        method: 'POST',
        path: '/login',
        handler: controller.login,
        options: {
            auth: {
                mode: 'optional'
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: controller.logout
    }
];

export default AuthRoutes;
