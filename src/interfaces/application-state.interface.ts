import { ApplicationState } from "hapi";
import { Db } from "mongodb";

export interface IExtendedApplicationState extends ApplicationState {
    db: Db
}
