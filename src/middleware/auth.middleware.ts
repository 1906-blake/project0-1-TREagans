export const authMiddleware = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        const role = req.session.user.role;
        if (role === 2 || role === 1) {
            next();
        } else if (req.session.user.userId === +req.params.id) {
            next();
        } else if (req.session.user.userId === req.body.author) {
            next();
        } else {
            // 403 means forbidden
            res.status(403).send('You cannot view other users');
        }
    } else {
        // 401 means unauthorized
        // 403 means forbidden
        res.status(403).send('Login Required!');
    }
};

// export const authMiddleware = (req, res, next) => {

//     const role = req.session.user.role;
//     // only users who are logged in can create 
//     // reimbursement requests
//     // console.log(req.session);
//     if (req.session.user) {
//             if (role === 2 || role === 1) {
//             next();  
//             // users can look up themselves
//         } else if (req.session.user.userId === +req.params.id) {
//             next();
//         } else {
//             let reqMethod = req.method;
//             if (reqMethod === 'GET'){
//                 reqMethod = 'VIEW';
//             } else if (reqMethod === 'POST') {
//                 reqMethod = 'CREATE';
//             }
//             res.status(403).send(`You are not authorized to [${reqMethod}] other users`);
//         }
//     } else {
//         res.status(401).send('Login Required!');
//     }
// };

export const reimburseMiddleware = (req, res, next) => {

    // only users who are logged in can create 
    // reimbursement requests
    if (req.session.user) {
        next();
    } else {
        return res.status(403).send('Login Required!');
    };
};