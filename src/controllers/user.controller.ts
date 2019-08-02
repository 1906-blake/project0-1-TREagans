
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
    const id = req.params.id;

        try {
            client = await dbConnection.connect();
            const query = await client.query('SELECT * FROM usertable WHERE user_id = $1', [+id]);

            if (!query.rows[0]) {
                res.status(400).send(`Sorry, user doesn't exist!`);
            } else {
            return res.json(query.rows.map(convertSqlUser)[0]);
            }

        } catch (err) {
            console.log(err);
        } finally {
            client && client.release();
        }
    };


/**
* because `req.params.id` returns a string value, we must convert
* it to an integer first (parseInt())
*/
const findByRole = async (req, res) => {

    let client: PoolClient;
    const role = req.params.id;

    try {

        client = await dbConnection.connect();
        const queryString = await client.query(`SELECT * FROM usertable WHERE role_id = $1`, [+role]);;

        return res.json(queryString.rows.map(convertSqlUser));
        
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}

const createUser = async (req, res) => {
    const { username, password, firstName, lastName, email, role } = req.body;
    let client: PoolClient;
    
    try {
        client = await dbConnection.connect(); 
        const queryString = `
            INSERT INTO usertable (username, password, first_name, last_name, email, role_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id`;
        const params = [username, password, firstName, lastName, email, role];
        const results = await client.query(queryString, params);
        return res.status(200).json(`User: ${results.rows[0].user_id} - '${username}' created successfully!`);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};



const loginUser = async (req, res) => {
    const { username, password } = req.body;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = `SELECT * FROM usertable WHERE username = $1 AND password = $2`;
        const results = await client.query(queryString, [username, password]);
        convertSqlUser(results);

        if (results.rows[0]) {
            console.log(results.rows[0]);
            req.session.user = convertSqlUser(results.rows[0]);
            res.json(req.session.user);
        } else {
            req.session.destroy;
            res.status(400).send('Invalid Credentials!');
        }

    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


const updateUser = async (req, res) => {

    const id = req.params.id;
    const { password, firstName, lastName, email, role, username } = req.body;

    let client: PoolClient;

    try {
        client = await dbConnection.connect();

        // if no password is supplied from front-end
        if (!password) {
            client.query(`UPDATE usertable 
            SET first_name = $1, last_name = $2, email = $3, role_id = $4, username = $5 
            WHERE user_id = $6`, [firstName, lastName, email, role, username, id]);
        } else {
            client.query(`UPDATE usertable 
            SET password = $1, first_name = $2, last_name = $3, email = $4, role_id = $5, username = $6 
            WHERE user_id = $7`, [password, firstName, lastName, email, role, username, id]);
        }

        return res.status(200).send(`User Id: '${id}' updated successfully!`)
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


const deleteUser = async (req, res) => {
    const id = req.params.id;
    let client: PoolClient;

    try {
        
        client = await dbConnection.connect();
        await client.query(`DELETE FROM usertable WHERE user_id = $1`, [+id]);

        return res.send(`User Id: ${id} deleted successfully!`);

    } catch (err) {

        console.log(err);
    } finally {

        client && client.release();
    }
};


export { findAll, findById, findByRole, loginUser, updateUser, createUser, deleteUser };


