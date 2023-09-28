import jwt from 'jsonwebtoken';

const createJwt = (id) => {
    try {
        const payload = { id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error creating JWT:', error);
        throw new Error('Failed to create JWT');
    }
};

const renewToken = (expiredToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(expiredToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return reject(err);
            }

            // Emite un nuevo token con una nueva fecha de expiración
            const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            resolve(newToken);
        });
    });
};

export { createJwt, renewToken };