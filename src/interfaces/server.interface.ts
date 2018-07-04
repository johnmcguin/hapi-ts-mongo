import { Server } from "hapi";
import { IExtendedApplicationState } from "./application-state.interface";


export interface IExtendedServer extends Server {
    app: IExtendedApplicationState
}