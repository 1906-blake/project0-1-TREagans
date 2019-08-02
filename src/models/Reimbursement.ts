export default class Reimbursement {

    constructor(
        public reimbursementId: number,    // primary key
        public author: number,             // foreign key -> User, not null
        public amount: number,             // not null
        public dateSubmitted: number,      // not null
        public dateResolved: number,       
        public description: string,        // not null
        public resolver: number,           // foreign key -> User
        public status: number,             // foreign key -> ReimbursementStatus, not null
        public type: number                // foreign key -> ReimbursementType
    ){}
}