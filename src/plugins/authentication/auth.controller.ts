import Boom from 'Boom';
import { hash, compare } from 'bcrypt';
import { Collection } from 'mongodb';
//
import { IExtendedRequest } from "../../interfaces/request.interface";
import { User } from '../../models/user.model';
import { Collections } from '../../collections';

export default class AuthController {

    constructor() { }

    public async signup(request: IExtendedRequest) {
        try {
            // grab db from app namespace
            const db = request.server.app.db;
            const collection: Collection = db.collection(Collections.User);
            const saltRounds = 10;
            // type the payload. efforts were thwarted
            const payload: any = request.payload;
            const email = payload.email;
            const passwordToHash = payload.password;
            // check if the user already existss
            const userExists = await collection.findOne({ email });
            if (userExists) return Boom.conflict('User already exists');
            // if not, create a new one
            const hashedPassword = await hash(passwordToHash, saltRounds);
            const newUser: User = { email, password: hashedPassword };

            const result = await collection.insertOne(newUser);
            const savedUser = result.ops[0];

            request.cookieAuth.set(savedUser);
            return {
                message: `Successfully created new user: ${savedUser.email}`,
                payload: newUser
            };
        } catch (e) {
            return Boom.boomify(e);
        }
    }

    public async login(request: IExtendedRequest) {
        try {
            const payload: any = request.payload;
            const email = payload.email;
            const password = payload.password;

            const db = request.server.app.db;
            const collection: Collection = db.collection(Collections.User);
            const existingUser = await collection.findOne({ email });
            if (!existingUser) return Boom.badRequest('User does not exist.');

            const isMatch = await compare(password, existingUser.password);
            if (!isMatch) return Boom.badRequest('Passwords do not match.');

            request.cookieAuth.set(existingUser);
            return {
                message: `Successfully logged in as ${existingUser.email}`,
                payload: existingUser
            };
        } catch (e) {
            return Boom.boomify(e);
        }
    }

    public logout(request: IExtendedRequest) {
        request.cookieAuth.clear();
        return { message: 'Logged out. Try logging back in' };
    }
}
