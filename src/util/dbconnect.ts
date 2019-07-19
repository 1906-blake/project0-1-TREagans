import { Pool } from 'pg';

const dbConfigurations = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_URL || 'localhost',
    database: process.env.DB_NAME || 'reimbursements',
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT || 5432
};

export const dbConnection = new Pool(dbConfigurations);