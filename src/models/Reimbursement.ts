export default class Reimbursement {

    constructor(
        reimbursementId: number,    // primary key
        author: number,             // foreign key -> User, not null
        amount: number,             // not null
        dateSubmitted: number,      // not null
        dateResolved: number,       
        description: string,        // not null
        resolver: string,           // foreign key -> User
        status: string,             // foreign key -> ReimbursementStatus, not null
        type: string                // foreign key -> ReimbursementType
    ){}
}