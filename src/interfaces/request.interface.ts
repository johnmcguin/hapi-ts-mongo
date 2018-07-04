import { Request } from 'hapi';
import { IExtendedServer } from './server.interface';

export interface IExtendedRequest extends Request {
    cookieAuth: any,
    server: IExtendedServer
}