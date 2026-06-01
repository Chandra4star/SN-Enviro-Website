import jwt from 'jsonwebtoken';

// Authenticates standard user token (e.g. partners or administrators)
export const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Support both structured { user: { ... } } and flat token structures
        req.user = decoded.user || decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// Enforces strict administrator role verification
export const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user && (req.user.isAdmin === true || req.user.id === 'admin')) {
            next();
        } else {
            res.status(403).json({ msg: 'Access denied: Administrator privileges required' });
        }
    });
};
