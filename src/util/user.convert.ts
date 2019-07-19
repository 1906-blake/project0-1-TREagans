import User from '../models/User';

export function convertSqlUser(row: any) {
    return new User(row.user_id, row.username, '', row.email, row.firstName, row.lastName, row.role);
}