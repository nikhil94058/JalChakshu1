
import {Pool} from 'pg';

//setting up the configuration for connecting to db server
const pool = new Pool({
     user:'postgres',
    host: 'localhost',
    database: process.env.NEXT_PUBLIC_DB_NAME || 'jalchakshu',
    password: process.env.NEXT_PUBLIC_DB_PASSWORD || 'Sanubhai@9.1',
    port: process.env.NEXT_PUBLIC_DB_PORT || '5433',
})

//event Listeners
pool.on('connect',()=>{
    console.log("I am connected to the database");
})

pool.on('end',()=>{
    console.log("I got disconnected from the database");
})

export {pool};