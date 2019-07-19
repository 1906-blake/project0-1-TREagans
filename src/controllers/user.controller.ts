import User from '../models/User';
import { PoolClient } from 'pg';
import { dbConnection } from '../util/dbconnect';
import { convertSqlUser } from '../util/user.convert';



const findAll = async (req, res) => {
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = await client.query('SELECT * FROM usertable');
        return res.json(queryString.rows.map(convertSqlUser));
    } catch (error) {
        console.log(error);
    } finally {

        client && client.release();
    };
    return undefined;
};


/**
 * because `req.params.id` returns a string value, we must convert
 * it to an integer first (parseInt())
 */
const findById = async (req, res) => {
    let client: PoolClient;
    try {
        client = await dbConnection.connect();
        const queryString = await client.query('SELECT * FROM usertable WHERE user_id = $1', [+req.params.id]);
        return res.json(queryString.rows.map(convertSqlUser)[0]);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


const userLogin = async (req, res) => {
    const { username, password } = req.body;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        // const queryString = await client.query('SELECT * FROM users');
        // const results = queryString.rows
        // const user = userLogin(username, password);
        if (username === req.body.username && password === req.body.password) {
            res.status(200);
            return res.send("Login Successful!");
        } else {
            // req.session.destroy(() => { });
            res.status(400);
            return res.send('Invalid Credentials');
        }
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}


const createUser = async (user: User) => {
    let client: PoolClient;
    try {
        client = await dbConnection.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO usertable (username, password, first_name, last_name, email, role)
            VALUES 	($1, $2, $3, $4, $5, $6)
            RETURNING user_id;
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role];
        const result = await client.query(queryString, params);
        return result.rows[0].user_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}


const updateUser = async (user: Partial<User>) => {
    // grab the old user info
    const oldUser = await findById(user.username, user.userId);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
    }
    
    let client: PoolClient;
    try {
        client = await dbConnection.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE user SET username = $1, password = $2, first_name = $3, last_name = $4, email = $6, role = $7
            WHERE user_id = $8
            RETURNING *
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role, user.userId];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
};


export { findAll, findById, userLogin, updateUser, createUser };


