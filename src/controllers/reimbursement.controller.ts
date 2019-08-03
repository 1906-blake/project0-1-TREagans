import { PoolClient } from 'pg';
import { dbConnection } from '../util/dbconnect';
import { convertReimbursement } from '../util/reimburse.convert';
// import { convertReimbursement } from '../util/reimburse.convert';


const getAll = async (req, res) => {

    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const results = await client.query(`select * from reimbursements ORDER BY date_submitted`);

        if (results.rows) {
            return res.status(200).json(results.rows);
        }

    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


const getStatus = async (req, res) => {

    const id = req.params.id;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = `SELECT reimbursement_id, u1.username as author, amount, date_submitted as "dateSubmitted", date_resolved as "dateResolved", description,
        u2.username as resolver, rs.status as status, rt.reimbursetype as "type"
        from reimbursement
        left join usertable u1 on author = u1.user_id
        left join usertable u2 on resolver = u2.user_id
        left join reimbursementstatus rs on reimbursement.status = rs.status_id
        left join reimbursementtype rt on reimbursement.reimbursetype = rt.type_id
        where reimbursement.status = $1
        ORDER BY date_submitted`;

        const results = await client.query(queryString, [id]);

        if (id > 3 || id <= 0) {
            return res.status(400).send('Invalid Selection! Please Enter 1 - 3');
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
        const queryString = `SELECT reimbursement_id, u1.username as author, amount,    date_submitted as "dateSubmitted", date_resolved as "dateResolved",
            description, u2.username as resolver, reimbursementstatus.status, reimbursementtype.reimbursetype as "type"
            FROM reimbursement
            LEFT JOIN usertable u1 ON author = u1.user_id
            LEFT JOIN reimbursementstatus ON reimbursement.status = status_id
            LEFT JOIN reimbursementtype ON reimbursement.reimburseType = type_id
            LEFT JOIN usertable u2 ON resolver = u2.user_id
            WHERE author = $1
            ORDER BY date_submitted`;
        const results = await client.query(queryString, [+id]);
        if (results.rows) {
            return res.status(200).json(results.rows);
        } else {
            return res.status(400).send(`No records for user: ${id}`);
        }

    } catch (err) {

    } finally {
        client && client.release();
    }
};



/**
 * @param req 
 * @param res 
 */
const createReimbursement = async (req, res) => {

    const { author, amount, description, reimbursetype } = req.body;
    // let author = req.sessi, dateSubmittedon.user_id;
    const dateSubmitted = new Date();
    const status = 3;
    let client: PoolClient;

    try {

        client = await dbConnection.connect();
        const queryString = `INSERT INTO reimbursement 
        (author, amount, date_submitted, description, status, reimbursetype)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *`;

        const params = [author, amount, dateSubmitted, description, status, reimbursetype];
        const results = await client.query(queryString, params);

        if (results.rows[0]) {
            const converter = convertReimbursement(results.rows[0]);
            res.status(201);
            res.json(converter);
        } else {
            res.status(401).send('New reimbursement created!');
        }

    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    };
};

const getReimbursementId = async (req, res) => {

    const id = req.body.reimbursementId;
    // const id = req.params.id;
    let client: PoolClient;

    try {
        client = await dbConnection.connect();
        const queryString = `SELECT * FROM reimbursement WHERE reimbursement_id = $1
        ORDER BY date_submitted;`
        const results = await client.query(queryString, [+id]);

        return results.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
};


const updateReimbursement = async (req, res) => {

    const oldReimbursement = await getReimbursementId(req, res);
    const newReimbursement = req.body;

    if (!oldReimbursement) {
        return undefined;
    }
    const reimbursement = {
        ...oldReimbursement,
        ...newReimbursement
    };
    // const { author, amount, dateResolved, description, resolver, status, type } = req.body;
    // const dateSubmitted = new Date();
    let client: PoolClient;

    try {

        client = await dbConnection.connect();
        const queryString = `UPDATE reimbursement 
            SET author = $1, amount = $2, date_resolved = $3, description = $4, resolver = $5, status = $6, reimbursetype = $7 
            WHERE reimbursement_id = $8
            RETURNING *`;

        const params = [reimbursement.author, reimbursement.amount, reimbursement.dateResolved, reimbursement.description, reimbursement.resolver, reimbursement.status, reimbursement.reimbursetype, reimbursement.reimbursementId];
        const results = await client.query(queryString, params);


        if (results.rows[0]) {
            return res.status(200).send(`Reimbursement updated!`);
        } else {
            return res.status(400);
        }
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    };
};


export { getStatus, getAuthor, getReimbursementId, createReimbursement, updateReimbursement, getAll };