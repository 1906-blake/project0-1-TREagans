import User from '../models/User';

export function convertSqlUser(row: any) {
    return new User(row.user_id, row.username, '', row.first_name, row.last_name, row.email, row.role_id);
}