const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.id;
            next();
        } catch {
            return res.status(401).json({ message: 'Token Failed!' });
        }
    }
    return res.status(401).json({ message: 'No Token!' });
};

module.exports = protect;