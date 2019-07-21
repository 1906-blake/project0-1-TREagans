import { PoolClient } from 'pg';
import { dbConnection } from '../util/dbconnect';
// import { convertReimbursement } from '../util/reimburse.convert';


const getStatus = async (req, res) => {

    const id = req.params.id;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = `SELECT reimbursement_id, author, amount, date_submitted, date_resolved,                  description, resolver, reimbursetype, reimbursementstatus
                    FROM reimbursement INNER JOIN reimbursementstatus
                    ON
                    reimbursement.status = reimbursementstatus.status_id
                    WHERE
                    reimbursementstatus.status_id = $1
                    ORDER BY date_submitted desc`;

        const results = await client.query(queryString, [id]);

        return res.json(results.rows);
      
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


const getAuthor = async (req, res) => {

    // const id = req.params.id;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        // const queryString = ``;
        // const results = client.query(queryString, [+id]);


    } catch (err) {
        
    } finally {
        client && client.release();
    }
};


const createReimbursement = (req, res) => {

    // let { author, amount, dateSubmitted, dateResolved, description, resolver, type, status } req.body;
    let client: PoolClient;

    try {
        
        // client = dbConnection.connect();
        // const queryString = ``;
        // const results = client.query(queryString); 

        return res.send('new reimbursement created');
    } catch (err) {
        
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