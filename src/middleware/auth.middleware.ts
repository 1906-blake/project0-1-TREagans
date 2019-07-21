export const authMiddleware = (req, res, next) => {

    // ensure that the user has a session, 
    // and has a role of type manager
    if (req.session.user) {
        if (req.session.user.role === 1) {
            res.status(200);
            next();  
            // users can look up themselves
        } else if (req.session.user.role === +req.params.id) {
            res.status(200);
            next();
        } else {
            let reqMethod = req.method;
            if (reqMethod === 'GET'){
                reqMethod = 'VIEW';
            } else if (reqMethod === 'POST') {
                reqMethod = 'CREATE';
            }
            res.status(403).send(`You are not authorized to [${reqMethod}] other users`);
        }
    } else {
        res.status(401).send('Login Required!');
    }
};