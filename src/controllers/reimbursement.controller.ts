import { PoolClient } from 'pg';
import { dbConnection } from '../util/dbconnect';
// import { convertReimbursement } from '../util/reimburse.convert';


const getStatus = async (req, res) => {

    const id = req.params.id;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = `select * from getStatus WHERE status_id = $1`;

        const results = await client.query(queryString, [id]);

        if (id > 3 || id <= 0) {
            res.status(400).send('Invalid Selection! Please Enter 1 - 3');
        }

        if (results.rows) {
            return res.status(200).json(results.rows);
        }
      
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


/***
 * allowed roles: finance-manager, user
 * User can only lookup their specific user_id
 */
const getAuthor = async (req, res) => {

    const id = req.params.id;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = `SELECT * FROM getByUser WHERE user_id = $1`;
        const results = await client.query(queryString, [+id]);

        if (results.rows) {
            return res.status(200).send(results.rows);
        } else {
            return res.status(400).send(`No records for user: ${id}`);
        }

    } catch (err) {
        
    } finally {
        client && client.release();
    }
};



/**
 * 201 CREATED
  Reimbursement
 * @param req 
 * @param res 
 */
const createReimbursement = async (req, res) => {

    // let { author, amount, dateResolved, description, resolver, type, status } = req.body;
    // let dateSubmitted = new Date();
    let client: PoolClient;

    try {
        
        client = await dbConnection.connect();
        const queryString = `INSERT INTO reimbursement 
        (author, amount, date_submitted, date_resolved, description, resolver, status, reimbursetype)
        VALUES
        (8, 123.43, '2019-07-22', null, 'lodging', null, 3, 3)`;
        // ($1, $2, $3, $4, $5, $6, $7, $8)`;

        // const params = [author, amount, dateSubmitted, dateResolved, description, resolver, type, status]; 
        const results = await client.query(queryString);

        console.log(results.rows);
        if (results.rows[0]) {
            return res.status(201).send(`Reimbursement created!`);
        } else {
            return res.status(401).send('New reimbursement created!');
        }

    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    };
};


const updateReimbursement = (req, res) => {

    let client: PoolClient;

    try {

        // client = dbConnection.connect();
        // const queryString = ``;
        // const results = client.query(queryString); 

        return res.send('Reimbursement updated!');
    } catch (err) {

    } finally {
        client && client.release();
    };
};


export { getStatus, getAuthor, createReimbursement, updateReimbursement };