const axios = require('axios');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing token' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.get('http://localhost:8080/api/auth/validate', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        req.user = response.data;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
