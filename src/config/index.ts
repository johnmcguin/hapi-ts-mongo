import dotenv from 'dotenv';

// add your own .env file with your private keys and remember to add it to your .gitignore
dotenv.config({ path: '.env.example' });

const isProd  = process.env.NODE_ENV === 'production';

export const MONGO_URI = isProd ? process.env['MONGO_URI'] : process.env['MONGO_URI_LOCAL'];
export const HOST = isProd ? process.env['HOST'] : process.env['DEV_HOST'];
export const MONGO_DB_NAME = process.env['MONGO_DB_NAME'];
export const PORT = process.env.PORT || 4000;
export const COOKIE_NAME = process.env['COOKIE_NAME'] || 'Your Custom Cookie Name'
